// src/pages/Contact.jsx
import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم إرسال رسالتك بنجاح ✅");
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">📞 اتصل بنا</h1>
      <Card className="p-4 shadow">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>الاسم:</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>البريد الإلكتروني:</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>الرسالة:</Form.Label>
            <Form.Control as="textarea" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">إرسال الرسالة</Button>
        </Form>
      </Card>
    </Container>
  );
}
