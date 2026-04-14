import React, { useState } from "react";
import { Calendar, Users } from "lucide-react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch, selectedDates }) => {
  const [dates, setDates] = useState(
    selectedDates || { checkIn: "", checkOut: "" }
  );
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    if (onSearch) onSearch({ ...dates, guests });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        {/* Date Section */}
        <div className={styles.section}>
          <div className={styles.iconWrapper}>
            <Calendar size={20} className={styles.icon} />
          </div>
          <div className={styles.inputGroup}>
            <label>Select dates</label>
            <div className={styles.dateInputs}>
              <input
                type="date"
                className={styles.dateField}
                value={dates.checkIn}
                onChange={(e) =>
                  setDates({ ...dates, checkIn: e.target.value })
                }
              />
              <span className={styles.arrow}>→</span>
              <input
                type="date"
                className={styles.dateField}
                value={dates.checkOut}
                onChange={(e) =>
                  setDates({ ...dates, checkOut: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* Guests Section */}
        <div className={styles.section}>
          <div className={styles.iconWrapper}>
            <Users size={20} className={styles.icon} />
          </div>
          <div className={styles.inputGroup}>
            <label>Rooms and guests</label>
            <select
              className={styles.selectField}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  1 Room, {num} Guests
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className={styles.btnWrapper}>
          <a
            className={styles.searchBtn}
            href="https://book-directonline.com/properties/southtweedmidirect"
            target="_blank"
            rel="noopener noreferrer"
          >
            Search
          </a>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
