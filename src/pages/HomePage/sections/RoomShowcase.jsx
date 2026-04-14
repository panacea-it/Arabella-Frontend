import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,

  Wifi,
  Car,
  Briefcase,
  Stethoscope,
  Coffee,
  Check,
  MapPin,
} from "lucide-react";
import styles from "./RoomShowcase.module.css";
// import { roomService } from "../../../services/room.service";
import { roomSliderImages } from "./roomSliderImages";
// ...imports above...
// Place RoomCardWithSlider after all imports
function RoomCardWithSlider({ room, amenityList, sliderImages, cardIdx }) {
  const [sliderIndex, setSliderIndex] = React.useState(0);
  const totalImages = sliderImages.length;

  const handlePrev = (e) => {
    e.stopPropagation();
    setSliderIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setSliderIndex((prev) => (prev + 1) % totalImages);
  };

  return (
    <div className={styles.hotelCard}>
      <div className={styles.sliderWrapper}>
        <button className={styles.sliderBtn} onClick={handlePrev} aria-label="Previous image">
          <ChevronLeft size={20} />
        </button>
        <img
          src={sliderImages[sliderIndex]}
          alt={room.name}
          className={styles.cardImage}
          style={{ objectFit: "cover", width: "100%", height: "250px" }}
        />
        <button className={styles.sliderBtn} onClick={handleNext} aria-label="Next image">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className={styles.cardContent}>
        <span className={styles.cardLocation}>
          <MapPin size={12} /> Luxury Suite
        </span>
        <h3 className={styles.cardTitle}>{room.name}</h3>
        <p className={styles.cardDesc}>
          {room.description?.slice(0, 80)}…
          <a
            href="https://book-directonline.com/properties/southtweedmidirect"
            style={{
              color: "#4a148c",
              fontWeight: "bold",
              cursor: "pointer",
              marginLeft: 5,
              textDecoration: "underline"
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </a>
        </p>
        <div className={styles.amenitiesGrid}>
          {amenityList.map((am, idx) => (
            <div key={idx} className={styles.amenityItem}>
              {getAmenityIcon(am)} <span>{am.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.cardFooter}>
          <a
            className={styles.knowMore}
            href="https://book-directonline.com/properties/southtweedmidirect"
            target="_blank"
            rel="noopener noreferrer"
          >
            KNOW MORE
          </a>
          <a
            className={styles.bookBtn}
            href="https://book-directonline.com/properties/southtweedmidirect"
            target="_blank"
            rel="noopener noreferrer"
          >
            BOOK NOW
          </a>
        </div>
      </div>
    </div>
  );
}

// All imports moved to top of file

// ---------- Amenity Icon Helper ----------
const getAmenityIcon = (amenity) => {
  const name =
    typeof amenity === "string"
      ? amenity.toLowerCase()
      : amenity?.name?.toLowerCase() || "";

  if (name.includes("wifi") || name.includes("internet"))
    return <Wifi size={16} />;
  if (name.includes("park") || name.includes("valet")) return <Car size={16} />;
  if (name.includes("business") || name.includes("meeting"))
    return <Briefcase size={16} />;
  if (
    name.includes("doctor") ||
    name.includes("medical") ||
    name.includes("spa")
  )
    return <Stethoscope size={16} />;
  if (name.includes("dining") || name.includes("bar"))
    return <Coffee size={16} />;

  return <Check size={16} />;
};

const RoomShowcase = () => {
  const sliderRef = useRef(null);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);

  // ---------- Hardcoded Rooms per Request ----------
  const [rooms] = useState([
    {
      _id: "queen-room",
      name: "Queen Room",
      description:
        "Standard queen room ,Air conditioned/heating,Microwave,Toaster,BAr Fridge,Tea&Coffee Facilites,Fresh milk,Dairy room service,...",
      images: roomSliderImages.queenRoom,
      amenities: ["Wifi", "Parking", "Swimming Pool", "Non-Smoking",],
    },
    {
      _id: "deluxe-room",
      name: "Deluxe Room",
      description:
        "Our Deluxe Room offers Air conditioned/heating,Microwave,Toaster,BAr Fridge,Tea&Coffee Facilites,Fresh milk,Dairy room service,... ",
      images: roomSliderImages.deluxeRoom,
      amenities: ["Wifi", "Parking", "Swimming Pool", "Non-Smoking",],
    },
    {
      _id: "deluxe-twin",
      name: "Deluxe Twin",
      description:
        "Standard Twin Room, One Queen Bed and One Single Bed,Air conditioned/heating, Microwave, Toaster, Bar fridge, Tea & Coffee Facilities, Fresh Milk, Daily room service, Free Wi-Fi,Plates, Bowls & Cutlery are available, please see reception",
      images: roomSliderImages.deluxeTwin,
      amenities: ["Wifi", "Parking", "Swimming Pool", "Non-Smoking",],
    },
    {
      _id: "family-room",
      name: "Family Room (sleeps 4)",
      description:
        "Standard Family room sleeps 5. Double bed, 1 single, 1x set of bunk beds. Air conditioned/heating, Microwave, Toaster, Bar fridge, Tea & Coffee Facilities, Fresh Milk, Daily room service, Free Wi-Fi,Plates, Bowls & Cutlery are available, please see reception ",
      images: roomSliderImages.familyRoom4,
      amenities: ["Wifi", "Parking", "Swimming Pool", "Non-Smoking",],
    },
    {
      _id: "family-room-2",
      name: "Family Room (sleeps 2)",
      description:
        "Standard Family room sleeps 4. Double bed, 2 single beds. Air conditioned/heating, Microwave, Toaster, Bar fridge, Tea & Coffee Facilities, Fresh Milk, Daily room service, Free Wi-Fi,Plates, Bowls & Cutlery are available, please see reception",
      images: roomSliderImages.familyRoom2,
      amenities: ["Wifi", "Parking", "Swimming Pool", "Non-Smoking",],
    },
  ]);
  const [loading] = useState(false);

  // ---------- Scroll Tracking ----------
  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      const index = Math.min(
        rooms.length - 1,
        Math.max(0, Math.round(progress * (rooms.length - 1)))
      );
      setActiveRoomIndex(index);
    }
  };

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const amount = 400;
    sliderRef.current.scrollLeft += direction === "left" ? -amount : amount;
  };

  const scrollToRoom = (index) => {
    if (sliderRef.current) {
      const { scrollWidth, clientWidth } = sliderRef.current;
      const targetScroll = (index / (rooms.length - 1)) * (scrollWidth - clientWidth);
      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={styles.roomShowcase}>
      <div className={styles.sliderContainer}>
        {/* NAV BUTTONS (Hidden on mobile via CSS) */}
        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={() => scroll("right")}
        >
          <ChevronRight size={24} />
        </button>

        <div
          className={styles.cardStrip}
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {loading
            ? [1, 2, 3].map((n) => (
              <div
                key={n}
                className={styles.hotelCard}
                style={{ opacity: 0.5 }}
              >
                <div style={{ height: 250, background: "#f3f3f3" }} />
                <div className={styles.cardContent}>
                  <div style={{ height: 20, background: "#eee" }} />
                </div>
              </div>
            ))
            : rooms.map((room, idx) => {
              const imageUrl =
                typeof room.images?.[0] === "string"
                  ? room.images[0]
                  : room.images?.[0]?.url;

              if (!imageUrl) return null;

              const amenityList =
                room.amenities
                  ?.map((a) => (typeof a === "string" ? { name: a } : a))
                  .slice(0, 4) || [];

              return (
                <RoomCardWithSlider
                  key={room._id}
                  room={room}
                  amenityList={amenityList}
                  sliderImages={room.images}
                  cardIdx={idx}
                />
              );
            })}
        </div>

        {/* Main Room Dots (Shown on mobile via CSS) */}
        <div className={styles.mainDots}>
          {rooms.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.mainDot} ${activeRoomIndex === idx ? styles.activeMainDot : ""}`}
              onClick={() => scrollToRoom(idx)}
              aria-label={`Go to room ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomShowcase;
