import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { authService } from "../../services/auth.service";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import styles from "./AuthStyles.module.css";

const SignupPage = () => {
  // State for Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    country: "India",
  });

  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // New state for Success View

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Prepare Payload matching Backend Schema
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        role: "user",
      };

      // 2. Call API
      await authService.register(payload);

      // 3. Show Success Message (instead of immediate redirect)
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER SUCCESS VIEW ---
  if (isSuccess) {
    return (
      <AuthLayout title="Check Your Inbox" subtitle="Verification link sent.">
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <CheckCircle
            size={64}
            color="#166534"
            style={{ marginBottom: "20px" }}
          />
          <h3 style={{ marginBottom: "10px", color: "#166534" }}>
            Account Created!
          </h3>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "30px" }}>
            We have sent a verification link to{" "}
            <strong>{formData.email}</strong>.<br />
            Please check your email and click the link to activate your account.
          </p>

          <Link
            to="/login"
            className={styles.submitBtn}
            style={{ textDecoration: "none" }}
          >
            Proceed to Login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // --- RENDER FORM VIEW ---
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us to book your perfect stay."
    >
      {error && <div className={styles.errorMsg}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Name */}
        <div className={styles.inputGroup}>
          <User size={20} className={styles.icon} />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        {/* Email */}
        <div className={styles.inputGroup}>
          <Mail size={20} className={styles.icon} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        {/* Phone */}
        <div className={styles.inputGroup}>
          <Phone size={20} className={styles.icon} />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        {/* Password */}
        <div className={styles.inputGroup}>
          <Lock size={20} className={styles.icon} />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        {/* Address Grid (Uses the CSS class we added earlier) */}
        <div className={styles.addressGrid}>
          <div className={styles.inputGroup}>
            <MapPin size={20} className={styles.icon} />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <MapPin size={20} className={styles.icon} />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <MapPin size={20} className={styles.icon} />
            <input
              type="text"
              name="postalCode"
              placeholder="Zip Code"
              value={formData.postalCode}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <MapPin size={20} className={styles.icon} />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <div className={styles.footer}>
        Already have an account?
        <Link to="/login" className={styles.link}>
          Log In
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
