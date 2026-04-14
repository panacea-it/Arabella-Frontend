import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AuthLayout.module.css";

// Premium Hotel Images for the slideshow
const slides = [
  // 1. Resort/Beach View
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",

  // ✅ 2. NEW IMAGE: Grand Luxury Lobby/Interior
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",

  // 3. Luxury Pool Evening
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
];

const AuthLayout = ({ children, title, subtitle }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      {/* --- LEFT SIDE: IMAGE SHOWCASE --- */}
      <div className={styles.imageSide}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide} // Key changes trigger animation
            src={slides[currentSlide]}
            alt="Arabella Ambiance"
            className={styles.bgImage}
            // Slow zoom effect
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>

        <div className={styles.overlay}>
          <motion.div
            className={styles.quoteBox}
            // Subtle slide-up animation for text
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2>Experience Luxury</h2>
            <p>Where every stay tells a story of elegance and comfort.</p>
          </motion.div>
        </div>
      </div>

      {/* --- RIGHT SIDE: FORM CONTENT --- */}
      <div className={styles.formSide}>
        <motion.div
          className={styles.formWrapper}
          // Smooth entrance for the form side
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className={styles.header}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
