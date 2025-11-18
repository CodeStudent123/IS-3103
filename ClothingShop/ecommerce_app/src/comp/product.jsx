import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import productsData from './productDetails';
import "./styling/productCart.css"; 

const Product = ({ addToCart, cart }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = productsData.filter((prod) =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Products</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search shirts..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => {
            const inCart = cart.find((item) => item.id === prod.id);
            return (
              <div key={prod.id} className="product-card">
                <div className="image-wrapper">
                  <img src={prod.image} alt={prod.name} />
                </div>
                <h3>{prod.name}</h3>
                <p>₱{prod.price}</p>

                {/* View Details Button */}
                <Link to={`/product/${prod.id}`} className="view-details-btn">
                  View Details
                </Link>

                {inCart && <p className="in-cart-text">Already in Cart</p>}
              </div>
            );
          })
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
