import { Link } from "react-router-dom";

function HotelCard({ hotel }) {
  // Mock rating (replace with actual rating from API)
  const rating = hotel.rating || 4.5;
  const reviews = hotel.reviews || Math.floor(Math.random() * 500) + 50;
  const amenities = hotel.amenities || ["WiFi", "Pool", "AC"];

  return (
    <Link to={`/property/${hotel.id}`} style={{ textDecoration: "none" }}>
      <div style={styles.card}>
        {/* Image Section */}
        <div style={styles.imageContainer}>
          <img
            src={hotel.imageUrl || "https://via.placeholder.com/300x200?text=Hotel"}
            alt={hotel.title || hotel.name}
            style={styles.image}
          />
          <div style={styles.badge}>⭐ {rating}</div>
        </div>

        {/* Content Section */}
        <div style={styles.content}>
          {/* Title */}
          <h3 style={styles.title}>{hotel.title || hotel.name}</h3>
          
          {/* Location */}
          <p style={styles.location}>📍 {hotel.city}</p>
          
          {/* Amenities */}
          <div style={styles.amenitiesContainer}>
            {amenities.slice(0, 3).map((amenity, i) => (
              <span key={i} style={styles.amenity}>{amenity}</span>
            ))}
          </div>

          {/* Reviews */}
          <p style={styles.reviews}>{reviews} reviews</p>

          {/* Price Section */}
          <div style={styles.priceSection}>
            <div>
              <p style={styles.priceLabel}>From</p>
              <p style={styles.price}>₹ {hotel.pricePerNight}</p>
            </div>
            <p style={styles.perNight}>per night</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    border: "1px solid #e0e0e0"
  },
  imageContainer: {
    position: "relative",
    height: "220px",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s"
  },
  badge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#003580",
    color: "white",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "13px",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
  },
  content: {
    padding: "15px",
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#222",
    lineHeight: "1.3"
  },
  location: {
    margin: "0 0 10px 0",
    fontSize: "13px",
    color: "#666"
  },
  amenitiesContainer: {
    display: "flex",
    gap: "6px",
    marginBottom: "8px",
    flexWrap: "wrap"
  },
  amenity: {
    backgroundColor: "#f0f0f0",
    padding: "4px 8px",
    borderRadius: "3px",
    fontSize: "12px",
    color: "#333"
  },
  reviews: {
    margin: "0 0 10px 0",
    fontSize: "12px",
    color: "#999"
  },
  priceSection: {
    marginTop: "auto",
    paddingTop: "10px",
    borderTop: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  priceLabel: {
    margin: 0,
    fontSize: "11px",
    color: "#999",
    textTransform: "uppercase"
  },
  price: {
    margin: "4px 0 0 0",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#003580"
  },
  perNight: {
    margin: 0,
    fontSize: "12px",
    color: "#666"
  }
};

export default HotelCard;
