import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // import useNavigate
import products from "./productDetails";
import "./styling/productDetail.css"; 

const ProductDetail = ({ addToCart, cart }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // navigation hook
  const product = products.find((p) => p.id === parseInt(id));
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) return <h2>Product not found</h2>;

  const inCart = cart.find(
    (item) => item.id === product.id && item.size === size
  );

  const sizes = ["S", "M", "L", "XL"];

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="product-detail-page">
      {/* 🔙 Back Button */}
      <button className="back-btn" onClick={() => navigate("/product")}>
        <span className="back-icon">←</span>
      </button>

      <div className="product-detail-container">
        <div className="product-detail-left">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-right">
          <h2>{product.name}</h2>

          <div className="price-container">
            <span className="price">₱{product.price}</span>
            {product.oldPrice && (
              <>
                <span className="old-price">₱{product.oldPrice}</span>
                <span className="discount">-{product.discount}%</span>
              </>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          <div className="size-container">
            <span>Choose Size:</span>
            <div className="size-boxes">
              {sizes.map((s) => (
                <div
                  key={s}
                  className={`size-box ${size === s ? "selected" : ""}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="quantity-container">
            <span>Quantity:</span>
            <div className="quantity-box">
              <button className="qty-btn" onClick={decreaseQty}>-</button>
              <span className="qty-value">{quantity}</span>
              <button className="qty-btn" onClick={increaseQty}>+</button>
            </div>
          </div>

          {inCart ? (
            <div className="already-in-cart">Already in Cart</div>
          ) : (
            <button
              className="btn"
              onClick={() => {
                if (!size) {
                  alert("Please select a size before adding to cart.");
                  return;
                }
                addToCart({ ...product, size, quantity });
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
