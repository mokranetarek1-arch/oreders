import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Image, Dropdown } from "react-bootstrap";
import { FaHome, FaCalendarAlt, FaInfoCircle, FaPhone, FaGlobe } from "react-icons/fa";
import { LanguageContext } from "../context/LanguageContext";

// استدعاء الصورة من src/assets
import IconLogo from "../assets/ICON.png";

export default function AppNavbar() {
  const [expanded, setExpanded] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleNavbar = () => setExpanded(!expanded);

  // تغيير اتجاه الصفحة عند العربية
  useEffect(() => {
    document.documentElement.dir = language === "AR" ? "rtl" : "ltr";
  }, [language]);

  // روابط Navbar
  const links = [
    { path: "/", labelFR: "Accueil", labelAR: "الرئيسية", labelEN: "Home", icon: <FaHome size={20} /> },
    { path: "/booking-choice", labelFR: "Réservation", labelAR: "الحجز", labelEN: "Booking", icon: <FaCalendarAlt size={20} /> },
    { path: "/market", labelFR: "Marché", labelAR: "السوق", labelEN: "Market", icon: <FaGlobe size={20} /> }, // ✅ الرابط الجديد
    { path: "/about", labelFR: "À propos", labelAR: "من نحن", labelEN: "About", icon: <FaInfoCircle size={20} /> },
    { path: "/contact", labelFR: "Contact", labelAR: "اتصل بنا", labelEN: "Contact", icon: <FaPhone size={20} /> },
  ];

  const getLabel = (link) => {
    if (language === "FR") return link.labelFR;
    if (language === "AR") return link.labelAR;
    if (language === "EN") return link.labelEN;
  };

  return (
    <>
      <Navbar
        expand="lg"
        expanded={expanded}
        fixed="top"
        className="shadow-sm"
        style={{
          background: "rgba(0, 58, 84, 0.95)",
          backdropFilter: "blur(8px)",
          padding: "0.5rem 1rem",
          transition: "0.3s",
          direction: "ltr", // Navbar يبقى LTR
        }}
      >
        <Container>
          {/* Logo: ICON.png */}
          <Navbar.Brand as={NavLink} to="/" onClick={() => setExpanded(false)}>
            <Image
              src={IconLogo}   // ← هنا التعديل
              alt="Logo"
              height="50"
              style={{ filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.5))" }}
            />
          </Navbar.Brand>

          {/* Toggle (الهامبرغر) */}
          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={toggleNavbar}
            style={{ borderColor: "#3BC5F3", transition: "transform 0.3s" }}
          />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center">
              {links.map((link, idx) => (
                <Nav.Link
                  key={idx}
                  as={NavLink}
                  to={link.path}
                  onClick={() => setExpanded(false)}
                  style={({ isActive }) => ({
                    color: isActive ? "#3BC5F3" : "#fff",
                    fontWeight: "500",
                    marginLeft: "1rem",
                    transition: "0.3s",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  })}
                  className="nav-link-custom"
                >
                  {link.icon} {getLabel(link)}
                </Nav.Link>
              ))}

              {/* Dropdown اختيار اللغة */}
              <Dropdown style={{ marginLeft: "1rem" }}>
                <Dropdown.Toggle
                  variant="primary"
                  style={{
                    backgroundColor: "#3BC5F3",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <FaGlobe /> {language}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={() => setLanguage("FR")}>FR - Français</Dropdown.Item>
                  <Dropdown.Item onClick={() => setLanguage("AR")}>AR - العربية</Dropdown.Item>
                  <Dropdown.Item onClick={() => setLanguage("EN")}>EN - English</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Padding للـContent باش المكونات ما يختفاوش تحت Navbar */}
      <div style={{ paddingTop: "80px" }} />

      <style>
        {`
          .nav-link-custom:hover {
            color: #3BC5F3 !important;
            text-decoration: underline;
          }
        `}
      </style>
    </>
  );
}
