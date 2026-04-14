import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import styles from "./Gallery.module.css";

// --- Expanded Mock Data (26 Images) ---
const galleryImages = [
  {
    id: 1,
    category: "Rooms",
    src: "/images/arabella-motor-inn.jpg",
    title: "Arabella Motor Inn",
  },
  {
    id: 2,
    category: "Rooms",
    src: "/images/Arb. 1.jpg",
    title: "Swimming Pool",
  },
  {
    id: 3,
    category: "Rooms",
    src: "/images/ARB. 2.jpg",
    title: "Guest Room",
  },
  {
    id: 4,
    category: "Rooms",
    src: "/images/ARB. 3.jpg",
    title: "side View",
  },
  {
    id: 5,
    category: "Rooms",
    src: "/images/img2.jpg",
    title: "Parking View",
  },
  {
    id: 6,
    category: "Rooms",
    src: "/images/ARB. 5.jpg",
    title: "Entering View",
  },
  {
    id: 7,
    category: "Rooms",
    src: "/images/img1.jpg",
    title: "Inside View",
  },
  {
    id: 8,
    category: "Rooms",
    src: "/images/ARB. 7.jpg",
    title: "Drone View",
  },
  {
    id: 9,
    category: "Rooms",
    src: "/images/ARB. 9.jpg",
    title: "Swimming Pool View",
  },
  {
    id: 10,
    category: "Rooms",
    src: "/images/ARB. 15.jpg",
    title: "Beach View",
  },
{
    id: 11,
    category: "Rooms",
    src: "/images/rooms/family/img5.jpeg",
    title: "Bed Rooms View",
  },
  {
    id: 12,
    category: "Rooms",
    src: "/images/rooms/family/img1.jpeg",
    title: "Hall View",
  },
{
    id: 13,
    category: "Rooms",
    src: "/images/rooms/family/img2.jpeg",
    title: "Overall View",
  },
  {
    id:14,
    category: "Rooms",
    src: "/images/rooms/queen/img1.jpeg",
    title: "Sitting View",
  },
  {
    id:15,
    category: "Rooms",
    src: "/images/rooms/queen/img5.jpeg",
    title: "cupboard View",
  },
  {
   id:16,
    category: "Rooms",
    src: "/images/rooms/queen/img8.jpeg",
    title: "Overall  View",
  },
  {
    id:17,
    category:"Rooms",
    src:"/images/rooms/twin/img1.jpeg",
    title:"hall View "
  },
  {
    id:18,
    category:"Rooms",
    src:"/images/rooms/twin/img3.jpeg",
    title:"Bed Rooms View "
  },
{
  id:19,
  category:"Rooms",
  src:"/images/rooms/twin/img2.jpeg",
  title:"side View"
},
  {
    id:20,
    category:"Rooms",
    src:"/images/rooms/twin/img7.jpeg",
    title:"Sitting View"
  },
  {
    id: 21,
    category: "Nearby Beaches",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Marine_Parade_in_Coolangatta%2C_Queensland%2C_2020%2C_01.jpg/1920px-Marine_Parade_in_Coolangatta%2C_Queensland%2C_2020%2C_01.jpg",
    title: "Coolangatta Beach",
  },
  {
    id: 22,
    category: "Nearby Beaches",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Kirra_Surf_Life_Saving_Club_Kirra_Beach_circa_1946.jpg",
    title: "Kirra Beach",
  },
];

const categories = ["All GALLERY PHOTOS"];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null); // For Lightbox

  // Show all images as the button is now static
  const filteredImages = galleryImages;

  return (
    <div className={styles.pageWrapper}>
      {/* --- HERO HEADER --- */}
      <motion.div
        className={styles.heroSection}
        style={{ backgroundImage: 'url("/images/Arb. 1.jpg")' }}
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
            OUR GALLERY
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A visual journey through the elegance of Arabella.
          </motion.p>
        </div>
      </motion.div>

      <div className={styles.container}>
        {/* --- FILTER TABS (Static Label) --- */}
        <div className={styles.filterRow}>
          {categories.map((cat) => (
            <div
              key={cat}
              className={`${styles.filterBtn} ${styles.activeBtn}`}
              style={{ cursor: "default" }}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* --- IMAGE GRID --- */}
        <motion.div layout className={styles.galleryGrid}>
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.id}
                className={styles.imageCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedImage(img)}
              >
                <div className={styles.imgWrapper}>
                  <img src={img.src} alt={img.title} loading="lazy" />
                  <div className={styles.overlay}>
                    <ZoomIn size={32} color="white" />
                    <span>{img.title}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)} // Close on click outside
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // Prevent close on image click
            >
              <button
                className={styles.closeBtn}
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              <img src={selectedImage.src} alt={selectedImage.title} />
              <h3>{selectedImage.title}</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
