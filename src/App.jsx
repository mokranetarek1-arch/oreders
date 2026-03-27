import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppNavbar from "./components/Navbar";

import Home from "./pages/Home";
import BookingChoice from "./pages/BookingChoice";
import CustomerBooking from "./pages/CustomerBooking";
import AgencyDashboard from "./pages/AgencyDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AgencyLogin from "./pages/AgencyLogin";
import Register from "./pages/Register";
import Market from "./pages/Market";
import ProductDetail from "./pages/ProductDetail";
import Booking from "./pages/Booking";
import Partner from "./pages/Partner";

import "./App.css";

function App() {
  return (
    <Router>
      <AppNavbar />
      <main className="app-main-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking-choice" element={<BookingChoice />} />
          <Route path="/booking-customer" element={<CustomerBooking />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/agency-dashboard" element={<AgencyDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agency-login" element={<AgencyLogin />} />
          <Route path="/login" element={<AgencyLogin />} />
          <Route path="/register" element={<Register role="agency" />} />
          <Route path="/market" element={<Market />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
