import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  User,
  Plus,
  Minus,
  X,
} from "lucide-react";
import styles from "./BookingSidebar.module.css";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BookingSidebar = ({ onSearch, initialData }) => {
  // --- STATE ---
  const [currentDate, setCurrentDate] = useState(new Date());

  // Dates state
  const [selectedDate, setSelectedDate] = useState(
    initialData?.checkIn ? new Date(initialData.checkIn) : null
  );
  const [checkoutDate, setCheckoutDate] = useState(
    initialData?.checkOut ? new Date(initialData.checkOut) : null
  );

  const [activeDatePopup, setActiveDatePopup] = useState(null);
  const [expandedStay, setExpandedStay] = useState(false);
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  // ... inside BookingSidebar component ...
  const [rooms, setRooms] = useState(() => {
    if (initialData) {
      return [
        {
          id: 1,
          adults: initialData.guests || 1, // ✅ Change fallback to 1
          children: initialData.children || 0,
        },
      ];
    }
    // ✅ CHANGED: adults: 1 (was 2)
    return [{ id: 1, adults: 1, children: 0 }];
  });

  // Calculate Totals
  const totalAdults = rooms.reduce((acc, r) => acc + r.adults, 0);
  const totalChildren = rooms.reduce((acc, r) => acc + r.children, 0);

  // --- CALENDAR LOGIC ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isBeforeToday = (date) => date < today;
  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => {
    let day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const changeMonth = (offset) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    );
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    if (isBeforeToday(clickedDate)) return;

    // Reset checkout if new start date is picked
    setSelectedDate(clickedDate);
    setCheckoutDate(null);
    setExpandedStay(false);

    // Toggle popup
    setActiveDatePopup(
      activeDatePopup === clickedDate.getTime() ? null : clickedDate.getTime()
    );
  };

  const handleStaySelect = (nights) => {
    if (!selectedDate) return;
    const end = new Date(selectedDate);
    end.setDate(selectedDate.getDate() + nights);
    setCheckoutDate(end);
    setActiveDatePopup(null);
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

  const getSummaryText = () => {
    if (!selectedDate || !checkoutDate) return "Select Check-in & Check-out";

    const startStr = selectedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endStr = checkoutDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const nights = Math.round(
      (checkoutDate - selectedDate) / (1000 * 60 * 60 * 24)
    );

    return `${startStr} - ${endStr} (${nights} night${nights > 1 ? "s" : ""})`;
  };

  // --- ⚡️ SEARCH HANDLER (Fixed Validation) ---
  const handleSearchClick = () => {
    console.log("🖱️ Sidebar: Search Clicked");

    // 🛑 VALIDATION: Block if dates are missing
    if (!selectedDate || !checkoutDate) {
      alert("Please select both Check-in and Check-out dates.");
      return;
    }

    const searchPayload = {
      checkIn: selectedDate,
      checkOut: checkoutDate,
      guests: totalAdults, // Mapped to 'adults' in API
      children: totalChildren, // Mapped to 'children' in API
      rooms: rooms.length,
    };

    console.log("📤 Sidebar Sending:", searchPayload);

    if (onSearch) {
      onSearch(searchPayload);
    }
  };

  // --- RENDER HELPERS ---
  const renderStayPopup = (baseDate) => {
    const options = [];
    for (let i = 1; i <= 30; i++) {
      const tempDate = new Date(baseDate);
      tempDate.setDate(baseDate.getDate() + i);
      options.push({
        nights: i,
        label: `${i} night${i > 1 ? "s" : ""} (${tempDate.toLocaleDateString(
          "en-US",
          { month: "short", day: "numeric" }
        )})`,
      });
    }
    return (
      <div className={styles.stayPopup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.stayList}>
          {options.slice(0, 5).map((opt) => (
            <button
              key={opt.nights}
              className={styles.stayOption}
              onClick={() => handleStaySelect(opt.nights)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const totalDays = getDaysInMonth(currentDate);
    const startDay = getFirstDayOfMonth(currentDate);
    for (let i = 0; i < startDay; i++)
      days.push(
        <div
          key={`empty-${i}`}
          className={`${styles.dayCell} ${styles.empty}`}
        ></div>
      );
    for (let day = 1; day <= totalDays; day++) {
      const thisDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isSelected =
        selectedDate && thisDate.getTime() === selectedDate.getTime();
      const isActive = activeDatePopup === thisDate.getTime();

      let cellClass = styles.dayCell;
      if (isBeforeToday(thisDate)) cellClass += ` ${styles.disabled}`;
      else if (isSelected) cellClass += ` ${styles.selected}`;
      else if (checkoutDate && thisDate.getTime() === checkoutDate.getTime())
        cellClass += ` ${styles.selected}`;
      else if (
        selectedDate &&
        checkoutDate &&
        thisDate > selectedDate &&
        thisDate < checkoutDate
      )
        cellClass += ` ${styles.inRange}`;

      days.push(
        <div
          key={day}
          className={cellClass}
          onClick={() => handleDateClick(day)}
        >
          {day}
          {isActive && renderStayPopup(thisDate)}
        </div>
      );
    }
    return days;
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.header}>Search & book</div>
      <div className={styles.calendarWrapper}>
        <div className={styles.monthNav}>
          <button className={styles.navBtn} onClick={() => changeMonth(-1)}>
            <ChevronLeft size={20} />
          </button>
          <span>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button className={styles.navBtn} onClick={() => changeMonth(1)}>
            <ChevronRight size={20} />
          </button>
        </div>
        <div className={styles.daysGrid}>
          {daysOfWeek.map((d) => (
            <div key={d} className={styles.dayName}>
              {d}
            </div>
          ))}
          {renderDays()}
        </div>
        <div className={styles.summaryRow}>
          <span>{getSummaryText()}</span>
        </div>
      </div>

      <div className={styles.infoSection}>
        {/* ✅ DISPLAY: 1 Room, 2 Adults, 3 Children */}
        <button
          className={styles.guestInput}
          onClick={() => setShowGuestPopup(true)}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.85rem",
              whiteSpace: "nowrap",
            }}
          >
            <User size={16} />
            {rooms.length} Room{rooms.length > 1 ? "s" : ""}, {totalAdults}{" "}
            Adult{totalAdults > 1 ? "s" : ""}, {totalChildren} Child
            {totalChildren !== 1 ? "ren" : ""}
          </div>
          <ChevronDown size={16} />
        </button>

        {showGuestPopup && (
          <div className={styles.guestPopup}>
            <div className={styles.popupHeaderRow}>
              <span className={styles.popupTitle}>Guests & Rooms</span>
              <X
                size={16}
                style={{ cursor: "pointer" }}
                onClick={() => setShowGuestPopup(false)}
              />
            </div>
            {rooms.map((room, index) => (
              <div key={index} className={styles.roomBlock}>
                <div className={styles.roomHeader}>
                  <span>Room {index + 1}</span>
                  {index > 0 && (
                    <X
                      size={14}
                      onClick={() => removeRoom(index)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </div>
                <div className={styles.counterRow}>
                  <span>Adults</span>
                  <div className={styles.counterControls}>
                    <button
                      className={styles.roundBtn}
                      onClick={() =>
                        updateRoom(index, "adults", room.adults - 1)
                      }
                    >
                      <Minus size={12} />
                    </button>
                    <span>{room.adults}</span>
                    <button
                      className={styles.roundBtn}
                      onClick={() =>
                        updateRoom(index, "adults", room.adults + 1)
                      }
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <div className={styles.counterRow}>
                  <span>Children</span>
                  <div className={styles.counterControls}>
                    <button
                      className={styles.roundBtn}
                      onClick={() =>
                        updateRoom(index, "children", room.children - 1)
                      }
                    >
                      <Minus size={12} />
                    </button>
                    <span>{room.children}</span>
                    <button
                      className={styles.roundBtn}
                      onClick={() =>
                        updateRoom(index, "children", room.children + 1)
                      }
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button className={styles.addRoomBtn} onClick={addRoom}>
              <Plus size={16} /> Add room
            </button>
            <button
              className={styles.saveBtn}
              onClick={() => setShowGuestPopup(false)}
            >
              DONE
            </button>
          </div>
        )}
        <button className={styles.searchBtn} onClick={handleSearchClick}>
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default BookingSidebar;
