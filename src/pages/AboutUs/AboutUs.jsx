import React from "react";
import { motion } from "framer-motion";
import { Wifi, Car, Coffee } from "lucide-react";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <div className={styles.pageContainer}>

      {/* SECTION 1: Our Story (2-Row Layout) */}
      <section className={styles.storySection}>
        {/* Row 1: Entrance Circle + Grand Title */}
        <div className={styles.storyTopRow}>
          <motion.div
            className={styles.entranceCircle}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img src="/images/ARB. 5.jpg" alt="Comfort" />
          </motion.div>
          <motion.h1
            className={styles.mainTitleText}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience <br />True Comfort
          </motion.h1>
        </div>

        {/* Row 2: Our Story Text + Statue */}
        <div className={styles.storyBottomRow}>
          <motion.div
            className={styles.storyTextContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={styles.storyHeaderSmall}>Our Story</h2>
            <p className={styles.storyDescriptionFull}>
              Established as the landmark for travelers in Tweed Heads, Arabella Motor Inn was born from a passion for authentic hospitality. We've transformed every corner to ensure that your stay is not just a room, but a retreat. Nestled in a prime location, we boast the perfect blend of coastal charm and modern convenience.
            </p>
          </motion.div>

          <motion.div
            className={styles.storyStatueWrapper}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img src="/images/buddhasstatus.png" className={styles.statueImgFixed} alt="Peaceful Details" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Hero Section (Coastal Charm) */}
      <section
        className={styles.charmHero}
        style={{ backgroundImage: 'url("/images/ARB. 7.jpg")' }}
      >
        <motion.div
          className={styles.charmText}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Modern Comfort. <br />Coastal Charm Awaits</h2>
        </motion.div>
      </section>

      {/* SECTION 3: Our Amenities */}
      <section className={styles.amenitiesSection}>
        <div className={styles.amenitiesHeader}>
          <h2>Our Amenities</h2>
          <p>The story and spaces interlinked with comfort. Your experience at Arabella counts on our respect and attention you receive. Nice, fresh and amazing atmosphere, just sat on the water on the side of coastal charm.</p>
        </div>

        <div className={styles.amenitiesGrid}>
          {/* Pool */}
          <motion.div
            className={styles.amenityCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.amenityCircle}>
              <img src="/images/Arb. 1.jpg" alt="Pool" />
            </div>
            <div className={styles.amenityLabel}>
              <Wifi size={22} /> Relaxing Poolside
            </div>
          </motion.div>

          {/* Parking */}
          <motion.div
            className={styles.amenityCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.amenityCircle}>
              <img src="/images/img2.jpg" alt="Parking" />
            </div>
            <div className={styles.amenityLabel}>
              <Car size={22} /> Convenient Parking
            </div>
          </motion.div>

          {/* Courtyard */}
          <motion.div
            className={styles.amenityCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className={styles.amenityCircle}>
              <img src="/images/img1.jpg" alt="Courtyard" />
            </div>
            <div className={styles.amenityLabel}>
              <Coffee size={22} /> Tranquil Courtyard
            </div>
          </motion.div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="https://book-directonline.com/properties/southtweedmidirect" target="_blank" rel="noreferrer" className={styles.bookBtn}>
            Book Your Serene Escape
          </a>
        </div>
      </section>

      {/* SECTION 4: Local Adventures (Staff) */}
      <section className={styles.localAdventures}>
        <div
          className={styles.localVisualWrapper}
          style={{ backgroundImage: 'url("/images/ARB. 3.jpg")' }}
        />
        <motion.div
          className={styles.localTextWrapper}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Local Adventures</h2>
          <p>
            Modern comfort in local hospitality. We are located at the heart of Tweed Heads, providing you with the best of both worlds. Explore delightful local cafes, surf spots, and much more. Our team is dedicated to making your coastal escape truly memorable with personalized recommendations and authentic local soul.
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default AboutUs;
