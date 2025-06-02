import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Certification.module.css';

const certificatesData = [
  { id: 1, title: 'International Icon Award 2024', img: '/images/Copy of DOC-20240415-WA0029._20241013_113150_0000.png' },
  { id: 2, title: 'World Record Certificate', img: '/images/world record certificate_20241023_010546_0000_page-0001.jpg' },
  { id: 3, title: 'Bharat Vibhusham Award 2024', img: '/images/A.Veera Ragavan (AVR)_page-0001.jpg' },
  { id: 4, title: 'BHARAT SEVA PURASKAR AL', img: '/images/BHARAT SEVA PURASKAR AL  (2)_page-0001.jpg' },
  { id: 5, title: 'Indian Excellence Award 2024', img: '/images/IMG-20241108-WA0033.jpg' },
  { id: 6, title: 'National Talent Award 2024', img: '/images/NTA CERT (5)_page-0001 (1).jpg' },
  { id: 7, title: 'ASIA TALENT AWARD 2024', img: '/images/ASIA TALENT AWARD CERT (21).pdf (4)_page-0001.jpg' },
];

const Certification = () => {
  const [showMore, setShowMore] = useState(false);
  const [modalCert, setModalCert] = useState(null);
  const modalRef = useRef(null);

  const toggleShowMore = useCallback(() => setShowMore(prev => !prev), []);
  const openModal = useCallback(cert => setModalCert(cert), []);
  const closeModal = useCallback(() => setModalCert(null), []);

  const displayed = showMore ? certificatesData : certificatesData.slice(0, 3);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') closeModal();
    };
    if (modalCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalCert, closeModal]);

  useEffect(() => {
    if (modalCert && modalRef.current) {
      const modalNode = modalRef.current;

      const focusableEls = modalNode.querySelectorAll(
        'button, [tabindex]:not([tabindex="-1"])'
      );
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      const trapFocus = e => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      };

      modalNode.addEventListener('keydown', trapFocus);
      firstEl?.focus();

      return () => {
        modalNode.removeEventListener('keydown', trapFocus);
      };
    }
  }, [modalCert]);

  useEffect(() => {
    let previouslyFocusedElement;

    if (modalCert) {
      previouslyFocusedElement = document.activeElement;
      modalRef.current?.focus();
    }

    return () => {
      previouslyFocusedElement?.focus();
    };
  }, [modalCert]);

  return (
    <section id="certification" className={`${styles.certSection} section-gap`}>
      <div className={styles.centerWrap}>
        <h2 className={styles.sectionTitle}>Certifications</h2>

        <div className={styles.grid}>
          {displayed.map(cert => (
            <div
              key={cert.id}
              className={`${styles.card} ${styles.floatAnim}`}
              onClick={() => openModal(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openModal(cert);
                  e.preventDefault();
                }
              }}
              aria-label={`View certification: ${cert.title}`}
            >
              <img
                src={cert.img}
                alt={cert.title}
                className={styles.cardImage}
                loading="lazy"
                onError={e => {
                  e.currentTarget.src = '/images/placeholder.png';
                  e.currentTarget.alt = 'Certificate image unavailable';
                }}
              />
              <p className={styles.cardTitle}>{cert.title}</p>
            </div>
          ))}
        </div>

        <button
          className={styles.toggleBtn}
          onClick={toggleShowMore}
          aria-expanded={showMore}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>

      {modalCert && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${modalCert.id}`}
          onClick={closeModal}
        >
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
            ref={modalRef}
          >
            <button
              className={styles.modalClose}
              aria-label="Close modal"
              onClick={closeModal}
            >
              ×
            </button>
            <h3 id={`modal-title-${modalCert.id}`} className={styles.modalTitle}>
              {modalCert.title}
            </h3>
            <img
              src={modalCert.img}
              alt={modalCert.title}
              className={styles.modalImage}
              onError={e => {
                e.currentTarget.src = '/images/placeholder.png';
                e.currentTarget.alt = 'Certificate image unavailable';
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Certification;
