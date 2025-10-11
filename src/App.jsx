import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import AppNavbar from "./components/Navbar"; // ← Navbar

import Home from "./pages/Home";
import BookingChoice from "./pages/BookingChoice"; 
import CustomerBooking from "./pages/CustomerBooking";  
import AgencyDashboard from "./pages/AgencyDashboard";  
import About from "./pages/About";
import Contact from "./pages/Contact";
import AgencyLogin from "./pages/AgencyLogin";
import Register from "./pages/Register";

// ✅ صفحات السوق
import Market from "./pages/Market";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <AppNavbar />

      {/* Routes */}
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking-choice" element={<BookingChoice />} /> 
          <Route path="/booking-customer" element={<CustomerBooking />} /> 
          <Route path="/agency-dashboard" element={<AgencyDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agency-login" element={<AgencyLogin />} />
          <Route path="/register" element={<Register role="agency" />} />

          {/* Market & Product Detail */}
          <Route path="/market" element={<Market />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
