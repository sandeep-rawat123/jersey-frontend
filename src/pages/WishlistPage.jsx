import JerseyCard from "../JerseyCard";

export default function WishlistPage({ wishlist, onSelectJersey, setWishlist }) {
  const removeFromWishlist = (jersey) => {
    setWishlist((prev) => prev.filter((item) => item.id !== jersey.id));
  };

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty. Add items from Shop.</p>
      ) : (
        <div className="jersey-grid">
          {wishlist.map((jersey) => (
            <div key={jersey.id} className="shop-card-wrapper">
              <JerseyCard jersey={jersey} onClick={() => onSelectJersey(jersey)} />
              <button className="wishlist-remove-btn" onClick={() => removeFromWishlist(jersey)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
