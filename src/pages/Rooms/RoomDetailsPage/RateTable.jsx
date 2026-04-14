import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ Import Redux
import { Check, X, PlusCircle } from "lucide-react";
import styles from "./RateTable.module.css";

const RateTable = ({ rates, room }) => {
  const navigate = useNavigate();
  // ✅ Check Authentication Status
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [selectedAddons, setSelectedAddons] = useState([]);

  const paidAmenities =
    room.amenities?.filter((a) => typeof a === "object" && a.price > 0) || [];

  const toggleAddon = (amenity) => {
    if (selectedAddons.find((a) => a._id === amenity._id)) {
      setSelectedAddons((prev) => prev.filter((a) => a._id !== amenity._id));
    } else {
      setSelectedAddons((prev) => [...prev, amenity]);
    }
  };

  const handleBook = (ratePlan, finalPrice) => {
    // 1. Prepare Booking Data
    const cleanRoom = {
      _id: room._id,
      name: room.name,
      images: room.images,
      basePrice: room.basePrice,
      description: room.description,
      amenities: room.amenities,
    };

    const checkoutData = {
      room: cleanRoom,
      ratePlan: ratePlan,
      checkIn: room.checkIn ? new Date(room.checkIn) : new Date(),
      checkOut: room.checkOut
        ? new Date(room.checkOut)
        : new Date(new Date().setDate(new Date().getDate() + 1)),
      guests: room.adults || 1,
      children: room.children || 0,
      selectedAmenities: selectedAddons,
      finalPrice: finalPrice,
    };

    // 2. Auth Check & Redirection Logic
    if (isAuthenticated) {
      // ✅ User is logged in -> Go to Checkout
      navigate("/checkout", { state: checkoutData });
    } else {
      // ❌ User NOT logged in -> Go to Login (with return instruction)
      navigate("/login", {
        state: {
          from: "/checkout", // Where to go after login
          bookingData: checkoutData, // The data to carry over
        },
      });
    }
  };

  if (!rates || rates.length === 0) return null;

  return (
    <div className={styles.container}>
      {/* PAID AMENITIES SECTION */}
      {paidAmenities.length > 0 && (
        <div className={styles.addonsSection}>
          <h3 className={styles.addonsTitle}>Enhance your stay</h3>
          <div className={styles.addonsGrid}>
            {paidAmenities.map((addon) => {
              const isSelected = selectedAddons.some(
                (a) => a._id === addon._id
              );
              return (
                <div
                  key={addon._id}
                  className={`${styles.addonCard} ${
                    isSelected ? styles.selectedAddon : ""
                  }`}
                  onClick={() => toggleAddon(addon)}
                >
                  <div className={styles.addonHeader}>
                    <span>{addon.name}</span>
                    {isSelected ? (
                      <Check size={18} color="green" />
                    ) : (
                      <PlusCircle size={18} />
                    )}
                  </div>
                  <div className={styles.addonPrice}>+ ₹{addon.price}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* RATES LIST */}
      <h2 className={styles.sectionTitle}>Available Rates</h2>
      <div className={styles.table}>
        {rates.map((rate) => {
          const addonsTotal = selectedAddons.reduce(
            (sum, item) => sum + (item.price || 0),
            0
          );
          const baseTotal =
            rate.totalPrice ||
            Math.round(
              room.basePrice * rate.priceMultiplier + rate.flatPremium
            );
          const finalDisplayPrice = baseTotal + addonsTotal;

          return (
            <div key={rate._id} className={styles.row}>
              <div className={styles.infoCol}>
                <h4 className={styles.planName}>{rate.name}</h4>
                <div className={styles.policies}>
                  <span className={styles.gray}>
                    <X size={14} /> Room Only
                  </span>
                  {rate.features?.refundable ? (
                    <span className={styles.green}>Free Cancellation</span>
                  ) : (
                    <span className={styles.red}>Non-Refundable</span>
                  )}
                </div>
                {rate.discountText && (
                  <div className={styles.discountTag}>{rate.discountText}</div>
                )}
              </div>

              <div className={styles.priceCol}>
                <div className={styles.price}>₹{finalDisplayPrice}</div>
                <div className={styles.subtext}>
                  {rate.totalPrice ? "Total Price" : "per night"}
                  {selectedAddons.length > 0 && " (inc. add-ons)"}
                </div>
              </div>

              <div className={styles.actionCol}>
                <button
                  className={styles.bookBtn}
                  onClick={() => handleBook(rate, finalDisplayPrice)}
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RateTable;
