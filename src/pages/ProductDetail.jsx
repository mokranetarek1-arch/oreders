import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetail.css";

const wilayas = [
  "01-Adrar","02-Chlef","03-Laghouat","04-Oum El Bouaghi","05-Batna","06-Béjaïa",
  "07-Biskra","08-Béchar","09-Blida","10-Bouira","11-Tamanrasset","12-Tébessa",
  "13-Tlemcen","14-Tiaret","15-Tizi Ouzou","16-Alger","17-Djelfa","18-Jijel",
  "19-Sétif","20-Saïda","21-Skikda","22-Sidi Bel Abbès","23-Annaba","24-Guelma",
  "25-Constantine","26-Médéa","27-Mostaganem","28-M'Sila","29-Mascara","30-Ouargla",
  "31-Oran","32-El Bayadh","33-Illizi","34-Bordj Bou Arreridj","35-Boumerdès",
  "36-El Tarf","37-Tindouf","38-Tissemsilt","39-El Oued","40-Khenchela","41-Souk Ahras",
  "42-Tipaza","43-Mila","44-Aïn Defla","45-Naâma","46-Aïn Témouchent","47-Ghardaïa",
  "48-Relizane","49-Timimoun","50-Bordj Badji Mokhtar","51-Ouled Djellal","52-Béni Abbès",
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
    if (product) setTotalPrice(product.price * quantity);
  }, [quantity, product]);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !wilaya || !adresse || !phoneNumber) {
      setMessage("الرجاء تعبئة جميع الحقول قبل إرسال الطلب!");
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
      setTotalPrice(0);
      alert(`✅ شكرًا ${fullName} على شرائك ${product.name}! طلبك تم إرساله بنجاح.`);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("❌ وقع خطأ أثناء إرسال الطلب.");
    }
  };

  if (loading) return <p className="text-center mt-5">جارٍ تحميل المنتج...</p>;
  if (!product) return <p className="text-center mt-5">المنتج غير موجود.</p>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="product-detail-container container mt-5">
      <div className="row shadow-lg p-4 rounded bg-light">
        {/* صور المنتج */}
        <div className="col-md-6 mb-4 mb-md-0 text-center">
          <div className="product-slider-wrapper">
            {product.imageURLs && product.imageURLs.length > 0 ? (
              <Slider {...sliderSettings}>
                {product.imageURLs.map((url, index) => (
                  <div key={index} className="slider-image-container">
                    <img src={url} alt={`${product.name} ${index + 1}`} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="slider-image-container">
                <img src={product.imageURL} alt={product.name} />
              </div>
            )}
          </div>

          {/* وصف المنتج */}
          <div className="product-info-hover mt-3">
            <h5>تفاصيل المنتج</h5>
            <p>{product.description}</p>
          </div>
        </div>

        {/* نموذج الطلب */}
        <div className="col-md-6">
          <h2 className="mb-3">{product.name}</h2>
          <h4 className="text-primary mb-4">{product.price.toLocaleString()} دج</h4>
          {message && <div className="alert alert-danger">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">الاسم الكامل</label>
              <input type="text" className="form-control shadow-sm"
                value={fullName} onChange={(e) => setFullName(e.target.value)}
                placeholder="ادخل اسمك الكامل" required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">الكمية</label>
              <div className="d-flex align-items-center">
                <button type="button" className="btn btn-outline-secondary" onClick={decrementQuantity}>-</button>
                <input type="text" className="form-control text-center mx-2"
                  value={quantity} readOnly style={{ maxWidth: "80px" }} />
                <button type="button" className="btn btn-outline-secondary" onClick={incrementQuantity}>+</button>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">الولاية</label>
              <select className="form-select shadow-sm"
                value={wilaya} onChange={(e) => setWilaya(e.target.value)} required>
                <option value="">اختر الولاية</option>
                {wilayas.map((w, index) => (<option key={index} value={w}>{w}</option>))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">العنوان</label>
              <input type="text" className="form-control shadow-sm"
                value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">رقم الهاتف</label>
              <input type="text" className="form-control shadow-sm"
                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">المجموع الكلي (دج)</label>
              <input type="number" className="form-control shadow-sm" value={totalPrice} readOnly />
            </div>

            <button type="submit" className="btn btn-success w-100 shadow-sm fw-bold">
              🛒 إرسال الطلب
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
