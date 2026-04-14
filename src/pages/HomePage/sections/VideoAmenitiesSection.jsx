import React from "react";
import styles from "../HomePage.module.css";

// Data with your local file paths
const amenityItems = [
  {
    id: 1,
    title: "Comfortable Rooms",
    desc: "Spacious, clean, and well-maintained rooms designed for a relaxing stay, whether you’re travelling for business or leisure.",
    imageSrc: "/images/ARB. 2.jpg",
  },
  {
    id: 2,
    title: "Convenient Location",
    desc: "Located close to major highways, shopping areas, and local attractions—making it easy to explore the city or commute with ease.",
    imageSrc: "/images/ARB. 7.jpg",
  },
  {
    id: 3,
    title: "Free Parking",
    desc: "Enjoy hassle-free travel with secure, free parking available right outside your room—perfect for road trips and long stays.",
    imageSrc: "/images/img2.jpg",
  },
  {
    id: 4,
    title: "High-Speed Wi-Fi",
    desc: "Stay connected with fast and reliable Wi-Fi throughout the property—ideal for work, streaming, and staying in touch.",
    imageSrc: "/images/ARB. 10.jpg",
  },
  {
    id: 5,
    title: "Friendly Service",
    desc: "Our friendly staff are always ready to help, ensuring a comfortable, smooth, and memorable stay for every guest.",
    imageSrc: "/images/ARB. 8.jpg",
  },
];

// Single Item Component (Pill with description)
const AmenityPill = ({ item }) => {
  return (
    <div className={styles.amenityWrapper}>
      {/* The Vertical Pill Shape */}
      <div className={styles.mediaShape}>
        <img
          className={styles.amenityVideo}
          src={item.imageSrc}
          alt={item.title}
          loading="lazy"
        />
      </div>

      {/* Text Content Below */}
      <div className={styles.textContent}>
        <h3 className={styles.itemTitle}>{item.title}</h3>
        <p className={styles.itemDesc}>{item.desc}</p>
      </div>
    </div>
  );
};

// Main Section Component
const VideoAmenitiesSection = () => {
  return (
    <section className={styles.videoAmenitiesSection}>
      {/* Header Section */}
      <div className={styles.amenitiesHeader}>
        <h2 className={styles.amenitiesTitle}>
          Make room <span className={styles.playText}>for play</span>
        </h2>
        <p className={styles.amenitiesSub}>
          Getting the best of both worlds is simply better, isn't it?
        </p>
        <a className={styles.exploreBtn} href="https://book-directonline.com/properties/southtweedmidirect" target="_blank" rel="noopener noreferrer">Explore More</a>
      </div>

      {/* The Row of Pills */}
      <div className={styles.amenitiesRow}>
        {amenityItems.map((item) => (
          <AmenityPill key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default VideoAmenitiesSection;
