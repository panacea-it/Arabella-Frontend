import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { authService } from "../../services/auth.service";
import styles from "./Auth.module.css"; // Reuse your existing styles

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link.");
        return;
      }

      try {
        await authService.verifyEmail(token);
        setStatus("success");
        setMessage("Email verified successfully! You can now login.");

        // Auto-redirect after 3 seconds
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Verification failed. Link might be expired."
        );
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className={styles.authContainer}>
      <div
        className={styles.authCard}
        style={{ textAlign: "center", padding: "40px" }}
      >
        {status === "verifying" && (
          <>
            <Loader className={styles.spin} size={48} color="#D4AF37" />
            <h2>Verifying...</h2>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle size={48} color="green" />
            <h2>Verified!</h2>
            <p>{message}</p>
            <button
              className={styles.primaryBtn}
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle size={48} color="red" />
            <h2>Verification Failed</h2>
            <p>{message}</p>
            <button
              className={styles.secondaryBtn}
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
