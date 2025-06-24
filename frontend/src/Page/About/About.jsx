import React, { useState, useEffect } from "react";
import companyImage from "../../assets/Image2.jpg";
import "./About.scss"; // SCSS 연결
import translations from "../../Locale/About.json"

const About = () => {
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
    <div className="about-container">
      <div className="about-hero">
        <img src={companyImage} className="about-image" />
        <div className="about-overlay"></div>
        <div className="about-hero-text">
          <h3>ABC Company</h3>
          <p>
            {translations[language].subtitle}
          </p>
        </div>
      </div>

      <div className="about-section about-intro">
        <h2>
          {translations[language].title}
        </h2>
        <div className="about-text">
          <p>
            {translations[language].description.part1} <br />
            {translations[language].description.part2}
          </p>
          <p>
            {translations[language].description.part3} <br />
            {translations[language].description.part4}
          </p>
        </div>
      </div>

      <div className="about-section about-values">
        {["innovation", "trust", "growth"].map((key, index) => (
          <div
            key={index}
            className="value-card">
            <h3>
              {translations[language].values[key].title}
            </h3>
            <p>
              {translations[language].values[key].desc}

            </p>
          </div>
        ))}
      </div>

      <div className="about-section about-vision">
        <h2>
          {translations[language].vision.title}
        </h2>
        <p>
          {translations[language].vision.content}
        </p>
      </div>

      <div className="about-section about-history">
        <h2>
          {translations[language].history.title}
        </h2>
        <div className="timeline">
            {Object.entries(translations[language].history.events).map(([year, event], index) =>(
            <div
              key={year}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            >
              <div className="timeline-box">
                <h3>
                  {year}
                  </h3>
                <p>
                  {event}
                  </p>
              </div>
              <div className="timeline-dot"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
