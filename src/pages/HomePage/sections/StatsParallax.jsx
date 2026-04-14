import React from "react";
import styles from "../HomePage.module.css";

const StatsParallax = () => {
  return (
    <div
      className={styles.parallaxSection}
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/images/ARB. 7.jpg")',
      }}
    >
      <div className={styles.parallaxContent}>
        <h2>Why Choose Arabella?</h2>
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.number}>15+</span>
            <span className={styles.label}>Years of Service</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>50k+</span>
            <span className={styles.label}>Happy Guests</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>4.9</span>
            <span className={styles.label}>Star Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsParallax;
