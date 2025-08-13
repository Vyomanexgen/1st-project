import React, { useState } from "react";
import styles from "./AdminResetPassword.module.css";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: "veeraraghavan067@gmail.com",
      password: oldPassword,
    });

    setLoadingSubmit(false);

    if (error) {
      toast.error("Old password incorrect");
    } else {
      toast.success("Password verified");
      setTimeout(() => {
        navigate("/admin-update-password");
      }, 2000);
    }
  };

 
  const handleForgotOldPassword = async () => {
    setLoadingReset(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      "veeraraghavan067@gmail.com",
      {
      // redirectTo: "http://localhost:3000/admin-update-password",
    // redirectTo: "https://avrcreations.vercel.app/admin-update-password",
     redirectTo: "https://directoravr.com/admin-update-password"

      }
    );

    setLoadingReset(false);

    if (error) {
      toast.error("Failed to send reset email: " + error.message);
    } else {
      toast.success("Reset email sent to veeraraghavan067@gmail.com");
    }
  };

  return (
    <div className={styles.resetContainer}>
      <ToastContainer />
      <h2>Verify Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter Old Password:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loadingSubmit}>
          {loadingSubmit ? "Sending..." : "Submit"}
        </button>
      </form>

     
      <p
        className={`${styles.forgotLink} ${
          loadingReset ? styles.disabledLink : ""
        }`}
        onClick={!loadingReset ? handleForgotOldPassword : undefined}
      >
        {loadingReset ? "Sending reset link..." : "Forgot Old Password?"}
      </p>
    </div>
  );
};

export default AdminResetPassword;
