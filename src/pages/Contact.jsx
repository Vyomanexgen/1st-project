
import React, { useRef, useEffect, useState } from 'react';
import styles from './Contact.module.css';
import { FaEnvelope, FaClock } from 'react-icons/fa';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const sectionRef = useRef();
  const formRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    const current = sectionRef.current;
    if (current) observer.observe(current);
    return () => current && observer.unobserve(current);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        'service_ikm09ei',
        'template_11xb5y8',
        formRef.current,
        'JKIEWgpDNQDAoWVWC'
      )
      .then(
        () => {
          setPopupMessage('Your message has been submitted successfully!');
          setShowPopup(true);
          formRef.current.reset();
        },
        (error) => {
          console.error('Email sending failed:', error);
          setPopupMessage('Failed to send message. Please try again.');
          setShowPopup(true);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setShowPopup(false), 4000);
      });
  };

  const validateForm = (form) => {
    const { name, email, phone, subject, message } = form;
    if (
      !name.value.trim() ||
      !email.value.trim() ||
      !phone.value.trim() ||
      !subject.value.trim() ||
      !message.value.trim()
    ) {
      setPopupMessage('Please fill in all fields.');
      setShowPopup(true);
      return false;
    }

    if (!/^\d{10}$/.test(phone.value.trim())) {
      setPopupMessage('Phone number must be exactly 10 digits.');
      setShowPopup(true);
      return false;
    }

    return true;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${styles.contactSection} ${isVisible ? styles.show : ''} section-gap`}
    >
      <h2 className={styles.sectionTitle}>Get in Touch</h2>

      <div className={styles.contactContainer}>
        <form
          className={styles.contactForm}
          onSubmit={(e) => {
            e.preventDefault();
            if (!validateForm(e.target)) return;
            handleSubmit(e);
          }}
          ref={formRef}
        >
          <h3 className={styles.contactHeading}>Send a Message</h3>

          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Your Name" required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Your Email" required />

          <label htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" type="tel" placeholder="Your Phone Number" required />

          <label htmlFor="subject">Subject</label>
          <select id="subject" name="subject" required>
            <option value="">Select a subject</option>
            <option value="booking">Booking</option>
            <option value="feedback">Feedback</option>
            <option value="support">Support</option>
          </select>

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Your Message" required />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Send Message'}
          </button>
        </form>

        <div className={`${styles.contactInfo} ${isVisible ? styles.slideIn : ''}`}>
          <h3>Contact Information</h3>
          <p>
            <FaEnvelope className={styles.icon} aria-label="Email" />
            veeraraghavan067@gmail.com
          </p>
          <p>
            <FaEnvelope className={styles.icon} aria-label="Press Email" />
            directoravr92@gmail.com
          </p>
          <p>
            <FaClock className={styles.icon} aria-label="Time" />
            Mon–Fri, 9am–5pm
          </p>
 <h3 className={styles.socialHeading}>Follow Me</h3>
          <div className={styles.socialLinks}>
            <a
              href="https://www.facebook.com/DirectorAVR?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLinkItem}
            >
              <FaFacebookF className={styles.socialIcon} />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/directoravr_official?utm_source=qr&igsh=MW45bjNyaG00bG15Mw=="
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLinkItem}
            >
              <FaInstagram className={styles.socialIcon} />
              <span>Instagram</span>
            </a>
            <a
              href="https://whatsapp.com/channel/0029Vb9GdnGElah0ZaOkY00Y"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLinkItem}
            >
              <FaWhatsapp className={styles.socialIcon} />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://x.com/DirectorAVR?t=euCbPs2PamIcuQG96eZ5Ig&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLinkItem}
            >
              <FaXTwitter className={styles.socialIcon} />
              <span>X (Twitter)</span>
            </a>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className={styles.popup}>
          <p>{popupMessage}</p>
        </div>
      )}
    </section>
  );
};

export default Contact;

