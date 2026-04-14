import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";
import styles from "./GuestFAQ.module.css";

const faqData = [
  {
    category: "General",
    questions: [
      {
        q: "What are the check-in and check-out times?",
        a: "Check-in is from 2:00 PM onwards. Check-out is by 10:00 AM. Early check-ins and late check-outs are subject to availability and may incur an additional fee.",
      },
      {
        q: "Is parking available at the hotel?",
        a: "Yes, we offer complimentary private parking on-site for all our guests. No reservation is required.",
      },
      {
        q: "Do you have Wi-Fi?",
        a: "Yes, high-speed Wi-Fi is available free of charge throughout the property, including in all guest rooms and public areas.",
      },
    ],
  },
  {
    category: "Rooms & Amenities",
    questions: [
      {
        q: "Are the rooms air-conditioned?",
        a: "Absolutely. All rooms equipped with airconditioning to ensure your comfort regardless of the season.",
      },
      {
        q: "Do you have a swimming pool?",
        a: "Yes, we feature a sparkling outdoor saltwater pool, perfect for relaxing after a day of exploring the Gold Coast.",
      },
      {
        q: "Are the rooms non-smoking?",
        a: "Yes, Arabella Motor Inn is a strictly non-smoking property. A cleaning fee applies if smoking is detected inside the rooms. Designated outdoor smoking areas are available.",
      },
    ],
  },
  {
    category: "Dining & Location",
    questions: [
      {
        q: "Do you provide meals at the property?",
        a: "No breakfast is provided.",
      },
      {
        q: "How far is the hotel from the airport?",
        a: "We are conveniently located just a 10-minute drive from Gold Coast Airport (OOL).",
      },
      {
        q: "Are pets allowed?",
        a: "Yes. Pet-friendly rooms are available at Arabella Motor Inn. Please contact us before booking so we can arrange a suitable room.",
      },
    ],
  },
];

const GuestFAQ = () => {
  // Store the active question ID (e.g., "General-0")
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

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
            GUEST FAQ
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Answers to your most common questions.
          </motion.p>
        </div>
      </motion.div>

      {/* --- FAQ CONTENT --- */}
      <div className={styles.contentWrapper}>
        {faqData.map((section, secIndex) => (
          <div key={secIndex} className={styles.sectionBlock}>
            <h2 className={styles.categoryTitle}>{section.category}</h2>

            <div className={styles.accordionGroup}>
              {section.questions.map((item, qIndex) => {
                const uniqueId = `${secIndex}-${qIndex}`;
                const isOpen = activeQuestion === uniqueId;

                return (
                  <div key={uniqueId} className={styles.accordionItem}>
                    <button
                      className={`${styles.accordionBtn} ${
                        isOpen ? styles.activeBtn : ""
                      }`}
                      onClick={() => toggleQuestion(uniqueId)}
                    >
                      <span className={styles.questionText}>{item.q}</span>
                      <span className={styles.iconWrapper}>
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className={styles.answerWrapper}
                        >
                          <p className={styles.answerText}>{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* --- STILL HAVE QUESTIONS? --- */}
        <div className={styles.contactTeaser}>
          <MessageCircle size={32} color="#c5a365" />
          <h3>Still have questions?</h3>
          <p>
            Can’t find the answer you’re looking for? Please contact our
            friendly team.
          </p>
          <a href="/contact" className={styles.contactBtn}>
            CONTACT US
          </a>
        </div>
      </div>
    </div>
  );
};

export default GuestFAQ;
