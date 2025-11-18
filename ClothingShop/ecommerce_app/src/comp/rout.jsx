import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "./product.jsx";
import ProductDetail from "./productDetail.jsx";
import Cart from "./cart.jsx";
import Home from "./home.jsx";  
import Order from "./order.jsx";  

const Rout = ({ cart, orders, setOrders, clearCart, addToCart, updateQuantity, removeFromCart }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  
      <Route path="/product" element={<Product addToCart={addToCart} cart={cart} />} />
      <Route
        path="/product/:id"
        element={<ProductDetail addToCart={addToCart} cart={cart} />}
      />
      <Route
        path="/cart"
        element={
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            setOrders={setOrders}
            orders={orders}
            clearCart={clearCart} // 👈 pass clearCart to Cart
          />
        }
      />
      <Route path="/order" element={<Order orders={orders} />} />
      <Route path="*" element={<h2 className="page">404 - Page Not Found</h2>} />
    </Routes>
  );
};

export default Rout;
