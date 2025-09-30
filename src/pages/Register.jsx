import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Register.css"; // ملف التنسيقات

export default function Register({ role = "agency" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        role,
        createdAt: new Date()
      });

      if (role === "agency") {
        navigate("/booking");
      } else {
        navigate("/booking-form");
      }

    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء إنشاء الحساب: " + err.message);
    }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center">
      <div className="register-card shadow-lg p-4">
        <h2 className="text-center mb-4">إنشاء حساب جديد</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="الاسم الكامل"
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="رقم الهاتف"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            إنشاء الحساب
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="mb-0">عندك حساب بالفعل؟</p>
          <button
            className="btn btn-outline-primary mt-2 w-100"
            onClick={() => navigate("/login")}
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  );
}
