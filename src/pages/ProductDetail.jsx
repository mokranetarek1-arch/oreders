import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetail.css";

const wilayas = [
  "01-Adrar","02-Chlef","03-Laghouat","04-Oum El Bouaghi","05-Batna","06-Bejaia","07-Biskra","08-Bechar",
  "09-Blida","10-Bouira","11-Tamanrasset","12-Tebessa","13-Tlemcen","14-Tiaret","15-Tizi Ouzou","16-Alger",
  "17-Djelfa","18-Jijel","19-Setif","20-Saida","21-Skikda","22-Sidi Bel Abbes","23-Annaba","24-Guelma",
  "25-Constantine","26-Medea","27-Mostaganem","28-M'Sila","29-Mascara","30-Ouargla","31-Oran","32-El Bayadh",
  "33-Illizi","34-Bordj Bou Arreridj","35-Boumerdes","36-El Tarf","37-Tindouf","38-Tissemsilt","39-El Oued",
  "40-Khenchela","41-Souk Ahras","42-Tipaza","43-Mila","44-Ain Defla","45-Naama","46-Ain Temouchent",
  "47-Ghardaia","48-Relizane","49-Timimoun","50-Bordj Badji Mokhtar","51-Ouled Djellal","52-Beni Abbes",
  "53-In Salah","54-In Guezzam","55-Touggourt","56-Djanet","57-El M'Ghair","58-El Meniaa"
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [wilaya, setWilaya] = useState("");
  const [adresse, setAdresse] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setProduct({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) setTotalPrice((Number(product.price) || 0) * quantity);
  }, [quantity, product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !wilaya || !adresse || !phoneNumber) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await addDoc(collection(db, "product_orders"), {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        wilaya,
        adresse,
        phoneNumber,
        clientName: fullName,
        totalPrice: Number(totalPrice),
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setQuantity(1);
      setWilaya("");
      setAdresse("");
      setPhoneNumber("");
      setFullName("");
      setMessage("Commande envoyee avec succes.");
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'envoi de la commande.");
    }
  };

  if (loading) return <p className="text-center mt-5">Chargement...</p>;
  if (!product) return <p className="text-center mt-5">Produit introuvable.</p>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const generatedOldPrice = Math.round((Number(product.price) || 0) * 1.2);

  return (
    <section className="pd-page">
      <div className="container py-5">
        <div className="pd-wrapper row g-4">
          <div className="col-lg-6">
            <div className="pd-slider-wrap">
              {product.imageURLs?.length > 0 ? (
                <Slider {...sliderSettings}>
                  {product.imageURLs.map((url, index) => (
                    <div key={index} className="pd-slide">
                      <img src={url} alt={`${product.name} ${index + 1}`} />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img src={product.imageURL} alt={product.name} className="pd-single-image" />
              )}
            </div>

            <div className="pd-description mt-3">
              <h5>Details produit</h5>
              <p>{product.description || "Aucune description"}</p>
            </div>
          </div>

          <div className="col-lg-6">
            <h2 className="pd-title">{product.name}</h2>

            <div className="pd-price-box">
              <div className="pd-old-price">{generatedOldPrice.toLocaleString()} DZD</div>
              <div className="pd-new-price">{(Number(product.price) || 0).toLocaleString()} DZD</div>
              <span className="pd-offer">Offre speciale</span>
            </div>

            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit} className="pd-form">
              <div className="mb-3">
                <label className="form-label">Nom complet</label>
                <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>

              <div className="mb-3">
                <label className="form-label">Quantite</label>
                <div className="d-flex align-items-center">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}>-</button>
                  <input type="text" className="form-control text-center mx-2" value={quantity} readOnly style={{ maxWidth: "90px" }} />
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setQuantity((q) => q + 1)}>+</button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Wilaya</label>
                <select className="form-select" value={wilaya} onChange={(e) => setWilaya(e.target.value)}>
                  <option value="">Selectionner</option>
                  {wilayas.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Adresse</label>
                <input type="text" className="form-control" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
              </div>

              <div className="mb-3">
                <label className="form-label">Telephone</label>
                <input type="text" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>

              <div className="mb-4">
                <label className="form-label">Total (DZD)</label>
                <input type="number" className="form-control" value={totalPrice} readOnly />
              </div>

              <button type="submit" className="btn pd-submit-btn w-100">Commander maintenant</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
