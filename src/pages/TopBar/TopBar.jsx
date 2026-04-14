import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import styles from "./TopBar.module.css";

const phoneNumber = "0755243111";
const phoneHref = "tel:0755243111";

const TopBar = () => {
  const location = useLocation();
  // ...existing code...

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dropdown State
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = () => setIsMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  // ...existing code...



  return (
    <div className={`${styles.mainNav} ${isScrolled ? styles.stickyShadow : ""}`}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link to="/" className={styles.logoGroup}>
            <span className={styles.logoText}>ARABELLA</span>
            <span className={styles.logoSub}>MOTOR INN</span>
          </Link>

          {/* Nav Links */}
          <nav className={styles.navLinks}>
            <Link to="/" className={isActive("/") ? styles.linkActive : ""}>
              Home
            </Link>
            <Link to="/about" className={isActive("/about") ? styles.linkActive : ""}>
              About Us
            </Link>
            {/* Rooms link removed */}
            <Link to="/gallery" className={isActive("/gallery") ? styles.linkActive : ""}>
              Gallery
            </Link>
            <Link to="/contact" className={isActive("/contact") ? styles.linkActive : ""}>
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <a
              className={styles.callBtn}
              href={phoneHref}
              aria-label={`Call ${phoneNumber}`}
            >
              {phoneNumber}
            </a>
            <a
              className={styles.bookBtn}
              href="https://book-directonline.com/properties/southtweedmidirect"
              target="_blank"
              rel="noopener noreferrer"
            >
              BOOK NOW
            </a>
            <button className={styles.mobileMenuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenuContainer} ${isMenuOpen ? styles.menuOpen : ""}`}>
        <div className={styles.mobileLinks}>
          <Link to="/" onClick={handleLinkClick}>Home</Link>
          <Link to="/about" onClick={handleLinkClick}>About Us</Link>
          {/* Rooms link removed from mobile menu */}
          <Link to="/gallery" onClick={handleLinkClick}>Gallery</Link>
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
