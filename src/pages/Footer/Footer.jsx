import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* --- Column 1: Brand Info --- */}
          <div className={styles.brandColumn}>
            <div className={styles.logoRow}>
              <h2 className={styles.brandName}>ARABELLA</h2>
              <span className={styles.brandSub}>MOTOR INN</span>
            </div>

            <p className={styles.tagline}>
              Experience the perfect blend of coastal luxury and comfort.
              Whether for business or leisure, Arabella Motor Inn is your home
              away from home on the Gold Coast.
            </p>

            <div className={styles.socialRow}>
              {/* ... keep social icons same as before ... */}
              <a href="#s" className={styles.socialIcon} aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#s" className={styles.socialIcon} aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#s" className={styles.socialIcon} aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#s" className={styles.socialIcon} aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* --- Column 2: Quick Links --- */}
          <div className={styles.linkColumn}>
            <h3 className={styles.heading}>Quick Links</h3>
            <ul className={styles.list}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <a href="https://book-directonline.com/properties/southtweedmidirect" target="_blank" rel="noopener noreferrer">Accommodation</a>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* --- Column 3: Help & Support --- */}
          <div className={styles.linkColumn}>
            <h3 className={styles.heading}>Support</h3>
            <ul className={styles.list}>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/faq">Guest FAQ</Link>
              </li>
              <li>
                <a href="https://book-directonline.com/properties/southtweedmidirect" target="_blank" rel="noopener noreferrer">Book a Stay</a>
              </li>
            </ul>
          </div>

          {/* --- Column 4: Our Rooms --- */}
          <div className={styles.linkColumn}>
            <h3 className={styles.heading}>Our Rooms</h3>
            <ul className={styles.list}>
              <li>
                <a href="https://book-directonline.com/properties/southtweedmidirect" target="_blank" rel="noopener noreferrer">Queen Room</a>
              </li>
              <li>
                <a href="https://book-directonline.com/properties/southtweedmidirect" target="_blank" rel="noopener noreferrer">Deluxe Room</a>
              </li>
              <li>
                <a href="https://book-directonline.com/properties/southtweedmidirect" target="_blank" rel="noopener noreferrer">Deluxe Twin</a>
              </li>
              <li>
                <a href="https://book-directonline.com/properties/southtweedmidirect" target="_blank" rel="noopener noreferrer">Deluxe Studio</a>
              </li>
            </ul>
          </div>

          {/* --- Column 5: Contact Us (Australian Details) --- */}
          <div className={styles.contactColumn}>
            <h3 className={styles.heading}>Contact Us</h3>
            <div className={styles.contactItem}>
              <MapPin className={styles.icon} size={20} />
              <span>
                9-11 Minjungbal Drive
                <br />
                Tweed Heads South, NSW, 2486
              </span>
            </div>
            <div className={styles.contactItem}>
              <Phone className={styles.icon} size={20} />
              <a href="tel:0755243111">0755243111</a>
            </div>
            <div className={styles.contactItem}>
              <Mail className={styles.icon} size={20} />
              <a href="mailto:arabellamotorinn@gmail.com">
                arabellamotorinn@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>
            © {new Date().getFullYear()} Arabella Motor Inn. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
