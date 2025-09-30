// src/pages/About.jsx
import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { LanguageContext } from "../context/LanguageContext";

export default function About() {
  const { language = "EN" } = useContext(LanguageContext);

  // ضبط اتجاه الصفحة حسب اللغة
  useEffect(() => {
    document.documentElement.dir = language === "AR" ? "rtl" : "ltr";
  }, [language]);

  // نصوص الصفحة باللغتين
  const texts = {
    EN: {
      heroTitle: "ℹ️ About Us",
      heroDesc:
        "A specialized team in towing and roadside assistance, providing fast and safe solutions for transporting your vehicles within and outside the city with real-time tracking.",
      cards: [
        { icon: "🚀", title: "Fast Service", text: "Our teams arrive quickly to efficiently handle your requests." },
        { icon: "🔒", title: "Guaranteed Safety", text: "We ensure the safety of your vehicles using top equipment for problem-free transport." },
        { icon: "📞", title: "Continuous Tracking", text: "We provide live updates on your request so you stay informed throughout the process." },
      ],
      aboutText: [
        "We believe service quality is not only in speed but also in professionalism and handling each case responsibly. Our team is trained and equipped with the latest tools to deliver an excellent experience for every client.",
        "Our vision is to be the first choice in towing and roadside assistance, with full commitment to transparency and credibility. Customer satisfaction is at the core of everything we do.",
      ],
    },
    AR: {
      heroTitle: "ℹ️ من نحن",
      heroDesc:
        "فريق متخصص في خدمات الراب والجر، نقدم حلول سريعة وآمنة لنقل سياراتكم داخل وخارج المدينة مع متابعة لحظة بلحظة.",
      cards: [
        { icon: "🚀", title: "خدمة سريعة", text: "نضمن وصول فرقنا في أسرع وقت ممكن لتلبية طلباتك بفعالية وسلاسة." },
        { icon: "🔒", title: "أمان مضمون", text: "نهتم بأمان سياراتكم ونستخدم أفضل المعدات لضمان النقل بدون مشاكل." },
        { icon: "📞", title: "متابعة مستمرة", text: "نقدم تحديثات لحظية حول حالة طلبك، لتكون مطمئنًا طوال العملية." },
      ],
      aboutText: [
        "نحن نؤمن بأن جودة الخدمة ليست فقط في السرعة بل في الاحترافية والتعامل مع كل حالة بأعلى مستوى من المسؤولية. فريقنا متدرب ومجهز بأحدث الأدوات لتقديم تجربة متميزة لكل عميل.",
        "رؤيتنا هي أن نكون الخيار الأول في خدمات الراب والجر، مع التزام كامل بالشفافية والمصداقية. نضع رضا العميل في صميم كل ما نقوم به.",
      ],
    },
  };

  // fallback إذا حدث خطأ
  const t = texts[language] || texts["EN"];

  return (
    <div style={{ backgroundColor: "#f5f9ff", minHeight: "100vh", paddingBottom: "60px" }}>
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #003A54, #3BC5F3)",
          color: "#fff",
          padding: "80px 20px",
          textAlign: "center",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ fontSize: "48px", fontWeight: "700", lineHeight: "1.2" }}>{t.heroTitle}</h1>
        <p style={{ fontSize: "20px", maxWidth: "800px", margin: "20px auto 0" }}>{t.heroDesc}</p>
      </div>

      {/* Cards Section */}
      <Container className="mt-5">
        <Row className="g-4">
          {t.cards.map((card, idx) => (
            <Col key={idx} md={4}>
              <Card
                className="h-100 shadow-lg border-0 text-center p-4"
                style={{
                  borderRadius: "15px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  style={{
                    fontSize: "50px",
                    marginBottom: "15px",
                    transition: "transform 0.3s, text-shadow 0.3s",
                  }}
                  className="hover-icon"
                >
                  {card.icon}
                </div>
                <Card.Title style={{ color: "#003A54", fontWeight: "700", fontSize: "22px" }}>
                  {card.title}
                </Card.Title>
                <Card.Text style={{ fontSize: "16px", color: "#555" }}>{card.text}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>

        {/* About Text */}
        <div
          className="mt-5"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#333",
            textAlign: language === "AR" ? "right" : "left",
          }}
        >
          {t.aboutText.map((p, idx) => (
            <p key={idx} style={{ marginBottom: "20px" }}>
              {p}
            </p>
          ))}
        </div>
      </Container>

      {/* CSS for icon hover glow */}
      <style>
        {`
          .hover-icon:hover {
            transform: scale(1.3);
            text-shadow: 0 0 15px #3BC5F3, 0 0 30px #3BC5F3;
          }
        `}
      </style>
    </div>
  );
}
