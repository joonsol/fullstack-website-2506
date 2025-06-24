import React, { useState, useEffect } from "react";
import axios from "axios";
import './Contact.scss';
import ContactLocale from "../../Locale/Contact.json";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "in progress",
  });
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
    return keys.reduce((obj, k) => obj[k], ContactLocale[language]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "https://port-0-fullstack-website-2506-mca4f9ad87f2d72b.sel5.cloudtype.app/api/contact",
        formData
      )

      if (response.status === 201) {
        alert("문의가 성공적 접수!11")
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          status: "in progress"
        })
      }
    } catch (error) {
      console.log("에러 발생: ", error);
      alert("문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };
  return (
    <div className="contact">
      <div className="contact-inner">
        <div className="contact-header">
          <h1>
            {t("contact.title")}
          </h1>
          <p>
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="contact-body">
          {/* 문의 폼 */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={t("contact.form.placeholders.name")}
                  value={formData.name}
                  onChange={handleChange}
                  required />
              </div>
              <div className="form-group">
                <label>
                  {t("contact.form.email")}
                </label>
                <input
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder={t("contact.form.placeholders.email")}
                  required />
              </div>
              <div className="form-group">
                <label>
                  {t("contact.form.phone")}
                </label>
                <input
                  value={formData.phone}
                  onChange={handleChange}
                  name="phone"
                  type="tel"
                  placeholder={t("contact.form.placeholders.phone")}
                  required />
              </div>
              <div className="form-group">
                <label>
                  {t("contact.form.message")}
                </label>
                <textarea
                  onChange={handleChange}
                  name="message"
                  value={formData.message}
                  placeholder={t("contact.form.placeholders.message")}

                  required />
              </div>
              <button type="submit">
                {t("contact.form.submit")}
              </button>
            </form>
          </div>

          {/* 연락처 및 지도 */}
          <div className="contact-info">
            <div className="contact-card">
              <h3>
                {t("contact.contact_info.title")}
              </h3>
              {[
                 {
                    title: t("contact.contact_info.phone.title"),
                    info: t("contact.contact_info.phone.info"),
                    desc: t("contact.contact_info.phone.desc"),
                  },
                  {
                    title: t("contact.contact_info.email.title"),
                    info: t("contact.contact_info.email.info"),
                    desc: t("contact.contact_info.email.desc"),
                  },
                  {
                    title: t("contact.contact_info.address.title"),
                    info: t("contact.contact_info.address.info"),
                    desc: t("contact.contact_info.address.desc"),
                  },
              ].map((item, index) => (
                <div className="contact-item" key={index}>
                  <div className="icon">
                    <i className={`fas fa-${item.icon}`}></i>
                  </div>
                  <div className="details">
                    <h4>{item.title}</h4>
                    <p>{item.info}</p>
                    <small>{item.desc}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-map">
              <iframe
                title="Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25512.18472157322!2d127.18228540787578!3d36.93761547130345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b31f2d016bc07%3A0x34216a2951fa94d4!2sYeongok-gil%2C%20Ipjang-myeon%2C%20Seobuk-gu%2C%20Cheonan-si%2C%20Chungcheongnam-do!5e0!3m2!1sen!2skr!4v1734695969025!5m2!1sen!2skr"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
