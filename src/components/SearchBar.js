import { useState } from "react";

function SearchBar() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  return (
    <div style={styles.container}>
      <div style={styles.searchBox}>
        <h2 style={styles.title}>🔍 Find your next stay</h2>
        <p style={styles.subtitle}>Search low prices on hotels, homes, and much more...</p>
        
        <div style={styles.formContainer}>
          <div style={styles.formGroup}>
            <label style={styles.label}>📍 Where to?</label>
            <input
              type="text"
              placeholder="City or property name"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>📅 Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>📅 Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>👥 Guests</label>
            <select value={guests} onChange={(e) => setGuests(e.target.value)} style={styles.input}>
              {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
            </select>
          </div>

          <button style={styles.searchButton}>Search</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(135deg, #003580 0%, #0055B8 100%)",
    padding: "40px 20px",
    color: "white",
    textAlign: "center"
  },
  searchBox: {
    maxWidth: "900px",
    margin: "0 auto"
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    margin: "0 0 10px 0",
    color: "white"
  },
  subtitle: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.9)",
    marginBottom: "25px"
  },
  formContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    alignItems: "flex-end"
  },
  formGroup: {
    textAlign: "left"
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "6px",
    textTransform: "uppercase"
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    fontFamily: "Arial",
    boxSizing: "border-box"
  },
  searchButton: {
    backgroundColor: "#003580",
    color: "white",
    border: "none",
    padding: "12px 30px",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s",
    width: "100%"
  }
};

export default SearchBar;