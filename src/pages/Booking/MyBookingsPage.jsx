import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Download, Loader, AlertCircle } from "lucide-react";
import styles from "./MyBookingsPage.module.css";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get Token from Redux
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      fetchBookings();
    } else {
      setLoading(false); // Stop loading if no token (user logged out)
    }
    // eslint-disable-next-line
  }, [token]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewInvoice = (id) => {
    navigate(`/invoice/${id}`);
  };

  if (loading)
    return (
      <div className={styles.loaderCenter}>
        <Loader className={styles.spin} />
      </div>
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Bookings</h1>

      {bookings.length === 0 ? (
        <div className={styles.emptyState}>
          <AlertCircle size={48} color="#ccc" style={{ marginBottom: 15 }} />
          <h3>No bookings found</h3>
          <p>You haven't made any reservations yet.</p>
          {/* Note for you to debug: */}
          <small style={{ color: "red", display: "block", marginTop: 10 }}>
            (Note: Bookings made before the backend fix will not appear here.
            Please make a new booking to test.)
          </small>
        </div>
      ) : (
        <div className={styles.grid}>
          {bookings.map((booking) => {
            // Safe status handling
            const statusClass = booking.status
              ? styles[booking.status.toLowerCase()]
              : styles.confirmed;

            return (
              <div key={booking._id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img
                    src={
                      booking.roomType?.images?.[0] ||
                      "https://placehold.co/600x400?text=Arabella+Room"
                    }
                    alt={booking.roomType?.name || "Room"}
                  />
                  <span className={`${styles.statusBadge} ${statusClass}`}>
                    {booking.status || "Confirmed"}
                  </span>
                </div>

                <div className={styles.cardContent}>
                  <h3>
                    {booking.roomType?.name || "Room Details Unavailable"}
                  </h3>
                  <p className={styles.ratePlan}>
                    {booking.ratePlan?.name || "Standard Rate"}
                  </p>

                  <div className={styles.details}>
                    <div className={styles.row}>
                      <Calendar size={16} />
                      <span>
                        {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.row}>
                      <MapPin size={16} />
                      <span>Arabella Motor Inn</span>
                    </div>
                  </div>

                  <div className={styles.footer}>
                    <div className={styles.price}>
                      <span>Total Paid</span>
                      <strong>₹{booking.totalPrice}</strong>
                    </div>

                    <button
                      onClick={() => handleViewInvoice(booking._id)}
                      className={styles.invoiceBtn}
                    >
                      <Download size={16} /> Invoice
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
