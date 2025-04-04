import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Tractor, X, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BASE_URL = "http://localhost:56789";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your bookings');
        setIsLoading(false);
        return;
      }

      const response = await axios.get(`${BASE_URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      
      setBookings(response.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to cancel a booking');
        return;
      }

      // Confirm cancellation
      if (!window.confirm('Are you sure you want to cancel this booking?')) {
        return;
      }

      await axios.patch(
        `${BASE_URL}/bookings/${bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      // Refresh bookings after cancellation
      fetchBookings();
      alert('Booking cancelled successfully');
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert(err.response?.data?.message || 'Failed to cancel booking. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pending
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X className="mr-1 h-3 w-3" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Your Bookings</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            View and manage your tractor bookings
          </p>
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

        {/* Bookings List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-700">Loading your bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <Tractor className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings found</h3>
              <p className="mt-1 text-gray-500">You haven't made any tractor bookings yet.</p>
              <div className="mt-6">
                <Link
                  to="/tractor-booking"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Book a Tractor
                </Link>
              </div>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img 
                      className="h-48 w-full object-cover md:w-48" 
                      src={booking.tractor.image} 
                      alt={booking.tractor.name} 
                    />
                  </div>
                  <div className="p-6 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{booking.tractor.name}</h2>
                        <p className="mt-1 text-sm text-gray-500">
                          {booking.tractor.horsepower} HP • {booking.tractor.type.charAt(0).toUpperCase() + booking.tractor.type.slice(1)} Duty
                        </p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">{booking.startTime} • {booking.duration} hour(s)</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">{booking.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700">Total Price: </span>
                        <span className="ml-2 text-sm font-bold text-gray-900">₹{booking.totalPrice}</span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="mt-6 flex justify-end">
                      {booking.status === 'pending' || booking.status === 'confirmed' ? (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel Booking
                        </button>
                      ) : null}
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

export default BookingHistory;
