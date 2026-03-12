import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProperties } from "../api/property";
import { getOwnerBookings } from "../api/booking";
import { deleteProperty } from "../api/ownerApi";

function OwnerHotels() {
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("properties");
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
    fetchBookings();
  }, []);

  const fetchHotels = async () => {
    try {
      const data = await getAllProperties();
      setHotels(data.content || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await getOwnerBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(id);
        alert("✅ Property deleted successfully");
        setHotels(hotels.filter(h => h.id !== id));
      } catch (err) {
        alert("❌ Failed to delete property");
        console.error(err);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🏩 My Properties & Bookings</h1>
        <button
          onClick={() => navigate("/owner/add-hotel")}
          style={styles.addButton}
        >
          ➕ Add New Property
        </button>
      </div>

      {/* Tabs */}
      <div style={styles.tabsContainer}>
        <button
          onClick={() => setActiveTab("properties")}
          style={{
            ...styles.tab,
            backgroundColor: activeTab === "properties" ? "#007bff" : "#e9ecef",
            color: activeTab === "properties" ? "white" : "#333"
          }}
        >
          🏨 My Properties ({hotels.length})
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          style={{
            ...styles.tab,
            backgroundColor: activeTab === "bookings" ? "#007bff" : "#e9ecef",
            color: activeTab === "bookings" ? "white" : "#333"
          }}
        >
          📅 Bookings ({bookings.length})
        </button>
      </div>

      {/* Properties Tab */}
      {activeTab === "properties" && (
        <div style={styles.content}>
          {loading ? (
            <p style={styles.loadingText}>Loading properties...</p>
          ) : hotels.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No properties added yet</p>
              <button
                onClick={() => navigate("/owner/add-hotel")}
                style={styles.emptyButton}
              >
                Add Your First Property
              </button>
            </div>
          ) : (
            <div style={styles.gridContainer}>
              {hotels.map((h) => (
                <div key={h.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>{h.title}</h3>
                    <span style={styles.badge}>ID: {h.id}</span>
                  </div>
                  <div style={styles.cardBody}>
                    <p style={styles.cardInfo}>📍 {h.city}</p>
                    <p style={styles.cardInfo}>💰 ₹ {h.pricePerNight} / night</p>
                    {h.rooms && <p style={styles.cardInfo}>🛏️ {h.rooms} rooms</p>}
                    {h.description && (
                      <p style={styles.descriptionText}>{h.description}</p>
                    )}
                  </div>
                  <div style={styles.cardActions}>
                    <button style={styles.editButton}>✏️ Edit</button>
                    <button
                      onClick={() => handleDeleteProperty(h.id)}
                      style={styles.deleteButton}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div style={styles.content}>
          {bookings.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No bookings yet</p>
            </div>
          ) : (
            <div style={styles.bookingsContainer}>
              {bookings.map((b) => (
                <div key={b.id} style={styles.bookingCard}>
                  <div style={styles.bookingHeader}>
                    <h3 style={styles.bookingTitle}>{b.property?.title}</h3>
                    <span
                      style={{
                        ...styles.statusBadge,
                        backgroundColor: b.canceled ? "#dc3545" : "#28a745"
                      }}
                    >
                      {b.canceled ? "🚫 Canceled" : "✅ Confirmed"}
                    </span>
                  </div>
                  <div style={styles.bookingBody}>
                    <p style={styles.bookingInfo}>👤 Guest: <strong>{b.user?.fullName}</strong></p>
                    <p style={styles.bookingInfo}>📅 {b.startDate} → {b.endDate}</p>
                    <p style={styles.bookingInfo}>💵 Total: <strong>₹ {b.totalPrice}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
    minHeight: "90vh",
    backgroundColor: "#f5f5f5"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    margin: 0,
    color: "#333"
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px"
  },
  tabsContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px"
  },
  tab: {
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.3s"
  },
  content: {
    width: "100%"
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px"
  },
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "transform 0.3s, boxShadow 0.3s"
  },
  cardHeader: {
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardTitle: {
    margin: "0",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333"
  },
  badge: {
    backgroundColor: "#e7f3ff",
    color: "#0066cc",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600"
  },
  cardBody: {
    padding: "15px"
  },
  cardInfo: {
    margin: "8px 0",
    fontSize: "14px",
    color: "#666"
  },
  descriptionText: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#888",
    fontStyle: "italic",
    lineHeight: "1.4"
  },
  cardActions: {
    display: "flex",
    gap: "10px",
    padding: "15px",
    borderTop: "1px solid #e0e0e0",
    backgroundColor: "#fafafa"
  },
  editButton: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px"
  },
  deleteButton: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px"
  },
  bookingsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "20px"
  },
  bookingCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    overflow: "hidden"
  },
  bookingHeader: {
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bookingTitle: {
    margin: "0",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333"
  },
  statusBadge: {
    color: "white",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold"
  },
  bookingBody: {
    padding: "15px"
  },
  bookingInfo: {
    margin: "8px 0",
    fontSize: "14px",
    color: "#666"
  },
  emptyState: {
    backgroundColor: "white",
    padding: "60px 30px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  emptyText: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "20px"
  },
  emptyButton: {
    padding: "12px 30px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px"
  },
  loadingText: {
    textAlign: "center",
    fontSize: "16px",
    color: "#666",
    padding: "40px"
  }
};

export default OwnerHotels;