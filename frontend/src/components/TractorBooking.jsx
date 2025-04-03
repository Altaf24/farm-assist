import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Tractor, Filter, ChevronDown, Star, ArrowRight } from 'lucide-react';

const TractorBooking = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('2');
  const [tractorType, setTractorType] = useState('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [tractors, setTractors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dummy tractor data
  const dummyTractors = [
    {
      id: 1,
      name: "John Deere 5E Series",
      type: "medium",
      horsepower: 75,
      hourlyRate: 450,
      location: "Amritsar, Punjab",
      distance: 3.2,
      rating: 4.8,
      reviews: 124,
      image: "https://www.deere.com/assets/images/region-4/products/tractors/5e-series/5075e_r4f009614_rrd_large_a98236e5e8e9e301b1f1e5d0f3b5f5c5c5e2e9d9.jpg",
      features: ["GPS Navigation", "Air Conditioned Cabin", "Implements Available"],
      available: true
    },
    {
      id: 2,
      name: "Mahindra 575 DI",
      type: "medium",
      horsepower: 45,
      hourlyRate: 350,
      location: "Ludhiana, Punjab",
      distance: 5.7,
      rating: 4.5,
      reviews: 89,
      image: "https://www.mahindratractor.com/images/Gallery/575-DI-XP-PLUS/575-DI-XP-PLUS-1.png",
      features: ["Power Steering", "Adjustable Seat", "Dual Clutch"],
      available: true
    },
    {
      id: 3,
      name: "Sonalika Sikandar DI 750 III",
      type: "heavy",
      horsepower: 75,
      hourlyRate: 550,
      location: "Jalandhar, Punjab",
      distance: 8.1,
      rating: 4.7,
      reviews: 67,
      image: "https://www.sonalika.com/media/1ufnwcgz/sikander-dx-55.png",
      features: ["4WD", "Digital Dashboard", "Heavy Duty Hydraulics"],
      available: true
    },
    {
      id: 4,
      name: "New Holland 3600-2",
      type: "light",
      horsepower: 35,
      hourlyRate: 300,
      location: "Patiala, Punjab",
      distance: 4.3,
      rating: 4.3,
      reviews: 52,
      image: "https://www.newholland.com/apac/en-in/products/tractors/3600-2-all-rounder-plus-series/3600-2-all-rounder-plus-series-overview/_jcr_content/root/teaser.coreimg.jpeg/1679995266247/3600-2-all-rounder-plus-series-overview.jpeg",
      features: ["Fuel Efficient", "Easy Maintenance", "Compact Design"],
      available: false
    },
    {
      id: 5,
      name: "Kubota MU5501",
      type: "heavy",
      horsepower: 55,
      hourlyRate: 500,
      location: "Bathinda, Punjab",
      distance: 10.5,
      rating: 4.9,
      reviews: 43,
      image: "https://www.kubota.co.in/product/tractor/img/mu5501/mu5501_main.png",
      features: ["Japanese Technology", "Low Noise", "High Torque"],
      available: true
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch tractors
    setTimeout(() => {
      setTractors(dummyTractors);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredTractors = tractors.filter(tractor => 
    (tractorType === 'all' || tractor.type === tractorType) &&
    tractor.available
  );

  const handleBookNow = (tractorId) => {
    // In a real app, this would navigate to a confirmation page or make an API call
    alert(`Booking confirmed for tractor ID: ${tractorId}`);
  };

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
              <div key={tractor.id} className="bg-white rounded-xl shadow-md overflow-hidden">
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
                        onClick={() => handleBookNow(tractor.id)}
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
