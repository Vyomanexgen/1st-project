import React, { useRef, useEffect, useState } from 'react';
import styles from './Contact.module.css';
import { FaEnvelope} from 'react-icons/fa';

const Contact = () => {
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    const currentSection = sectionRef.current;
    if (currentSection) observer.observe(currentSection);
    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Your message has been submitted successfully!');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${styles.contactSection} ${isVisible ? styles.show : ''} section-gap`}
    >
      {}
      <h2 className={styles.sectionTitle}>Get in Touch</h2>

      <div className={styles.contactContainer}>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <h3 className={styles.contactHeading}>Send a Message</h3>

          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            required style={{height:'50px'}}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            required style={{height:'50px'}}
          />

          <label htmlFor="subject">Subject</label>
          <select id="subject" name="subject" required style={{height:'50px'}}>
            <option value="">Select a subject</option>
            <option value="booking">Booking</option>
            <option value="feedback">Feedback</option>
            <option value="support">Support</option>
          </select>

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            required style={{height:'190px'}}
          /> 

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '12px 20px',
              fontSize: '1rem',
              borderRadius: '20px',
              border: 'none',
              backgroundColor:'#e63946',
              color: '#fff',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(42, 98, 255, 0.15)',
              transition: 'background 0.3s, transform 0.2s',
              outline: 'none',
              marginTop: '18px',
              transform: isSubmitting ? 'scale(0.98)' : 'scale(1)',
              width: 'auto', // <-- Added to prevent full width
              display: 'inline-block', // <-- Added to shrink to content
              minWidth: '110px',
             
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Send Message'}
          </button>
        </form>

        <div
          className={`${styles.contactInfo} ${
            isVisible ? styles.slideIn : ''
          }`}
        >
          <h3>Contact Information</h3>
          <p>
            <FaEnvelope className={styles.icon} aria-label="Email" />
            veeraraghavan067@gmail.com
          </p>
          <p>
            <FaEnvelope className={styles.icon} aria-label="Press Email" />
            directoravr92@gmail.com
          </p>
          <p>Mon–Fri, 9am–5pm</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
