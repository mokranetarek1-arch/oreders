// src/pages/Market.jsx
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import './Market.css';

const Market = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-5">جارٍ تحميل المنتجات...</p>;

  return (
    <div className="market-container container mt-4">
      <h2 className="mb-4 text-center">مرحبا بكم في المتجر</h2>
      {products.length === 0 ? (
        <div className="alert alert-info text-center">لا توجد منتجات حاليا.</div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const images = product.imageURLs && product.imageURLs.length > 0 ? product.imageURLs : [product.imageURL];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="product-card">
      <div className="product-image-card">
        <img src={images[currentIndex]} alt={product.name} />

        {/* أسهم التنقل الشفافة */}
        {images.length > 1 && (
          <>
            <button className="image-nav-btn left" onClick={prevImage}>❮</button>
            <button className="image-nav-btn right" onClick={nextImage}>❯</button>
          </>
        )}

        {/* أيقونة التفاصيل */}
        {product.description && (
          <div className="product-detail-icon">
            ℹ️
            <div className="product-detail-tooltip">
              {product.description}
            </div>
          </div>
        )}
      </div>

      <div className="product-card-body">
        <div className="product-card-title">{product.name}</div>
        <div className="product-card-price">{product.price.toLocaleString()} دج</div>
        <Link to={`/product/${product.id}`} className="btn btn-success btn-order">
          اطلب الآن
        </Link>
      </div>
    </div>
  );
};

export default Market;
