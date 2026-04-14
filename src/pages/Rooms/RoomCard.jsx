import React, { useState } from "react";
import {
  Bed,
  User,
  Maximize,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sofa, // Icon for furniture
} from "lucide-react";
import styles from "./RoomCard.module.css";
import { Link } from "react-router-dom";

const RoomCard = ({ room, isSearched, searchData }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Handle Images
  const images =
    room.images && room.images.length > 0
      ? room.images
      : ["https://via.placeholder.com/800x500?text=No+Image"];

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // --- 💰 PRICING LOGIC ---
  let displayPrice = room.basePrice;
  let strikePrice = null;
  let discountLabel = null;
  let priceLabel = "/ night";

  if (isSearched && room.rateOptions && room.rateOptions.length > 0) {
    // 1. SEARCH RESULT (Dynamic Total)
    const bestRate = room.rateOptions[0]; // Assuming first is best/default

    displayPrice = bestRate.totalPrice; // e.g. 4700
    priceLabel = `total for ${searchData.nights} night${searchData.nights > 1 ? "s" : ""
      }`;

    // Check if original price exists and is higher (for strike-through)
    if (
      bestRate.originalPrice &&
      bestRate.originalPrice > bestRate.totalPrice
    ) {
      strikePrice = bestRate.originalPrice;
    } else if (room.basePrice * searchData.nights > bestRate.totalPrice) {
      // Fallback: Calculate strike price manually if API doesn't send it but sends discount
      strikePrice = room.basePrice * searchData.nights;
    }

    if (bestRate.discountText) {
      discountLabel = bestRate.discountText;
    }
  } else {
    // 2. DEFAULT VIEW (Per Night)
    if (room.discountPercentage > 0) {
      const discounted = Math.round(
        room.basePrice * (1 - room.discountPercentage / 100)
      );
      displayPrice = discounted;
      strikePrice = room.basePrice;
      discountLabel = `Save ${room.discountPercentage}%`;
    }
  }

  return (
    <div className={styles.card}>
      {/* LEFT: IMAGE SLIDER */}
      <div className={styles.imageSection}>
        <img
          src={images[currentImgIndex]}
          alt={room.name}
          className={styles.roomImage}
        />
        {images.length > 1 && (
          <>
            <button className={styles.navBtnLeft} onClick={prevImage}>
              <ChevronLeft size={20} />
            </button>
            <button className={styles.navBtnRight} onClick={nextImage}>
              <ChevronRight size={20} />
            </button>
            <div className={styles.dotsContainer}>
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`${styles.dot} ${idx === currentImgIndex ? styles.activeDot : ""
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* RIGHT: CONTENT */}
      <div className={styles.contentSection}>
        <div className={styles.textContainer}>
          <div className={styles.headerRow}>
            <h2 className={styles.title}>{room.name}</h2>

            {/* PRICING BLOCK */}
            <div className={styles.priceBlock}>
              {strikePrice && (
                <div className={styles.offerRow}>
                  <span className={styles.strikePrice}>
                    ₹{strikePrice.toLocaleString()}
                  </span>
                  {discountLabel && (
                    <span className={styles.discountBadge}>
                      {discountLabel}
                    </span>
                  )}
                </div>
              )}
              <div className={styles.mainPriceRow}>
                <span className={styles.currency}>₹</span>
                <span className={styles.finalPrice}>
                  {displayPrice.toLocaleString()}
                </span>
                <span className={styles.priceLabel}>{priceLabel}</span>
              </div>
            </div>
          </div>

          {/* BASIC SPECS */}
          <div className={styles.specsRow}>
            <span title="Bed Type">
              <Bed size={16} /> {room.bedType}
            </span>
            <span title="Room Size">
              <Maximize size={16} /> {room.size} m²
            </span>
            <span title="Max Guests">
              <User size={16} /> Max {room.maxOccupancy}
            </span>
          </div>

          {/* 🛋️ FURNITURE TAGS */}
          {room.furniture && room.furniture.length > 0 && (
            <div className={styles.furnitureRow}>
              {room.furniture.slice(0, 4).map((item, index) => (
                <span key={index} className={styles.furnitureTag}>
                  {item}
                </span>
              ))}
              {room.furniture.length > 4 && (
                <span className={styles.moreTag}>
                  +{room.furniture.length - 4} more
                </span>
              )}
            </div>
          )}

          <p className={styles.desc}>
            {room.description?.substring(0, 110)}...
          </p>

          <div className={styles.btnRow}>
            <a
              href="https://book-directonline.com/properties/southtweedmidirect"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.outlineBtn}
            >
              MORE INFO
            </a>

            {isSearched && (
              <a
                href="https://book-directonline.com/properties/southtweedmidirect"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.chooseBtn}
              >
                CHOOSE <ChevronDown size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
