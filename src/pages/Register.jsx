import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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

      // توجيه تلقائي حسب الدور
      if (role === "agency") {
        navigate("/booking");  // الوكالات تذهب مباشرة للـ BookingForm
      } else {
        navigate("/booking-form"); // الزبائن العاديين
      }

    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء إنشاء الحساب: " + err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ maxWidth: 400, margin: "0 auto" }}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="الاسم" required />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="البريد الإلكتروني" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="كلمة المرور" required />
      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="رقم الهاتف" required />
      <button type="submit">تسجيل</button>
    </form>
  );
}
