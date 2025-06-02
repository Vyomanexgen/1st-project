import React, { useState } from "react";
import styles from "./Audition.module.css";
import Layout from "../components/Layout.jsx";

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

  const handleCardClick = (title) => {
    setSelectedRole(title);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedRole("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application submitted!");
    setShowForm(false);
  };

  return (
    <Layout>
      <section className={styles.auditionSection} id="audition"> 
        <div className={styles.auditionHeader}>
          <p className={styles.logoText}>Audition Categories</p>
        </div>

        <div className={styles.auditionGrid}>
          {auditionRoles.map((role, index) => (
            <div
              key={index}
              className={styles.auditionCard}
              onClick={() => handleCardClick(role.title)}
            >
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
                <fieldset>
                  <legend>Personal Information</legend>
                  <input type="text" placeholder="Full Name" required />
                 <input type="date" placeholder="Date of Birth / Age" required />
                  <input type="text" placeholder="Gender / Pronouns" />
                  <input type="text" placeholder="Nationality / Citizenship" />
                  <input type="text" placeholder="Address (City, State, ZIP, Country)" />
                  <input type="tel" placeholder="Phone Number" required />
                  <input type="email" placeholder="Email Address" required />
                </fieldset>

                <fieldset>
                  <legend>Physical Characteristics</legend>
                  <input type="text" placeholder="Height" required />
                  <input type="text" placeholder="Weight" required />
                  <input type="text" placeholder="Hair Color" required />
                  <input type="text" placeholder="Eye Color" required />
                  <input type="text" placeholder="Ethnicity (Optional)" />
                  <input type="text" placeholder="Distinctive Features (tattoos, scars, etc.)" required />
                </fieldset>

                <fieldset>
                  <legend>Role Information</legend>
                  <input type="text" value={selectedRole} readOnly />
                  <input type="text" placeholder="Availability (dates, conflicts)" />
                </fieldset>

                <fieldset>
                  <legend>Experience & Skills</legend>
                  <label>Upload Resume / Experience:</label>
                  <input type="file" />
                  <input type="text" placeholder="Special Skills (singing, dancing, etc.)" required />
                  <input type="text" placeholder="Languages Spoken" required />
                  <input type="text" placeholder="Social Links (Facebook, Instagram, etc.)" required />
                </fieldset>

                <fieldset>
                  <legend>Headshot & Media</legend>
                  <label>Upload Headshot:</label>
                  <input type="file" />
                  <label>Upload Full Body Photo:  </label>
                  <input type="file" required />
                </fieldset>

                <button type="submit">Submit Application</button>
              </form>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Audition;
