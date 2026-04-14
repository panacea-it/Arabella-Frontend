import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  X,
} from "lucide-react";
import styles from "../HomePage.module.css";

const OwnJourneySection = () => {
  // const navigate = useNavigate();

  // --- STATE ---
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Selection State
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [rooms, setRooms] = useState([{ id: 1, adults: 2, children: 0 }]);

  // Popup Toggles
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  // Stay Duration Logic (New)
  const [activeDatePopup, setActiveDatePopup] = useState(null);
  const [expandedStay, setExpandedStay] = useState(false);

  const calendarRef = useRef(null);
  const guestRef = useRef(null);

  // --- CALENDAR LOGIC ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date) => {
    let day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1; // Mon=0
  };

  const changeMonth = (offset) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1)
    );
  };

  // 1. Handle Click on Date (Opens Stay Popup)
  const handleDateClick = (day) => {
    const clickedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (clickedDate < today) return; // Disable past dates

    // Set Check In
    setCheckIn(clickedDate);
    setCheckOut(null); // Reset checkout to force selection
    setExpandedStay(false);

    // Toggle Stay Popup on this date
    if (activeDatePopup === clickedDate.getTime()) {
      setActiveDatePopup(null);
    } else {
      setActiveDatePopup(clickedDate.getTime());
    }
  };

  // 2. Handle Selecting "2 Nights", etc.
  const handleStaySelect = (nights) => {
    if (!checkIn) return;
    const end = new Date(checkIn);
    end.setDate(checkIn.getDate() + nights);

    setCheckOut(end);
    setActiveDatePopup(null); // Close stay popup
    setShowCalendar(false); // Close main calendar
  };

  // --- GUEST LOGIC ---
  const updateRoom = (index, field, value) => {
    const newRooms = [...rooms];
    newRooms[index][field] = Math.max(0, value);
    setRooms(newRooms);
  };
  const addRoom = () =>
    setRooms([...rooms, { id: rooms.length + 1, adults: 1, children: 0 }]);
  const removeRoom = (index) => setRooms(rooms.filter((_, i) => i !== index));

  const totalGuests = rooms.reduce((acc, r) => acc + r.adults + r.children, 0);

  // --- NAVIGATION HANDLER ---
  // const handleSearch = () => {
  //   // Default to today/tomorrow if nothing selected
  //   const startDate = checkIn || new Date();
  //   let endDate = checkOut;

  //   if (!endDate) {
  //     endDate = new Date(startDate);
  //     endDate.setDate(endDate.getDate() + 1);
  //   }

  //   const nights = Math.ceil(
  //     Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)
  //   );

  //   // Data payload
  //   const searchParams = {
  //     checkIn: startDate,
  //     checkOut: endDate,
  //     guests: totalGuests || 1,
  //     rooms: rooms.length,
  //     nights: nights || 1,
  //   };

  //   console.log("Navigating with params:", searchParams); // Debug check

  //   navigate("/rooms", {
  //     state: {
  //       isSearched: true,
  //       searchParams: searchParams,
  //     },
  //   });
  // };

  // --- FORMATTERS ---
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  // --- RENDER HELPERS ---

  // Sub-render: The "1 night, 2 nights" popup
  const renderStayPopup = (baseDate) => {
    const options = [];
    for (let i = 1; i <= 30; i++) {
      const tempDate = new Date(baseDate);
      tempDate.setDate(baseDate.getDate() + i);
      const dateStr = tempDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      options.push({
        nights: i,
        label: `${i} night${i > 1 ? "s" : ""} (${dateStr})`,
      });
    }
    const initialOptions = options.slice(0, 5);
    const moreOptions = options.slice(5);

    return (
      <div className={styles.stayPopup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.stayHeader}>Length of stay</div>
        {initialOptions.map((opt) => (
          <button
            key={opt.nights}
            className={styles.stayOption}
            onClick={() => handleStaySelect(opt.nights)}
          >
            {opt.label}
          </button>
        ))}
        {!expandedStay && (
          <button
            className={styles.moreOptionsBtn}
            onClick={() => setExpandedStay(true)}
          >
            More options <ChevronDown size={14} />
          </button>
        )}
        {expandedStay &&
          moreOptions.map((opt) => (
            <button
              key={opt.nights}
              className={styles.stayOption}
              onClick={() => handleStaySelect(opt.nights)}
            >
              {opt.label}
            </button>
          ))}
      </div>
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = getDaysInMonth(currentMonth);
    const startDay = getFirstDayOfMonth(currentMonth);

    for (let i = 0; i < startDay; i++)
      days.push(<div key={`empty-${i}`} className={styles.calEmpty}></div>);

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );

      const isCheckIn = checkIn && date.getTime() === checkIn.getTime();
      const isCheckOut = checkOut && date.getTime() === checkOut.getTime();
      const isInRange =
        checkIn && checkOut && date > checkIn && date < checkOut;
      const isPast = date < today;
      const isActivePopup = activeDatePopup === date.getTime();

      let className = styles.calDay;
      if (isPast) className += ` ${styles.calDisabled}`;
      else if (isCheckIn || isCheckOut) className += ` ${styles.calSelected}`;
      else if (isInRange) className += ` ${styles.calRange}`;

      days.push(
        <div
          key={day}
          className={className}
          style={{ position: "relative" }} // Needed for stay popup positioning
          onClick={(e) => {
            e.stopPropagation();
            !isPast && handleDateClick(day);
          }}
        >
          {day}
          {/* Render the stay popup if this date is active */}
          {isActivePopup && renderStayPopup(date)}
        </div>
      );
    }
    return days;
  };

  return (
    <section className={styles.journeySection}>
      {/* --- TOP BAR --- */}
      <div className={styles.journeyTopBar}>
        <div className={styles.nextStayTitle}>
          BOOK YOUR STAY <ArrowRight size={32} color="#7e57c2" />
        </div>

        <div className={styles.searchInputs}>
          {/* CHECK IN + Calendar Container */}
          {/* We wrap this in a relative div so the calendar aligns HERE */}
          <div
            className={styles.dateInputWrapper}
            onClick={() => {
              setShowCalendar(!showCalendar);
              setShowGuestPopup(false);
            }}
          >
            <span className={styles.inputLabel}>CHECK IN</span>
            <div className={styles.inputField}>
              {formatDate(checkIn) || "Select Date"}
            </div>

            {/* Calendar Popup placed INSIDE Check In Wrapper */}
            {showCalendar && (
              <div
                className={`${styles.popupContainer} ${styles.calendarPopup}`}
                ref={calendarRef}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                style={{
                  top: "100%", // Directly below
                  left: "0", // Aligned to left edge of Check In
                  marginTop: "10px",
                }}
              >
                <div className={styles.calHeader}>
                  <button
                    className={styles.calNavBtn}
                    onClick={() => changeMonth(-1)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span>
                    {currentMonth.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    className={styles.calNavBtn}
                    onClick={() => changeMonth(1)}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <div className={styles.calGrid}>
                  {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                    <div key={d} className={styles.calDayName}>
                      {d}
                    </div>
                  ))}
                  {renderCalendarDays()}
                </div>
              </div>
            )}
          </div>

          {/* CHECK OUT (Clicking this also opens the calendar via logic if you want, 
              but usually it's cleaner if they start flow at Check In) */}
          <div
            className={styles.inputGroup}
            onClick={() => {
              setShowCalendar(true); // Open the calendar logic above
              setShowGuestPopup(false);
            }}
            style={{ cursor: "pointer" }}
          >
            <span className={styles.inputLabel}>CHECK OUT</span>
            <div className={styles.inputField}>
              {formatDate(checkOut) || "Select Date"}
            </div>
          </div>

          {/* GUESTS */}
          <div
            className={styles.inputGroup}
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => {
              setShowGuestPopup(!showGuestPopup);
              setShowCalendar(false);
            }}
          >
            <span className={styles.inputLabel}>ROOMS & GUESTS</span>
            <div className={styles.inputField}>
              {rooms.length} Room{rooms.length > 1 ? "s" : ""}, {totalGuests}{" "}
              Guest{totalGuests > 1 ? "s" : ""}
            </div>

            {/* GUEST POPUP (Moved inside to anchor correctly) */}
            {showGuestPopup && (
              <div
                className={`${styles.popupContainer} ${styles.guestPopup}`}
                ref={guestRef}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "320px",
                  padding: "15px",
                  top: "100%",
                  right: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>Occupancy</span>
                  <X
                    size={16}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGuestPopup(false);
                    }}
                  />
                </div>

                <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                  {rooms.map((room, index) => (
                    <div
                      key={index}
                      style={{
                        borderBottom: "1px solid #eee",
                        paddingBottom: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "5px",
                        }}
                      >
                        <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>
                          Room {index + 1}
                        </span>
                        {index > 0 && (
                          <span
                            style={{
                              color: "red",
                              fontSize: "0.8rem",
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeRoom(index);
                            }}
                          >
                            Remove
                          </span>
                        )}
                      </div>

                      <div className={styles.guestRow}>
                        <span className={styles.guestLabel}>Adults</span>
                        <div className={styles.guestControls}>
                          <button
                            className={styles.guestBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateRoom(index, "adults", room.adults - 1);
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{room.adults}</span>
                          <button
                            className={styles.guestBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateRoom(index, "adults", room.adults + 1);
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <div className={styles.guestRow}>
                        <span className={styles.guestLabel}>Children</span>
                        <div className={styles.guestControls}>
                          <button
                            className={styles.guestBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateRoom(index, "children", room.children - 1);
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{room.children}</span>
                          <button
                            className={styles.guestBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateRoom(index, "children", room.children + 1);
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  style={{
                    background: "transparent",
                    border: "1px dashed #7e57c2",
                    color: "#7e57c2",
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addRoom();
                  }}
                >
                  <Plus size={16} /> Add Room
                </button>

                <button
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#5e35b1",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowGuestPopup(false);
                  }}
                >
                  DONE
                </button>
              </div>
            )}
          </div>

          <a
            className={styles.searchBtn}
            href="https://book-directonline.com/properties/southtweedmidirect"
            target="_blank"
            rel="noopener noreferrer"
          >
            BOOK NOW
          </a>
        </div>
      </div>

      <div className={styles.journeyContent}>
        {/* ... Images and text content remain same ... */}
        <div className={styles.collageWrapper}>
          <img
            src="/images/arabella.jpg"
            alt="Dining"
            className={styles.largeImg}
          />
          <img
            src="/images/ARB. 3.jpg"
            alt="View"
            className={styles.smallImg}
          />
        </div>

        <div className={styles.textContent}>
          <h2 className={styles.journeyHeadline}>
            OWN YOUR <span>JOURNEY IN STYLE</span>
          </h2>
          <p className={styles.journeyDesc}>
            For those always on the move, journeys matter as much as
            destinations. Viva Vivanta! Vibrant spaces where excitement comes
            alive.
          </p>
          <a
            href="https://book-directonline.com/properties/southtweedmidirect"
            className={styles.readMore}
            target="_blank"
            rel="noopener noreferrer"
          >
            READ MORE <ChevronDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default OwnJourneySection;
