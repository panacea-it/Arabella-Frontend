import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Home } from "lucide-react";
import styles from "./PaymentSuccess.module.css";

const PaymentSuccess = () => {
  // We can pass state from the booking modal if needed
  // const location = useLocation();

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={styles.iconWrapper}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <CheckCircle size={64} color="#10b981" />
        </motion.div>

        <h1 className={styles.title}>Booking Confirmed!</h1>
        <p className={styles.subtitle}>
          Thank you for choosing Arabella. We have sent a confirmation email
          with all the details.
        </p>

        <div className={styles.infoBox}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Status</span>
            <span className={styles.value}>Paid & Confirmed</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Check-in</span>
            <span className={styles.value}>12:00 PM</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/" className={styles.homeBtn}>
            <Home size={18} />
            Back to Home
          </Link>
          <Link to="/contact" className={styles.contactBtn}>
            Need Help?
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
