import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, openModal } from "../../redux/slices/modalSlice";
import { X, Check, User, Wifi, Wind } from "lucide-react";
import styles from "./RoomDetailsModal.module.css";

const RoomDetailsModal = () => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.modal.modalData);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!room) return null;

  const handleBookNow = () => {
    // ✅ Auth Check
    if (!isAuthenticated) {
      dispatch(openModal({ type: "authModal", modalData: { mode: "login" } }));
    } else {
      dispatch(openModal({ type: "bookingModal", modalData: room }));
    }
  };

  return (
    <div className={styles.modalContainer}>
      <button
        className={styles.closeBtn}
        onClick={() => dispatch(closeModal())}
      >
        <X size={24} />
      </button>

      {/* Hero Image */}
      <div className={styles.imageGallery}>
        <img
          src={room.images?.[0] || "https://via.placeholder.com/600x400"}
          alt={room.name}
          className={styles.mainImage}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{room.name}</h2>
          <span className={styles.price}>
            AUD {room.pricePerNight} <small>/ night</small>
          </span>
        </div>

        <div className={styles.metaRow}>
          <div className={styles.tag}>
            <User size={16} /> Sleeps {room.maxGuests}
          </div>
          <div className={styles.tag}>
            <Wind size={16} /> AC/Heating
          </div>
          <div className={styles.tag}>
            <Wifi size={16} /> Free Wifi
          </div>
        </div>

        <p className={styles.description}>{room.description}</p>

        <div className={styles.amenitiesSection}>
          <h3>Room Amenities</h3>
          <div className={styles.amenitiesGrid}>
            {room.amenities?.map((item, index) => (
              <div key={index} className={styles.amenityItem}>
                <Check size={16} className={styles.checkIcon} />
                <span>{item}</span>
              </div>
            ))}
            {!room.amenities?.length && <p>Standard amenities included.</p>}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.bookBtn} onClick={handleBookNow}>
          Book This Room
        </button>
      </div>
    </div>
  );
};

export default RoomDetailsModal;
