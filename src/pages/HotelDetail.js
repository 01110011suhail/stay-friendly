// src/pages/HotelDetail.js

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPropertyById } from "../api/property";
import { bookProperty } from "../api/booking";

function HotelDetail() {

  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchHotel();
  }, [id]);

  const fetchHotel = async () => {
    try {
      const data = await getPropertyById(id);
      setHotel(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBooking = async () => {

    if (!startDate || !endDate) {
      alert("Please select check-in and check-out dates");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      alert("Check-out must be after check-in");
      return;
    }

    const bookedDates = hotel.bookedDates || [];

    // Double booking check
    const conflict = bookedDates.some(d => {
      const date = new Date(d);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });

    if (conflict) {
      alert("Selected dates already booked");
      return;
    }

    try {
      const request = {
        propertyId: hotel.id,
        startDate,
        endDate
      };
      await bookProperty(request);
      alert("Booking successful!");
      fetchHotel(); // refresh availability
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  if (!hotel) {
    return <div style={{ padding: "30px" }}>Loading...</div>;
  }

  // Calculate total price dynamically
  const nights = startDate && endDate
    ? (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    : 0;
  const totalPrice = hotel.pricePerNight * nights;

  return (
    <div style={styles.container}>
      {/* Hero Image */}
      <div style={styles.imageSection}>
        <img
          src={hotel.imageUrl}
          alt={hotel.title}
          style={styles.mainImage}
        />
      </div>

      {/* Content Grid */}
      <div style={styles.content}>
        {/* Left Side - Main Content */}
        <div style={styles.mainContent}>
          {/* Header Section */}
          <div style={styles.headerSection}>
            <h1 style={styles.title}>{hotel.title}</h1>
            <p style={styles.location}>📍 {hotel.city}, {hotel.area || ""}, {hotel.country || ""}</p>
            
            <div style={styles.ratingSection}>
              <span style={styles.rating}>⭐ 4.5</span>
              <span style={styles.reviews}>(324 reviews)</span>
            </div>
          </div>

          {/* Description */}
          <div style={styles.descriptionBox}>
            <h3 style={styles.sectionTitle}>About this property</h3>
            <p style={styles.description}>
              {hotel.description}
            </p>
          </div>

          {/* Amenities */}
          <div style={styles.amenitiesBox}>
            <h3 style={styles.sectionTitle}>Amenities</h3>
            <div style={styles.amenitiesList}>
              {hotel.amenities && hotel.amenities.length > 0 ? (
                hotel.amenities.slice(0, 6).map((amenity, i) => (
                  <div key={i} style={styles.amenityItem}>
                    <span style={styles.amenityIcon}>✓</span>
                    <span>{amenity}</span>
                  </div>
                ))
              ) : (
                <p>No amenities listed</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Booking Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.bookingBox}>
            {/* Price Tag */}
            <div style={styles.priceTag}>
              <span style={styles.priceLabel}>Price per night</span>
              <div style={styles.priceAmount}>₹{hotel.pricePerNight}</div>
              <span style={styles.perNight}>Inclusive of taxes</span>
            </div>

            {/* Booking Form */}
            <h3 style={styles.bookingTitle}>Your Booking</h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>Check-in</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Check-out</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Price Breakdown */}
            {nights > 0 && (
              <div style={styles.priceBreakdown}>
                <div style={styles.breakdownRow}>
                  <span>₹{hotel.pricePerNight} × {Math.floor(nights)} nights</span>
                  <span>₹{(hotel.pricePerNight * Math.floor(nights)).toFixed(2)}</span>
                </div>
                <div style={styles.breakdownRow}>
                  <span>Taxes & fees</span>
                  <span>₹{(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div style={styles.totalRow}>
                  <span>Total</span>
                  <span>₹{(totalPrice * 1.1).toFixed(2)}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleBooking}
              style={styles.bookButton}
            >
              Book Now
            </button>

            <p style={styles.disclaimer}>
              Free cancellation before 24 hours of arrival
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh"
  },
  imageSection: {
    width: "100%",
    height: "450px",
    overflow: "hidden"
  },
  mainImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 360px",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px 20px"
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  headerSection: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    margin: "0 0 10px 0",
    color: "#222"
  },
  location: {
    fontSize: "16px",
    color: "#666",
    margin: "5px 0"
  },
  ratingSection: {
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  rating: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#003580",
    backgroundColor: "#f0f7ff",
    padding: "8px 12px",
    borderRadius: "4px"
  },
  reviews: {
    fontSize: "14px",
    color: "#666"
  },
  descriptionBox: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  amenitiesBox: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 15px 0",
    color: "#222"
  },
  description: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#666",
    margin: 0
  },
  amenitiesList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "12px"
  },
  amenityItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: "#333"
  },
  amenityIcon: {
    color: "#28a745",
    fontWeight: "bold",
    fontSize: "16px"
  },
  sidebar: {
    height: "fit-content",
    position: "sticky",
    top: "20px"
  },
  bookingBox: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    border: "1px solid #e0e0e0"
  },
  priceTag: {
    backgroundColor: "#f0f7ff",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px",
    borderLeft: "4px solid #003580"
  },
  priceLabel: {
    fontSize: "12px",
    color: "#666",
    display: "block",
    marginBottom: "5px"
  },
  priceAmount: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#003580"
  },
  perNight: {
    fontSize: "13px",
    color: "#666"
  },
  bookingTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0 0 15px 0",
    color: "#222"
  },
  formGroup: {
    marginBottom: "15px"
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#333"
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
  priceBreakdown: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "15px",
    fontSize: "13px"
  },
  breakdownRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    color: "#666"
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid #ddd",
    paddingTop: "8px",
    fontWeight: "bold",
    color: "#222"
  },
  bookButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#003580",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "8px",
    transition: "background 0.3s"
  },
  disclaimer: {
    fontSize: "12px",    
    color: "#666",
    margin: 0,
    textAlign: "center"
  }
};

export default HotelDetail;