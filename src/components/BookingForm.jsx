import React, { useState, useRef, useEffect, useContext } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Card, Form, Button } from "react-bootstrap";
import { LanguageContext } from "../context/LanguageContext";

export default function BookingForm({ userType = "customer" }) {
  const { language } = useContext(LanguageContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [carName, setCarName] = useState("");
  const [imatriculation, setImatriculation] = useState("");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [simPrice, setSimPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const startRef = useRef(null);
  const endRef = useRef(null);

  const API_KEY = "AIzaSyC2956nP5LknC6VXWodeYP7RRU-Yt217Ek";

  // نصوص حسب اللغة
  const text = {
    title: { AR: "احجز خدمتك الآن 🚗", EN: "Book Your Service Now 🚗", FR: "Réservez votre service maintenant 🚗" },
    firstName: { AR: "الاسم", EN: "First Name", FR: "Prénom" },
    lastName: { AR: "اللقب", EN: "Last Name", FR: "Nom" },
    phone: { AR: "رقم الهاتف", EN: "Phone", FR: "Téléphone" },
    carName: { AR: "اسم السيارة", EN: "Car Name", FR: "Nom de la voiture" },
    imatriculation: { AR: "رقم التسجيل", EN: "Registration Number", FR: "Numéro d'immatriculation" },
    date: { AR: "التاريخ والوقت", EN: "Date & Time", FR: "Date & Heure" },
    start: { AR: "نقطة الانطلاق", EN: "Start Point", FR: "Point de départ" },
    end: { AR: "وجهة الوصول", EN: "Destination", FR: "Destination" },
    myPosition: { AR: "اختر موقعي الحالي", EN: "Use My Current Location", FR: "Utiliser ma position actuelle" },
    calcPrice: { AR: "حساب السعر المقدر", EN: "Calculate Estimated Price", FR: "Calculer le prix estimé" },
    estimatedPrice: { AR: "السعر المقدر", EN: "Estimated Price", FR: "Prix estimé" },
    submit: { AR: "إرسال الطلب", EN: "Submit Order", FR: "Envoyer la commande" },
    sending: { AR: "جاري الإرسال...", EN: "Sending...", FR: "Envoi en cours..." },
    priceAlert: { AR: "الرجاء حساب السعر أولاً", EN: "Please calculate the price first", FR: "Veuillez calculer le prix d'abord" },
    startEndAlert: { AR: "الرجاء إدخال نقطتي البداية والنهاية", EN: "Please enter start and end points", FR: "Veuillez entrer les points de départ et d'arrivée" },
    geocodeFail: { AR: "تعذر تحديد المواقع بدقة", EN: "Unable to determine locations accurately", FR: "Impossible de déterminer les emplacements avec précision" },
    locationFail: { AR: "تعذر الحصول على موقعك", EN: "Unable to get your location", FR: "Impossible d'obtenir votre position" },
    locationConvertFail: { AR: "تعذر تحويل موقعك إلى عنوان", EN: "Unable to convert your location to address", FR: "Impossible de convertir votre position en adresse" },
    success: { AR: "تم الإرسال ✅", EN: "Sent ✅", FR: "Envoyé ✅" },
  };

  // تحميل Google Maps ديناميكياً
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
      script.async = true;
      script.onload = initAutocomplete;
      document.body.appendChild(script);
    } else {
      initAutocomplete();
    }
  }, []);

  const initAutocomplete = () => {
    if (window.google && startRef.current && endRef.current) {
      const startAuto = new window.google.maps.places.Autocomplete(startRef.current, { types: ["geocode"] });
      startAuto.addListener("place_changed", () =>
        setStart(startAuto.getPlace().formatted_address || startRef.current.value)
      );
      const endAuto = new window.google.maps.places.Autocomplete(endRef.current, { types: ["geocode"] });
      endAuto.addListener("place_changed", () =>
        setEnd(endAuto.getPlace().formatted_address || endRef.current.value)
      );
    }
  };

  const geocodeAddress = async (address) => {
    if (!address) return null;
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
    );
    const data = await res.json();
    if (data.status === "OK") {
      const result = data.results[0];
      return {
        formattedAddress: result.formatted_address,
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
      };
    }
    return null;
  };

  const calculatePrice = async () => {
    if (!start || !end) return alert(text.startEndAlert[language]);
    const startLoc = await geocodeAddress(start);
    const endLoc = await geocodeAddress(end);
    if (!startLoc || !endLoc) return alert(text.geocodeFail[language]);

    const R = 6371;
    const dLat = ((endLoc.lat - startLoc.lat) * Math.PI) / 180;
    const dLon = ((endLoc.lng - startLoc.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((startLoc.lat * Math.PI) / 180) *
        Math.cos((endLoc.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    setSimPrice(`${Math.round(distance * 50)} دج`);
  };

  const useMyPosition = async () => {
    if (!navigator.geolocation) return alert(text.locationFail[language]);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
        );
        const data = await res.json();
        if (data.status === "OK") setStart(data.results[0].formatted_address);
        else alert(text.locationConvertFail[language]);
      },
      () => alert(text.locationFail[language])
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!simPrice && userType === "customer") return alert(text.priceAlert[language]);

    setLoading(true);
    try {
      const user = auth.currentUser;
      const data = {
        firstName,
        lastName,
        phone,
        carName,
        imatriculation,
        date,
        start,
        end,
        status: "Pending",
        price: simPrice,
        createdAt: serverTimestamp(),
      };
      if (userType === "agency" && user) data.agencyId = user.uid;
      await addDoc(collection(db, "orders"), data);
      alert(text.success[language]);
      setFirstName("");
      setLastName("");
      setPhone("");
      setCarName("");
      setImatriculation("");
      setDate("");
      setStart("");
      setEnd("");
      setSimPrice("");
    } catch (err) {
      console.error(err);
      alert(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 shadow-lg rounded-3" style={{ direction: language === "AR" ? "rtl" : "ltr" }}>
      <Card.Body>
        <h3 className="mb-4 text-center">{text.title[language]}</h3>
        <Form onSubmit={submit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Control
                type="text"
                placeholder={text.firstName[language]}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <Form.Control
                type="text"
                placeholder={text.lastName[language]}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Control
              type="tel"
              placeholder={text.phone[language]}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{ direction: "ltr" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder={text.carName[language]}
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder={text.imatriculation[language]}
              value={imatriculation}
              onChange={(e) => setImatriculation(e.target.value)}
              required
              style={{ direction: "ltr" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder={text.start[language]}
              value={start}
              ref={startRef}
              onChange={(e) => setStart(e.target.value)}
              required
            />
            <Button
              variant="outline-secondary"
              size="sm"
              className="mt-2"
              onClick={useMyPosition}
            >
              {text.myPosition[language]}
            </Button>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder={text.end[language]}
              value={end}
              ref={endRef}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            type="button"
            className="btn btn-info w-100 mb-3"
            onClick={calculatePrice}
          >
            {text.calcPrice[language]}
          </Button>

          {simPrice && (
            <p className="text-center text-success fs-5">
              {text.estimatedPrice[language]}: <strong>{simPrice}</strong>
            </p>
          )}

          <Button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? text.sending[language] : text.submit[language]}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
