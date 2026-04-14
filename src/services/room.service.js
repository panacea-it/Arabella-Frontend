import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

/* ======================================================
   DATE HELPERS (DEFAULT CHECK-IN / CHECK-OUT)
   ====================================================== */
const getToday = () => {
  const d = new Date();
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
};

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

/* ======================================================
   CACHE HELPERS
   ====================================================== */
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const normalizeParams = (params = {}) =>
  JSON.stringify(
    Object.keys(params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {})
  );

const getFromCache = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;

    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_DURATION) {
      sessionStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const saveToCache = (key, data) => {
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (err) {
    console.error("Cache save failed", err);
  }
};

/* ======================================================
   ROOM SERVICE
   ====================================================== */
export const roomService = {
  /* --------------------------------------------------
     SEARCH ROOMS (DEFAULT DATES APPLIED)
     -------------------------------------------------- */
  searchRooms: async (params = {}) => {
    // ✅ Always ensure backend-required dates exist
    const finalParams = {
      checkIn: params.checkIn || getToday(),
      checkOut: params.checkOut || getTomorrow(),
      ...params, // allow override
    };

    const cacheKey = `search_${normalizeParams(finalParams)}`;

    try {
      const response = await apiClient.get(API_ROUTES.ROOMS.SEARCH, {
        params: finalParams,
      });

      if (response.data?.success) {
        saveToCache(cacheKey, response.data.data);
        return {
          success: true,
          data: response.data.data,
        };
      }
    } catch (error) {
      console.error("Room search API failed", error);
    }

    // 🔁 Fallback to cache
    const cached = getFromCache(cacheKey);
    return cached
      ? { success: true, data: cached, isCache: true }
      : { success: false, data: [] };
  },

  /* --------------------------------------------------
     GET CACHED SEARCH (USED BY HOMEPAGE)
     -------------------------------------------------- */
  getCachedSearch: (params = {}) => {
    const finalParams = {
      checkIn: params.checkIn || getToday(),
      checkOut: params.checkOut || getTomorrow(),
      ...params,
    };

    return getFromCache(`search_${normalizeParams(finalParams)}`);
  },

  /* --------------------------------------------------
     ROOM DETAILS
     -------------------------------------------------- */
  getRoomDetails: async (id) => {
    const cacheKey = `room_details_${id}`;

    try {
      const response = await apiClient.get(API_ROUTES.ROOMS.GET_BY_ID(id));

      if (response.data?.success) {
        saveToCache(cacheKey, response.data.data);
        return {
          success: true,
          data: response.data.data,
        };
      }
    } catch (error) {
      console.error("Room details API failed", error);
    }

    const cached = getFromCache(cacheKey);
    return cached
      ? { success: true, data: cached, isCache: true }
      : { success: false };
  },

  getCachedRoom: (id) => getFromCache(`room_details_${id}`),

  /* --------------------------------------------------
     MANUAL CACHE SAVE (OPTIONAL)
     -------------------------------------------------- */
  saveRoomToCache: (id, data) => {
    saveToCache(`room_details_${id}`, data);
  },
};
