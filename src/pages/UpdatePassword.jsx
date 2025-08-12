import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../config/supabaseClient";
import styles from "./UpdatePassword.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast.error("Invalid or expired session. Try resetting again.");
      }
    };
    checkSession();
  }, []);

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Failed to update password: " + error.message);
    } else {
      toast.success("Password updated successfully!");
      setTimeout(() => {
        navigate("/audition");
      }, 2000);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Set a New Password</h2>

      <div className={styles.inputWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.input}
        />
        <span
          className={styles.eyeIcon}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash /> }
        </span>
      </div>

      <div className={styles.inputWrapper}>
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
        <span
          className={styles.eyeIcon}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>

      <button
        onClick={handleUpdatePassword}
        className={styles.button}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Update Password"}
      </button>

      <ToastContainer />
    </div>
  );
}

export default UpdatePassword;
