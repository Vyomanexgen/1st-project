import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Home.module.css';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false); // new fade-out flag
  const swiperRef = useRef(null);

  const images = [
    '/images/Home.jpg',
    '/images/Home1.jpg',
    '/images/Home2.jpg',
    '/images/Home3.jpg',
    '/images/Home4.jpg',
    '/images/Home5.jpg',
    '/images/Home6.jpg',
  ];

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  useEffect(() => {
    if (!videoEnded) return;

    setShowText(false);
    setShowButtons(false);

    const photoSettleTimer = setTimeout(() => setShowText(true), 1500);
    const buttonsTimer = setTimeout(() => setShowButtons(true), 2500);
    const nextSlideTimer = setTimeout(() => {
      if (swiperRef.current) swiperRef.current.slideNext();
    }, 5500);

    return () => {
      clearTimeout(photoSettleTimer);
      clearTimeout(buttonsTimer);
      clearTimeout(nextSlideTimer);
    };
  }, [activeIndex, videoEnded]);

  return (
    <section id="home" className={`${styles.section} section-gap`}>
      {!videoEnded && (
        <div className={styles.media16x9}>
          <video
            src="/videos/intro.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            className={styles.introVideo}
            style={{ transition: 'opacity 1s ease', opacity: videoEnded ? 0 : 1 }}
          />
        </div>
      )}

      {videoEnded && (
        <>
          <link rel="preload" as="image" href={images[0]} />

          <div className={styles.container}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              loop
              allowTouchMove={false}
              speed={1000}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}

              onSlideChangeTransitionStart={() => setIsFadingOut(true)}
              onSlideChangeTransitionEnd={() => setIsFadingOut(false)}

              className={styles.swiper}
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className={styles.media16x9}>
                    <img
                      loading="eager"
                      src={src}
                      alt={`Slide ${idx + 1}`}
                      className={styles.slideImage}
                    />
                    <div
                      className={`${styles.slideText} ${
                        showText && activeIndex === idx && !isFadingOut
                          ? styles.fadeInLeft
                          : isFadingOut
                          ? styles.fadeOut
                          : ''
                      }`}
                    >
                      <h4>Welcome to AVR Cinemas</h4>
                      <p>Your gateway to immersive movie experiences</p>
                    </div>

                    <div
                      className={`${styles.buttonsWrapper} ${
                        showButtons && activeIndex === idx && !isFadingOut
                          ? styles.slideUp
                          : isFadingOut
                          ? styles.fadeOut
                          : ''
                      }`}
                    >
                      <a href="#awards" className={`${styles.btn} ${styles.btnPrimary}`}>
                        View Awards
                      </a>
                      <a href="#contact" className={`${styles.btn} ${styles.btnOutline}`}>
                        Get in Touch
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
