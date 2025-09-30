import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import towTruck from "../assets/tow-truck.png"; // الشاحنة البيضاء
import "./BookingChoice.css";

export default function BookingChoice() {
  const navigate = useNavigate();
  const { language = "EN" } = useContext(LanguageContext);

  const text = {
    title: {
      AR: "اختر نوع المستخدم",
      EN: "Select User Type",
      FR: "Choisissez le type d'utilisateur",
    },
    subtitle: {
      AR: "حدد نوع حسابك للبدء في الخدمة",
      EN: "Choose your account type to start the service",
      FR: "Sélectionnez votre type de compte pour commencer le service",
    },
    customer: { AR: "زبون عادي", EN: "Regular Customer", FR: "Client régulier" },
    agency: { AR: "وكالة / محترف", EN: "Agency / Professional", FR: "Agence / Professionnel" },
  };

  const handleCustomer = () => navigate("/booking-customer");
  const handleAgency = () => navigate("/agency-login");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #003A54, #3BC5F3)",
        color: "#fff",
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      {/* Hero */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "700", marginBottom: "20px" }}>
          {text.title[language]}
        </h1>
        <p style={{ fontSize: "20px", maxWidth: "700px", margin: "0 auto" }}>
          {text.subtitle[language]}
        </p>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-4 flex-wrap" style={{ direction: language === "AR" ? "rtl" : "ltr" }}>
        <button className="booking-btn customer" onClick={handleCustomer}>
          {text.customer[language]}
        </button>
        <button className="booking-btn agency" onClick={handleAgency}>
          {text.agency[language]}
        </button>
      </div>

      {/* الشاحنة أسفل الأزرار */}
      <div className="truck-container">
        <img src={towTruck} alt="Tow Truck" className="truck" />
      </div>
    </div>
  );
}
