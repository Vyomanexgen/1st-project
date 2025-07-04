

// File: src/pages/Audition.jsx
import React, { useState } from "react";
import styles from "./Audition.module.css";
import Layout from "../components/Layout.jsx";
import supabase from "../config/supabaseClient.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auditionRoles = [
  { title: "Story Writing", image: "/images/script-writing.jpg" },
  { title: "Screenplay Writing", image: "/images/Screen Play writing.jpeg" },
  { title: "Dialogue Writing", image: "/images/Dialogue Writing.jpeg" },
  { title: "Direction", image: "/images/direction.webp" },
  { title: "Cinematography", image: "/images/Cinematography.jpg" },
  { title: "Editing", image: "/images/Editing.webp" },
  { title: "Art Direction", image: "/images/Art Direction.jpeg" },
  { title: "Costume Design", image: "/images/Costume Design.webp" },
  { title: "Makeup", image: "/images/Makeup.webp" },
  { title: "Hairstyling", image: "/images/Hairstyling.jpg" },
  { title: "Choreography", image: "/images/Choreography.jpg" },
  { title: "Stunt Coordination", image: "/images/Stunt Coordination.jpg" },
  { title: "Acting", image: "/images/Acting.jpg" },
  { title: "Music Direction", image: "/images/Music Direction.jpg" },
  { title: "Background Score", image: "/images/Background Score.jpeg" },
  { title: "Lyrics Writing", image: "/images/Lyrics Writing.jpg" },
  { title: "Singing (Playback)", image: "/images/Singing (Playback).jpg" },
  { title: "Sound Recording", image: "/images/Sound Recording.webp" },
  { title: "Dubbing", image: "/images/Dubbing.jpg" },
  { title: "Sound Mixing", image: "/images/Sound Mixing.jpeg" },
  { title: "Set Design", image: "/images/Set Design.jpeg" },
  { title: "Lighting", image: "/images/Lighting.jpg" },
  { title: "Production Management", image: "/images/Production Management.jpeg" },
  { title: "Publicity & Promotion", image: "/images/Publicity & Promotion images for movie.jpeg" },
];

