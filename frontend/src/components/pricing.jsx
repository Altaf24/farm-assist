"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, ArrowUpDown, Filter, RefreshCw } from "lucide-react"

const Pricing = () => {
  const [marketData, setMarketData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortConfig, setSortConfig] = useState({ key: "commodity", direction: "ascending" })
  const [refreshing, setRefreshing] = useState(false)

  // List of Indian states for the filter
  const indianStates = [
    "All States",
    "Andhra Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal",
  ]

  // Categories for filtering
  const categories = ["All", "Vegetables", "Fruits", "Cereals", "Pulses", "Spices"]

  // Fetch market data from API
  const fetchMarketData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Using the Agmarknet API (publicly available)
      const response = await fetch(
        "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=1000",
      )

      if (!response.ok) {
        throw new Error("Failed to fetch data from API")
      }

      const data = await response.json()

      // Transform the API data to our format
      const formattedData = data.records.map((record, index) => ({
        id: index + 1,
        commodity: record.commodity,
        category: getCategoryForCommodity(record.commodity),
        market: record.market,
        state: record.state,
        minPrice: record.min_price,
        modalPrice: record.modal_price,
        maxPrice: record.max_price,
        unit: "Quintal", // API typically uses Quintal as unit
        updatedDate: record.arrival_date,
      }))

      setMarketData(formattedData)
      setFilteredData(formattedData)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching market data:", err)

      // Fallback to mock data if API fails
      const mockData = generateMockData()
      setMarketData(mockData)
      setFilteredData(mockData)

      setError("Could not fetch live data. Showing sample data instead.")
      setLoading(false)
    }
  }

  // Function to determine category based on commodity name
  const getCategoryForCommodity = (commodity) => {
    const commodityLower = commodity.toLowerCase()

    // Common vegetables
    if (
      [
        "tomato",
        "potato",
        "onion",
        "brinjal",
        "cabbage",
        "cauliflower",
        "carrot",
        "peas",
        "okra",
        "cucumber",
        "spinach",
        "capsicum",
        "bitter gourd",
        "bottle gourd",
        "pumpkin",
        "radish",
        "ginger",
        "garlic",
      ].some((veg) => commodityLower.includes(veg))
    ) {
      return "Vegetables"
    }

    // Common fruits
    if (
      [
        "apple",
        "banana",
        "orange",
        "mango",
        "grapes",
        "watermelon",
        "papaya",
        "pineapple",
        "guava",
        "pomegranate",
        "strawberry",
        "kiwi",
        "pear",
        "plum",
        "litchi",
        "coconut",
      ].some((fruit) => commodityLower.includes(fruit))
    ) {
      return "Fruits"
    }

    // Common cereals
    if (
      ["rice", "wheat", "maize", "barley", "oats", "jowar", "bajra", "ragi"].some((cereal) =>
        commodityLower.includes(cereal),
      )
    ) {
      return "Cereals"
    }

    // Common pulses
    if (
      ["dal", "gram", "moong", "masoor", "urad", "arhar", "toor", "chana", "rajma", "lentil", "peas"].some((pulse) =>
        commodityLower.includes(pulse),
      )
    ) {
      return "Pulses"
    }

    // Common spices
    if (
      [
        "turmeric",
        "chilli",
        "cardamom",
        "cinnamon",
        "clove",
        "coriander",
        "cumin",
        "fenugreek",
        "mustard",
        "pepper",
        "saffron",
      ].some((spice) => commodityLower.includes(spice))
    ) {
      return "Spices"
    }

    return "Other"
  }

  // Generate mock data for fallback if API fails
  const generateMockData = () => {
    const commodities = [
      "Tomato",
      "Potato",
      "Onion",
      "Apple",
      "Banana",
      "Orange",
      "Rice",
      "Wheat",
      "Carrot",
      "Cabbage",
      "Cauliflower",
      "Brinjal",
      "Cucumber",
      "Peas",
      "Beans",
      "Mango",
      "Grapes",
      "Watermelon",
      "Papaya",
      "Pineapple",
      "Pomegranate",
      "Turmeric",
      "Red Chilli",
      "Cardamom",
      "Cinnamon",
      "Clove",
      "Black Pepper",
      "Moong Dal",
      "Toor Dal",
      "Urad Dal",
      "Chana Dal",
      "Masoor Dal",
    ]

    const markets = [
      { name: "Azadpur Mandi", state: "Delhi" },
      { name: "Vashi Market", state: "Maharashtra" },
      { name: "Koyambedu Market", state: "Tamil Nadu" },
      { name: "Bowenpally Market", state: "Telangana" },
      { name: "Ghazipur Mandi", state: "Uttar Pradesh" },
      { name: "Binnypet Market", state: "Karnataka" },
      { name: "Rythu Bazar", state: "Andhra Pradesh" },
      { name: "Mahadev Ghat Market", state: "Bihar" },
      { name: "Gultekdi Market", state: "Maharashtra" },
      { name: "Okhla Mandi", state: "Delhi" },
    ]

    // Generate random date within the last week
    const getRandomRecentDate = () => {
      const today = new Date()
      const daysAgo = Math.floor(Math.random() * 7) // 0-6 days ago
      const date = new Date(today)
      date.setDate(today.getDate() - daysAgo)
      return date.toISOString().split("T")[0] // YYYY-MM-DD format
    }

    // Generate random price between min and max
    const getRandomPrice = (min, max) => {
      return (Math.random() * (max - min) + min).toFixed(2)
    }

    // Generate mock data
    const mockData = []
    for (let i = 0; i < 100; i++) {
      const commodity = commodities[Math.floor(Math.random() * commodities.length)]
      const market = markets[Math.floor(Math.random() * markets.length)]
      const category = getCategoryForCommodity(commodity)

      mockData.push({
        id: i + 1,
        commodity,
        category,
        market: market.name,
        state: market.state,
        minPrice: getRandomPrice(20, 50),
        modalPrice: getRandomPrice(50, 100),
        maxPrice: getRandomPrice(100, 200),
        unit: "kg",
        updatedDate: getRandomRecentDate(),
      })
    }

    return mockData
  }

  // Sort the data based on the selected column
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Filter data based on search term, selected state, and category
  const filterData = () => {
    let result = [...marketData]

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.market.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by state
    if (selectedState !== "All States") {
      result = result.filter((item) => item.state === selectedState)
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((item) => item.category === selectedCategory)
    }

    // Sort the data
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })

    setFilteredData(result)
  }

  // Handle refresh button click
  const handleRefresh = () => {
    setRefreshing(true)
    fetchMarketData().finally(() => {
      setTimeout(() => setRefreshing(false), 1000)
    })
  }

  // Initial data fetch
  useEffect(() => {
    fetchMarketData()
  }, [])

  // Apply filters when dependencies change
  useEffect(() => {
    filterData()
  }, [searchTerm, selectedState, selectedCategory, sortConfig, marketData])

  // Get the current date for display
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="market-price-tracker">
      <div className="header-section">
        <h1>Agricultural Market Price Tracker</h1>
        <p>Live vegetable, fruit, and commodity prices across markets in India</p>
        <p className="date">As of {currentDate}</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search commodity or market..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-selects">
          <div className="select-container">
            <MapPin className="select-icon" />
            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="select-container">
            <Filter className="select-icon" />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className={`refresh-button ${refreshing ? "refreshing" : ""}`}
          onClick={handleRefresh}
          disabled={loading || refreshing}
        >
          <RefreshCw className="refresh-icon" />
          <span>{refreshing ? "Refreshing..." : "Refresh Prices"}</span>
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading market data...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={fetchMarketData}>Try Again</button>
        </div>
      ) : (
        <>
          <div className="results-info">
            <p>Showing {filteredData.length} results</p>
          </div>

          <div className="table-container">
            <table className="price-table">
              <thead>
                <tr>
                  <th onClick={() => requestSort("commodity")}>
                    Commodity
                    {sortConfig.key === "commodity" && (
                      <ArrowUpDown className={`sort-icon ${sortConfig.direction === "ascending" ? "asc" : "desc"}`} />
                    )}
                  </th>
                  <th onClick={() => requestSort("category")}>
                    Category
                    {sortConfig.key === "category" && (
                      <ArrowUpDown className={`sort-icon ${sortConfig.direction === "ascending" ? "asc" : "desc"}`} />
                    )}
                  </th>
                  <th onClick={() => requestSort("market")}>
                    Market
                    {sortConfig.key === "market" && (
                      <ArrowUpDown className={`sort-icon ${sortConfig.direction === "ascending" ? "asc" : "desc"}`} />
                    )}
                  </th>
                  <th onClick={() => requestSort("state")}>
                    State
                    {sortConfig.key === "state" && (
                      <ArrowUpDown className={`sort-icon ${sortConfig.direction === "ascending" ? "asc" : "desc"}`} />
                    )}
                  </th>
                  <th onClick={() => requestSort("minPrice")}>
                    Min Price (₹)
                    {sortConfig.key === "minPrice" && (
                      <ArrowUpDown className={`sort-icon ${sortConfig.direction === "ascending" ? "asc" : "desc"}`} />
                    )}
                  </th>
                  <th onClick={() => requestSort("modalPrice")}>
                    Modal Price (₹)
                    {sortConfig.key === "modalPrice" && (
                      <ArrowUpDown className={`sort-icon ${sortConfig.direction === "ascending" ? "asc" : "desc"}`} />
                    )}
                  </th>
                  <th onClick={() => requestSort("maxPrice")}>
                    Max Price (₹)
                    {sortConfig.key === "maxPrice" && (
                      <ArrowUpDown className={`sort-icon ${sortConfig.direction === "ascending" ? "asc" : "desc"}`} />
                    )}
                  </th>
                  <th onClick={() => requestSort("updatedDate")}>
                    Updated Date
                    {sortConfig.key === "updatedDate" && (
                      <ArrowUpDown className={`sort-icon ${sortConfig.direction === "ascending" ? "asc" : "desc"}`} />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className={`category-${item.category.toLowerCase().replace(" ", "-")}`}>
                      <td>{item.commodity}</td>
                      <td>{item.category}</td>
                      <td>{item.market}</td>
                      <td>{item.state}</td>
                      <td>
                        ₹{item.minPrice}/{item.unit}
                      </td>
                      <td>
                        ₹{item.modalPrice}/{item.unit}
                      </td>
                      <td>
                        ₹{item.maxPrice}/{item.unit}
                      </td>
                      <td>{new Date(item.updatedDate).toLocaleDateString("en-IN")}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-results">
                      No results found. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="info-section">
            <h3>About Market Prices</h3>
            <p>
              <strong>Min Price:</strong> The lowest price at which the commodity was sold in the market.
            </p>
            <p>
              <strong>Modal Price:</strong> The most common price at which the commodity was sold.
            </p>
            <p>
              <strong>Max Price:</strong> The highest price at which the commodity was sold in the market.
            </p>
            <p className="disclaimer">
              Note: This data is for informational purposes only. Actual prices may vary based on quality, quantity, and
              market conditions.
            </p>
          </div>
        </>
      )}

      <style jsx>{`
        .market-price-tracker {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          color: #333;
        }

        .header-section {
          text-align: center;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #43a047, #2e7d32);
          padding: 2rem;
          border-radius: 12px;
          color: white;
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2);
        }

        .header-section h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .header-section p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .header-section .date {
          font-size: 0.9rem;
          margin-top: 1rem;
          opacity: 0.8;
        }

        .filters-section {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: center;
          justify-content: space-between;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
          position: relative;
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .search-box input:focus {
          outline: none;
          border-color: #43a047;
          box-shadow: 0 0 0 2px rgba(67, 160, 71, 0.2);
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          width: 18px;
          height: 18px;
        }

        .filter-selects {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .select-container {
          position: relative;
          min-width: 180px;
        }

        .select-container select {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          appearance: none;
          background-color: white;
          cursor: pointer;
          transition: all 0.3s;
        }

        .select-container select:focus {
          outline: none;
          border-color: #43a047;
          box-shadow: 0 0 0 2px rgba(67, 160, 71, 0.2);
        }

        .select-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          width: 18px;
          height: 18px;
          pointer-events: none;
        }

        .refresh-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background-color: #43a047;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .refresh-button:hover {
          background-color: #2e7d32;
        }

        .refresh-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .refresh-icon {
          width: 18px;
          height: 18px;
        }

        .refreshing .refresh-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(67, 160, 71, 0.1);
          border-left-color: #43a047;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        .error-container {
          text-align: center;
          padding: 2rem;
          background-color: #ffebee;
          border-radius: 8px;
          color: #c62828;
        }

        .error-container button {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background-color: #c62828;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .results-info {
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: #666;
        }

        .table-container {
          overflow-x: auto;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .price-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .price-table th {
          background-color: #f5f5f5;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          position: relative;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .price-table th:hover {
          background-color: #eee;
        }

        .sort-icon {
          width: 14px;
          height: 14px;
          margin-left: 0.25rem;
          vertical-align: middle;
        }

        .price-table td {
          padding: 0.75rem 1rem;
          border-top: 1px solid #eee;
        }

        .price-table tbody tr:hover {
          background-color: #f9f9f9;
        }

        .no-results {
          text-align: center;
          padding: 2rem !important;
          color: #666;
        }

        /* Category-based row styling */
        .category-vegetables {
          border-left: 4px solid #4caf50;
        }

        .category-fruits {
          border-left: 4px solid #ff9800;
        }

        .category-cereals {
          border-left: 4px solid #ffc107;
        }

        .category-pulses {
          border-left: 4px solid #9c27b0;
        }

        .category-spices {
          border-left: 4px solid #f44336;
        }

        .category-other {
          border-left: 4px solid #2196f3;
        }

        .info-section {
          margin-top: 2rem;
          padding: 1.5rem;
          background-color: #f5f5f5;
          border-radius: 8px;
        }

        .info-section h3 {
          margin-bottom: 1rem;
          font-size: 1.2rem;
          color: #2e7d32;
        }

        .info-section p {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .disclaimer {
          font-style: italic;
          font-size: 0.85rem;
          color: #666;
          margin-top: 1rem;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .header-section h1 {
            font-size: 1.8rem;
          }

          .filters-section {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box, .filter-selects, .select-container {
            width: 100%;
          }

          .refresh-button {
            width: 100%;
            justify-content: center;
          }

          .price-table th, .price-table td {
            padding: 0.75rem 0.5rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Pricing

