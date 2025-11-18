import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./comp/nav.jsx";
import Rout from "./comp/rout.jsx";

function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find(
      (item) => item.id === product.id && item.size === product.size
    );
    if (exists) return;
    setCart([...cart, { ...product, quantity: product.quantity || 1 }]);
  };

  const updateQuantity = (id, size, delta) => {
    setCart(
      cart
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id, size) => {
    setCart(cart.filter((item) => !(item.id === id && item.size === size)));
  };

  const clearCart = () => setCart([]); // 👈 clear cart after checkout

  return (
    <Router>
      <Nav cartCount={cart.length} />
      <Rout
        cart={cart}
        orders={orders}
        setOrders={setOrders}
        clearCart={clearCart}       // 👈 pass clearCart
        addToCart={addToCart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </Router>
  );
}

export default App;
