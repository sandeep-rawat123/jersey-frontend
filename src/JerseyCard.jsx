export default function JerseyCard({ jersey, onClick }) {
  return (
    <div className="jersey-card" onClick={onClick}>
      <div className="jersey-image-container">
        <img src={jersey.photo} alt={jersey.clubName} className="jersey-image" />
        <div className="jersey-id-badge">{jersey.id}</div>
      </div>

      <div className="jersey-info">
        <h3 className="club-name">{jersey.clubName}</h3>

        <div className="jersey-details">
          <div className="detail-item">
            <span className="label">Year:</span>
            <span className="value">{jersey.year}</span>
          </div>

          <div className="detail-item">
            <span className="label">Country:</span>
            <span className="flag-emoji">{jersey.flag}</span>
          </div>
        </div>

        <button className="view-btn">View Details</button>
      </div>
    </div>
  );
}
