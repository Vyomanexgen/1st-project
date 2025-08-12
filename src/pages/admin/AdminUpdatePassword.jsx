import React, { useState } from "react";
import styles from "./AdminUpdatePassword.module.css";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please enter both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

   
    const { error: authError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (authError) {
      toast.error("Failed to update auth password: " + authError.message);
      setLoading(false);
      return;
    }

  
    const {
      data: { user },
      error: sessionError,
    } = await supabase.auth.getUser();

    if (sessionError || !user?.email) {
      toast.error("Could not get current user.");
      setLoading(false);
      return;
    }

    const email = user.email;

   
    const { error: dbError } = await supabase
      .from("admin_credentials")
      .update({ password: newPassword })
      .eq("email", email);

    if (dbError) {
      toast.error("Failed to update admin table: " + dbError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success("Password updated in both systems!");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      navigate("/admin");
    }, 2000);
  };

  return (
    <div className={styles.resetContainer}>
      <ToastContainer />
      <h2>Set New Password</h2>
      <form onSubmit={handleUpdate}>
        <label>New Password:</label>
        <div className={styles.passwordWrapper}>
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <label>Confirm Password:</label>
        <div className={styles.passwordWrapper}>
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default AdminUpdatePassword;
