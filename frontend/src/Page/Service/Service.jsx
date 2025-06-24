import React, { useState, useEffect } from "react";
import './Service.scss';
import ServicesLocale from "../../Locale/Services.json";
const Services = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ko');

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'ko');
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const t = (key) => {
    const keys = key.split(".");
    return keys.reduce((obj, k) => obj[k], ServicesLocale[language]);
  };

  const servicesList = [
    {
      id: 1,
      title: '맞춤형 소프트웨어 개발',
      description: '고객의 요구사항에 맞는 최적화된 솔루션을 제공합니다.',
      icon: '💻'
    },
    {
      id: 2,
      title: '클라우드 서비스',
      description: '안정적이고 확장 가능한 클라우드 인프라 구축 및 관리',
      icon: '☁️'
    },
    {
      id: 3,
      title: '보안 솔루션',
      description: '최신 보안 기술을 적용한 안전한 시스템 구축',
      icon: '🔒'
    },
    {
      id: 4,
      title: '기술 컨설팅',
      description: '전문가의 분석을 통한 최적의 기술 전략 수립',
      icon: '📊'
    }
  ];

  return (
    <div className="services">
      <div className="services-header">
        <h1>
          {t("services.mainTitle")}
        </h1>
        <p>
          {t("services.subTitle")}
        </p>
      </div>

      <div className="services-grid">
        {t("services.list").map((service, index) => (
          <div key={index} className="service-card">
            <div className="icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <div className="services-why">
        <h2>
          {t("services.whyUs.title")}
        </h2>
        <div className="why-grid">
          <div className="why-item">
            <h4>
              {t("services.whyUs.reasons.0.title")}
            </h4>
            <p>
              {t("services.whyUs.reasons.0.description")}
            </p>
          </div>
          <div className="why-item">
            <h4>
              {t("services.whyUs.reasons.1.title")}
            </h4>
            <p>
              {t("services.whyUs.reasons.1.description")}
            </p>
          </div>
          <div className="why-item">
            <h4>
              {t("services.whyUs.reasons.2.title")}
            </h4>
            <p>
              {t("services.whyUs.reasons.2.description")}
            </p>
          </div>
        </div>
      </div>

      <div className="services-process">
        <h2>
          {t("services.process.title")}

        </h2>
        <div className="process-grid">
          {t("services.process.steps").map((item, index) => (
            <div key={index} className="process-step">
              <div className="step">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="services-cta">
        <h2>
          {t("services.cta.title")}
        </h2>
        <p>
          {t("services.cta.subTitle")}
        </p>
        <button>
          {t("services.cta.button")}

        </button>
      </div>
    </div>
  );
};

export default Services;
