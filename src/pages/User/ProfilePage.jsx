import React, { useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
import { User, Mail, Phone, MapPin, Loader, Shield } from "lucide-react";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const [user] = useState({
    name: "Guest User",
    email: "guest@example.com",
    phone: "",
    address: "",
  });
  const loading = false;
  // ...existing code...

  // Removed profile fetching and token logic for guest mode

  if (loading)
    return (
      <div className={styles.center}>
        <Loader className={styles.spin} />
      </div>
    );
  if (!user) return <div className={styles.center}>User not found.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.avatarCircle}>
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h1 className={styles.name}>{user.name}</h1>
          <span className={styles.roleBadge}>Guest Account</span>
        </div>

        {/* Details Section */}
        <div className={styles.detailsGrid}>
          <div className={styles.detailRow}>
            <div className={styles.iconBox}>
              <Mail size={20} />
            </div>
            <div className={styles.info}>
              <label>Email Address</label>
              <p>{user.email}</p>
            </div>
          </div>

          <div className={styles.detailRow}>
            <div className={styles.iconBox}>
              <Phone size={20} />
            </div>
            <div className={styles.info}>
              <label>Phone Number</label>
              <p>{user.phone || "Not provided"}</p>
            </div>
          </div>

          <div className={styles.detailRow}>
            <div className={styles.iconBox}>
              <MapPin size={20} />
            </div>
            <div className={styles.info}>
              <label>Address</label>
              <p>
                {/* Handle address if object or string */}
                {typeof user.address === "object"
                  ? `${user.address.street || ""} ${user.address.city || ""}`
                  : user.address || "Not provided"}
              </p>
            </div>
          </div>

          <div className={styles.detailRow}>
            <div className={styles.iconBox}>
              <User size={20} />
            </div>
            <div className={styles.info}>
              <label>Member Since</label>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Security / Status */}
        <div className={styles.footer}>
          <Shield size={16} color="#27ae60" />
          <span>
            Account Status: <strong>Active</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
