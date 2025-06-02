import React, { useEffect, useRef } from 'react';
import styles from './About.module.css';

const About = () => {
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const boxRefs = useRef([]);

  const features = [
    {
      icon: "🎬",
      title: "Visionary Direction",
      description:
        "Creating cinematic experiences that push boundaries and inspire audiences.",
    },
    {
      icon: "🏆",
      title: "Award Winner",
      description:
        "Recognized excellence in film production and theater experience.",
    },
    {
      icon: "👥",
      title: "Collaboration Process",
      description:
        "Working with the best talent to bring stories to life on screen.",
    },
    {
      icon: "💡",
      title: "Innovative Approach",
      description: "Pioneering new technologies and storytelling techniques.",
    },
  ];

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === imgRef.current) {
            entry.target.classList.toggle(styles.enterImage, entry.isIntersecting);
          }
          if (entry.target === textRef.current) {
            entry.target.classList.toggle(styles.enterText, entry.isIntersecting);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (imgRef.current) scrollObserver.observe(imgRef.current);
    if (textRef.current) scrollObserver.observe(textRef.current);

    const boxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(styles.animateBox, entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );
    boxRefs.current.forEach((box) => box && boxObserver.observe(box));

    return () => {
      scrollObserver.disconnect();
      boxObserver.disconnect();
    };
  }, []);

  return (
    <section id="about" className={`${styles.aboutSection} section-gap`}>
      <h2 className={styles.sectionTitle}>About</h2>
      <div className={styles.innerWrapper}>
        <div className={styles.inner}>
          <div ref={imgRef} className={styles.imageWrapper}>
            <img src="/images/About1.jpg" alt="About AVR Cinemas" />
          </div>
          <div ref={textRef} className={styles.textWrapper}>
            <h3>About AVR</h3>
            <div className={styles.scrollText}>
              <p>
                AVR Cinemas is a leading movie theater chain offering state-of-the-art
                screens, immersive sound, and a luxurious experience. We are dedicated
                to bringing visionary direction and innovation to every film we show.
                <br /><br />
                Founded in 2010, our journey began with a simple vision: to transform the movie-going
                experience into something extraordinary. Over the years, we've expanded to multiple
                locations across the country, each designed with meticulous attention to detail.
                <br /><br />
                Our theaters feature cutting-edge projection technology, Dolby Atmos sound systems,
                and premium seating options that redefine comfort. But beyond the technical aspects,
                we pride ourselves on creating an atmosphere where stories come alive and memories are made.
                <br /><br />
                At AVR Cinemas, we believe in the power of cinema to inspire, educate, and unite people.
                That's why we carefully curate our film selections to include both mainstream blockbusters
                and independent gems that might otherwise go unnoticed.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.featureGrid}>
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={styles.featureBox}
              ref={(el) => (boxRefs.current[idx] = el)}
              style={{ '--delay': `${idx * 0.3}s` }}
              tabIndex="0"
            >
              <div className={styles.featureIcon}>{feat.icon}</div>
              <h4 className={styles.featureTitle}>{feat.title}</h4>
              <div className={styles.featureDescription}>{feat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
