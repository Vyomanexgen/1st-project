import React, { useRef, useEffect, useState } from 'react';
import styles from './Contact.module.css';
import { FaEnvelope } from 'react-icons/fa';
import { FaClock } from "react-icons/fa";

const Contact = () => {
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
      
    );
    const current = sectionRef.current;
    if (current) observer.observe(current);
    return () => current && observer.unobserve(current);
  }, []);
console.log("ENV URL:", process.env.REACT_APP_BACKEND_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/send-email`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});



      const result = await response.json();
      if (result.success) {
        alert('Your message has been submitted successfully!');
        e.target.reset();
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${styles.contactSection} ${isVisible ? styles.show : ''} section-gap`}
    >
      <h2 className={styles.sectionTitle}>Get in Touch</h2>

      <div className={styles.contactContainer}>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <h3 className={styles.contactHeading}>Send a Message</h3>

          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Your Name" required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Your Email" required />

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
            Mon–Fri, 9am–5pm</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

