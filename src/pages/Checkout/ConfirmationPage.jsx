import React, { useEffect } from "react";
import { Check, Printer, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./ConfirmationPage.module.css";

const ConfirmationPage = () => {
  // Mock Data (In a real app, retrieve these from state/context/URL)
  const bookingId = "ARA-88294X";
  const userEmail = "john.doe@example.com";

  // Simulate sending the confirmation email on page load
  useEffect(() => {
    console.log(`Sending confirmation email to ${userEmail}...`);
    // API call logic would go here
  }, [userEmail]);

  // Handler to open the Invoice Page in a new tab
  const handlePrintReceipt = () => {
    // Opens the invoice route we created earlier
    window.open(`/invoice/${bookingId}`, "_blank");
  };

  const handleResendEmail = () => {
    // Simulate a resend action
    alert(`Confirmation email has been resent to ${userEmail}!`);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        {/* Animated Success Icon */}
        <div className={styles.successIcon}>
          <Check size={48} strokeWidth={3} />
        </div>

        {/* Title */}
        <h1 className={styles.title}>Booking Confirmed!</h1>
        <p className={styles.subTitle}>
          Thank you for choosing Arabella. A confirmation email has been sent to{" "}
          <strong>{userEmail}</strong>.
        </p>

        {/* Booking Summary Grid */}
        <div className={styles.detailsGrid}>
          <div className={styles.detailGroup}>
            <span className={styles.label}>Booking Reference</span>
            <span className={styles.value}>{bookingId}</span>
          </div>
          <div className={styles.detailGroup}>
            <span className={styles.label}>Dates</span>
            <span className={styles.value}>Dec 27 - Dec 29, 2025</span>
          </div>
          <div className={styles.detailGroup}>
            <span className={styles.label}>Room</span>
            <span className={styles.value}>1x Twin Room</span>
          </div>
          <div className={styles.detailGroup}>
            <span className={styles.label}>Guests</span>
            <span className={styles.value}>2 Adults</span>
          </div>
          <div className={styles.detailGroup}>
            <span className={styles.label}>Total Paid</span>
            <span className={styles.totalPrice}>252 EUR</span>
          </div>
          <div className={styles.detailGroup}>
            <span className={styles.label}>Payment Method</span>
            <span className={styles.value}>Visa •••• 4242</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          {/* Print Button */}
          <button className={styles.secondaryBtn} onClick={handlePrintReceipt}>
            <Printer size={16} style={{ marginRight: 8 }} />
            Print Receipt
          </button>

          {/* Resend Email Button */}
          <button className={styles.secondaryBtn} onClick={handleResendEmail}>
            <Mail size={16} style={{ marginRight: 8 }} />
            Resend Email
          </button>

          {/* Home Button */}
          <Link to="/" className={styles.primaryBtn}>
            Back to Home <ArrowRight size={16} style={{ marginLeft: 8 }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
