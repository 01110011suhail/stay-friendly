import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function OwnerDashboard() {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📊 Admin Dashboard</h1>
        <p style={styles.subtitle}>Welcome, {user?.fullName || "Owner"}!</p>
      </div>

      <div style={styles.gridContainer}>
        {/* Add New Property Card */}
        <Link to="/owner/add-hotel" style={{ textDecoration: "none" }}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>➕</div>
            <h3 style={styles.cardTitle}>Add New Property</h3>
            <p style={styles.cardDesc}>Create and list a new hotel or property</p>
            <button style={styles.cardButton}>Get Started</button>
          </div>
        </Link>

        {/* View Properties Card */}
        <Link to="/owner/my-hotels" style={{ textDecoration: "none" }}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>🏩</div>
            <h3 style={styles.cardTitle}>My Properties</h3>
            <p style={styles.cardDesc}>View and manage all your properties</p>
            <button style={styles.cardButton}>View All</button>
          </div>
        </Link>

        {/* Bookings Card */}
        <Link to="/owner/my-hotels" style={{ textDecoration: "none" }}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>📅</div>
            <h3 style={styles.cardTitle}>Bookings & Reservations</h3>
            <p style={styles.cardDesc}>View all bookings for your properties</p>
            <button style={styles.cardButton}>View Bookings</button>
          </div>
        </Link>

        {/* Analytics Card (Future) */}
        <div style={styles.card}>
          <div style={styles.cardIcon}>📈</div>
          <h3 style={styles.cardTitle}>Analytics</h3>
          <p style={styles.cardDesc}>View revenue and performance metrics</p>
          <button style={{...styles.cardButton, opacity: 0.6, cursor: "not-allowed"}}>Coming Soon</button>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickActionsContainer}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.actionsList}>
          <Link to="/owner/add-hotel" style={styles.quickAction}>
            ✉️ Add a New Property
          </Link>
          <Link to="/owner/my-hotels" style={styles.quickAction}>
            📝 Edit Property Details
          </Link>
          <Link to="/owner/my-hotels" style={styles.quickAction}>
            💰 View Revenue
          </Link>
          <Link to="/owner/my-hotels" style={styles.quickAction}>
            ⭐ View Ratings & Reviews
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f5f5f5",
    minHeight: "90vh"
  },
  header: {
    marginBottom: "40px",
    textAlign: "center",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  title: {
    fontSize: "32px",
    color: "#333",
    margin: "0 0 10px 0"
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    margin: 0
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    marginBottom: "40px"
  },
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s, boxShadow 0.3s",
    border: "none",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.12)"
    }
  },
  cardIcon: {
    fontSize: "48px",
    marginBottom: "15px"
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
    margin: "10px 0"
  },
  cardDesc: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
    lineHeight: "1.5"
  },
  cardButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "background 0.3s"
  },
  quickActionsContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "20px",
    marginTop: 0
  },
  actionsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px"
  },
  quickAction: {
    padding: "15px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    transition: "all 0.3s",
    cursor: "pointer",
    display: "block",
    textAlign: "center",
    fontSize: "15px"
  }
};

export default OwnerDashboard;