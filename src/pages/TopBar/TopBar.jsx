import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import styles from "./TopBar.module.css";

const phoneNumber = "0755243111";
const phoneHref = "tel:0755243111";

const TopBar = () => {
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = () => setIsMenuOpen(false);
  const isActive = (path) => location.pathname === path;

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

            <Link to="/gallery" className={isActive("/gallery") ? styles.linkActive : ""}>
              Gallery
            </Link>

            <Link to="/blogs" className={isActive("/blogs") ? styles.linkActive : ""}>
              Blogs
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

            <button
              className={styles.mobileMenuBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenuContainer} ${isMenuOpen ? styles.menuOpen : ""}`}>
        <div className={styles.mobileLinks}>
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>

          <Link to="/about" onClick={handleLinkClick}>
            About Us
          </Link>

          <Link to="/gallery" onClick={handleLinkClick}>
            Gallery
          </Link>

          <Link to="/blogs" onClick={handleLinkClick}>
            Blogs
          </Link>

          <Link to="/contact" onClick={handleLinkClick}>
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;