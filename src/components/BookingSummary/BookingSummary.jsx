import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import { Trash2 } from "lucide-react";
import styles from "./BookingSummary.module.css";

const BookingSummary = ({ selectedRoom, dates, onRemove }) => {
  const dispatch = useDispatch();

  // Calculate total price logic
  const calculateTotal = () => {
    if (!selectedRoom || !dates.checkIn || !dates.checkOut) return 0;
    const start = new Date(dates.checkIn);
    const end = new Date(dates.checkOut);
    const diffTime = Math.abs(end - start);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    return (selectedRoom.pricePerNight * nights).toFixed(2);
  };

  const total = calculateTotal();

  const handleBookNow = () => {
    // Open the actual booking form modal with the selected data
    dispatch(
      openModal({
        type: "bookingModal",
        modalData: selectedRoom,
      })
    );
  };

  if (!selectedRoom) {
    return (
      <div className={styles.emptyContainer}>
        <p>Select a room to continue</p>
      </div>
    );
  }

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.totalHeader}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalPrice}>AUD {total}</span>
      </div>

      <div className={styles.datesRow}>
        <span>
          {dates.checkIn || "Date"} – {dates.checkOut || "Date"}
        </span>
        <span className={styles.nights}>
          {/* Simple logic to show "1 night" */}
          {total > 0 ? Math.round(total / selectedRoom.pricePerNight) : 1} night
        </span>
      </div>

      <hr className={styles.divider} />

      <div className={styles.roomItem}>
        <div className={styles.roomInfo}>
          <strong>{selectedRoom.name}</strong>
          <span className={styles.roomPrice}>AUD {total}</span>
        </div>
        <button onClick={onRemove} className={styles.removeBtn}>
          <Trash2 size={16} />
        </button>
      </div>

      <div className={styles.footer}>
        <p className={styles.taxNote}>Includes taxes + fees</p>
        <div className={styles.payLaterBox}>
          <strong>Book now, pay later!</strong>
          <p>Outstanding balance: AUD {total}</p>
        </div>

        <button className={styles.bookBtn} onClick={handleBookNow}>
          Book
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
