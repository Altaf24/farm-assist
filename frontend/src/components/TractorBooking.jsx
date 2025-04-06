"use client"

import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import {
  Calendar,
  Clock,
  MapPin,
  Tractor,
  Filter,
  ChevronDown,
  Star,
  ArrowRight,
  CreditCard,
  Truck,
  Shield,
  AlertTriangle,
  Loader,
  Navigation,
  Info,
  X,
  Zap,
  Droplet,
  Wind,
  Sun,
  Search,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Check,
} from "lucide-react"

const BASE_URL = "http://localhost:56789"

// Tractor images mapping
const tractorImages = {
  "John Deere 5050D":
    "https://www.bossmachinery.nl/data/images/vehicles/l_2476_05_John%20Deere%205050%20New%202021_20.JPG",
  "Mahindra 575":
    "https://i.ytimg.com/vi/rpn1nKQXWWs/maxresdefault.jpg",
  "Sonalika 60":
    "https://5.imimg.com/data5/GF/SW/CX/GLADMIN-12/di-60-rx-front-tyre.jpg",
  "New Holland 3630":
    "https://assets.tractorjunction.com/tractor-junction/assets/images/images/oldTractor/3630-tx-special-edition-48169-1628133628-0.jpeg",
  "Massey Ferguson 241":
    "https://www.tractordata.com/photos/F001/1790/1790-td4-b01.jpg",
  "Eicher 380":
    "https://5.imimg.com/data5/NSDMERP/Default/2021/7/VV/PN/QT/48953664/tracktor-1625138463377-1000x1000.jpg",
  "Swaraj 744":
    "https://i.ytimg.com/vi/WbtMwYueu1s/maxresdefault.jpg",
  "Farmtrac 60":
    "https://5.imimg.com/data5/IY/QH/EV/GLADMIN-7568/escorts-farmtrac-60-classic-50-hp-tractor-1500-kg.jpg",
  default:
    "https://5.imimg.com/data5/IY/QH/EV/GLADMIN-7568/escorts-farmtrac-60-classic-50-hp-tractor-1500-kg.jpg",
}

// Mock data for development - this would normally come from your API
const mockTractors = [
  {
    _id: "t1",
    name: "John Deere 5050D",
    type: "medium",
    horsepower: 50,
    hourlyRate: 450,
    location: "Amritsar, Punjab",
    distance: 2.5,
    rating: 4.8,
    reviews: 124,
    features: ["4WD", "Power Steering", "Adjustable Seat", "Canopy"],
    available: true,
    description:
      "Powerful medium-duty tractor perfect for various farming operations. Features a reliable engine and comfortable operator station.",
    specifications: {
      engine: "3-cylinder diesel",
      transmission: "8 forward + 2 reverse",
      liftCapacity: "1800 kg",
      fuelTank: "60 L",
    },
    owner: {
      name: "Gurpreet Singh",
      phone: "+91 98765 43210",
      rating: 4.9,
    },
  },
  {
    _id: "t2",
    name: "Mahindra 575",
    type: "medium",
    horsepower: 45,
    hourlyRate: 400,
    location: "Ludhiana, Punjab",
    distance: 3.8,
    rating: 4.6,
    reviews: 98,
    features: ["Power Steering", "Oil Immersed Brakes", "Adjustable Seat"],
    available: true,
    description: "Versatile tractor with excellent fuel efficiency. Ideal for plowing, sowing, and general farm work.",
    specifications: {
      engine: "4-cylinder diesel",
      transmission: "8 forward + 2 reverse",
      liftCapacity: "1500 kg",
      fuelTank: "55 L",
    },
    owner: {
      name: "Harjinder Kaur",
      phone: "+91 87654 32109",
      rating: 4.7,
    },
  },
  {
    _id: "t3",
    name: "Sonalika 60",
    type: "heavy",
    horsepower: 60,
    hourlyRate: 550,
    location: "Jalandhar, Punjab",
    distance: 5.2,
    rating: 4.7,
    reviews: 76,
    features: ["4WD", "Power Steering", "Deluxe Seat", "AC Cabin"],
    available: true,
    description:
      "Heavy-duty tractor with advanced features and powerful engine. Perfect for demanding agricultural tasks.",
    specifications: {
      engine: "4-cylinder turbo diesel",
      transmission: "12 forward + 4 reverse",
      liftCapacity: "2200 kg",
      fuelTank: "75 L",
    },
    owner: {
      name: "Manpreet Singh",
      phone: "+91 76543 21098",
      rating: 4.8,
    },
  },
  {
    _id: "t4",
    name: "New Holland 3630",
    type: "medium",
    horsepower: 55,
    hourlyRate: 500,
    location: "Patiala, Punjab",
    distance: 7.1,
    rating: 4.5,
    reviews: 62,
    features: ["Power Steering", "Adjustable Seat", "Canopy"],
    available: true,
    description: "Reliable medium-duty tractor with excellent performance. Good for a variety of farming applications.",
    specifications: {
      engine: "3-cylinder diesel",
      transmission: "8 forward + 8 reverse",
      liftCapacity: "1700 kg",
      fuelTank: "60 L",
    },
    owner: {
      name: "Rajinder Kumar",
      phone: "+91 65432 10987",
      rating: 4.6,
    },
  },
  {
    _id: "t5",
    name: "Massey Ferguson 241",
    type: "light",
    horsepower: 42,
    hourlyRate: 350,
    location: "Bathinda, Punjab",
    distance: 8.3,
    rating: 4.4,
    reviews: 53,
    features: ["Power Steering", "Adjustable Seat"],
    available: true,
    description: "Economical light-duty tractor suitable for small farms and light agricultural work.",
    specifications: {
      engine: "3-cylinder diesel",
      transmission: "8 forward + 2 reverse",
      liftCapacity: "1200 kg",
      fuelTank: "45 L",
    },
    owner: {
      name: "Amarjeet Singh",
      phone: "+91 54321 09876",
      rating: 4.5,
    },
  },
]

