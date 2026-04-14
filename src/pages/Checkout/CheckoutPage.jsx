// import React from "react";
// import { Trash2, ArrowRight } from "lucide-react";
// import styles from "./CheckoutPage.module.css";
// import { useNavigate } from "react-router-dom";
// const CheckoutPage = () => {
//   const navigate = useNavigate();

//   const handleConfirm = (e) => {
//     e.preventDefault();
//     // In a real app, you would submit form data here first
//     navigate("/confirmation");
//   };
//   return (
//     <div className={styles.pageContainer}>
//       <div className={styles.header}>
//         <h1>Your details and payment</h1>
//         <p>Your reservation with us at Arabella is almost completed!</p>
//       </div>

//       <div className={styles.contentWrapper}>
//         {/* --- LEFT: STICKY BOOKING SUMMARY --- */}
//         <aside className={styles.sidebarColumn}>
//           <div className={styles.summaryCard}>
//             <div className={styles.summaryHeader}>Booking summary</div>
//             <div className={styles.summaryBody}>
//               <div className={styles.roomSnippet}>
//                 <img
//                   src="/images/single-room.jpg"
//                   alt="Room"
//                   className={styles.thumb}
//                 />
//                 <div>
//                   <span className={styles.roomTitle}>
//                     1x: Twin Room (2 Adults)
//                   </span>
//                   <span style={{ fontSize: "0.75rem", color: "#888" }}>
//                     Non Refundable - Pay Now
//                   </span>
//                 </div>
//               </div>

//               <div className={styles.detailRow}>
//                 <span>Check-in:</span>
//                 <strong>Sat, Dec 27 2025</strong>
//               </div>
//               <div className={styles.detailRow}>
//                 <span>Check-out:</span>
//                 <strong>Mon, Dec 29 2025</strong>
//               </div>
//               <div className={styles.detailRow}>
//                 <span>Guests:</span>
//                 <span>2 Adults</span>
//               </div>

//               <hr
//                 style={{
//                   border: "0",
//                   borderTop: "1px dashed #ddd",
//                   margin: "15px 0",
//                 }}
//               />

//               <div className={styles.detailRow}>
//                 <span>Total Room Price:</span>
//                 <span>227 EUR</span>
//               </div>
//               <div className={styles.detailRow}>
//                 <span>City Tax:</span>
//                 <span>+ 25 EUR</span>
//               </div>

//               <div className={styles.totalRow}>
//                 <span>Total Price:</span>
//                 <span>252 EUR</span>
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* --- RIGHT: FORM SECTIONS --- */}
//         <main className={styles.formColumn}>
//           {/* STEP 1: GUEST DETAILS */}
//           <section className={styles.sectionCard}>
//             <h3 className={styles.sectionTitle}>Responsible for booking</h3>
//             <form className={styles.formGrid}>
//               <div className={styles.inputGroup}>
//                 <input
//                   type="text"
//                   placeholder="First name *"
//                   className={styles.inputField}
//                 />
//               </div>
//               <div className={styles.inputGroup}>
//                 <input
//                   type="text"
//                   placeholder="Last name *"
//                   className={styles.inputField}
//                 />
//               </div>
//               <div className={styles.inputGroup}>
//                 <input
//                   type="email"
//                   placeholder="E-mail *"
//                   className={styles.inputField}
//                 />
//               </div>
//               <div className={styles.inputGroup}>
//                 <input
//                   type="email"
//                   placeholder="Confirm email *"
//                   className={styles.inputField}
//                 />
//               </div>
//               <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
//                 <input
//                   type="text"
//                   placeholder="Street address *"
//                   className={styles.inputField}
//                 />
//               </div>
//               <div className={styles.inputGroup}>
//                 <input
//                   type="text"
//                   placeholder="Postal code *"
//                   className={styles.inputField}
//                 />
//               </div>
//               <div className={styles.inputGroup}>
//                 <input
//                   type="text"
//                   placeholder="City *"
//                   className={styles.inputField}
//                 />
//               </div>
//               <div className={styles.inputGroup}>
//                 <input
//                   type="text"
//                   placeholder="Phone number *"
//                   className={styles.inputField}
//                 />
//               </div>
//             </form>
//           </section>

//           {/* STEP 2: PAYMENT INFO */}
//           <section className={styles.sectionCard}>
//             <h3 className={styles.sectionTitle}>Payment information</h3>
//             <p
//               style={{
//                 fontSize: "0.9rem",
//                 color: "#666",
//                 marginBottom: "20px",
//               }}
//             >
//               Please leave your card details as guarantee for the reservation.
//             </p>

//             <form className={styles.formGrid}>
//               <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
//                 <select className={styles.inputField}>
//                   <option>Choose your card type</option>
//                   <option>Visa</option>
//                   <option>MasterCard</option>
//                 </select>
//               </div>
//               <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
//                 <input
//                   type="text"
//                   placeholder="Card number"
//                   className={styles.inputField}
//                 />
//               </div>
//               <div className={styles.inputGroup}>
//                 <input
//                   type="text"
//                   placeholder="Expiration (MM/YY)"
//                   className={styles.inputField}
//                 />
//               </div>
//               <div className={styles.inputGroup}>
//                 <input
//                   type="text"
//                   placeholder="CVV"
//                   className={styles.inputField}
//                 />
//               </div>
//               <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
//                 <input
//                   type="text"
//                   placeholder="Name on card"
//                   className={styles.inputField}
//                 />
//               </div>
//             </form>

//             <div className={styles.checkboxGroup}>
//               <input type="checkbox" id="terms" />
//               <label htmlFor="terms">
//                 Yes, I have read and accepted the terms & conditions and Privacy
//                 policy.
//               </label>
//             </div>
//           </section>

//           {/* ACTION BUTTONS */}
//           <div className={styles.actionButtons}>
//             <button className={styles.cancelBtn}>
//               <Trash2 size={16} /> CANCEL BOOKING
//             </button>
//             <button className={styles.confirmBtn} onClick={handleConfirm}>
//               CONFIRM BOOKING <ArrowRight size={16} style={{ marginLeft: 5 }} />
//             </button>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
