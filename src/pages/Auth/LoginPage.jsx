import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom"; // ✅ Import useLocation
import { Mail, Lock, ArrowRight } from "lucide-react";
import { authService } from "../../services/auth.service";
import { setCredentials } from "../../redux/slices/authSlice";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import styles from "./AuthStyles.module.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Access state passed from RateTable

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Attempt Login
      const res = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      if (res.success) {
        // 2. Save User to Redux
        dispatch(
          setCredentials({
            user: res.data,
            token: res.token,
          })
        );

        // 3. ✅ Smart Redirect Logic
        // If we have a return destination (e.g., Checkout), go there with data.
        // Otherwise, go to default page (Rooms).
        if (location.state?.from) {
          navigate(location.state.from, {
            state: location.state.bookingData,
          });
        } else {
          navigate("/rooms");
        }
      }
    } catch (err) {
      console.error("Login Error:", err);
      const msg = err.response?.data?.message || "Invalid credentials.";
      if (msg.toLowerCase().includes("verify")) {
        setError("Please verify your email address before logging in.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your details to access your account."
    >
      {error && <div className={styles.errorMsg}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
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

        {/* Password */}
        <div>
          <div className={styles.inputGroup}>
            <Lock size={20} className={styles.icon} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          {/* Forgot Password Link */}
          <div style={{ textAlign: "right", marginTop: "8px" }}>
            <Link
              to="/forgot-password"
              style={{
                fontSize: "0.85rem",
                color: "#666",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Logging In..." : "Sign In"}
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <div className={styles.footer}>
        Don't have an account?
        <Link to="/signup" className={styles.link}>
          Sign Up
        </Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
