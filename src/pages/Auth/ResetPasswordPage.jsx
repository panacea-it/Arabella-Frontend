import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock, ArrowRight } from "lucide-react";
import { authService } from "../../services/auth.service";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import styles from "./AuthStyles.module.css";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword(token, password);
      alert("Password reset successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <div className={styles.errorMsg}>Invalid or missing token.</div>;
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password below."
    >
      {error && <div className={styles.errorMsg}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <Lock size={20} className={styles.icon} />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <Lock size={20} className={styles.icon} />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
