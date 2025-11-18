import React from "react";
import { Link } from "react-router-dom";
import "./styling/home.css"; 

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to ClothingShop</h1>
          <p>Style that speaks. Shop the latest fashion trends today.</p>
          <Link to="/product" className="btn">
            Shop Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          At ClothingShop, fashion is more than clothes — it’s self-expression.
          We deliver trendy, comfortable, and affordable apparel to let your
          personality shine. Explore our collections and find your perfect style
          today!
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} ClothingShop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
