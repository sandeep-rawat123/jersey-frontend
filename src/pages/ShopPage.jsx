import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import JerseyCard from "../JerseyCard";

const categories = ["All", "Jersey", "Football Shoes", "Flags", "Wall Posters"];
const jerseySubcategories = ["All", "International", "Club", "Animated", "Retro"];
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 - $70", min: 25, max: 70 },
  { label: "$70 - $120", min: 70, max: 120 },
  { label: "Above $120", min: 120, max: Infinity },
];

export default function ShopPage({ jerseys, loading, error, wishlist, setWishlist, onSelectJersey, onAddToCart }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");
  const [shoeSize, setShoeSize] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("salesDesc");

  const filteredJerseys = useMemo(() => {
    if (!jerseys) return [];

    let list = [...jerseys];

    if (category !== "All") {
      list = list.filter((item) => item.category === category);
    }

    if (category === "Jersey" && subCategory !== "All") {
      list = list.filter((item) => item.subcategory === subCategory);
    }

    if (category === "Football Shoes" && shoeSize !== "All") {
      list = list.filter((item) => item.size?.toString() === shoeSize);
    }

    const price = priceRanges.find((pr) => pr.label === priceRange) || priceRanges[0];
    list = list.filter((item) => item.price >= price.min && item.price <= price.max);

    if (query.trim()) {
      const lower = query.toLowerCase();
      list = list.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(lower)) ||
          (item.category && item.category.toLowerCase().includes(lower)) ||
          (item.flag && item.flag.toLowerCase().includes(lower))
      );
    }

    list.sort((a, b) => {
      if (sortBy === "salesDesc") return (b.sales || 0) - (a.sales || 0);
      if (sortBy === "ratingDesc") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "priceAsc") return (a.price || 0) - (b.price || 0);
      if (sortBy === "priceDesc") return (b.price || 0) - (a.price || 0);
      if (sortBy === "nameAsc") return (a.name || "").localeCompare(b.name || "");
      if (sortBy === "nameDesc") return (b.name || "").localeCompare(a.name || "");
      return 0;
    });

    return list;
  }, [jerseys, query, category, subCategory, shoeSize, priceRange, sortBy]);

  const navigate = useNavigate();

  const requireLogin = () => {
    window.alert("Please login or sign up before adding items to wishlist/cart.");
    navigate("/account");
  };

  const toggleWishlist = (item) => {
    if (!isAuthenticated) {
      requireLogin();
      return;
    }

    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) return prev.filter((p) => p.id !== item.id);
      return [...prev, item];
    });
  };

  return (
    <div className="shop-page">
      <h2>Shop Products</h2>

      <div className="shop-controls">
        <input
          className="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, category or country..."
        />

        <select value={category} onChange={(e) => { setCategory(e.target.value); setSubCategory("All"); setShoeSize("All"); }}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {category === "Jersey" && (
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
            {jerseySubcategories.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        )}

        {category === "Football Shoes" && (
          <select value={shoeSize} onChange={(e) => setShoeSize(e.target.value)}>
            <option value="All">All Sizes</option>
            {[7, 8, 9, 10, 11, 12].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        )}

        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          {priceRanges.map((pr) => (
            <option key={pr.label} value={pr.label}>{pr.label}</option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="salesDesc">Popular (Best Selling)</option>
          <option value="ratingDesc">Top Rated</option>
          <option value="priceAsc">Price Low-High</option>
          <option value="priceDesc">Price High-Low</option>
          <option value="nameAsc">Name A-Z</option>
          <option value="nameDesc">Name Z-A</option>
        </select>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="jersey-grid">
        {filteredJerseys.length === 0 ? (
          <p>No products match the filters.</p>
        ) : (
          filteredJerseys.map((item) => {
            const isWishlisted = wishlist.some((w) => w.id === item.id);
            return (
              <div key={item.id} className="shop-card-wrapper">
                <JerseyCard jersey={item} onClick={() => onSelectJersey(item)} />
                <div className="shop-card-actions">
                  <button onClick={() => toggleWishlist(item)}>
                    {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  </button>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      requireLogin();
                      return;
                    }
                    onAddToCart(item);
                  }}
                >
                  Add to Cart
                </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

