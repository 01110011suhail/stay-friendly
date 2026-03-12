import { useEffect, useState } from "react";
import { getAllProperties } from "../api/property";
import HotelCard from "../components/HotelCard";
import SearchBar from "../components/SearchBar";
import { filterProperties } from "../api/property";

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({ city: "", minPrice: "", maxPrice: "" });
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");

  const applyFilter = async () => {
    setLoading(true);
    try {
      const data = await filterProperties(filters);
      setHotels(data.content || data);
      setPage(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [page, filterProperties]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const data = await getAllProperties(page);
      setHotels(data.content || data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortBy === "price-low") return a.pricePerNight - b.pricePerNight;
    if (sortBy === "price-high") return b.pricePerNight - a.pricePerNight;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div style={styles.container}>
      {/* Search Bar */}
      <SearchBar />

      {/* Main Content */}
      <div style={styles.content}>
        {/* Filters Sidebar */}
        <div style={styles.sidebar}>
          <h3 style={styles.filterTitle}>🔍 Filters</h3>
          
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>City</label>
            <input
              type="text"
              placeholder="Search city..."
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              style={styles.filterInput}
            />
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Min Price (₹)</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              style={styles.filterInput}
            />
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Max Price (₹)</label>
            <input
              type="number"
              placeholder="10000"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              style={styles.filterInput}
            />
          </div>

          <button onClick={applyFilter} style={styles.filterButton}>
            Apply Filters
          </button>
          <button
            onClick={() => {
              setFilters({ city: "", minPrice: "", maxPrice: "" });
              fetchHotels();
            }}
            style={styles.clearButton}
          >
            Clear All
          </button>
        </div>

        {/* Properties Grid */}
        <div style={styles.main}>
          {/* Sort Options */}
          <div style={styles.sortBar}>
            <span style={styles.resultCount}>
              {hotels.length} properties found
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.sortSelect}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Grid */}
          {loading ? (
            <div style={styles.loadingBox}>
              <p>Loading properties...</p>
            </div>
          ) : sortedHotels.length === 0 ? (
            <div style={styles.emptyBox}>
              <p>No properties found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {sortedHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div style={styles.pagination}>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              style={{
                ...styles.paginationButton,
                opacity: page === 0 ? 0.5 : 1,
                cursor: page === 0 ? "not-allowed" : "pointer"
              }}
            >
              ← Previous
            </button>
            <span style={styles.pageInfo}>Page {page + 1}</span>
            <button
              onClick={() => setPage(page + 1)}
              style={styles.paginationButton}
            >
              Next →
            </button>
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
  content: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: "20px",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "30px 20px"
  },
  sidebar: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    height: "fit-content",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  filterTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 20px 0",
    color: "#222"
  },
  filterGroup: {
    marginBottom: "15px"
  },
  filterLabel: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#333"
  },
  filterInput: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "13px",
    boxSizing: "border-box"
  },
  filterButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#003580",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "8px"
  },
  clearButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px"
  },
  main: {
    display: "flex",
    flexDirection: "column"
  },
  sortBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: "15px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  resultCount: {
    fontSize: "14px",
    color: "#666",
    fontWeight: "500"
  },
  sortSelect: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "13px",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px"
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "30px",
    padding: "20px"
  },
  paginationButton: {
    padding: "10px 20px",
    backgroundColor: "#003580",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px"
  },
  pageInfo: {
    fontSize: "14px",
    color: "#666"
  },
  loadingBox: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "8px",
    textAlign: "center",
    color: "#666"
  },
  emptyBox: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "8px",
    textAlign: "center",
    color: "#666"
  }
};

export default HotelList;