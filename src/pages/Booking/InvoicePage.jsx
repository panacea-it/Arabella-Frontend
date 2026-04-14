import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "lucide-react";
import styles from "./InvoicePage.module.css";

const InvoicePage = () => {
  const { id } = useParams(); // Get Booking ID from URL
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInvoiceData();
    // eslint-disable-next-line
  }, [id]);

  const fetchInvoiceData = async () => {
    try {
      // Fetch JSON data from your backend
      const res = await axios.get(
        `http://localhost:4000/api/bookings/${id}/invoice`
      );
      if (res.data.success) {
        setInvoice(res.data.invoice);
        // Auto-trigger print after a short delay to ensure data is rendered
        setTimeout(() => {
          window.print();
        }, 800);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load invoice details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className={styles.center}>
        <Loader className={styles.spin} />
      </div>
    );
  if (error) return <div className={styles.center}>{error}</div>;
  if (!invoice) return null;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.invoicePaper}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <h1>Arabella</h1>
            <p>MOTOR INN</p>
          </div>
          <div className={styles.hotelInfo}>
            <strong>Arabella Motor Inn</strong>
            <br />
            9-11 Minjungbal Drive
            <br />
            Tweed Heads South, NSW, 2486
            <br />
            0755243111 | arabellamotorinn@gmail.com
          </div>
        </header>

        {/* Invoice Info */}
        <section className={styles.invoiceInfo}>
          <div className={styles.billTo}>
            <h3>Bill To:</h3>
            <strong>{invoice.guestName}</strong>
            <br />
            {invoice.email}
            <br />
            {invoice.phone}
            <br />
            {/* Handle address object safely */}
            {invoice.address?.street}, {invoice.address?.city}
          </div>
          <div className={styles.metaTable}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Invoice #:</span>
              <span>{invoice.invoiceNumber}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Date:</span>
              <span>{new Date(invoice.createdAt).toLocaleDateString()}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Status:</span>
              <span className={styles.statusPaid}>PAID</span>
            </div>
          </div>
        </section>

        {/* Items Table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th className={styles.textRight}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* 1. Room Charges */}
            <tr>
              <td>
                <strong>{invoice.roomType?.name || "Room Stay"}</strong>
                <br />
                <small>
                  {new Date(invoice.checkIn).toDateString()} —{" "}
                  {new Date(invoice.checkOut).toDateString()}
                </small>
              </td>
              <td>{invoice.nights} Nights</td>
              <td>₹{invoice.baseRatePerNight}</td>
              <td className={styles.textRight}>₹{invoice.roomPriceTotal}</td>
            </tr>

            {/* 2. Amenities (Only if they exist) */}
            {invoice.amenitiesCost > 0 && (
              <tr>
                <td>Amenities / Extra Services</td>
                <td>-</td>
                <td>-</td>
                <td className={styles.textRight}>₹{invoice.amenitiesCost}</td>
              </tr>
            )}

            {/* 3. Taxes */}
            {invoice.tax > 0 && (
              <tr>
                <td>Taxes & Fees</td>
                <td>-</td>
                <td>-</td>
                <td className={styles.textRight}>₹{invoice.tax}</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals */}
        <div className={styles.totalsSection}>
          <div className={styles.totalsTable}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>₹{invoice.subTotal}</span>
            </div>

            {invoice.discount > 0 && (
              <div className={styles.totalRow}>
                <span>Discount</span>
                <span style={{ color: "red" }}>- ₹{invoice.discount}</span>
              </div>
            )}

            <div className={`${styles.totalRow} ${styles.grandTotal}`}>
              <span>Total Paid</span>
              <span>₹{invoice.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>
            Thank you for choosing Arabella Motor Inn. We look forward to
            welcoming you.
          </p>
          <p>
            For any queries, please contact us quoting the invoice number above.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default InvoicePage;
