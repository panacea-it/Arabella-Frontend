import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Calendar, User, ShieldCheck, MapPin, Loader } from "lucide-react";
import styles from "./CheckoutPage.module.css";
import { bookingService } from "../../services/booking.service";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Get Logged-In User from Redux
  const { user } = useSelector((state) => state.auth || {});

  const bookingData = location.state || {};

  const [guestDetails, setGuestDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [error, setError] = useState("");

  // --- HELPER: Format Address Object to String ---
  const formatAddress = (addr) => {
    if (!addr) return "";
    if (typeof addr === "string") return addr;
    return Object.values(addr)
      .filter((val) => val && typeof val !== "object")
      .join(", ");
  };

  // 2. Auto-Fill Form when User is found
  useEffect(() => {
    if (user) {
      setGuestDetails((prev) => ({
        ...prev,
        firstName: user.name ? user.name.split(" ")[0] : prev.firstName,
        lastName:
          user.name && user.name.split(" ").length > 1
            ? user.name.split(" ").slice(1).join(" ")
            : prev.lastName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: formatAddress(user.address) || prev.address,
      }));
    }
  }, [user]);

  // Validation
  if (!bookingData.room || !bookingData.ratePlan) {
    return (
      <div className={styles.errorContainer}>
        Invalid Booking Session. Please search again.
      </div>
    );
  }

  // Calculations
  const nights = Math.max(
    1,
    Math.ceil(
      Math.abs(new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) /
        (1000 * 60 * 60 * 24)
    )
  );
  const amenitiesCost =
    bookingData.selectedAmenities?.reduce(
      (sum, item) => sum + (item.price || 0),
      0
    ) || 0;
  const estimatedTotal = (bookingData.finalPrice || 0) + amenitiesCost * nights;

  const handleChange = (e) => {
    setGuestDetails({ ...guestDetails, [e.target.name]: e.target.value });
  };

  // --- 3. FREE LOCATION FINDER (OpenStreetMap) ---
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          if (data && data.display_name) {
            setGuestDetails((prev) => ({
              ...prev,
              address: data.display_name,
            }));
            setError("");
          } else {
            setError("Unable to retrieve address.");
          }
        } catch (err) {
          console.error("Geocoding error:", err);
          setError("Failed to fetch address. Please check connection.");
        } finally {
          setGeoLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Location access denied. Please enable location permissions.");
        setGeoLoading(false);
      }
    );
  };

  // --- 4. HANDLE PAYMENT (Dummy Mode) ---
  const handlePayment = async () => {
    setError("");
    setLoading(true);

    try {
      // Prepare Payload
      const payload = {
        roomTypeId: bookingData.room._id,
        ratePlanId: bookingData.ratePlan._id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        adults: bookingData.guests,
        children: bookingData.children,
        selectedAmenities:
          bookingData.selectedAmenities?.map((a) => a.name) || [],
      };

      // Format Address for Backend
      const addressParts = guestDetails.address
        ? guestDetails.address.split(",")
        : [];
      const structuredAddress = {
        street: addressParts[0] || guestDetails.address || "N/A",
        city: addressParts[1] || "City",
        state: addressParts[2] || "State",
        postalCode: "000000",
        country: "India",
      };

      // Calculate Financials Manually (since we skip 'initiate' in dummy mode)
      const baseRate = bookingData.room.basePrice || 0;
      const roomTotal = baseRate * nights;
      const tax = 0;

      const dummyFinancials = {
        baseRatePerNight: baseRate,
        roomPriceTotal: roomTotal,
        amenitiesCost: amenitiesCost * nights,
        subTotal: estimatedTotal,
        discountAmount: 0,
        cityTax: tax,
        finalTotal: estimatedTotal,
        nights: nights,
      };

      // ⚡ DUMMY PAYMENT SIMULATION ⚡
      setTimeout(async () => {
        try {
          const dummyConfirmPayload = {
            razorpayOrderId: `order_dummy_${Date.now()}`,
            razorpayPaymentId: `pay_dummy_${Date.now()}`, // Triggers dummy bypass in backend
            razorpaySignature: "dummy_signature",
            guestDetails: {
              ...guestDetails,
              address: structuredAddress,
            },
            bookingDetails: payload,
            financials: dummyFinancials,
          };

          // Call Backend
          const res = await bookingService.confirmBooking(dummyConfirmPayload);

          // Redirect to Success with the SAVED booking object
          navigate("/booking-success", {
            state: {
              booking: res.booking, // ✅ Contains the _id needed for Invoice
              room: bookingData.room,
            },
          });
        } catch (confirmErr) {
          console.error("Save Error:", confirmErr.response?.data || confirmErr);
          setError(
            confirmErr.response?.data?.message || "Booking failed during save."
          );
          setLoading(false);
        }
      }, 1500); // 1.5s delay to simulate processing
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {/* --- LEFT: GUEST FORM --- */}
        <div className={styles.formColumn}>
          <h2 className={styles.sectionTitle}>Guest Details</h2>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={guestDetails.firstName}
                onChange={handleChange}
                placeholder="John"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={guestDetails.lastName}
                onChange={handleChange}
                placeholder="Doe"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={guestDetails.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={guestDetails.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>

            <div className={styles.inputGroupFull}>
              <div className={styles.labelRow}>
                <label>Address</label>
                <button
                  className={styles.locationBtn}
                  onClick={handleGetLocation}
                  disabled={geoLoading}
                  title="Auto-fill address"
                >
                  {geoLoading ? (
                    <Loader size={14} className="spin" />
                  ) : (
                    <MapPin size={14} />
                  )}
                  {geoLoading ? " Locating..." : " Use My Location"}
                </button>
              </div>
              <textarea
                name="address"
                value={guestDetails.address}
                onChange={handleChange}
                rows="3"
                placeholder="123 Example St, Hyderabad"
              />
            </div>
          </div>

          <div className={styles.paymentNote}>
            <ShieldCheck size={20} color="#27ae60" />
            <p>Your payment is secure. You will be redirected to Razorpay.</p>
          </div>

          {error && <div className={styles.errorMsg}>{error}</div>}

          <button
            className={styles.payBtn}
            onClick={handlePayment}
            disabled={loading || !guestDetails.firstName || !guestDetails.email}
          >
            {loading ? (
              <Loader className="spin" />
            ) : (
              `PAY ₹${estimatedTotal} & BOOK`
            )}
          </button>
        </div>

        {/* --- RIGHT: SUMMARY --- */}
        <div className={styles.summaryColumn}>
          <div className={styles.summaryCard}>
            <img
              src={bookingData.room.images?.[0]}
              alt=""
              className={styles.summaryImg}
            />
            <div className={styles.summaryContent}>
              <h3>{bookingData.room.name}</h3>
              <p className={styles.rateName}>{bookingData.ratePlan.name}</p>
              <div className={styles.divider}></div>

              <div className={styles.detailRow}>
                <Calendar size={16} />
                <span>
                  {new Date(bookingData.checkIn).toDateString()} -{" "}
                  {new Date(bookingData.checkOut).toDateString()}
                </span>
              </div>
              <div className={styles.detailRow}>
                <User size={16} />
                <span>
                  {bookingData.guests} Adults, {bookingData.children} Children
                </span>
              </div>

              <div className={styles.divider}></div>

              <div className={styles.priceRow}>
                <span>Room Charge ({nights} nights)</span>
                <span>₹{bookingData.finalPrice}</span>
              </div>
              {bookingData.selectedAmenities?.map((item, i) => (
                <div key={i} className={styles.priceRow}>
                  <span>{item.name}</span>
                  <span>+ ₹{item.price * nights}</span>
                </div>
              ))}
              <div className={styles.totalRow}>
                <span>Total Payable</span>
                <span>₹{estimatedTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
