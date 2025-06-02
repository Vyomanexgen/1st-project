import React from "react";
import styles from "./Awards.module.css";

const awards = [
  {
    level: "World Level",
    title: "WORLD BOOK OF RECORDS",
    location: "Madhya Pradesh, Indore",
    image: "/images/cropped-Worldbook of records (1).jpg",
  },
  {
    level: "International Level",
    title: "INTERNATIONAL EMINENCE AWARD",
    location: "New Delhi",
    image: "/images/cropped-International Eminence.JPG",
  },
  {
    level: "International Level",
    title: "INSPIRING HUMAN AWARD",
    location: "New Delhi",
    image: "/images/cropped-AMAR4598.JPG",
  },
  {
    level: "National Level",
    title: "INDIAN EXCELLENCE AWARD",
    location: "Bangalore",
    image: "/images/cropped-0D3A5493 (1).JPG",
  },
  {
    level: "State Level",
    title: "ACHIEVER AWARD",
    location: "Chennai",
    image: "/images/cropped-Document from A. Veera Ragavan AVR.jpg",
  },
  {
    level: "International Level",
    title: "OUTSTANDING DIRECTOR AWARD",
    location: "Chennai",
    image: "/images/cropped-Outstanding.JPG",
  },
];

const Awards = () => (
  <section id="awards" className={`${styles.awardSection} section-gap`}>
    <h2 className={styles.sectionTitle}>Awards</h2>
    <div className={styles.awardGrid}>
      {awards.map((award, i) => (
        <div key={i} className={`${styles.awardCard} ${styles.floatAnim}`}>
          <div className={styles.imageContainer}>
            <img
              src={award.image}
              alt={award.title}
              className={styles.awardImage}
            />
          </div>
          <h3 className={styles.level}>{award.level}</h3>
          <p className={styles.title}>{award.title}</p>
          <p className={styles.location}>{award.location}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Awards;
