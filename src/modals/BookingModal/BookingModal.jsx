import React, { useState, forwardRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, User, Mail, Phone, Calendar as CalendarIcon } from "lucide-react";
import DatePicker from "react-datepicker";

// ✅ Import Services & Slices
import { closeModal } from "../../redux/slices/modalSlice";
import { bookingService } from "../../services/booking.service";
import { roomService } from "../../services/room.service"; // To fetch rate plans if needed

import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookingModal.module.css";

/* =========================
   Custom Date Input
========================= */
const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className={styles.inputWrapper} onClick={onClick} ref={ref}>
    <CalendarIcon size={16} className={styles.icon} />
    <input
      type="text"
      readOnly
      value={value || ""}
      placeholder={placeholder}
      className={styles.customDateDisplay}
    />
  </div>
));

/* =========================
   Booking Modal Component
========================= */
const BookingModal = () => {
  const dispatch = useDispatch();

  // Data from Redux (Room object)
  const room = useSelector((state) => state.modal.modalData);
  const user = useSelector((state) => state.auth.user);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Rate Plan State (Required by Backend)
  const [ratePlans, setRatePlans] = useState([]);
  const [selectedRatePlan, setSelectedRatePlan] = useState("");

  const [dates, setDates] = useState({
    checkIn: null,
    checkOut: null,
  });

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    guests: 1,
    children: 0,
  });

  // --- 1. Fetch Rate Plans on Mount (Because Price varies by plan) ---
  useEffect(() => {
    if (room?._id) {
      // In a real app, you might pass ratePlans directly in the modalData.
      // If not, we fetch them here or default to a safe fallback.
      // For this example, we simulate fetching or using room.rateOptions if available.
      if (room.rateOptions && room.rateOptions.length > 0) {
        setRatePlans(room.rateOptions);
        setSelectedRatePlan(room.rateOptions[0]._id);
      } else {
        // Fallback: Fetch specific room details to get rates
        roomService
          .getRoomDetails(room._id)
          .then((res) => {
            if (res.data?.rates) {
              setRatePlans(res.data.rates);
              setSelectedRatePlan(res.data.rates[0]?._id);
            }
          })
          .catch((err) => console.error(err));
      }
    }
  }, [room]);

  /* =========================
     Helpers
  ========================= */
  const calculateSummary = () => {
    if (!dates.checkIn || !dates.checkOut) return { nights: 0 };
    const diff = dates.checkOut.getTime() - dates.checkIn.getTime();
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return { nights: nights > 0 ? nights : 0 };
  };

  const { nights } = calculateSummary();

  /* =========================
     Handlers
  ========================= */

  // --- Step 1: Validate & Move to Payment Review ---
  const handleReview = (e) => {
    e.preventDefault();
    setError("");

    if (
      !dates.checkIn ||
      !dates.checkOut ||
      !formData.phone ||
      !selectedRatePlan
    ) {
      setError("Please fill all fields and select a rate plan.");
      return;
    }
    if (nights <= 0) {
      setError("Check-out must be after check-in.");
      return;
    }
    setStep(2); // Move to Payment Screen
  };

  // --- Step 2: Initiate Payment (Razorpay) ---
  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // 1. INITIATE: Calculate Price & Get Order ID from Backend
      const initData = await bookingService.initiateBooking({
        roomTypeId: room._id,
        ratePlanId: selectedRatePlan,
        checkIn: dates.checkIn.toISOString(),
        checkOut: dates.checkOut.toISOString(),
        adults: formData.guests,
        children: formData.children,
        selectedAmenities: [], // Add amenities logic if needed
      });

      if (!initData.success) throw new Error("Failed to initiate booking");

      // 2. OPEN RAZORPAY POPUP
      const options = {
        key: initData.keyId, // From backend
        amount: initData.amount, // in paise
        currency: initData.currency,
        name: "Arabella Hotel",
        description: `${room.name} - ${nights} Nights`,
        order_id: initData.orderId,
        handler: async (response) => {
          // 3. CONFIRM: Payment Successful -> Save Booking
          await handleBookingConfirmation(response, initData);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#D4AF37" }, // Gold color
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  // --- Step 3: Confirm Booking after Payment ---
  const handleBookingConfirmation = async (paymentResponse, initData) => {
    try {
      setLoading(true);
      await bookingService.confirmBooking({
        razorpayPaymentId: paymentResponse.razorpay_payment_id,
        razorpayOrderId: paymentResponse.razorpay_order_id,
        razorpaySignature: paymentResponse.razorpay_signature,
        guestDetails: {
          firstName: formData.fullName.split(" ")[0],
          lastName: formData.fullName.split(" ")[1] || "",
          email: formData.email,
          phone: formData.phone,
          address: {
            street: "N/A",
            city: "N/A",
            postalCode: "000000",
            country: "India",
          }, // Add address fields to form if needed
        },
        bookingDetails: {
          roomTypeId: room._id,
          ratePlanId: selectedRatePlan,
          checkIn: dates.checkIn,
          checkOut: dates.checkOut,
          nights: nights,
          adults: formData.guests,
          children: formData.children,
        },
        financials: initData.breakdown, // Pass the exact calculated breakdown back
      });

      alert("Booking Confirmed Successfully!");
      dispatch(closeModal());
      // Optional: Navigate to /payment-success
    } catch (err) {
      setError(
        "Payment successful, but booking creation failed. Contact support."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!room) return null;

  /* =========================
     JSX
  ========================= */
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        {/* Header */}
        <div className={styles.header}>
          <h2>{step === 1 ? "Guest Details" : "Confirm & Pay"}</h2>
          <button
            className={styles.closeBtn}
            onClick={() => dispatch(closeModal())}
          >
            <X size={24} />
          </button>
        </div>

        {error && <div className={styles.errorBanner}>{error}</div>}

        {/* =========================
            STEP 1 — DETAILS FORM
        ========================= */}
        {step === 1 && (
          <form onSubmit={handleReview} className={styles.formContent}>
            {/* Dates */}
            <div className={styles.sectionTitle}>Stay Dates</div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Check-in</label>
                <DatePicker
                  selected={dates.checkIn}
                  onChange={(date) =>
                    setDates((prev) => ({
                      checkIn: date,
                      checkOut:
                        prev.checkOut && date > prev.checkOut
                          ? prev.checkOut
                          : null,
                    }))
                  }
                  minDate={new Date()}
                  selectsStart
                  startDate={dates.checkIn}
                  endDate={dates.checkOut}
                  customInput={<CustomDateInput placeholder="Check-in" />}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Check-out</label>
                <DatePicker
                  selected={dates.checkOut}
                  onChange={(date) => setDates({ ...dates, checkOut: date })}
                  minDate={
                    dates.checkIn
                      ? new Date(dates.checkIn.getTime() + 86400000)
                      : new Date()
                  }
                  selectsEnd
                  startDate={dates.checkIn}
                  endDate={dates.checkOut}
                  customInput={<CustomDateInput placeholder="Check-out" />}
                  disabled={!dates.checkIn}
                  required
                />
              </div>
            </div>

            {/* Rate Plan Selector */}
            {ratePlans.length > 0 && (
              <div className={styles.inputGroup}>
                <label>Select Rate Plan</label>
                <select
                  className={styles.selectInput}
                  value={selectedRatePlan}
                  onChange={(e) => setSelectedRatePlan(e.target.value)}
                  required
                >
                  <option value="">-- Select a Plan --</option>
                  {ratePlans.map((plan) => (
                    <option key={plan._id} value={plan._id}>
                      {plan.name}{" "}
                      {plan.priceMultiplier < 1 ? "(Discounted)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Contact Info */}
            <div className={styles.sectionTitle}>Contact Information</div>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <div className={styles.inputWrapper}>
                <User size={16} className={styles.icon} />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Email</label>
                <div className={styles.inputWrapper}>
                  <Mail size={16} className={styles.icon} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Phone</label>
                <div className={styles.inputWrapper}>
                  <Phone size={16} className={styles.icon} />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className={styles.primaryBtn}>
              Proceed to Summary
            </button>
          </form>
        )}

        {/* =========================
            STEP 2 — REVIEW & PAY
        ========================= */}
        {step === 2 && (
          <div className={styles.reviewContainer}>
            <div className={styles.summaryBox}>
              <h3>Booking Summary</h3>
              <div className={styles.summaryRow}>
                <span>Room:</span> <span>{room.name}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Dates:</span>
                <span>
                  {dates.checkIn?.toLocaleDateString()} —{" "}
                  {dates.checkOut?.toLocaleDateString()}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Guests:</span>{" "}
                <span>
                  {formData.guests} Adults, {formData.children} Children
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Rate Plan:</span>
                <span>
                  {ratePlans.find((r) => r._id === selectedRatePlan)?.name ||
                    "Standard"}
                </span>
              </div>

              <hr className={styles.divider} />

              <p className={styles.note}>
                *Final price including taxes will be calculated at payment.
              </p>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.secondaryBtn}
                onClick={() => setStep(1)}
                disabled={loading}
              >
                Back
              </button>
              <button
                className={styles.primaryBtn}
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Now with Razorpay"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
