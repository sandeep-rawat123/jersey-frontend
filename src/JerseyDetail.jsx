import { useNavigate } from "react-router-dom";

export default function JerseyDetail({ jersey, isAuthenticated, onClose, onAddToCart }) {
  const navigate = useNavigate();

  if (!jersey) return null;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      window.alert("Please login or sign up to add items to cart.");
      navigate("/account");
      return;
    }
    onAddToCart(jersey);
  };

  return (
    <div className="jersey-modal-overlay" onClick={onClose}>
      <div className="jersey-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>✕</button>

        {/* Jersey Image */}
        <div className="modal-jersey-image">
          <img src={jersey.photo} alt={jersey.clubName} />
        </div>

        {/* Jersey Details */}
        <div className="modal-jersey-info">
          <h2>{jersey.clubName}</h2>
          
          <div className="modal-details-grid">
            <div className="modal-detail">
              <span className="modal-label">Jersey ID</span>
              <span className="modal-value">{jersey.id}</span>
            </div>
            <div className="modal-detail">
              <span className="modal-label">Year</span>
              <span className="modal-value">{jersey.year}</span>
            </div>
            <div className="modal-detail">
              <span className="modal-label">Country</span>
              <span className="modal-value modal-flag">{jersey.flag}</span>
            </div>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