// Get registered tractors from localStorage
const getRegisteredTractors = () => {
  try {
    const registeredTractors = localStorage.getItem("registeredTractors")
    return registeredTractors ? JSON.parse(registeredTractors) : []
  } catch (error) {
    console.error("Error getting registered tractors:", error)
    return []
  }
}

const TractorBooking = () => {
  // State variables
  const [location, setLocation] = useState("")
  const [date, setDate] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  })
  const [time, setTime] = useState("09:00")
  const [duration, setDuration] = useState("2")
  const [tractorType, setTractorType] = useState("all")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [tractors, setTractors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTractor, setSelectedTractor] = useState(null)
  const [bookingStep, setBookingStep] = useState(0) // 0: browsing, 1: details, 2: payment, 3: confirmation
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [sortBy, setSortBy] = useState("distance")
  const [weatherCondition, setWeatherCondition] = useState("sunny")
  const [showWeatherWarning, setShowWeatherWarning] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(3)
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([200, 800])
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [showMap, setShowMap] = useState(false)
  const [favoriteIds, setFavoriteIds] = useState([])
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showTractorDetails, setShowTractorDetails] = useState(false)
  const [detailedTractor, setDetailedTractor] = useState(null)

  // Fetch tractors on component mount and when filters change
  useEffect(() => {
    fetchTractors()
    // Check if it's the user's first visit and show weather warning
    if (!localStorage.getItem("weatherWarningShown")) {
      setShowWeatherWarning(true)
      localStorage.setItem("weatherWarningShown", "true")
    }
  }, [tractorType, sortBy, searchQuery, currentPage])

  // Function to fetch user's current location
  const getUserLocation = () => {
    setIsGettingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use reverse geocoding with the coordinates
          // For this demo, we'll simulate getting the nearest city in Punjab
          const { latitude, longitude } = position.coords

          // Simulate reverse geocoding with major Punjab cities
          const punjabCities = [
            { name: "Amritsar, Punjab", lat: 31.634, lng: 74.8723 },
            { name: "Ludhiana, Punjab", lat: 30.901, lng: 75.8573 },
            { name: "Jalandhar, Punjab", lat: 31.326, lng: 75.5762 },
            { name: "Patiala, Punjab", lat: 30.3398, lng: 76.3869 },
            { name: "Bathinda, Punjab", lat: 30.211, lng: 74.9455 },
          ]

          // Find the nearest city (simplified calculation)
          let nearestCity = punjabCities[0]
          let minDistance = Number.MAX_VALUE

          punjabCities.forEach((city) => {
            const distance = Math.sqrt(Math.pow(latitude - city.lat, 2) + Math.pow(longitude - city.lng, 2))

            if (distance < minDistance) {
              minDistance = distance
              nearestCity = city
            }
          })

          setLocation(nearestCity.name)
          setIsGettingLocation(false)

          // Trigger search with the new location
          fetchTractors(nearestCity.name)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsGettingLocation(false)
          alert("Unable to get your location. Please enter it manually.")
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      )
    } else {
      alert("Geolocation is not supported by your browser. Please enter your location manually.")
      setIsGettingLocation(false)
    }
  }

  // Function to fetch tractors from API
  const fetchTractors = useCallback(
    (searchLocation = location) => {
      setIsLoading(true)
      setError(null)

      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll combine mock data with registered tractors
        setTimeout(() => {
          // Get registered tractors from localStorage
          const registeredTractors = getRegisteredTractors().map((tractor) => ({
            ...tractor,
            _id: `reg_${tractor._id || Math.random().toString(36).substr(2, 9)}`,
            distance: Math.random() * 10, // Random distance for demo
            rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3-5
            reviews: Math.floor(Math.random() * 100), // Random number of reviews
            available: true,
          }))

          // Combine with mock data
          let allTractors = [...mockTractors, ...registeredTractors]

          // Apply search query filter
          if (searchQuery) {
            const query = searchQuery.toLowerCase()
            allTractors = allTractors.filter(
              (tractor) =>
                tractor.name.toLowerCase().includes(query) ||
                tractor.description?.toLowerCase().includes(query) ||
                tractor.type.toLowerCase().includes(query),
            )
          }

          // Apply type filter
          if (tractorType !== "all") {
            allTractors = allTractors.filter((tractor) => tractor.type === tractorType)
          }

          // Apply location filter (simple string match for demo)
          if (searchLocation) {
            allTractors = allTractors.filter((tractor) =>
              tractor.location.toLowerCase().includes(searchLocation.toLowerCase()),
            )
          }

          // Apply price range filter
          allTractors = allTractors.filter(
            (tractor) => tractor.hourlyRate >= priceRange[0] && tractor.hourlyRate <= priceRange[1],
          )

          // Apply feature filters
          if (selectedFeatures.length > 0) {
            allTractors = allTractors.filter((tractor) =>
              selectedFeatures.every((feature) => tractor.features.includes(feature)),
            )
          }

          // Sort tractors
          if (sortBy === "distance") {
            allTractors.sort((a, b) => a.distance - b.distance)
          } else if (sortBy === "price_low") {
            allTractors.sort((a, b) => a.hourlyRate - b.hourlyRate)
          } else if (sortBy === "price_high") {
            allTractors.sort((a, b) => b.hourlyRate - a.hourlyRate)
          } else if (sortBy === "rating") {
            allTractors.sort((a, b) => b.rating - a.rating)
          }

          setTractors(allTractors)
          setIsLoading(false)
        }, 800) // Simulate network delay
      } catch (err) {
        console.error("Error fetching tractors:", err)
        setError("Failed to load tractors. Please try again later.")
        setIsLoading(false)
      }
    },
    [location, priceRange, selectedFeatures, sortBy, tractorType, searchQuery],
  )

  // Function to handle search button click
  const handleSearch = () => {
    setCurrentPage(1) // Reset to first page when searching
    fetchTractors()
  }

  // Function to handle booking a tractor
  const handleBookNow = (tractorId) => {
    const tractor = tractors.find((t) => t._id === tractorId)
    setSelectedTractor(tractor)
    setBookingStep(1)
    window.scrollTo(0, 0)
  }

  // Function to proceed to payment
  const handleProceedToPayment = () => {
    // Validate inputs
    if (!date || !time || !location) {
      alert("Please fill in all required fields (date, time, and location)")
      return
    }
    setBookingStep(2)
    window.scrollTo(0, 0)
  }

  // Function to handle payment submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault()

    // Validate card details (simple validation for demo)
    if (paymentMethod === "card") {
      if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv) {
        alert("Please fill in all card details")
        return
      }
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call to process payment
      // For demo purposes, we'll simulate a successful payment
      setTimeout(() => {
        setIsLoading(false)
        setBookingStep(3) // Move to confirmation
        window.scrollTo(0, 0)
      }, 2000)
    } catch (err) {
      console.error("Error processing payment:", err)
      setIsLoading(false)
      alert("Payment processing failed. Please try again.")
    }
  }

  // Function to handle card detail changes
  const handleCardDetailChange = (e) => {
    const { name, value } = e.target
    setCardDetails({
      ...cardDetails,
      [name]: value,
    })
  }

  // Function to reset booking process
  const handleResetBooking = () => {
    setSelectedTractor(null)
    setBookingStep(0)
  }

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedTractor) return 0
    return selectedTractor.hourlyRate * Number.parseInt(duration)
  }

  // Function to get tractor image
  const getTractorImage = (tractorName) => {
    return tractorImages[tractorName] || tractorImages.default
  }

  // Function to toggle favorite
  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]))
  }

  // Function to view tractor details
  const viewTractorDetails = (tractor) => {
    setDetailedTractor(tractor)
    setShowTractorDetails(true)
    setActiveImageIndex(0)
    window.scrollTo(0, 0)
  }

  // Function to close tractor details
  const closeTractorDetails = () => {
    setShowTractorDetails(false)
    setDetailedTractor(null)
  }

  // Function to handle feature selection
  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  // Handle price range change
  const handlePriceRangeChange = (e, index) => {
    const newValue = Number.parseInt(e.target.value)
    setPriceRange((prev) => {
      const newRange = [...prev]
      newRange[index] = newValue
      return newRange
    })
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTractors = tractors.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(tractors.length / itemsPerPage)

  // Function to change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  // All available features for filtering
  const allFeatures = [
    "4WD",
    "Power Steering",
    "Adjustable Seat",
    "Canopy",
    "AC Cabin",
    "Oil Immersed Brakes",
    "Deluxe Seat",
    "Hydraulic System",
  ]

  // Render different content based on booking step
  const renderContent = () => {
    // If showing detailed view of a tractor
    if (showTractorDetails && detailedTractor) {
      return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100 animate-fadeIn">
          <div className="relative">
            {/* Back button */}
            <button
              onClick={closeTractorDetails}
              className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>

            {/* Image gallery */}
            <div className="relative h-96 bg-gray-200">
              <img
                src={getTractorImage(detailedTractor.name) || "/placeholder.svg"}
                alt={detailedTractor.name}
                className="w-full h-full object-cover"
              />

              {/* Image navigation */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-3 h-3 rounded-full ${
                      activeImageIndex === idx ? "bg-amber-500" : "bg-white bg-opacity-60"
                    }`}
                  />
                ))}
              </div>

              {/* Favorite and share buttons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => toggleFavorite(detailedTractor._id)}
                  className={`p-2 rounded-full shadow-md ${
                    favoriteIds.includes(detailedTractor._id)
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  } transition-colors`}
                >
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{detailedTractor.name}</h1>
                <div className="mt-1 flex items-center">
                  <Star className="h-5 w-5 text-amber-500" />
                  <span className="ml-1 text-lg font-semibold text-gray-900">{detailedTractor.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">({detailedTractor.reviews} reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-amber-600">₹{detailedTractor.hourlyRate}</p>
                <p className="text-sm text-gray-500">per hour</p>
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <MapPin className="h-5 w-5 text-amber-500" />
              <span className="ml-1 text-gray-700">{detailedTractor.location}</span>
              <span className="ml-2 text-sm text-amber-600 font-medium">
                ({detailedTractor.distance.toFixed(1)} km away)
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700">{detailedTractor.description}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Features</h2>
              <div className="flex flex-wrap gap-2">
                {detailedTractor.features.map((feature, index) => (
                  <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Specifications</h2>
              <div className="grid grid-cols-2 gap-4 bg-amber-50 p-4 rounded-xl">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Engine:</span>
                  <span>{detailedTractor.specifications?.engine || "3-cylinder diesel"}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Transmission:</span>
                  <span>{detailedTractor.specifications?.transmission || "8 forward + 2 reverse"}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Lift Capacity:</span>
                  <span>{detailedTractor.specifications?.liftCapacity || "1500 kg"}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Fuel Tank:</span>
                  <span>{detailedTractor.specifications?.fuelTank || "60 L"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Owner</h2>
              <div className="flex items-center bg-gray-50 p-4 rounded-xl">
                <img
                  src={`https://ui-avatars.com/api/?name=${detailedTractor.owner?.name || "Owner"}&background=random`}
                  alt={detailedTractor.owner?.name}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium text-gray-900">{detailedTractor.owner?.name || "Owner"}</p>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-amber-500" />
                    <span className="ml-1 text-sm text-gray-700">{detailedTractor.owner?.rating || "4.5"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Available for booking</p>
                <p className="text-lg font-bold text-gray-900">Select date and time to book</p>
              </div>
              <button
                onClick={() => handleBookNow(detailedTractor._id)}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 shadow-md transform transition-transform hover:scale-105 flex items-center"
              >
                Book Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )
    }

    switch (bookingStep) {
      case 0: // Browsing tractors
        return (
          <>
            {/* Search and Filter Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-amber-100 animate-fadeIn">
              {/* Search bar */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tractors by name, type, or features..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="absolute inset-y-0 right-0 px-4 py-2 bg-amber-500 text-white rounded-r-xl hover:bg-amber-600 focus:outline-none"
                >
                  Search
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="relative">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 bg-white shadow-sm">
                    <MapPin className="h-5 w-5 text-amber-500 mr-2" />
                    <input
                      type="text"
                      id="location"
                      placeholder="Enter your location"
                      className="block w-full border-0 p-0 focus:ring-0 text-gray-900 bg-transparent"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <button
                      onClick={getUserLocation}
                      className="ml-2 p-1 text-amber-600 hover:text-amber-800"
                      disabled={isGettingLocation}
                    >
                      {isGettingLocation ? (
                        <Loader className="h-5 w-5 animate-spin" />
                      ) : (
                        <Navigation className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 bg-white shadow-sm">
                    <Calendar className="h-5 w-5 text-amber-500 mr-2" />
                    <input
                      type="date"
                      id="date"
                      className="block w-full border-0 p-0 focus:ring-0 text-gray-900 bg-transparent"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 bg-white shadow-sm">
                    <Clock className="h-5 w-5 text-amber-500 mr-2" />
                    <input
                      type="time"
                      id="time"
                      className="block w-full border-0 p-0 focus:ring-0 text-gray-900 bg-transparent"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (hours)
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 bg-white shadow-sm">
                    <Clock className="h-5 w-5 text-amber-500 mr-2" />
                    <select
                      id="duration"
                      className="block w-full border-0 p-0 focus:ring-0 text-gray-900 bg-transparent"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="4">4 hours</option>
                      <option value="8">8 hours</option>
                      <option value="24">Full day (24 hours)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Weather Condition */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="flex items-center">
                  <div className="mr-3">
                    {weatherCondition === "sunny" && <Sun className="h-8 w-8 text-yellow-500" />}
                    {weatherCondition === "rainy" && <Droplet className="h-8 w-8 text-blue-500" />}
                    {weatherCondition === "windy" && <Wind className="h-8 w-8 text-gray-500" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Weather Forecast for {location || "Your Area"}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {weatherCondition === "sunny" && "Sunny conditions expected. Great for most farming activities."}
                      {weatherCondition === "rainy" && "Rain expected. Consider tractors with cabins for comfort."}
                      {weatherCondition === "windy" && "Windy conditions expected. Some operations may be affected."}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <select
                      className="text-sm border-0 bg-transparent text-gray-700 focus:ring-0"
                      value={weatherCondition}
                      onChange={(e) => setWeatherCondition(e.target.value)}
                    >
                      <option value="sunny">Sunny</option>
                      <option value="rainy">Rainy</option>
                      <option value="windy">Windy</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-md transform transition-transform hover:scale-105 flex items-center"
                >
                  <Tractor className="h-5 w-5 mr-2" />
                  Find Available Tractors
                </button>
              </div>

              {/* Filters */}
              <div className="mt-4">
                <button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-amber-600"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isFiltersOpen ? "rotate-180" : ""}`} />
                </button>

                {isFiltersOpen && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="tractorType" className="block text-sm font-medium text-gray-700 mb-2">
                          Tractor Type
                        </label>
                        <select
                          id="tractorType"
                          className="block w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-amber-500 focus:border-amber-500 bg-white shadow-sm"
                          value={tractorType}
                          onChange={(e) => setTractorType(e.target.value)}
                        >
                          <option value="all">All Types</option>
                          <option value="light">Light Duty (30-45 HP)</option>
                          <option value="medium">Medium Duty (45-60 HP)</option>
                          <option value="heavy">Heavy Duty (60+ HP)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
                          Sort By
                        </label>
                        <select
                          id="sortBy"
                          className="block w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-amber-500 focus:border-amber-500 bg-white shadow-sm"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="distance">Nearest First</option>
                          <option value="price_low">Price: Low to High</option>
                          <option value="price_high">Price: High to Low</option>
                          <option value="rating">Highest Rated</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹ per hour)</label>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600 text-sm">₹{priceRange[0]}</span>
                          <div className="flex-grow">
                            <input
                              type="range"
                              min="100"
                              max="1000"
                              step="50"
                              value={priceRange[0]}
                              onChange={(e) => handlePriceRangeChange(e, 0)}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                          </div>
                          <span className="text-gray-600 text-sm">₹{priceRange[1]}</span>
                          <div className="flex-grow">
                            <input
                              type="range"
                              min="100"
                              max="1000"
                              step="50"
                              value={priceRange[1]}
                              onChange={(e) => handlePriceRangeChange(e, 1)}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {allFeatures.map((feature) => (
                            <div
                              key={feature}
                              onClick={() => toggleFeature(feature)}
                              className={`px-3 py-2 rounded-lg cursor-pointer text-sm flex items-center ${
                                selectedFeatures.includes(feature)
                                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                                  : "bg-white border border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-sm mr-2 flex items-center justify-center ${
                                  selectedFeatures.includes(feature) ? "bg-amber-500" : "border border-gray-400"
                                }`}
                              >
                                {selectedFeatures.includes(feature) && <Check className="h-3 w-3 text-white" />}
                              </div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => {
                          setTractorType("all")
                          setSortBy("distance")
                          setPriceRange([200, 800])
                          setSelectedFeatures([])
                          setSearchQuery("")
                        }}
                        className="px-4 py-2 text-amber-600 hover:text-amber-800 mr-2"
                      >
                        Reset Filters
                      </button>
                      <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Weather Warning Modal */}
            {showWeatherWarning && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-4 animate-scaleIn">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Droplet className="h-8 w-8 text-blue-500 mr-3" />
                      <h3 className="text-lg font-bold text-gray-900">Weather Advisory</h3>
                    </div>
                    <button onClick={() => setShowWeatherWarning(false)} className="text-gray-400 hover:text-gray-500">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600">
                      Light rainfall is expected in some parts of Punjab over the next 24 hours. Consider booking
                      tractors with cabins for comfort during operations.
                    </p>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Our system automatically adjusts recommendations based on weather conditions to ensure optimal
                        farming operations.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowWeatherWarning(false)}
                      className="mt-5 w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors"
                    >
                      Got it
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg animate-fadeIn">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tractors List */}
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-amber-100">
                  <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent"></div>
                  <p className="mt-6 text-xl font-medium text-gray-700">Loading available tractors...</p>
                  <p className="mt-2 text-gray-500">Finding the best options for you</p>
                </div>
              ) : tractors.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-amber-100 animate-fadeIn">
                  <Tractor className="mx-auto h-20 w-20 text-gray-400" />
                  <h3 className="mt-6 text-2xl font-medium text-gray-900">No tractors available</h3>
                  <p className="mt-2 text-gray-500 max-w-md mx-auto">
                    We couldn't find any tractors matching your criteria. Try adjusting your filters or search for a
                    different location.
                  </p>
                  <button
                    onClick={() => {
                      setTractorType("all")
                      setLocation("")
                      setSearchQuery("")
                      setPriceRange([200, 800])
                      setSelectedFeatures([])
                      fetchTractors()
                    }}
                    className="mt-6 px-6 py-3 bg-amber-100 text-amber-800 rounded-xl hover:bg-amber-200 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md border border-amber-100 animate-fadeIn">
                    <h2 className="text-xl font-bold text-gray-900">
                      {tractors.length} Tractors Available
                      {location && ` near ${location}`}
                    </h2>
                    <div className="flex items-center">
                      <button
                        onClick={() => setShowMap(!showMap)}
                        className={`px-3 py-1 rounded-lg mr-2 text-sm font-medium ${
                          showMap ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {showMap ? "Hide Map" : "Show Map"}
                      </button>
                      <button
                        onClick={() => setSortBy("distance")}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          sortBy === "distance"
                            ? "bg-amber-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Nearest
                      </button>
                    </div>
                  </div>

                  {/* Map View (simplified for demo) */}
                  {showMap && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-64 border border-amber-100 animate-fadeIn">
                      <div className="h-full bg-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="h-8 w-8 text-amber-500 mx-auto" />
                          <p className="mt-2 text-gray-700">Map view would display here with tractor locations</p>
                          <p className="text-sm text-gray-500">(Map integration not included in demo)</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentTractors.map((tractor) => (
                    <div
                      key={tractor._id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100 hover:shadow-xl transition-shadow duration-300 animate-fadeIn"
                    >
                      <div className="md:flex">
                        <div className="md:flex-shrink-0 relative">
                          <img
                            className="h-64 w-full object-cover md:w-64 md:h-auto cursor-pointer"
                            src={getTractorImage(tractor.name) || "/placeholder.svg"}
                            alt={tractor.name}
                            onClick={() => viewTractorDetails(tractor)}
                          />
                          <div className="absolute top-4 left-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                tractor.type === "light"
                                  ? "bg-blue-100 text-blue-800"
                                  : tractor.type === "medium"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-orange-100 text-orange-800"
                              }`}
                            >
                              {tractor.type.charAt(0).toUpperCase() + tractor.type.slice(1)} Duty
                            </span>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500 text-white">
                              {tractor.horsepower} HP
                            </span>
                          </div>
                          <button
                            onClick={() => toggleFavorite(tractor._id)}
                            className={`absolute top-4 right-4 p-2 rounded-full ${
                              favoriteIds.includes(tractor._id)
                                ? "bg-red-500 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                            } shadow-md transition-colors`}
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="p-6 w-full">
                          <div className="flex justify-between items-start">
                            <div>
                              <h2
                                className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-amber-600 transition-colors"
                                onClick={() => viewTractorDetails(tractor)}
                              >
                                {tractor.name}
                              </h2>
                              <div className="mt-1 flex items-center">
                                <Star className="h-5 w-5 text-amber-500" />
                                <span className="ml-1 text-lg font-semibold text-gray-900">{tractor.rating}</span>
                                <span className="ml-1 text-sm text-gray-500">({tractor.reviews} reviews)</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold text-amber-600">₹{tractor.hourlyRate}</p>
                              <p className="text-sm text-gray-500">per hour</p>
                            </div>
                          </div>

                          <p className="mt-3 text-gray-600 line-clamp-2">{tractor.description}</p>

                          <div className="mt-4 flex items-center">
                            <MapPin className="h-5 w-5 text-amber-500" />
                            <span className="ml-1 text-gray-700">{tractor.location}</span>
                            <span className="ml-2 text-sm text-amber-600 font-medium">
                              ({tractor.distance.toFixed(1)} km away)
                            </span>
                          </div>

                          <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-700">Features:</h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {tractor.features.slice(0, 3).map((feature, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                                >
                                  {feature}
                                </span>
                              ))}
                              {tractor.features.length > 3 && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  +{tractor.features.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Zap className="h-4 w-4 text-amber-500 mr-1" />
                              <span>Engine: {tractor.specifications?.engine || "3-cylinder diesel"}</span>
                            </div>
                            <div className="flex items-center">
                              <Truck className="h-4 w-4 text-amber-500 mr-1" />
                              <span>
                                Transmission: {tractor.specifications?.transmission || "8 forward + 2 reverse"}
                              </span>
                            </div>
                          </div>

                          <div className="mt-6 flex justify-between items-center">
                            <div className="flex items-center">
                              <img
                                src={`https://ui-avatars.com/api/?name=${tractor.owner?.name || "Owner"}&background=random`}
                                alt={tractor.owner?.name}
                                className="h-8 w-8 rounded-full mr-2"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{tractor.owner?.name || "Owner"}</p>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-amber-500" />
                                  <span className="ml-1 text-xs text-gray-500">{tractor.owner?.rating || "4.5"}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => viewTractorDetails(tractor)}
                                className="px-3 py-2 border border-amber-500 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => handleBookNow(tractor._id)}
                                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 shadow-md transition-colors flex items-center"
                              >
                                Book Now
                                <ArrowRight className="ml-1 h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <nav className="flex items-center space-x-2">
                        <button
                          onClick={() => paginate(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className={`p-2 rounded-lg ${
                            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-amber-100"
                          }`}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 rounded-lg ${
                              currentPage === index + 1 ? "bg-amber-500 text-white" : "text-gray-700 hover:bg-amber-100"
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}

                        <button
                          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className={`p-2 rounded-lg ${
                            currentPage === totalPages
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-gray-700 hover:bg-amber-100"
                          }`}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )

      case 1: // Booking details
        return (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-amber-100 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
              <button onClick={handleResetBooking} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            {selectedTractor && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="rounded-xl overflow-hidden mb-4 shadow-md">
                    <img
                      src={getTractorImage(selectedTractor.name) || "/placeholder.svg"}
                      alt={selectedTractor.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">{selectedTractor.name}</h3>
                  <div className="mt-1 flex items-center">
                    <Star className="h-5 w-5 text-amber-500" />
                    <span className="ml-1 text-lg font-semibold text-gray-900">{selectedTractor.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({selectedTractor.reviews} reviews)</span>
                  </div>

                  <p className="mt-3 text-gray-600">{selectedTractor.description}</p>

                  <div className="mt-4 flex items-center">
                    <MapPin className="h-5 w-5 text-amber-500" />
                    <span className="ml-1 text-gray-700">{selectedTractor.location}</span>
                    <span className="ml-2 text-sm text-amber-600 font-medium">
                      ({selectedTractor.distance.toFixed(1)} km away)
                    </span>
                  </div>

                  <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">Specifications:</h3>
                    <div className="mt-2 grid grid-cols-2 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Engine:</span>
                        <span>{selectedTractor.specifications?.engine || "3-cylinder diesel"}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Transmission:</span>
                        <span>{selectedTractor.specifications?.transmission || "8 forward + 2 reverse"}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Lift Capacity:</span>
                        <span>{selectedTractor.specifications?.liftCapacity || "1500 kg"}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Fuel Tank:</span>
                        <span>{selectedTractor.specifications?.fuelTank || "60 L"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-amber-50 p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Your Booking</h3>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="booking-location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                          <MapPin className="h-5 w-5 text-amber-500 mr-2" />
                          <input
                            type="text"
                            id="booking-location"
                            className="block w-full border-0 p-0 focus:ring-0 text-gray-900 bg-transparent"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="booking-date" className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                          <Calendar className="h-5 w-5 text-amber-500 mr-2" />
                          <input
                            type="date"
                            id="booking-date"
                            className="block w-full border-0 p-0 focus:ring-0 text-gray-900 bg-transparent"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="booking-time" className="block text-sm font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                          <Clock className="h-5 w-5 text-amber-500 mr-2" />
                          <input
                            type="time"
                            id="booking-time"
                            className="block w-full border-0 p-0 focus:ring-0 text-gray-900 bg-transparent"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="booking-duration" className="block text-sm font-medium text-gray-700 mb-1">
                          Duration
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                          <Clock className="h-5 w-5 text-amber-500 mr-2" />
                          <select
                            id="booking-duration"
                            className="block w-full border-0 p-0 focus:ring-0 text-gray-900 bg-transparent"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                          >
                            <option value="1">1 hour</option>
                            <option value="2">2 hours</option>
                            <option value="4">4 hours</option>
                            <option value="8">8 hours</option>
                            <option value="24">Full day (24 hours)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-amber-200 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Hourly Rate</span>
                        <span className="font-medium text-gray-900">₹{selectedTractor.hourlyRate}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium text-gray-900">
                          {duration} {Number.parseInt(duration) === 1 ? "hour" : "hours"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-gray-900">
                          ₹{selectedTractor.hourlyRate * Number.parseInt(duration)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-600">Service Fee</span>
                        <span className="font-medium text-gray-900">
                          ₹{Math.round(selectedTractor.hourlyRate * Number.parseInt(duration) * 0.05)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-amber-200">
                        <span>Total</span>
                        <span className="text-amber-600">
                          ₹{Math.round(selectedTractor.hourlyRate * Number.parseInt(duration) * 1.05)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={handleProceedToPayment}
                        className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-md flex items-center justify-center"
                      >
                        <CreditCard className="h-5 w-5 mr-2" />
                        Proceed to Payment
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                      <Shield className="h-4 w-4 mr-1" />
                      <span>Secure booking with 100% money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 2: // Payment
        return (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-amber-100 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
              <button onClick={() => setBookingStep(1)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            {selectedTractor && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-amber-50 p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h3>

                    <div className="flex items-center mb-4">
                      <img
                        src={getTractorImage(selectedTractor.name) || "/placeholder.svg"}
                        alt={selectedTractor.name}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{selectedTractor.name}</h4>
                        <p className="text-sm text-gray-600">
                          {selectedTractor.horsepower} HP •{" "}
                          {selectedTractor.type.charAt(0).toUpperCase() + selectedTractor.type.slice(1)} Duty
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span className="font-medium text-gray-900">
                          {new Date(date).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time</span>
                        <span className="font-medium text-gray-900">{time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium text-gray-900">
                          {duration} {Number.parseInt(duration) === 1 ? "hour" : "hours"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location</span>
                        <span className="font-medium text-gray-900">{location}</span>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-amber-200 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Hourly Rate</span>
                        <span className="font-medium text-gray-900">₹{selectedTractor.hourlyRate}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium text-gray-900">
                          {duration} {Number.parseInt(duration) === 1 ? "hour" : "hours"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-gray-900">
                          ₹{selectedTractor.hourlyRate * Number.parseInt(duration)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-600">Service Fee</span>
                        <span className="font-medium text-gray-900">
                          ₹{Math.round(selectedTractor.hourlyRate * Number.parseInt(duration) * 0.05)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-amber-200">
                        <span>Total</span>
                        <span className="text-amber-600">
                          ₹{Math.round(selectedTractor.hourlyRate * Number.parseInt(duration) * 1.05)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-800">
                        Your booking is protected by our Farmer Protection Policy. If the tractor doesn't meet your
                        expectations, we'll provide a full refund or replacement.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        id="payment-card"
                        name="payment-method"
                        type="radio"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                      />
                      <label htmlFor="payment-card" className="flex items-center">
                        <CreditCard className="h-5 w-5 text-amber-500 mr-2" />
                        <span className="font-medium text-gray-900">Credit/Debit Card</span>
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        id="payment-upi"
                        name="payment-method"
                        type="radio"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                      />
                      <label htmlFor="payment-upi" className="flex items-center">
                        <Zap className="h-5 w-5 text-amber-500 mr-2" />
                        <span className="font-medium text-gray-900">UPI</span>
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        id="payment-cash"
                        name="payment-method"
                        type="radio"
                        checked={paymentMethod === "cash"}
                        onChange={() => setPaymentMethod("cash")}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                      />
                      <label htmlFor="payment-cash" className="flex items-center">
                        <Truck className="h-5 w-5 text-amber-500 mr-2" />
                        <span className="font-medium text-gray-900">Cash on Delivery</span>
                      </label>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="card-number"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-900"
                          value={cardDetails.cardNumber}
                          onChange={handleCardDetailChange}
                          maxLength={19}
                        />
                      </div>

                      <div>
                        <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="card-name"
                          name="cardName"
                          placeholder="John Doe"
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-900"
                          value={cardDetails.cardName}
                          onChange={handleCardDetailChange}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiry-date"
                            name="expiryDate"
                            placeholder="MM/YY"
                            className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-900"
                            value={cardDetails.expiryDate}
                            onChange={handleCardDetailChange}
                            maxLength={5}
                          />
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-900"
                            value={cardDetails.cvv}
                            onChange={handleCardDetailChange}
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="mt-6">
                      <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700 mb-1">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        id="upi-id"
                        placeholder="yourname@upi"
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-900"
                      />
                      <p className="mt-2 text-sm text-gray-500">You will receive a payment request on your UPI app.</p>
                    </div>
                  )}

                  {paymentMethod === "cash" && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        You will pay the full amount in cash when the tractor is delivered to your location. Please
                        ensure you have the exact amount ready.
                      </p>
                    </div>
                  )}

                  <div className="mt-8">
                    <button
                      onClick={handlePaymentSubmit}
                      disabled={isLoading}
                      className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-md flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="animate-spin h-5 w-5 mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>Pay ₹{Math.round(selectedTractor.hourlyRate * Number.parseInt(duration) * 1.05)}</>
                      )}
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                    <Shield className="h-4 w-4 mr-1" />
                    <span>Your payment information is secure</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 3: // Confirmation
        return (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100 text-center animate-fadeIn">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tractor Booked Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your booking has been confirmed and the tractor owner has been notified.
            </p>

            {selectedTractor && (
              <div className="bg-amber-50 p-6 rounded-xl max-w-md mx-auto mb-8 shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={getTractorImage(selectedTractor.name) || "/placeholder.svg"}
                    alt={selectedTractor.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-gray-900">{selectedTractor.name}</h4>
                    <p className="text-sm text-gray-600">
                      {selectedTractor.horsepower} HP •{" "}
                      {selectedTractor.type.charAt(0).toUpperCase() + selectedTractor.type.slice(1)} Duty
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-left">
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date(date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Time</p>
                    <p className="font-medium">{time}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">
                      {duration} {Number.parseInt(duration) === 1 ? "hour" : "hours"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium">{location}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Booking ID</p>
                    <p className="font-medium">
                      FARM
                      {Math.floor(Math.random() * 10000)
                        .toString()
                        .padStart(4, "0")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleResetBooking}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-md"
              >
                Book Another Tractor
              </button>

              <Link
                to="/bookings"
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                View My Bookings
              </Link>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-md mx-auto">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-800 text-left">
                  You will receive a confirmation email with all the details. The tractor owner will contact you before
                  the scheduled time to coordinate the delivery.
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
            Book a Tractor
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            Rent high-quality tractors on-demand for your farming needs
          </p>
        </div>

        {/* Main Content */}
        {renderContent()}
      </div>
    </div>
  )
}

export default TractorBooking

