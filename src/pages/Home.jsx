// src/pages/Home.jsx
import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaTools, FaTruck, FaBatteryFull, FaClock, FaCheckCircle } from "react-icons/fa";
import { LanguageContext } from "../context/LanguageContext";
import logo from "../assets/logo.png";
import hero from "../assets/hero.png";
import { useNavigate } from "react-router-dom"; 

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
  }),
};

export default function Home() {
  const { language } = useContext(LanguageContext);
  const [offsetY, setOffsetY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ثابت
  const phone = "📞 0556 32 71 70";
  const email = "📧 contact@highdep.com";

  // النصوص حسب اللغة
  const text = {
    heroTitle: {
      FR: "Votre solution rapide et fiable pour le remorquage et assistance routière",
      EN: "Your fast and reliable solution for towing and roadside assistance",
      AR: "حل سريع وموثوق لخدمات السحب والمساعدة على الطريق",
    },
    heroButton: { FR: "Réservez maintenant", EN: "Book Now", AR: "احجز الآن" },
    missionTitle: { FR: "Notre Mission", EN: "Our Mission", AR: "مهمتنا" },
    missionDesc: {
      FR: "Chez HIGHDEP, nous ne sommes pas simplement un service de dépannage, nous sommes votre partenaire de confiance sur la route.",
      EN: "At HIGHDEP, we are not just a repair service, we are your trusted partner on the road.",
      AR: "في HIGHDEP، نحن لسنا مجرد خدمة إنقاذ، بل شريكك الموثوق على الطريق.",
    },
    services: [
      {
        icon: <FaTools size={40} color="#3BC5F3" />,
        title: { FR: "Dépannage Sur Place", EN: "On-Site Repair", AR: "الإصلاح في الموقع" },
        desc: {
          FR: "Assistance rapide et petits entretiens pour remettre votre véhicule en marche.",
          EN: "Quick assistance and minor maintenance to get your vehicle running.",
          AR: "مساعدة سريعة وصيانة بسيطة لإعادة تشغيل سيارتك.",
        },
      },
      {
        icon: <FaTruck size={40} color="#3BC5F3" />,
        title: { FR: "Remorquage & Transport", EN: "Towing & Transport", AR: "السحب والنقل" },
        desc: {
          FR: "Remorquage immédiat et sécurisé pour garantir votre tranquillité.",
          EN: "Immediate and secure towing to ensure your peace of mind.",
          AR: "سحب آمن وفوري لضمان راحتك.",
        },
      },
      {
        icon: <FaBatteryFull size={40} color="#3BC5F3" />,
        title: { FR: "Assistance Batterie", EN: "Battery Assistance", AR: "مساعدة البطارية" },
        desc: {
          FR: "Intervention rapide pour remplacement ou recharge de batterie.",
          EN: "Quick intervention for battery replacement or recharge.",
          AR: "تدخل سريع لاستبدال أو شحن البطارية.",
        },
      },
    ],
    whyChoose: [
      {
        icon: <FaClock size={40} color="#3BC5F3" />,
        title: { FR: "Intervention Rapide", EN: "Fast Intervention", AR: "تدخل سريع" },
        desc: {
          FR: "Arrivée sur place en temps record pour vous remettre en sécurité.",
          EN: "Arriving quickly on-site to ensure your safety.",
          AR: "الوصول السريع لضمان سلامتك.",
        },
      },
      {
        icon: <FaCheckCircle size={40} color="#3BC5F3" />,
        title: { FR: "Service Fiable 24/7", EN: "Reliable 24/7 Service", AR: "خدمة موثوقة 24/7" },
        desc: {
          FR: "Disponible jour et nuit, week-end et jours fériés sans interruption.",
          EN: "Available day and night, weekends and holidays without interruption.",
          AR: "متاح يوميًا وعلى مدار الساعة، بما في ذلك العطل.",
        },
      },
      {
        icon: <FaCheckCircle size={40} color="#3BC5F3" />,
        title: { FR: "Expérience & Savoir-Faire", EN: "Experience & Expertise", AR: "خبرة ومهارة" },
        desc: {
          FR: "Équipe qualifiée habituée aux urgences routières.",
          EN: "Qualified team experienced with roadside emergencies.",
          AR: "فريق مؤهل وذو خبرة في الطوارئ على الطرق.",
        },
      },
      {
        icon: <FaCheckCircle size={40} color="#3BC5F3" />,
        title: { FR: "Travail de Confiance", EN: "Trusted Work", AR: "عمل موثوق" },
        desc: {
          FR: "Prestations transparentes et efficaces avec suivi professionnel.",
          EN: "Transparent and efficient services with professional follow-up.",
          AR: "خدمات شفافة وفعالة مع متابعة احترافية.",
        },
      },
    ],
    contactTitle: { FR: "Contactez-nous", EN: "Contact Us", AR: "تواصل معنا" },
    copyright: {
      FR: "© 2025 Highdep - Tous droits réservés",
      EN: "© 2025 Highdep - All rights reserved",
      AR: "© 2025 Highdep - جميع الحقوق محفوظة",
    },
  };

  return (
    <div
      style={{ fontFamily: "Arial, sans-serif" }}
      dir={language === "AR" ? "rtl" : "ltr"} // الاتجاه العام
    >
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <motion.img
          src={hero}
          alt="Hero"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            transform: `translateY(${offsetY * 0.2}px)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, rgba(0,58,84,0.7), rgba(59,197,243,0.7))",
            zIndex: 1,
          }}
        />

        <motion.img
          src={logo}
          alt="Logo"
          style={{
            width: "220px",
            marginBottom: "20px",
            zIndex: 2,
            filter: "drop-shadow(0 6px 30px rgba(0,0,0,0.6))",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <motion.p
          style={{
            fontSize: "24px",
            fontWeight: "500",
            margin: "20px auto 30px",
            maxWidth: "700px",
            textAlign: "center",
            zIndex: 2,
            textShadow: "0 3px 15px rgba(0,0,0,0.6)",
          }}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={1}
        >
          {text.heroTitle[language]}
        </motion.p>

        <motion.button
          style={{
            padding: "16px 36px",
            fontSize: "18px",
            backgroundColor: "#fff",
            color: "#003A54",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            zIndex: 2,
            boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: "#3BC5F3",
            color: "#fff",
            boxShadow: "0 14px 50px rgba(0,0,0,0.5)",
          }}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={2}
          onClick={() => navigate("/booking-choice")}
        >
          {text.heroButton[language]}
        </motion.button>
      </section>

      {/* Mission Section */}
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", marginBottom: "20px", color: "#003A54" }}>
          {text.missionTitle[language]}
        </h2>
        <p style={{ maxWidth: "800px", margin: "0 auto 40px", fontSize: "18px", lineHeight: "1.6" }}>
          {text.missionDesc[language]}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "30px",
            marginTop: "40px",
          }}
        >
          {text.services.map((service, idx) => (
            <div
              key={idx}
              style={{
                textAlign: "center",
                padding: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                borderRadius: "10px",
              }}
            >
              {service.icon}
              <h3 style={{ marginTop: "15px" }}>{service.title[language]}</h3>
              <p>{service.desc[language]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section style={{ padding: "80px 20px", background: "#003A54", color: "#fff" }}>
        <h2 style={{ fontSize: "36px", marginBottom: "40px", textAlign: "center" }}>
          {language === "AR" ? "لماذا تختارنا؟" : language === "EN" ? "Why Choose Us" : "POURQUOI NOUS CHOISIR"}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
          {text.whyChoose.map((item, idx) => (
            <div key={idx} style={{ textAlign: "center" }}>
              {item.icon}
              <h3 style={{ marginTop: "15px" }}>{item.title[language]}</h3>
              <p>{item.desc[language]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: "60px 20px", background: "#f5f9ff", textAlign: "center" }}>
        <h2>{text.contactTitle[language]}</h2>
        <p style={{ direction: "ltr", unicodeBidi: "bidi-override" }}>{phone}</p>
        <p style={{ direction: "ltr", unicodeBidi: "bidi-override" }}>{email}</p>
      </section>

      {/* Footer */}
      <footer style={{ padding: "20px", textAlign: "center", background: "#003A54", color: "#fff" }}>
        <p>{text.copyright[language]}</p>
      </footer>
    </div>
  );
}
