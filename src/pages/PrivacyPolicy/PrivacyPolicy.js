import React from "react";
import { motion } from "framer-motion";
import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
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
            PRIVACY POLICY
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Your privacy is important to us. Transparent, secure, and
            respectful.
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
            <h2 className={styles.sectionTitle}>1. Introduction</h2>
            <p>
              Welcome to <strong>Arabella Motor Inn</strong> ("we," "our," or
              "us"). We are committed to protecting your personal information
              and your right to privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website or stay at our property.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us
              when you make a reservation, express an interest in obtaining
              information about us, or otherwise contact us.
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Personal Data:</strong> Name, email address, phone
                number, and postal address.
              </li>
              <li>
                <strong>Payment Data:</strong> Credit card details and billing
                information (processed securely via our payment gateway).
              </li>
              <li>
                <strong>Stay Preferences:</strong> Room requests and
                arrival/departure times.
              </li>
            </ul>
          </section>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>
              3. How We Use Your Information
            </h2>
            <p>
              We use the information we collect or receive for the following
              purposes:
            </p>
            <ul className={styles.list}>
              <li>To facilitate booking reservations and process payments.</li>
              <li>To communicate with you regarding your stay or inquiries.</li>
              <li>
                To send you marketing communications (if you have opted in).
              </li>
              <li>To improve our website experience and customer service.</li>
            </ul>
          </section>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>4. Sharing Your Information</h2>
            <p>
              We do not sell, rent, or trade your personal information to third
              parties. We may share data with trusted third-party service
              providers who assist us in operating our website, conducting our
              business, or serving our users, so long as those parties agree to
              keep this information confidential.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>
              5. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies and similar tracking technologies to access or
              store information. You can refuse the use of cookies by selecting
              the appropriate settings on your browser, but please note that
              this may affect the full functionality of our website.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>6. Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational
              security measures designed to protect the security of any personal
              information we process. However, please also remember that we
              cannot guarantee that the internet itself is 100% secure.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2 className={styles.sectionTitle}>7. Contact Us</h2>
            <p>
              If you have questions or comments about this policy, you may email
                us at{" "}
                <a href="mailto:arabellamotorinn@gmail.com">
                  arabellamotorinn@gmail.com
              </a>{" "}
              or by post to:
            </p>
            <address className={styles.address}>
              Arabella Motor Inn
              <br />
              9-11 Minjungbal Drive
              <br />
              Tweed Heads South, NSW, 2486
              <br />
              Australia
            </address>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
