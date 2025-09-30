// src/pages/BookingCustomer.jsx
import React from "react";
import BookingForm from "../components/BookingForm";

export default function BookingCustomer() {
  return (
    <div className="container py-5">
      <h3 className="mb-4 text-center">مرحبا بك، 👋</h3>
      <BookingForm userType="customer" />
    </div>
  );
}
