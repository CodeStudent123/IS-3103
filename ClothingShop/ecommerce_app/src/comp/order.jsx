import React from "react";
import "./styling/order.css";

const Order = ({ orders }) => {
  // Group orders by checkout session (assuming each checkout creates a batch)
  const groupOrdersBySession = () => {
    if (orders.length === 0) return [];
    
    // For now, treat all orders as one session
    // You can enhance this later with timestamps or order IDs
    return [{ id: 1, items: orders, date: new Date().toLocaleDateString() }];
  };

  const orderSessions = groupOrdersBySession();
  const total = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="order-container">
      <h2 className="order-title">🛍️ Your Orders</h2>
      {orders.length === 0 ? (
        <div className="empty-order-container">
          <p className="empty-order">No orders yet.</p>
          <p className="empty-order-subtitle">Start shopping to see your orders here!</p>
        </div>
      ) : (
        <>
          <div className="order-summary">
            <div className="summary-card">
              <span className="summary-label">Total Items:</span>
              <span className="summary-value">
                {orders.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <div className="summary-card">
              <span className="summary-label">Total Orders:</span>
              <span className="summary-value">{orders.length}</span>
            </div>
            <div className="summary-card total-card">
              <span className="summary-label">Total Payment:</span>
              <span className="summary-value">₱{total.toFixed(2)}</span>
            </div>
          </div>

          {orderSessions.map((session) => (
            <div key={session.id} className="order-session">
              <div className="order-session-header">
                <h3>Order #{session.id}</h3>
                <span className="order-date">📅 {session.date}</span>
              </div>

              <table className="order-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {session.items.map((item, index) => (
                    <tr key={`${item.id}-${item.size}-${index}`}>
                      <td>
                        <img src={item.image} alt={item.name} className="order-image" />
                      </td>
                      <td className="product-name">{item.name}</td>
                      <td><span className="size-badge">{item.size}</span></td>
                      <td className="price">₱{item.price.toFixed(2)}</td>
                      <td className="quantity">×{item.quantity}</td>
                      <td className="subtotal">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="session-total">
                <span>Session Total:</span>
                <span className="total-amount">
                  ₱{session.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Order;
