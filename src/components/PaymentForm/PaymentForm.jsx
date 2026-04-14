import React, { useState } from "react";
import styles from "./PaymentForm.module.css";
import { CreditCard, Lock } from "lucide-react";

const PaymentForm = ({ room, dates, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // SIMULATE PAYMENT PROCESSING
    console.log("💳 Processing Demo Payment...");

    setTimeout(() => {
      console.log("✅ Demo Payment Successful!");
      // Generate a fake transaction ID
      const fakeTransactionId =
        "txn_demo_" + Math.random().toString(36).substr(2, 9);
      onSuccess(fakeTransactionId);
      setLoading(false);
    }, 2000); // 2 second delay to look real
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.cardInputContainer}>
        <label>Card Number</label>
        <div className={styles.inputWrapper}>
          <CreditCard size={18} className={styles.icon} />
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            className={styles.input}
            maxLength="19"
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.col}>
          <label>Expiry Date</label>
          <input
            type="text"
            placeholder="MM / YY"
            className={styles.input}
            maxLength="5"
            required
          />
        </div>
        <div className={styles.col}>
          <label>CVC</label>
          <div className={styles.inputWrapper}>
            <Lock size={18} className={styles.icon} />
            <input
              type="text"
              placeholder="123"
              className={styles.input}
              maxLength="3"
              required
            />
          </div>
        </div>
      </div>

      <div className={styles.demoNote}>
        ℹ️ <strong>Demo Mode:</strong> You can enter any numbers to test.
      </div>

      <button disabled={loading} className={styles.payBtn}>
        {loading ? "Processing Payment..." : `Pay Now`}
      </button>
    </form>
  );
};

export default PaymentForm;
