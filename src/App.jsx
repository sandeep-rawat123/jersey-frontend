import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import JerseyDetail from "./JerseyDetail";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import WishlistPage from "./pages/WishlistPage";
import AccountPage from "./pages/AccountPage";

export default function App() {
  const [selectedJersey, setSelectedJersey] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [jerseys, setJerseys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJerseys = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:3001/api/jerseys");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setJerseys(data);
      } catch (err) {
        console.error("Error fetching jerseys:", err);
        setError(err.message);
        setJerseys([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJerseys();
  }, []);

  const handleAddToCart = (jersey) => {
    setCartItems((prev) => [...prev, jersey]);
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="logo">
            <img src="/logo.svg" alt="jersey lounge logo" />
            <span>JERSEY LOUNGE</span>
          </div>
          <div className="nav-links">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/shop">
              Shop
            </Link>
            <Link className="nav-link" to="/wishlist">
              Wishlist
            </Link>
            <Link className="nav-link" to="/account">
              Account
            </Link>
            <span className="cart-counter">🛒 {cartItems.length}</span>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/shop"
            element={
              <ShopPage
                jerseys={jerseys}
                loading={loading}
                error={error}
                wishlist={wishlist}
                setWishlist={setWishlist}
                isAuthenticated={isAuthenticated}
                onSelectJersey={setSelectedJersey}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <WishlistPage
                wishlist={wishlist}
                onSelectJersey={setSelectedJersey}
                setWishlist={setWishlist}
              />
            }
          />
          <Route
            path="/account"
            element={
              <AccountPage
                isAuthenticated={isAuthenticated}
                onAuthSuccess={() => setIsAuthenticated(true)}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {selectedJersey && (
          <JerseyDetail
            jersey={selectedJersey}
            isAuthenticated={isAuthenticated}
            onClose={() => setSelectedJersey(null)}
            onAddToCart={(jersey) => {
              handleAddToCart(jersey);
              setSelectedJersey(null);
            }}
          />
        )}
      </div>

      <footer className="bottom-nav">
        <Link to="/" className="bottom-nav-item">
          🏠
          <p>Home</p>
        </Link>
        <Link to="/shop" className="bottom-nav-item">
          🛍️
          <p>Shop</p>
        </Link>
        <Link to="/wishlist" className="bottom-nav-item">
          ❤️
          <p>Wishlist</p>
        </Link>
        <Link to="/account" className="bottom-nav-item">
          👤
          <p>Account</p>
        </Link>
      </footer>
    </Router>
  );
}
