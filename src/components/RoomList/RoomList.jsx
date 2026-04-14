import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, User, Maximize } from "lucide-react";
import apiClient from "../../api/apiClient"; // Ensure this path is correct based on your folder structure
import styles from "./RoomList.module.css";

const RoomList = ({ isHomePreview = false }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch rooms from backend
    const fetchRooms = async () => {
      try {
        const res = await apiClient.get("/public/rooms"); // Adjust route if your backend differs
        setRooms(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch rooms", error);
        // Fallback dummy data if backend fails (for demo purposes)
        setRooms([
          {
            _id: 1,
            name: "Queen Room",
            pricePerNight: 120,
            maxGuests: 2,
            images: ["https://via.placeholder.com/400x300"],
          },
          {
            _id: 2,
            name: "Deluxe Room",
            pricePerNight: 180,
            maxGuests: 2,
            images: ["https://via.placeholder.com/400x300"],
          },
          {
            _id: 3,
            name: "Deluxe Twin",
            pricePerNight: 220,
            maxGuests: 4,
            images: ["https://via.placeholder.com/400x300"],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading)
    return <div className={styles.loading}>Loading luxurious rooms...</div>;

  // If used on Home Page, show only 3 rooms
  const displayRooms = isHomePreview ? rooms.slice(0, 4) : rooms;

  return (
    <div className={styles.gridContainer}>
      {displayRooms.map((room) => (
        <motion.div
          key={room._id}
          className={styles.card}
          whileHover={{ y: -10 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.imageWrapper}>
            <img
              src={room.images?.[0] || "https://via.placeholder.com/400x300"}
              alt={room.name}
            />
            <div className={styles.priceTag}>
              AUD {room.pricePerNight} <span>/night</span>
            </div>
          </div>

          <div className={styles.content}>
            <h3>{room.name}</h3>

            <div className={styles.meta}>
              <span>
                <User size={14} /> {room.maxGuests} Guests
              </span>
              <span>
                <Maximize size={14} /> Spacious
              </span>
            </div>

            <a
              href="https://book-directonline.com/properties/southtweedmidirect"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookLink}
            >
              View Details <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RoomList;
