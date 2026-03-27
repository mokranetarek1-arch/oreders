import React from "react";
import BookingForm from "../components/BookingForm";
import Seo from "../components/Seo";
import depVideo from "../assets/Dep.mp4";
import "./CustomerBooking.css";

export default function BookingCustomer() {
  return (
    <section className="cb-page">
      <Seo
        title="Demande de Depannage Auto"
        description="Envoyez votre demande de depannage auto, remorquage ou assistance routiere HIGHDEP avec calcul du kilometrage avant confirmation."
        path="/booking-customer"
        keywords="demande depannage auto, remorquage voiture, assistance routiere reservation"
      />

      <video autoPlay loop muted playsInline className="cb-video">
        <source src={depVideo} type="video/mp4" />
      </video>
      <div className="cb-overlay" />

      <div className="container py-5 cb-content">
        <h3 className="mb-4 text-center cb-title">Bienvenue</h3>
        <BookingForm userType="customer" />
      </div>
    </section>
  );
}
