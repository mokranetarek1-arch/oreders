import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./AgencyLogin.css"; // استدعاء ملف CSS

export default function AgencyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        alert("المستخدم غير موجود");
        return;
      }

      const data = userDoc.data();

      // التوجيه حسب الدور
      if (data.role === "agency") {
        navigate("/agency-dashboard"); 
      } else {
        navigate("/booking-choice"); 
      }

    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء تسجيل الدخول: " + err.message);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card shadow-lg p-4">
        <h2 className="text-center mb-4">تسجيل دخول الوكالة</h2>
        <form onSubmit={handleLogin}>
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
          <div className="form-group mb-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            تسجيل الدخول
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="mb-0">ما عندكش حساب؟</p>
          <button 
            className="btn btn-outline-secondary mt-2 w-100"
            onClick={() => navigate("/register")}
          >
            إنشاء حساب جديد
          </button>
        </div>
      </div>
    </div>
  );
}
