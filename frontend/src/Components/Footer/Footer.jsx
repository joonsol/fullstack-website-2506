// src/Components/Footer/Footer.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.scss";
import translations from "../../Locale/Footer.json"

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const [language, setLanguage] = useState(localStorage.getItem("language") || "ko");
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "ko")
    }
    window.addEventListener("languageChange", handleLanguageChange)
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange)
    }
  }, [])

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">
              {translations[language].footer.company.title}
            </h3>
            <p className="footer-text">
              {translations[language].footer.company.description}
            </p>
          </div>

          <div>
            <h3 className="footer-title">
              {translations[language].footer.quickLinks.title}

            </h3>
            <ul className="footer-list">
              <li>
                <Link to="/" onClick={scrollToTop}>
                  {translations[language].footer.quickLinks.home}
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop}>
                  {translations[language].footer.quickLinks.about}
                </Link>
              </li>
              <li>
                <Link to="/leadership" onClick={scrollToTop}>
                  {translations[language].footer.quickLinks.leadership}
                </Link>
              </li>
              <li>
                <Link to="/board" onClick={scrollToTop}>
                  {translations[language].footer.quickLinks.board}
                </Link>
              </li>
              <li>
                <Link to="/our-services" onClick={scrollToTop}>
                  {translations[language].footer.quickLinks.services}
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop}>
                  {translations[language].footer.quickLinks.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">
              {translations[language].footer.contact.title}
            </h3>
            <ul className="footer-text-list">
              <li>
                {translations[language].footer.contact.address1}
              </li>
              <li>
                {translations[language].footer.contact.address2}
              </li>
              <li>
                {translations[language].footer.contact.phone}
              </li>
              <li>
                {translations[language].footer.contact.email}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">
              {translations[language].footer.social.title}
            </h3>
            <div className="footer-socials">
              <a href="#"><FaFacebook size={20} /></a>
              <a href="#"><FaTwitter size={20} /></a>
              <a href="#"><FaInstagram size={20} /></a>
              <a href="#"><FaLinkedin size={20} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
