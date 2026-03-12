import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HotelList from "./pages/HotelList";
import HotelDetail from "./pages/HotelDetail";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerHotels from "./pages/OwnerHotels";
import AddHotel from "./pages/AddHotel";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {

  return (
    <BrowserRouter>

    <Navbar />

      <Routes>

        <Route path="/" element={<HotelList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/property/:id" element={<HotelDetail />} />

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute role="ROLE_OWNER">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/add-hotel"
          element={
            <ProtectedRoute role="ROLE_OWNER">
              <AddHotel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/my-hotels"
          element={
            <ProtectedRoute role="ROLE_OWNER">
              <OwnerHotels />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/hotels"
          element={
            <ProtectedRoute role="ROLE_OWNER">
              <OwnerHotels />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;