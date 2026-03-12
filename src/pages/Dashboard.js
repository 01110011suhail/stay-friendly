import { useEffect, useState } from "react";
import { getUserBookings } from "../api/booking";

function Dashboard() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getUserBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{padding:"30px"}}>
      <h2>My Bookings</h2>

      {bookings.length===0 && <p>No bookings yet</p>}

      {bookings.map(b => (
        <div key={b.id} style={styles.card}>
          <h3>{b.property.title}</h3>
          <p>{b.startDate} → {b.endDate}</p>
          <p>₹ {b.totalPrice}</p>
          <p>Status: {b.canceled ? "Canceled" : "Confirmed"}</p>
        </div>
      ))}

    </div>
  )
}

const styles = {
  card:{
    border:"1px solid #ddd",
    borderRadius:"10px",
    padding:"10px",
    marginBottom:"10px"
  }
}

export default Dashboard;