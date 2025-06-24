import React, { useState, useEffect } from "react";
import Human1 from "../../assets/Human1.jpg";
import "./Leadership.scss"; // SCSS 연결
import leadershipLocale from "../../Locale/Leadership.json";

const Leadership = () => {


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

  const t = (key) => {
    const keys = key.split(".");
    return keys.reduce((obj, k) => obj[k], leadershipLocale[language]);
  };
  const executives = t("executivesSection.members");
  const teamMembers = t("teamSection.members");
  return (
    <div className="leadership">
      <div className="section-header">
        <h1>   {t("pageTitle")}</h1>
        <p>  {t("pageSubtitle")}</p>
      </div>

      <div className="ceo-section">
        <div className="ceo-text">
          <h2>{t("ceoSection.title")}</h2>
          <div className="content">
            <p>{t("ceoSection.greeting")}</p>
            <p>
              {t("ceoSection.message1")}
            </p>
            <p>
              {t("ceoSection.message2")}

            </p>
            <p className="signature">
              {t("ceoSection.signature")}

            </p>
          </div>
        </div>
        <div className="ceo-image">
          <img src={Human1} alt="CEO" />
          <div className="caption">
            <h3>
              {t("ceoSection.name")}
              김대표
            </h3>
            <p>
              {t("ceoSection.position")}
            </p>
          </div>
        </div>
      </div>

      <div className="executives">
        <h2>
              {t("executivesSection.title")}
          </h2>
        <div className="card-grid">
                 {executives.map((executive, index) => (
            <div className="card" key={index}>
              <div className="card-image">
                <img src={Human1} alt={executive.name} />
              </div>
              <div className="card-content">
                <h3>{executive.name}</h3>
                <p className="position">{executive.position}</p>
                <p>{executive.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="team">
        <h2>   {t("teamSection.title")}</h2>
        <div className="card-grid">
           {teamMembers.map((teamMember, index) => (
            <div className="card" key={index}>
              <div className="card-image">
                <img src={Human1} alt={teamMember.name} />
              </div>
              <div className="card-content">
                <h3>{teamMember.name}</h3>
                <p className="position">{teamMember.position}</p>
                <p>{teamMember.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;