const Audition = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // ✅ Thank You modal

  const handleCardClick = (title) => {
    setSelectedRole(title);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedRole("");
    setFormData({});
    setFiles({});
    setIsSubmitted(false); // Reset modal
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const uploadToStorage = async (file, prefix) => {
    if (!file) return null;
    const filePath = `${prefix}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("images").upload(filePath, file);
    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }
    const { publicUrl } = supabase.storage.from("images").getPublicUrl(filePath).data;
    return publicUrl;
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const resumeUrl = await uploadToStorage(files.resume, "resumes");
//     const headshotUrl = await uploadToStorage(files.head_shot_photo, "headshots");
//     const fullBodyUrl = await uploadToStorage(files.full_body_photo, "fullbodies");
//     const rolePrefixes = {
//   "Story Writing": "sw",
//   "Screenplay Writing": "spw",
//   "Dialogue Writing": "dw",
//   "Direction": "di",
//   "Cinematography": "cm",
//   "Editing": "ed",
//   "Art Direction": "ad",
//   "Costume Design": "cd",
//   "Makeup": "mu",
//   "Hairstyling": "hs",
//   "Choreography": "ch",
//   "Stunt Coordination": "sc",
//   "Acting": "ac",
//   "Music Direction": "md",
//   "Background Score": "bs",
//   "Lyrics Writing": "ly",
//   "Singing (Playback)": "sg",
//   "Sound Recording": "sr",
//   "Dubbing": "db",
//   "Sound Mixing": "sm",
//   "Set Design": "sd",
//   "Lighting": "lt",
//   "Production Management": "pm",
//   "Publicity & Promotion": "pp",
// };

// const prefix = rolePrefixes[selectedRole] || "xx";

// // Count existing entries for that role
// const { data: existingEntries, error: fetchError } = await supabase
//   .from("Audition Form")
//   .select("id")
//   .eq("Categories", selectedRole);

// if (fetchError) {
//   toast.error("Failed to generate unique ID");
//   setIsSubmitting(false);
//   return;
// }

// const count = (existingEntries?.length || 0) + 1;
// const padded = String(count).padStart(3, "0");
// const uniqueID = `${prefix}${padded}`;


//     const { error } = await supabase.from("Audition Form").insert([
//       {
//         full_name: formData.full_name,
//         date_of_birth: new Date(formData.date_of_birth).toISOString().split("T")[0],
//         gender: formData.gender,
//         nationality: formData.nationality,
//         address: formData.address,
//         phone_number: formData.phone,
//         email: formData.email,
//         height: formData.height,
//         weight: formData.weight,
//         hair_colour: formData.hair_color,
//         eye_colour: formData.eye_color,
//         ethnicity: formData.ethnicity,
//         distinctive_features: formData.distinctive_features,
//         Categories: selectedRole,
//         availability: formData.availability,
//         special_skills: formData.special_skills,
//         language_spoken: formData.languages_spoken,
//         social_links: formData.social_links,
//         resume: resumeUrl,
//         head_shot_photo: headshotUrl,
//         full_body_photo: fullBodyUrl,
//         unique_id: uniqueID,
//       },
//     ]);

//     setIsSubmitting(false);

//     if (error) {
//       toast.error("❌ Submission failed: " + error.message);
//     } else {
//       setIsSubmitted(true);
//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Upload files
  const resumeUrl = await uploadToStorage(files.resume, "resumes");
  const headshotUrl = await uploadToStorage(files.head_shot_photo, "headshots");
  const fullBodyUrl = await uploadToStorage(files.full_body_photo, "fullbodies");

  // Define prefixes for each role
  const rolePrefixes = {
    "Story Writing": "sw",
    "Screenplay Writing": "spw",
    "Dialogue Writing": "dw",
    "Direction": "di",
    "Cinematography": "cm",
    "Editing": "ed",
    "Art Direction": "ad",
    "Costume Design": "cd",
    "Makeup": "mu",
    "Hairstyling": "hs",
    "Choreography": "ch",
    "Stunt Coordination": "sc",
    "Acting": "ac",
    "Music Direction": "md",
    "Background Score": "bs",
    "Lyrics Writing": "ly",
    "Singing (Playback)": "sg",
    "Sound Recording": "sr",
    "Dubbing": "db",
    "Sound Mixing": "sm",
    "Set Design": "sd",
    "Lighting": "lt",
    "Production Management": "pm",
    "Publicity & Promotion": "pp",
  };

  const prefix = rolePrefixes[selectedRole] || "xx";

  // Count existing entries in Supabase for the selected role
  const { data: existingEntries, error: fetchError } = await supabase
    .from("Audition Form")
    .select("id")
    .eq("Categories", selectedRole);

  if (fetchError) {
    toast.error("❌ Failed to generate unique ID");
    setIsSubmitting(false);
    return;
  }

  const count = (existingEntries?.length || 0) + 1;
  const padded = String(count).padStart(3, "0");
  const uniqueID = `${prefix}${padded}`;

  // Insert form submission with the generated unique ID
  const { error } = await supabase.from("Audition Form").insert([
    {
      full_name: formData.full_name,
      date_of_birth: new Date(formData.date_of_birth).toISOString().split("T")[0],
      gender: formData.gender,
      nationality: formData.nationality,
      address: formData.address,
      phone_number: formData.phone,
      email: formData.email,
      height: formData.height,
      weight: formData.weight,
      hair_colour: formData.hair_color,
      eye_colour: formData.eye_color,
      ethnicity: formData.ethnicity,
      distinctive_features: formData.distinctive_features,
      Categories: selectedRole,
      availability: formData.availability,
      special_skills: formData.special_skills,
      language_spoken: formData.languages_spoken,
      social_links: formData.social_links,
      resume: resumeUrl,
      head_shot_photo: headshotUrl,
      full_body_photo: fullBodyUrl,
      unique_id: uniqueID, // ✅ Added unique ID here
    },
  ]);

  setIsSubmitting(false);

  if (error) {
    toast.error("❌ Submission failed: " + error.message);
  } else {
    setIsSubmitted(true); // ✅ Triggers thank you modal or success state
  }
};

  return (
    <Layout>
      <section className={styles.auditionSection} id="audition">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        <div className={styles.auditionHeader}>
          <p className={styles.logoText}>Audition Categories</p>
        </div>

        <div className={styles.auditionGrid}>
          {auditionRoles.map((role, index) => (
            <div key={index} className={styles.auditionCard} onClick={() => handleCardClick(role.title)}>
              <div className={styles.auditionImageContainer}>
                <img
                  src={role.image}
                  alt={role.title}
                  className={styles.auditionImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder.jpg";
                  }}
                />
              </div>
              <p className={styles.auditionTitle}>{role.title}</p>
            </div>
          ))}
        </div>

        {showForm && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalForm}>
              <span className={styles.closeButton} onClick={handleClose}>
                &times;
              </span>
              <h2>Application for {selectedRole}</h2>
              <form onSubmit={handleSubmit}>
                {/* Personal Info */}
                <fieldset>
                  <legend>Personal Information</legend>
                  <input name="full_name" type="text" onChange={handleInputChange} placeholder="Full Name" required />
                  <input type="date" name="date_of_birth" onChange={handleInputChange} required />
                  <input name="gender" type="text" onChange={handleInputChange} placeholder="Gender / Pronouns" />
                  <input name="nationality" type="text" onChange={handleInputChange} placeholder="Nationality" />
                  <input name="address" type="text" onChange={handleInputChange} placeholder="Address" />
                  <input name="phone" type="tel" onChange={handleInputChange} placeholder="Phone Number" required />
                  <input name="email" type="email" onChange={handleInputChange} placeholder="Email" required />
                </fieldset>

                {/* Physical */}
                <fieldset>
                  <legend>Physical Characteristics</legend>
                  <input name="height" type="text" onChange={handleInputChange} placeholder="Height" required />
                  <input name="weight" type="text" onChange={handleInputChange} placeholder="Weight" required />
                  <input name="hair_color" type="text" onChange={handleInputChange} placeholder="Hair Color" required />
                  <input name="eye_color" type="text" onChange={handleInputChange} placeholder="Eye Color" required />
                  <input name="ethnicity" type="text" onChange={handleInputChange} placeholder="Ethnicity" />
                  <input name="distinctive_features" type="text" onChange={handleInputChange} placeholder="Distinctive Features" required />
                </fieldset>

                {/* Role Info */}
                <fieldset>
                  <legend>Role Information</legend>
                  <input type="text" name="Categories" value={selectedRole} readOnly />
                  <input name="availability" type="text" onChange={handleInputChange} placeholder="Availability" />
                </fieldset>

                {/* Experience */}
                <fieldset>
                  <legend>Experience & Skills</legend>
                  <label>Upload Resume:</label>
                  <input type="file" name="resume" onChange={handleFileChange} />
                  <input name="special_skills" type="text" onChange={handleInputChange} placeholder="Special Skills" required />
                  <input name="languages_spoken" type="text" onChange={handleInputChange} placeholder="Languages Spoken" required />
                  <input name="social_links" type="text" onChange={handleInputChange} placeholder="Social Links" required />
                </fieldset>

                {/* Media */}
                <fieldset>
                  <legend>Headshot & Media</legend>
                  <label>Upload Headshot:</label>
                  <input type="file" name="head_shot_photo" onChange={handleFileChange} />
                  <label>Upload Full Body Photo:</label>
                  <input type="file" name="full_body_photo" onChange={handleFileChange} required />
                </fieldset>

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 
                  <>
                  <span className={styles.spinner}> </span>
                  Submitting...
                  </>
                    : "Submit Application"}
                </button>
              </form>
            </div>
          </div>
        )}

        {isSubmitted && (
          <div className={styles.thankYouModal}>
            <div className={styles.thankYouContent}>
              <h2>🎉 Thank You!</h2>
              <p>Your application has been successfully submitted.</p>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Audition;
