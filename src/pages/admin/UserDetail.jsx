
import React, { useState, useEffect, useRef } from 'react';
import styles from './UserDetail.module.css';

const UserDetail = ({ user, onBack }) => {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const modalRef = useRef();
  const DEFAULT_IMAGE = '/images/contact-icon-illustration-isolat.png';

  const handleImageClick = (src) => {
    if (src) {
      setEnlargedImage(src);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeEnlargedImage();
    };
    if (enlargedImage) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [enlargedImage]);

  return (
    <>
      {/* Back button OUTSIDE the card */}
      <div className={styles.backButtonContainer}>
        <button className={styles.backButton} onClick={onBack}>← Back to Dashboard</button>
      </div>

      
        <div className={styles.userDetail}>
          <img
            src={user.head_shot_photo || DEFAULT_IMAGE}
            alt={user.full_name}
            className={styles.mainImage}
            onClick={() => handleImageClick(user.head_shot_photo || DEFAULT_IMAGE)}
          />

          <h2>{user.full_name}</h2>
          <div className={styles.detailSections}>
            <div className={styles.detailBlock}>
          <h3>Personal Information</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone_number}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Date of Birth:</strong> {user.date_of_birth}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
            </div>

            <div className={styles.detailBlock}>
          <h3>Physical Attributes</h3>
          <p><strong>Height / Weight:</strong> {user.height} cm / {user.weight} kg</p>
          <p><strong>Hair / Eye Color:</strong> {user.hair_colour} / {user.eye_colour}</p>
          <p><strong>Ethnicity:</strong> {user.ethnicity}</p>
            </div>

            <div className={styles.detailBlock}>
          <h3>Skills & Social</h3>
          <p><strong>Special Skills:</strong> {user.special_skills}</p>
          <p><strong>Languages:</strong> {user.language_spoken}</p>
          <p><strong>Availability:</strong> {user.availability}</p>
          <p><strong>Social Links:</strong> {user.social_links}</p>
            </div>
          </div>

          <div className={styles.photoGroup}>
            <div className={styles.photoItem}>
          <p className={styles.photoLabel}>Head Shot</p>
          <img
            src={user.head_shot_photo || DEFAULT_IMAGE}
            alt="Head Shot"
            className={styles.smallImage}
            onClick={() => handleImageClick(user.head_shot_photo || DEFAULT_IMAGE)}
          />
            </div>

            <div className={styles.photoItem}>
          <p className={styles.photoLabel}>Full Body</p>
          <img
            src={user.full_body_photo || DEFAULT_IMAGE}
            alt="Full Body"
            className={styles.smallImage}
            onClick={() => handleImageClick(user.full_body_photo || DEFAULT_IMAGE)}
          />
            </div>
          </div>
        </div>
      {enlargedImage && (
        <div className={styles.modalOverlay} onClick={closeEnlargedImage}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} ref={modalRef}>
            <button className={styles.modalClose} onClick={closeEnlargedImage}>×</button>
             <h3 style={{ color: "#ffd966", marginBottom: "10px" }}>
        {enlargedImage.includes('head') ? 'Head Shot' : 'Full Body'}
      </h3>
            <img src={enlargedImage} alt="Zoomed" className={styles.modalImage} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetail;
