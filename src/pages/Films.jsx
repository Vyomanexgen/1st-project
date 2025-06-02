import React from 'react';
import styles from './Films.module.css';

const Films = () => {
  const films = [
    {
      name: "MU+HI",
      posterUrl: "/images/Muhi.jpg",
    }
  ];

  return (
    <section className={`${styles.filmSection} section-gap`}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.sectionTitle}>Filmography of AVR</h2>
      </div>

      <div className={styles.filmList}>
        {films.map((film, idx) => (
          <div className={styles.filmCard} key={idx}>
            <img
              className={styles.poster}
              src={film.posterUrl}
              alt={film.name}
            />
            <h3 className={styles.filmName}>
              {film.name.split(/([+])/).map((part, index) => {
                if (part === "+") return <span key={index} className={styles.middle}>{part}</span>;
                if (index === 0) return <span key={index} className={styles.first}>{part}</span>;
                return <span key={index} className={styles.last}>{part}</span>;
              })}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Films;
