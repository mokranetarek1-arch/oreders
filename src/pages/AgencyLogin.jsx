import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

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
        navigate("/agency-dashboard"); // الوكالة تذهب مباشرة للـ BookingForm
      } else {
        navigate("/booking-choice"); // الزبون العادي
      }

    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء تسجيل الدخول: " + err.message);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">تسجيل دخول الوكالة</h2>
      <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: "400px" }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="البريد الإلكتروني" className="form-control mb-2" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="كلمة المرور" className="form-control mb-3" required />
        <button type="submit" className="btn btn-primary w-100">تسجيل الدخول</button>
      </form>
    </div>
  );
}
