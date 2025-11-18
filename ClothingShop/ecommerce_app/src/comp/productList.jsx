import React from "react";
import { Link } from "react-router-dom";
import products from "./productDetails";

const ProductList = () => {
  return (
    <div>
      <h2>All Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>₱{product.price}</p>
            <Link to={`/product/${product.id}`}>
              <button className="btn">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
