import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Plane, Car, Train } from "lucide-react";
import styles from "./HowToReach.module.css";

const HowToReach = () => {
  // Changed default state to null so all are closed initially
  const [activeTab, setActiveTab] = useState(null);

  const accordionData = [
    {
      id: "Plane",
      label: "By Plane",
      icon: <Plane size={20} />,
      content: (
        <div className={styles.infoContent}>
          <div className={styles.infoBlock}>
            <h4>From Gold Coast Airport (OOL)</h4>
            <span className={styles.subTag}>BY CAR/TAXI (10 MINUTES)</span>
            <p>
              A short 10-minute drive south via the Pacific Mwy/M1. Taxis and
              Ride-shares are available at the terminal.
            </p>
          </div>
          <div className={styles.infoBlock}>
            <h4>From Brisbane Airport (BNE)</h4>
            <span className={styles.subTag}>BY CAR (1 HOUR 15 MINUTES)</span>
            <p>
              Take the M1 Southbound towards Gold Coast. Keep right to stay on
              M1 entering New South Wales.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "Car",
      label: "By Car",
      icon: <Car size={20} />,
      content: (
        <div className={styles.infoContent}>
          <div className={styles.infoBlock}>
            <h4>From North (Gold Coast/Brisbane)</h4>
            <p>
              Follow Pacific Mwy/M1 south. Take the exit toward Tweed Heads
              South from M1.
            </p>
          </div>
          <div className={styles.infoBlock}>
            <h4>Parking</h4>
            <p>
              Free private parking is available on site for all guests (no
              reservation needed).
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "Train",
      label: "By Bus / Train",
      icon: <Train size={20} />,
      content: (
        <div className={styles.infoContent}>
          <div className={styles.infoBlock}>
            <h4>Varsity Lakes Train Station</h4>
            <p>
              Connects to Brisbane. From here, take the 760 bus towards Tweed
              Heads.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className={styles.reachSection}>
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How to reach us
        </motion.h2>

        <div className={styles.contentGrid}>
          {/* Left: Accordion */}
          <div className={styles.accordionWrapper}>
            {accordionData.map((item) => (
              <div key={item.id} className={styles.accordionItem}>
                <button
                  className={`${styles.accordionBtn} ${
                    activeTab === item.id ? styles.activeBtn : ""
                  }`}
                  onClick={() =>
                    setActiveTab(activeTab === item.id ? null : item.id)
                  }
                >
                  <span className={styles.btnLabel}>
                    {item.icon} {item.label}
                  </span>
                  {activeTab === item.id ? <X size={18} /> : <Plus size={18} />}
                </button>

                <AnimatePresence>
                  {activeTab === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={styles.accordionContentWrapper}
                    >
                      <div className={styles.innerContent}>{item.content}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right: Image */}
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src="/images/arabella.jpg"
              alt="Transport Location"
              className={styles.locationImg}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowToReach;
