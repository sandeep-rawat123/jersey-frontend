export default function HomePage({ onOpenJersey }) {
  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <p>🔥 Free Shipping + Discount on First Order</p>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <img
          src="https://wallpaperbat.com/img/128180629-neymar-and-messi-in-an-iconic-photograph.jpg"
          alt="football"
        />

        <div className="overlay" />

        <div className="hero-text">
          <h1>From Stadium to Street</h1>
          <p>Your Team, Your Style</p>
          <button className="shop-btn" onClick={() => onOpenJersey && onOpenJersey()}>
            Shop Now
          </button>
        </div>
      </div>

      <div className="section">
        <h2>🔥 New Arrivals</h2>
      </div>
    </>
  );
}
