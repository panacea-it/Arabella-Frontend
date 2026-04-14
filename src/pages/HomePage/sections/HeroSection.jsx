import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HeroSection.module.css';

const slides = [
  {
    id: 1,
    image: '/images/ARB. 7.jpg',
    text: 'WELCOME TO ARABELLA MOTOR INN'
  },
  {
    id: 2,
    image: '/images/img2.jpg',
    text: 'YOUR PERFECT GETAWAY DESTINATION'
  },
  {
    id: 3,
    image: '/images/ARB. 5.jpg',
    text: 'COMFORTABLE ROOMS & PREMIUM AMENITIES'
  },
  {
    id: 4,
    image: '/images/ARB. 3.jpg',
    text: 'EXPERIENCE PEACE AND TRANQUILITY'
  },
  {
    id: 5,
    image: '/images/img1.jpg',
    text: 'FRIENDLY SERVICE & WARM HOSPITALITY'
  },
  {
    id: 6,
    image: '/images/Arb. 1.jpg',
    text: 'BOOK YOUR STAY WITH US TODAY'
  }
];

const FloatingText = ({ text }) => {
  const words = text.split(' ');
  let charGlobalCounter = 0;

  return (
    <h1 className={styles.animatedText}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className={styles.wordWrapper}>
          {word.split('').map((char, charIndex) => {
            const entryDelay = charGlobalCounter * 0.08; // Slower sequential staggered delay
            // Exit delay: either نفس الـ delay أو reverse? Usually same flow is better for "keep on it"
            const exitDelay = charGlobalCounter * 0.02;
            charGlobalCounter++;
            return (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                className={styles.char}
                initial={{
                  opacity: 0,
                  x: Math.random() * 40 - 20,
                  y: -100, // Drop from top
                  rotate: Math.random() * 20 - 10
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0
                }}
                exit={{
                  opacity: 0,
                  x: Math.random() * 40 - 20, // Scattered exit to match entry
                  y: -100, // Move back up to top
                  rotate: Math.random() * 20 - 10, // Scattered exit to match entry
                  transition: { duration: 0.4, delay: exitDelay }
                }}
                transition={{
                  duration: 0.6,
                  delay: entryDelay,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {/* Add a space character helper after each word except the last */}
          {wordIndex < words.length - 1 && (
            <span className={styles.char}>&nbsp;</span>
          )}
        </span>
      ))}
    </h1>
  );
};

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000); // 6 seconds per slide for a slower, premium feel

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.heroWrapper}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentIndex].id}
          className={styles.slideContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Background Image with Ken Burns Effect */}
          <motion.div
            className={styles.backgroundImage}
            style={{ backgroundImage: `url("${slides[currentIndex].image}")` }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{
              duration: 7,
              ease: "linear"
            }}
          />

          <div className={styles.blackOverlay} />

          <div className={styles.content}>
            <FloatingText text={slides[currentIndex].text} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className={styles.pagination}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;