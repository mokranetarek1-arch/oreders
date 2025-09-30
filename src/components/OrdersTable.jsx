import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { Table } from "react-bootstrap";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return; // إذا لم يسجل الدخول وكالة

    const q = query(
      collection(db, "orders"),
      where("agencyId", "==", user.uid), // فقط طلبات الوكالة
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, []);

  const renderBadge = (status) => {
    if (status === "Pending") return <span className="badge bg-warning px-2">Pending</span>;
    if (status === "Accepted") return <span className="badge bg-info px-2">Accepted</span>;
    if (status === "Done") return <span className="badge bg-success px-2">Done</span>;
    return <span className="badge bg-secondary px-2">{status}</span>;
  };

  return (
    <div className="mt-4">
      <h5>طلباتك الأخيرة</h5>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>اسم السيارة</th>
            <th>رقم التسجيل</th>
            <th>السعر</th>
            <th>رقم هاتف الزبون</th>
            <th>من</th>
            <th>إلى</th>
            <th>تاريخ</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={o.id}>
              <td>{i + 1}</td>
              <td>{o.carName}</td>
              <td>{o.imatriculation}</td>
              <td>{o.price}</td>
              <td>{o.phone}</td>
              <td>{o.startPoint}</td>
              <td>{o.endPoint}</td>
              <td>{o.date ? o.date : "-"}</td>
              <td>{renderBadge(o.status)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
