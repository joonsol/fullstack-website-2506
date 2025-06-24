// src/Components/Hero/Hero.jsx
import React, { useEffect, useState } from "react";
import "./Hero.scss";
import HeroImage from "../../assets/Human1.jpg"; // 경로에 맞게 수정 필요
import { motion } from "framer-motion";
import translations from "../../Locale/hero.json"
const stats = [
  { key: "installations" },
  { key: "satisfaction" },
  { key: "experience" },
  { key: "support" },
];
const Hero = () => {

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
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  const buttonVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.7 },
    },
  };

  const statusVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1 } },
  };

  return (
    <div className="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-text">
            <motion.h1

              initial="hidden"
              animate="visible"
              variants={textVariant}
            >
              {translations[language].title.main}
              <motion.span

                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {translations[language].title.highlight} </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
               {translations[language].description} 
            </motion.p>
            <div className="hero-buttons">
              <motion.button
                className="primary"
                initial="hidden"
                animate="visible"
                variants={buttonVariant}
              >
                {translations[language].buttons.consult}
              </motion.button>
              <motion.button
                className="secondary"
                initial="hidden"
                animate="visible"
                variants={buttonVariant}
              >
                {translations[language].buttons.learnMore}

              </motion.button>

            </div>
          </div>
          <motion.div className="hero-image" initial="hidden"
            variants={imageVariant}
            animate="visible">
            <img src={HeroImage} alt="태양광 설비" />
          </motion.div>
        </div>
      </div>

      <div className="hero-stats">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="stat"
            initial="hidden"
            animate="visible"
            variants={statusVariant}
          >
            <motion.div className="stat-number"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i - 0.2 }}
            > 
              {translations[language].stats[stat.key].number}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i - 0.2 }}
              className="stat-label">
                {translations[language].stats[stat.key].label}
                </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
