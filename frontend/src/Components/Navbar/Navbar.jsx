
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import "./Navbar.scss"
import translations from "../../Locale/Navbar.json"
const menuItems = [
  { path: "/", key: "home" },
  { path: "/about", key: "about" },
  { path: "/leadership", key: "leadership" },
  { path: "/board", key: "board" },
  { path: "/our-services", key: "services" },
  { path: "/contact", key: "contact" },
];
const MenuItem = ({ path, label, onClick }) => (
  <li>
    <Link
      to={path}
      className="hover:text-blue-600 transition duration-300"
      onClick={onClick}
    >
      {label}
    </Link>
  </li>
);
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "ko");

  useEffect(() => {
    localStorage.setItem("language", language);
    window.dispatchEvent(new Event("languageChange"))
  }, [language])

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">
          <Link to="/">{translations[language].company.name}
          </Link>
        </h1>

        <div className="navbar-menu">
          <ul className="navbar-menu-list">
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                path={item.path}
                label={translations[language].menu[item.key]}
                onClick={() => { }}
              />
            ))}
          </ul>
        </div>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          <option value="ko">{translations.ko.language}</option>
          <option value="en">{translations.en.language}</option>
        </select>

        <button className="menu-toggle-button" onClick={toggleMenu} aria-label="메뉴">
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <div className="mobile-menu-inner">
          <button className="close-button" onClick={toggleMenu} aria-label="닫기">
            <HiX />
          </button>
          <ul className="mobile-menu-list">
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                path={item.path}
                label={translations[language].menu[item.key]}
                onClick={() => { }}
              />
            ))}
          </ul>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mobile-language-select"
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </nav>

  )
}

export default Navbar