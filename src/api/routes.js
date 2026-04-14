export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  ROOMS: {
    SEARCH: "/rooms/search", // GET: Search with params
    GET_BY_ID: (id) => `/rooms/${id}`, // GET: Single Room
  },
  BOOKING: {
    INITIATE: "/bookings/initiate", // POST: Get Price & Tax
    CONFIRM: "/bookings/confirm", // POST: Payment Success
    GET_INVOICE: (id) => `/bookings/${id}/invoice`, // GET: Invoice
  },
};
