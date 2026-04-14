import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./RenderModal.module.css";
import MainModal from "../MainModal/MainModal";

// ✅ Import ALL your modals here
import BookingModal from "../BookingModal/BookingModal";
// import AuthModal from "../AuthModal/AuthModal";
import RoomDetailsModal from "../RoomDetailsModal/RoomDetailsModal"; // <--- Make sure this is imported

function RenderModal() {
  // 1. Get the active modal type and data from Redux
  const activeModal = useSelector((state) => state.modal.type);
  // const modalData = useSelector((state) => state.modal.modalData);

  // 2. Map the "type" string to the actual Component
  const allModals = {
    bookingModal: <BookingModal />,
    // authModal: <AuthModal initialMode={modalData?.mode || "login"} />,
    roomDetails: <RoomDetailsModal />, // <--- ✅ REGISTER IT HERE
  };

  return (
    <MainModal>
      <AnimatePresence mode="wait">
        {activeModal && allModals[activeModal] && (
          <motion.div
            key={activeModal}
            className={styles.RenderModal}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Render the specific modal component */}
            {allModals[activeModal]}
          </motion.div>
        )}
      </AnimatePresence>
    </MainModal>
  );
}

export default RenderModal;
