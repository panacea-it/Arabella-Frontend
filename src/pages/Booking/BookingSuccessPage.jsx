import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { CheckCircle, FileText, Home } from "lucide-react";
import styles from "./BookingSuccessPage.module.css";

const BookingSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking, room } = location.state || {};

  // 1. Safety Check: If page is accessed directly without data
  if (!booking) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.card}>
          <h2>No booking details found.</h2>
          <Link to="/" className={styles.homeBtn} style={{ marginTop: 20 }}>
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // 2. Extract Data Safely (Handles different data structures)
  // The ID is needed for the Invoice URL
  const bookingId = booking._id || booking.booking?._id;

  // Display Name
  const guestName =
    booking.guestDetails?.firstName || booking.guestName || "Guest";

  // Display Email
  const email = booking.guestDetails?.email || booking.email || "N/A";

  // Display Payment ID
  const paymentId =
    booking.razorpayPaymentId || booking.booking?.razorpayPaymentId || "N/A";

  // Display Total Price
  const totalAmount = booking.financials?.finalTotal || booking.totalPrice || 0;

  // 3. Invoice Button Handler
  const handleOpenInvoice = () => {
    if (bookingId) {
      navigate(`/invoice/${bookingId}`);
    } else {
      // Fallback if ID is missing (e.g. if Checkout didn't pass the saved object)
      alert("Invoice is being generated. Please check 'My Bookings' page.");
      navigate("/my-bookings");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        {/* Success Icon */}
        <div className={styles.iconWrapper}>
          <CheckCircle size={80} color="#27ae60" fill="#e8f5e9" />
        </div>

        <h1 className={styles.title}>Booking Confirmed!</h1>
        <p className={styles.subtext}>
          Thank you, <strong>{guestName}</strong>. <br />
          Your stay at <strong>{room?.name || "Arabella Motor Inn"}</strong> is
          confirmed.
        </p>

        {/* Rich Details Box */}
        <div className={styles.detailsBox}>
          <div className={styles.detailRow}>
            <span>Payment ID:</span>
            <span>{paymentId}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Email Sent To:</span>
            <span>{email}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Total Paid:</span>
            <strong>₹{totalAmount}</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionRow}>
          <Link to="/" className={styles.homeBtn}>
            <Home size={18} style={{ marginRight: 8 }} />
            Back to Home
          </Link>

          <button onClick={handleOpenInvoice} className={styles.invoiceBtn}>
            <FileText size={18} style={{ marginRight: 8 }} />
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
