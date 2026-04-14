import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import { authService } from "../../services/auth.service";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import styles from "./AuthStyles.module.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await authService.forgotPassword(email);
      setMessage("Reset link sent! Please check your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your email to receive a reset link."
    >
      {message && (
        <div
          className={styles.successMsg}
          style={{ color: "green", marginBottom: "1rem" }}
        >
          {message}
        </div>
      )}
      {error && <div className={styles.errorMsg}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <Mail size={20} className={styles.icon} />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <div className={styles.footer}>
        Remember your password?{" "}
        <Link to="/login" className={styles.link}>
          Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
