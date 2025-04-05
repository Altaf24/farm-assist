import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Tractor, Filter, ChevronDown, Star, ArrowRight } from 'lucide-react';
import axios from 'axios';

const BASE_URL = "http://localhost:56789";

const TractorBooking = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('2025-05-01');
  const [time, setTime] = useState('22:55');
  const [duration, setDuration] = useState('2');
  const [tractorType, setTractorType] = useState('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [tractors, setTractors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTractors();
  }, [tractorType]);

  const fetchTractors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (tractorType !== 'all') {
        params.append('type', tractorType);
      }
      params.append('available', 'true');
      if (location) {
        params.append('location', location);
      }

      const response = await axios.get(`${BASE_URL}/tractors?${params.toString()}`);
      setTractors(response.data);
    } catch (err) {
      console.error('Error fetching tractors:', err);
      setError('Failed to load tractors. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    fetchTractors();
  };

  const handleBookNow = async (tractorId) => {
    try {
      // Check if user is logged in (you'll need to implement auth state management)
      const token = localStorage.getItem('token');
      console.log('Token:', token);
  
      if (!token) {
        alert('Please login to book a tractor');
        // Redirect to login page
        return;
      }

      // Validate inputs
      if (!date || !time || !location) {
        alert('Please fill in all required fields (date, time, and location)');
        return;
      }

      // Create booking
      const response = await axios.post(
        `${BASE_URL}/bookings`,
        {
          tractorId,
          date,
          startTime: time,
          duration: parseInt(duration),
          location
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      alert(`Booking confirmed! Total price: ₹${response.data.totalPrice}`);
      // Redirect to bookings page or show confirmation
    } catch (err) {
      console.error('Error booking tractor:', err);
      alert(err.response?.data?.message || 'Failed to book tractor. Please try again.');
    }
  };

  const filteredTractors = tractors.filter(tractor => 
    (tractorType === 'all' || tractor.type === tractorType) &&
    tractor.available
  );

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Book a Tractor</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Rent tractors on-demand for your farming needs
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  id="location"
                  placeholder="Enter your location"
                  className="block w-full border-0 p-0 focus:ring-0 text-gray-900"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            
            <div className="relative">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="date"
                  id="date"
                  className="block w-full border-0 p-0 focus:ring-0 text-gray-900"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            
            <div className="relative">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="time"
                  id="time"
                  className="block w-full border-0 p-0 focus:ring-0 text-gray-900"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            
            <div className="relative">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
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
          
          {/* Search Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Search Tractors
            </button>
          </div>
          
          {/* Filters */}
          <div className="mt-4">
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center text-sm font-medium text-gray-700"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isFiltersOpen && (
              <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor="tractorType" className="block text-sm font-medium text-gray-700 mb-1">Tractor Type</label>
                  <select
                    id="tractorType"
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    value={tractorType}
                    onChange={(e) => setTractorType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="light">Light Duty</option>
                    <option value="medium">Medium Duty</option>
                    <option value="heavy">Heavy Duty</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tractors List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-700">Loading available tractors...</p>
            </div>
          ) : filteredTractors.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <Tractor className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No tractors available</h3>
              <p className="mt-1 text-gray-500">Try changing your filters or search criteria.</p>
            </div>
          ) : (
            filteredTractors.map((tractor) => (
              <div key={tractor._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img 
                      className="h-48 w-full object-cover md:w-48" 
                      src={tractor.image} 
                      alt={tractor.name} 
                    />
                  </div>
                  <div className="p-6 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{tractor.name}</h2>
                        <p className="mt-1 text-sm text-gray-500">{tractor.horsepower} HP • {tractor.type.charAt(0).toUpperCase() + tractor.type.slice(1)} Duty</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">₹{tractor.hourlyRate}</p>
                        <p className="text-sm text-gray-500">per hour</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="ml-1 text-sm text-gray-500">{tractor.location} ({tractor.distance} km away)</span>
                      <div className="ml-4 flex items-center">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-700">{tractor.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({tractor.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-700">Features:</h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {tractor.features.map((feature, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => handleBookNow(tractor._id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TractorBooking;
