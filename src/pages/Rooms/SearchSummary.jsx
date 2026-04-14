import React from "react";
import styles from "./SearchSummary.module.css";

const SearchSummary = ({ searchData, onEdit }) => {
  // Destructure all fields including children
  const { checkIn, checkOut, guests, children, rooms } = searchData;

  // Helpers to format dates like "19 Dec"
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.getDate();
  };

  const formatMonth = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleString("default", { month: "short" });
  };

  const formatDay = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleString("default", { weekday: "long" });
  };

  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.round(
            (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  return (
    <div className={styles.summaryCard}>
      <div className={styles.header}>You have searched for</div>

      <div className={styles.body}>
        <div className={styles.datesRow}>
          {/* Check In Box */}
          <div className={styles.dateBox}>
            <div className={styles.boxLabel}>Check-in</div>
            <div className={styles.boxContent}>
              <span className={styles.dayNum}>{formatDate(checkIn)}</span>
              <span className={styles.monthName}>{formatMonth(checkIn)}</span>
              <span className={styles.dayName}>{formatDay(checkIn)}</span>
            </div>
          </div>

          {/* Check Out Box */}
          <div className={styles.dateBox}>
            <div className={styles.boxLabel}>Check-out</div>
            <div className={styles.boxContent}>
              <span className={styles.dayNum}>{formatDate(checkOut)}</span>
              <span className={styles.monthName}>{formatMonth(checkOut)}</span>
              <span className={styles.dayName}>{formatDay(checkOut)}</span>
            </div>
          </div>
        </div>

        <div className={styles.detailsList}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Stay Duration:</span>
            <span className={styles.value}>
              {nights} Night{nights > 1 ? "s" : ""}
            </span>
          </div>

          {/* ✅ UPDATED: Shows breakdown instead of generic 'Guests' */}
          <div className={styles.detailRow}>
            <span className={styles.label}>Selection:</span>
            <span className={styles.value}>
              {rooms} Room{rooms > 1 ? "s" : ""}, <br />
              {guests} Adult{guests > 1 ? "s" : ""}, {children} Child
              {children !== 1 ? "ren" : ""}
            </span>
          </div>
        </div>

        <button className={styles.changeBtn} onClick={onEdit}>
          CHANGE SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchSummary;
