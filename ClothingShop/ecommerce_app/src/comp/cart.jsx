import React from "react";
import { useNavigate } from "react-router-dom";
import "./styling/cart.css";

const Cart = ({ cart, removeFromCart, setOrders, orders, clearCart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setOrders([...orders, ...cart]);
    clearCart();
    alert("Checkout successful!");
    navigate("/order"); // 👈 go to order page
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Cart is empty</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={`${item.id}-${item.size}`}>
                  <td>
                    <img src={item.image} alt={item.name} className="cart-image" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>₱{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₱{item.price * item.quantity}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      ✖ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="cart-total">Total Payment: ₱{total}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>
            ✅ Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
