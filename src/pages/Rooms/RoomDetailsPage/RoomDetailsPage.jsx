import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Bed,
  Maximize,
  User,
  Loader,
  ChevronLeft,
  ChevronRight,
  Check,
  Sofa,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RateTable from "./RateTable";
import styles from "./RoomDetailsPage.module.css";
import { roomService } from "../../../services/room.service";

const RoomDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const initialSearchState = location.state?.searchParams || null;
  const isSearched = !!initialSearchState;

  // --- ⚡️ INSTANT LOAD ---
  const cachedData = roomService.getCachedRoom(id);

  // Note: Only log this once per meaningful render to reduce noise
  // if (cachedData) console.log(`⚡ DetailsPage: Instant Render for ${id}`);
  // else console.log(`⏳ DetailsPage: Cache Miss for ${id}`);

  const [roomData, setRoomData] = useState(cachedData?.room || null);
  const [rates, setRates] = useState(cachedData?.rates || []);
  const [loading, setLoading] = useState(!cachedData);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const fetchRoomData = async (searchCriteria) => {
    if (!roomData) setLoading(true);

    try {
      let data = null;
      let fetchedRates = [];

      // A. Dynamic Search
      if (searchCriteria && searchCriteria.checkIn) {
        const query = {
          checkIn: new Date(searchCriteria.checkIn).toISOString(),
          checkOut: new Date(searchCriteria.checkOut).toISOString(),
          adults: searchCriteria.guests,
          children: searchCriteria.children || 0,
        };
        const res = await roomService.searchRooms(query);
        if (res.success && res.data) {
          const foundRoom = res.data.find((r) => r._id === id);
          if (foundRoom) {
            data = foundRoom;
            fetchedRates = foundRoom.rateOptions;
          }
        }
      }

      // B. Static Fetch
      if (!data) {
        const res = await roomService.getRoomDetails(id);
        if (res.success) {
          data = res.data.room;
          fetchedRates = res.data.rates || [];
        }
      }

      // C. Update State
      if (data) {
        // ✅ CRITICAL FIX: Save to cache so next re-render finds it instantly!
        roomService.saveRoomToCache(id, { room: data, rates: fetchedRates });

        const images =
          data.images && data.images.length > 0
            ? data.images
            : ["https://via.placeholder.com/1200x600?text=No+Image"];

        const newData = {
          ...data,
          images: images,
          specs: [
            { icon: <Bed size={20} />, label: data.bedType },
            { icon: <Maximize size={20} />, label: `${data.size} m²` },
            { icon: <User size={20} />, label: `Max ${data.maxOccupancy}` },
          ],
          amenities: data.amenities || [],
          furniture: data.furniture || [],
        };

        if (JSON.stringify(newData) !== JSON.stringify(roomData)) {
          setRoomData(newData);
          setRates(fetchedRates);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomData(initialSearchState);
    // eslint-disable-next-line
  }, [id]);

  // --- SLIDER CONTROLS ---
  const nextImage = () => {
    if (!roomData?.images) return;
    setCurrentImgIndex((prev) =>
      prev === roomData.images.length - 1 ? 0 : prev + 1
    );
  };
  const prevImage = () => {
    if (!roomData?.images) return;
    setCurrentImgIndex((prev) =>
      prev === 0 ? roomData.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (!roomData?.images) return;
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, [currentImgIndex, roomData]);

  // --- PRICING LOGIC ---
  const getPricing = () => {
    if (!roomData) return {};
    let displayPrice = roomData.basePrice;
    let strikePrice = null;
    let discountLabel = null;
    let priceLabel = "/ night";

    if (isSearched && rates.length > 0) {
      const bestRate = rates[0];
      displayPrice = bestRate.totalPrice;
      priceLabel = `total for ${initialSearchState.nights} night${
        initialSearchState.nights > 1 ? "s" : ""
      }`;
      if (
        bestRate.originalPrice &&
        bestRate.originalPrice > bestRate.totalPrice
      )
        strikePrice = bestRate.originalPrice;
      else if (
        roomData.basePrice * initialSearchState.nights >
        bestRate.totalPrice
      )
        strikePrice = roomData.basePrice * initialSearchState.nights;
      if (bestRate.discountText) discountLabel = bestRate.discountText;
    } else {
      if (roomData.discountPercentage > 0) {
        displayPrice = Math.round(
          roomData.basePrice * (1 - roomData.discountPercentage / 100)
        );
        strikePrice = roomData.basePrice;
        discountLabel = `Save ${roomData.discountPercentage}%`;
      }
    }
    return { displayPrice, strikePrice, discountLabel, priceLabel };
  };

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Loader className="spin" size={40} />
      </div>
    );
  if (!roomData)
    return <div className={styles.errorContainer}>Room not found</div>;

  const { displayPrice, strikePrice, discountLabel, priceLabel } = getPricing();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.sliderSection}>
        <div className={styles.sliderWrapper}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImgIndex}
              src={roomData.images[currentImgIndex]}
              alt="Hero"
              className={styles.heroImage}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </AnimatePresence>
          <div className={styles.sliderOverlay}></div>
          {roomData.images.length > 1 && (
            <>
              <button
                className={`${styles.navBtn} ${styles.prevBtn}`}
                onClick={prevImage}
              >
                <ChevronLeft size={32} />
              </button>
              <button
                className={`${styles.navBtn} ${styles.nextBtn}`}
                onClick={nextImage}
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}
          <div className={styles.dotsContainer}>
            {roomData.images.map((_, idx) => (
              <span
                key={idx}
                className={`${styles.dot} ${
                  idx === currentImgIndex ? styles.activeDot : ""
                }`}
                onClick={() => setCurrentImgIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>{roomData.name}</h1>
            <div className={styles.specsRow}>
              {roomData.specs?.map((spec, i) => (
                <div key={i} className={styles.specBadge}>
                  {spec.icon}
                  <span>{spec.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.priceBar}>
          <div className={styles.priceBarContent}>
            {discountLabel && (
              <div className={styles.dealBadge}>
                <Sparkles size={16} /> {discountLabel}
              </div>
            )}
            <div className={styles.priceValues}>
              {strikePrice && (
                <span className={styles.strikePrice}>
                  ₹{strikePrice.toLocaleString()}
                </span>
              )}
              <div className={styles.finalPriceGroup}>
                <span className={styles.currency}>₹</span>
                <span className={styles.finalPrice}>
                  {displayPrice?.toLocaleString()}
                </span>
                <span className={styles.priceLabel}>{priceLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.infoGrid}>
          <div className={styles.infoCol}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.description}>{roomData.description}</p>
          </div>
          <div className={styles.infoCol}>
            {roomData.furniture?.length > 0 && (
              <div className={styles.subSection}>
                <h3 className={styles.subTitle}>Furniture</h3>
                <div className={styles.furnitureGrid}>
                  {roomData.furniture.map((item, i) => (
                    <div key={i} className={styles.furnitureItem}>
                      <Sofa size={16} className={styles.furnitureIcon} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className={styles.subSection}>
              <h3 className={styles.subTitle}>Amenities</h3>
              <div className={styles.amenitiesGrid}>
                {roomData.amenities?.map((item, i) => (
                  <div key={i} className={styles.amenityItem}>
                    <div className={styles.checkIcon}>
                      <Check size={14} />
                    </div>
                    <span>{typeof item === "string" ? item : item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.ratesSection}>
          <h2 className={styles.sectionTitle}>Available Rates</h2>
          <div className={styles.rateTableWrapper}>
            <RateTable rates={rates} room={roomData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
