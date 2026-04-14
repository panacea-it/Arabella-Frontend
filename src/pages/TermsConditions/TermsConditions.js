import React from "react";
import { motion } from "framer-motion";
import styles from "./TermsConditions.module.css";

const TermsConditions = () => {
  return (
    <div className={styles.pageContainer}>
      {/* --- HERO SECTION --- */}
      <motion.div
        className={styles.heroSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.heroOverlay}>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            TERMS & CONDITIONS
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Please read these terms carefully before booking your stay.
          </motion.p>
        </div>
      </motion.div>

      {/* --- CONTENT SECTION --- */}
      <div className={styles.contentWrapper}>
        <motion.div
          className={styles.documentBody}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className={styles.lastUpdated}>Last Updated: December 2025</p>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>1. Booking & Reservations</h2>
            <p>
              By making a booking at <strong>Arabella Motor Inn</strong>, you
              agree to these Terms and Conditions. All reservations are subject
              to availability and confirmation by the hotel. We reserve the
              right to refuse any booking for any reason.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>2. Check-In & Check-Out</h2>
            <ul className={styles.list}>
              <li>
                <strong>Check-in Time:</strong> From 2:00 PM NSW time onwards.
                Early check-in is subject to availability and may incur a fee.
              </li>
              <li>
                <strong>Check-out Time:</strong> By 10:00 AM NSW time. Late
                check-out may be arranged subject to availability and extra
                charges.
              </li>
              <li>
                Valid photo identification and a credit card for security
                deposit are required upon arrival.
              </li>
            </ul>
          </section>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>3. Payment & Cancellations</h2>
            <p>
              Payment terms vary based on the rate plan selected (e.g., Flexible
              vs. Non-Refundable).
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Flexible Rates:</strong> Cancellations made up to 24
                hours prior to arrival are free of charge. Late cancellations or
                no-shows will be charged the first night's fee.
              </li>
              <li>
                <strong>Non-Refundable Rates:</strong> Full payment is taken at
                the time of booking and is non-refundable in the event of
                cancellation or modification.
              </li>
            </ul>
          </section>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>4. Guest Conduct & Damages</h2>
            <p>
              Guests are expected to conduct themselves in a respectful manner.
              Any damage to hotel property, whether accidental or malicious,
              will be charged to the guest's credit card on file.
            </p>
            <p>
              <strong>No Smoking Policy:</strong> All rooms are strictly
              non-smoking. A cleaning fee of AUD $250 will be charged if
              evidence of smoking is found.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>5. Liability</h2>
            <p>
              To the extent permitted by law, Arabella Motor Inn is not liable
              for any loss, damage, or theft of personal property brought onto
              the premises. We recommend guests ensure their travel insurance
              covers such incidents.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>6. Force Majeure</h2>
            <p>
              The hotel accepts no liability and will not pay any compensation
              where the performance of its obligations is prevented or affected
              directly or indirectly by or as a result of force majeure or any
              circumstances beyond its reasonable control.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>7. Contact & Queries</h2>
            <p>
              For any questions regarding these terms, please contact us at:
            </p>
            <address className={styles.address}>
              <strong>Arabella Motor Inn</strong>
              <br />
              Email:{" "}
              <a href="mailto:arabellamotorinn@gmail.com">arabellamotorinn@gmail.com</a>
              <br />
              Phone: 0755243111
            </address>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsConditions;
