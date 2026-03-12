import { useState } from "react";
import { addProperty } from "../api/ownerApi";
import { useNavigate } from "react-router-dom";

function AddHotel() {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rooms, setRooms] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!title.trim() || !city.trim() || !price) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      await addProperty({
        title: title.trim(),
        city: city.trim(),
        description: description.trim(),
        pricePerNight: parseFloat(price),
        rooms: rooms ? parseInt(rooms) : null
      });
      alert("✅ Property added successfully!");
      navigate("/owner/my-hotels");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>🏨 Add New Property</h1>
        <p style={styles.subtitle}>Fill in the details to list your property</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Property Name *</label>
            <input
              type="text"
              placeholder="e.g., Luxury Beach Resort"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>City *</label>
            <input
              type="text"
              placeholder="e.g., Mumbai"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Price Per Night (₹) *</label>
            <input
              type="number"
              placeholder="e.g., 5000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={styles.input}
              required
              min="0"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Number of Rooms</label>
            <input
              type="number"
              placeholder="e.g., 20"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              style={styles.input}
              min="0"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              placeholder="Describe your property, amenities, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{...styles.input, minHeight: "120px", fontFamily: "Arial"}}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={{...styles.submitButton, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer"}}
              disabled={loading}
            >
              {loading ? "Adding..." : "✅ Add Property"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/owner/dashboard")}
              style={styles.cancelButton}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    minHeight: "90vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  formWrapper: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
    marginTop: "20px"
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
    marginTop: 0
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "25px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333"
  },
  input: {
    padding: "12px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontFamily: "Arial",
    transition: "border-color 0.3s"
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    marginTop: "10px"
  },
  submitButton: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
    transition: "background 0.3s"
  },
  cancelButton: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#f8f9fa",
    color: "#333",
    cursor: "pointer",
    transition: "background 0.3s"
  },
  errorBox: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "20px",
    border: "1px solid #f5c6cb",
    fontSize: "14px"
  }
};

export default AddHotel;