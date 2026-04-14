import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import { User, Wifi, Wind } from "lucide-react";
import styles from "./RoomCard.module.css";

const RoomCard = ({ room, onSelect, isSelected }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSelect = () => {
    // ✅ 1. Auth Check
    if (!isAuthenticated) {
      dispatch(openModal({ type: "authModal", modalData: { mode: "login" } }));
      return;
    }
    // 2. If logged in, proceed
    onSelect(room);
  };

  const handleMoreInfo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(openModal({ type: "roomDetails", modalData: room }));
  };

  return (
    <div className={`${styles.card} ${isSelected ? styles.selectedCard : ""}`}>
      {/* Left: Image */}
      <div className={styles.imageSection}>
        <img
          src={room.images?.[0] || "https://via.placeholder.com/300"}
          alt={room.name}
          className={styles.image}
        />
      </div>

      {/* Middle: Details */}
      <div className={styles.infoSection}>
        <h3 className={styles.title}>{room.name}</h3>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <User size={14} />
            <span>Sleeps {room.maxGuests}</span>
          </div>
          <div className={styles.metaItem}>
            <Wind size={14} /> AC/Heating
          </div>
          <div className={styles.metaItem}>
            <Wifi size={14} /> Wifi
          </div>
        </div>

        <p className={styles.description}>
          {room.description?.substring(0, 120)}...
        </p>

        <button className={styles.moreInfoBtn} onClick={handleMoreInfo}>
          More info
        </button>
      </div>

      {/* Right: Price & Action */}
      <div className={styles.actionSection}>
        <div className={styles.priceGroup}>
          <span className={styles.currency}>AUD</span>
          <span className={styles.price}>{room.pricePerNight}</span>
        </div>

        {isSelected ? (
          <button className={styles.selectedBtn}>Selected</button>
        ) : (
          <button className={styles.selectBtn} onClick={handleSelect}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
