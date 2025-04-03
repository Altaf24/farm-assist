import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Tractor, Filter, ChevronDown, Star, ArrowRight, X, Check, AlertTriangle } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Dummy booking data
  const dummyBookings = [
    {
      id: 'BK-1001',
      tractorId: 1,
      tractorName: "John Deere 5E Series",
      tractorImage: "https://www.deere.com/assets/images/region-4/products/tractors/5e-series/5075e_r4f009614_rrd_large_a98236e5e8e9e301b1f1e5d0f3b5f5c5c5e2e9d9.jpg",
      bookingDate: "2023-11-25",
      startTime: "08:00",
      endTime: "12:00",
      duration: 4,
      location: "Amritsar, Punjab",
      totalAmount: 1800,
      status: "confirmed",
      ownerName: "Rajinder Singh",
      ownerPhone: "+91 98765 43210"
    },
    {
      id: 'BK-1002',
      tractorId: 3,
      tractorName: "Sonalika Sikandar DI 750 III",
      tractorImage: "https://www.sonalika.com/media/1ufnwcgz/sikander-dx-55.png",
      bookingDate: "2023-11-28",
      startTime: "14:00",
      endTime: "18:00",
      duration: 4,
      location: "Jalandhar, Punjab",
      totalAmount: 2200,
      status: "pending",
      ownerName: "Gurpreet Kaur",
      ownerPhone: "+91 87654 32109"
    },
    {
      id: 'BK-1003',
      tractorId: 5,
      tractorName: "Kubota MU5501",
      tractorImage: "https://www.kubota.co.in/product/tractor/img/mu5501/mu5501_main.png",
      bookingDate: "2023-11-15",
      startTime: "09:00",
      endTime: "17:00",
      duration: 8,
      location: "Bathinda, Punjab",
      totalAmount: 4000,
      status: "completed",
      ownerName: "Harjit Singh",
      ownerPhone: "+91 76543 21098",
      rating: 4
    },
    {
      id: 'BK-1004',
      tractorId: 2,
      tractorName: "Mahindra 575 DI",
      tractorImage: "https://www.mahindratractor.com/images/Gallery/575-DI-XP-PLUS/575-DI-XP-PLUS-1.png",
      bookingDate: "2023-11-10",
      startTime: "07:00",
      endTime: "15:00",
      duration: 8,
      location: "Ludhiana, Punjab",
      totalAmount: 2800,
      status: "cancelled",
      cancellationReason: "Weather conditions",
      ownerName: "Manpreet Singh",
      ownerPhone: "+91 65432 10987"
    },
    {
      id: 'BK-1005',
      tractorId: 1,
      tractorName: "John Deere 5E Series",
      tractorImage: "https://www.deere.com/assets/images/region-4/products/tractors/5e-series/5075e_r4f009614_rrd_large_a98236e5e8e9e301b1f1e5d0f3b5f5c5c5e2e9d9.jpg",
      bookingDate: "2023-11-05",
      startTime: "10:00",
      endTime: "14:00",
      duration: 4,
      location: "Amritsar, Punjab",
      totalAmount: 1800,
      status: "completed",
      rating: 5,
      ownerName: "Rajinder Singh",
      ownerPhone: "+91 98765 43210"
    }
  ];

  useEffect(() => {
    // Check if user is signed in
    const token = localStorage.getItem('token');
    if (token) {
      setIsSignedIn(true);
    }

    // Simulate API call to fetch bookings
    setTimeout(() => {
      setBookings(dummyBookings);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'upcoming') {
      return booking.status === 'confirmed' || booking.status === 'pending';
    } else if (activeTab === 'completed') {
      return booking.status === 'completed';
    } else if (activeTab === 'cancelled') {
      return booking.status === 'cancelled';
    }
    return true;
  });

  // Function to handle booking cancellation
  const handleCancelBooking = (bookingId) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      // In a real app, this would make an API call
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? {...booking, status: 'cancelled', cancellationReason: 'User cancelled'} 
          : booking
      ));
      alert('Booking cancelled successfully');
    }
  };

  // Function to handle rating submission
  const handleRateBooking = (bookingId, rating) => {
    // In a real app, this would make an API call
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? {...booking, rating} 
        : booking
    ));
    alert(`Thank you for rating your experience with ${rating} stars!`);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!isSignedIn) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Please sign in to view your bookings</h3>
            <p className="mt-1 text-gray-500">You need to be logged in to access this page.</p>
            <div className="mt-6">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">My Bookings</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Manage and track your tractor rentals
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md p-1 mb-8">
          <div className="sm:hidden">
            <select
              id="tabs"
              name="tabs"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`${
                    activeTab === 'upcoming'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`${
                    activeTab === 'completed'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setActiveTab('cancelled')}
                  className={`${
                    activeTab === 'cancelled'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Cancelled
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-700">Loading your bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <Tractor className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings found</h3>
              <p className="mt-1 text-gray-500">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming tractor bookings." 
                  : activeTab === 'completed'
                    ? "You don't have any completed bookings yet."
                    : "You don't have any cancelled bookings."}
              </p>
              {activeTab === 'upcoming' && (
                <div className="mt-6">
                  <Link
                    to="/tractor/book-now"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Book a Tractor
                  </Link>
                </div>
              )}
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img 
                      className="h-48 w-full object-cover md:w-48" 
                      src={booking.tractorImage} 
                      alt={booking.tractorName} 
                    />
                  </div>
                  <div className="p-6 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <h2 className="text-xl font-semibold text-gray-900">{booking.tractorName}</h2>
                          {booking.status === 'confirmed' && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Check className="mr-1 h-3 w-3" />
                              Confirmed
                            </span>
                          )}
                          {booking.status === 'pending' && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Clock className="mr-1 h-3 w-3" />
                              Pending
                            </span>
                          )}
                          {booking.status === 'completed' && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <Check className="mr-1 h-3 w-3" />
                              Completed
                            </span>
                          )}
                          {booking.status === 'cancelled' && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <X className="mr-1 h-3 w-3" />
                              Cancelled
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Booking ID: {booking.id}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">₹{booking.totalAmount}</p>
                        <p className="text-sm text-gray-500">for {booking.duration} hours</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="ml-1 text-sm text-gray-700">
                            {formatDate(booking.bookingDate)}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="ml-1 text-sm text-gray-700">
                            {booking.startTime} - {booking.endTime} ({booking.duration} hours)
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="ml-1 text-sm text-gray-700">
                            {booking.location}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Owner Details:</h3>
                        <p className="mt-1 text-sm text-gray-700">{booking.ownerName}</p>
                        <p className="text-sm text-gray-700">{booking.ownerPhone}</p>
                        
                        {booking.cancellationReason && (
                          <div className="mt-2">
                            <h3 className="text-sm font-medium text-red-600">Cancellation Reason:</h3>
                            <p className="text-sm text-gray-700">{booking.cancellationReason}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Cancel Booking
                        </button>
                      )}
                      
                      {booking.status === 'completed' && !booking.rating && (
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-gray-700">Rate your experience:</span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRateBooking(booking.id, star)}
                              className="p-1 text-gray-400 hover:text-yellow-400 focus:outline-none"
                            >
                              <Star className="h-5 w-5" />
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {booking.status === 'completed' && booking.rating && (
                        <div className="flex items-center">
                          <span className="text-sm text-gray-700 mr-2">Your rating:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-5 w-5 ${i < booking.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill={i < booking.rating ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {(booking.status === 'confirmed' || booking.status === 'pending') && (
                        <Link
                          to={`/tractor/booking-details/${booking.id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          View Details
                        </Link>
                      )}
                      
                      {booking.status === 'completed' && (
                        <Link
                          to="/tractor/book-now"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Book Again
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Book a new tractor button */}
        {filteredBookings.length > 0 && activeTab === 'upcoming' && (
          <div className="mt-8 text-center">
            <Link
              to="/tractor/book-now"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Book Another Tractor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

                       
