import React from "react";
import HowToReach from "./HowToReach";
import CareFeedback from "./CareFeedback";
import { motion } from "framer-motion";
import styles from "./ContactUs.module.css";

const ContactUs = () => {
  return (
    <div className={styles.pageWrapper}>
      {/* --- HERO SECTION (Updated to match Gallery style) --- */}
      <motion.div
        className={styles.heroSection}
        style={{ backgroundImage: 'url("/images/ARB. 7.jpg")' }}
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
            CONTACT US
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            We are here to assist you with every aspect of your stay.
          </motion.p>
        </div>
      </motion.div>

      {/* 2. How To Reach Us Section */}
      <HowToReach />

      {/* 3. Feedback Form Section */}
      <CareFeedback />

      {/* 4. Map Section */}
      <section className={styles.mapSection}>
        <motion.div
          className={styles.mapContainer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <iframe
            title="Arabella Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.353342371783!2d153.53952707621437!3d-28.196525975905225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b90ffb5d4e5b6d9%3A0x8e826f634f195b0!2sArabella%20Motor%20Inn!5e0!3m2!1sen!2sau!4v1703058000000!5m2!1sen!2sau"
            width="100%"
            height="500"
            style={{ border: 0, filter: "grayscale(20%)" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactUs;
