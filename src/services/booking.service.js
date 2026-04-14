import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

export const bookingService = {
  // 1. Calculate Price & Get Razorpay Order ID
  initiateBooking: async (bookingData) => {
    // bookingData = { roomTypeId, ratePlanId, checkIn, checkOut, adults, children, selectedAmenities }
    const response = await apiClient.post(
      API_ROUTES.BOOKING.INITIATE,
      bookingData
    );
    return response.data;
  },

  // 2. Send Payment Proof & Create Booking
  confirmBooking: async (confirmationData) => {
    // confirmationData = { razorpayPaymentId, razorpayOrderId, guestDetails, ... }
    const response = await apiClient.post(
      API_ROUTES.BOOKING.CONFIRM,
      confirmationData
    );
    return response.data;
  },

  // 3. Get Invoice Data
  getInvoice: async (bookingId) => {
    const response = await apiClient.get(
      API_ROUTES.BOOKING.GET_INVOICE(bookingId)
    );
    return response.data;
  },
};
