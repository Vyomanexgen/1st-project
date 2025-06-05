import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu } from "lucide-react";
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom"; 
import { HashLink } from 'react-router-hash-link';

const sections = [
  "home",
  "about",
  "films",
  "awards",
  "certification",
  "news",
  "audition",
  "contact",
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation(); 

  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 30, 0.5)", "rgba(10, 10, 30, 0.95)"]
  );
  const navShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 2px 8px rgba(0, 0, 50, 0.2)", "0 4px 20px rgba(0, 0, 50, 0.7)"]
  );


  useEffect(() => {
    if (location.pathname === '/audition') {
      setActiveSection('audition');
    } else if (location.pathname === '/') {
     
      setActiveSection('home');
    }
  }, [location.pathname]);

  
  useEffect(() => {
    
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      let current = "home";
      sections.forEach((sec) => {
        if (sec === "audition") return;
        const el = document.getElementById(sec);
        if (el && el.offsetTop <= scrollPos) {
          current = sec;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <motion.nav
      ref={navRef}
      className={styles.navbar}
      style={{
        backgroundColor: navBackground,
        boxShadow: navShadow,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
    >
      <Link to="/admin" target="_blank"  className={styles.brand}>
        <img
          src="/images/clapboard.png"
          alt="Clapboard"
          className={styles.clapboardIcon}
        />
        <motion.span
          className={styles.brandText}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Director AVR
        </motion.span>
      </Link>

      <div
        className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu size={28} color="white" />
      </div>

      <ul className={`${styles.links} ${menuOpen ? styles.showMenu : ""}`}>
        {sections.map((sec) =>
          sec === "audition" ? (
            <li key="audition">
              <Link
                to="/audition"
               
                className={`${styles.audition} ${
                  activeSection === "audition" ? styles.auditionActive : ""
                }`}
              >
                Audition
              </Link>
            </li>
          ) : (
            <li key={sec}>
              <HashLink
                smooth
                to={`/#${sec}`}
                className={`${styles.link} ${
                  activeSection === sec ? styles.linkActive : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
                {activeSection === sec && (
                  <span className={styles.activeIndicator} />
                )}
              </HashLink>
            </li>
          )
        )}
      </ul>
    </motion.nav>
  );
};

export default Navbar;