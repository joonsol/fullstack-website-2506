
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Contact.scss";
import translations from "../../Locale/Contact-Components.json"

const contactInfo = [
    {
        title: "전화 문의",
        info: "02-1234-5678",
        subInfo: "평일 09:00 - 18:00",
        key: "phone"
    },
    {
        title: "이메일 문의",
        info: "support@example.com",
        subInfo: "24시간 접수 가능",
        key: "email"
    },
    {
        title: "위치",
        info: "서울특별시 강남구",
        subInfo: "삼성동 123번지",
        key: "location"
    },
];

const Contact = () => {

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
        <div className="contact">
            <div className="contact-container">
                <div className="contact-header">
                    <h2>
                        {translations[language].contact.title}
                    </h2>
                    <p>
                        {translations[language].contact.subtitle}
                    </p>
                </div>

                <div className="contact-grid">
                    {contactInfo.map((item, index) => (
                        <div key={index} className="contact-card">
                            <h3>
                                {translations[language].contact.contactMethods[item.key].title}

                            </h3>
                            <p className="info">
                                {translations[language].contact.contactMethods[item.key].info}
                            </p>
                            <p className="sub">
                                {translations[language].contact.contactMethods[item.key].subInfo}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="contact-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.8403692784084!2d126.97796971530828!3d37.56629517979833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2f33637088b%3A0xc91d5d0d0c9e2c4d!2z7ISc7Jq47Yq567OE7IucIOqzoOyepQ!5e0!3m2!1sko!2skr!4v1718210191111!5m2!1sko!2skr"

                        width="100%"
                        height="400"

                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                </div>

                <div className="contact-button">
                    <Link to="/contact">문의하기</Link>
                </div>
            </div>
        </div>
    );
};

export default Contact;
