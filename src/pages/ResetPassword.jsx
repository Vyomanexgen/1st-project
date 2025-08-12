import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ResetPassword.module.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
     //  redirectTo: "http://localhost:3000/update-password",
      redirectTo: "https://avrcreations.vercel.app/update-password",
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Something went wrong: " + error.message);
      console.error("Reset error:", error);
    } else {
      
      toast.success("If this email is registered, a reset link has been sent.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 style={{ color: "white" }}>Reset Your Password</h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <button
          onClick={handleResetPassword}
          className={styles.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ResetPassword;
