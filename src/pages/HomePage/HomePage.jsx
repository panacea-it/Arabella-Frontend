import React from "react";
import styles from "./HomePage.module.css";

// Import sections
import HeroSection from "./sections/HeroSection";
import VideoAmenitiesSection from "./sections/VideoAmenitiesSection";
import RoomShowcase from "./sections/RoomShowcase"; // The video pills
import OwnJourneySection from "./sections/OwnJourneySection"; // ✅ NEW SECTION
import StatsParallax from "./sections/StatsParallax";
import Testimonials from "./sections/Testimonials";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bgGlowLeft} aria-hidden="true" />
      <div className={styles.bgGlowRight} aria-hidden="true" />
      <div className={styles.sectionReveal}>
        <HeroSection />
      </div>

      {/* Video Pills */}
      <div className={styles.sectionReveal}>
        <VideoAmenitiesSection />
      </div>

      {/* Room Slider */}
      <div className={styles.sectionReveal}>
        <RoomShowcase />
      </div>

      {/* ✅ NEW: Own Your Journey (Purple Section) */}
      <div className={styles.sectionReveal}>
        <OwnJourneySection />
      </div>

      <div className={styles.sectionReveal}>
        <StatsParallax />
      </div>
      <div className={styles.sectionReveal}>
        <Testimonials />
      </div>
    </div>
  );
};

export default HomePage;
