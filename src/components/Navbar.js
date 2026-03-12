import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {

const { user, logoutUser } = useAuth();

return ( <nav style={styles.navbar}>

  <Link to="/" style={styles.logo}>
    🏨 StayFinder
  </Link>

  <div style={styles.navLinks}>

{!user && (
<> 
  <Link to="/login" style={styles.link}>Login</Link>
  <Link to="/register" style={styles.link}>Register</Link>
</>
)}


    {user && (
      <>
        {user.role === "ROLE_OWNER" ? (
          <>
            <Link to="/owner/dashboard" style={styles.link}>
              📊 Admin Dashboard
            </Link>
            <Link to="/owner/my-hotels" style={styles.link}>
              🏩 My Properties
            </Link>
          </>
        ) : (
          <Link to="/dashboard" style={styles.link}>
            📋 My Bookings
          </Link>
        )}

        <button onClick={logoutUser} style={styles.logout}>
          Logout
        </button>
      </>
    )}

  </div>

</nav>

);
}

const styles = {
navbar: {
display: "flex",
justifyContent: "space-between",
padding: "15px 30px",
borderBottom: "2px solid #007bff",
alignItems: "center",
backgroundColor: "#f8f9fa",
boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
},

logo: {
fontSize: "24px",
fontWeight: "bold",
textDecoration: "none",
color: "#007bff"
},

navLinks: {
display: "flex",
gap: "15px",
alignItems: "center"
},

link: {
textDecoration: "none",
color: "#333",
fontWeight: "500",
transition: "color 0.3s"
},

logout: {
marginLeft: "10px",
padding: "8px 16px",
cursor: "pointer",
backgroundColor: "#dc3545",
color: "white",
border: "none",
borderRadius: "4px",
fontWeight: "bold",
transition: "background 0.3s"
}
};

export default Navbar;
