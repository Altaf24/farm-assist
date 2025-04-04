import axios from 'axios';

const BASE_URL = "http://localhost:56789";

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized errors (redirect to login)
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API functions for tractors
export const tractorApi = {
  getAllTractors: (params) => api.get('/tractors', { params }),
  getTractorById: (id) => api.get(`/tractors/${id}`),
  createTractor: (data) => api.post('/tractors', data),
  updateTractor: (id, data) => api.put(`/tractors/${id}`, data),
  deleteTractor: (id) => api.delete(`/tractors/${id}`)
};

// API functions for bookings
export const bookingApi = {
  createBooking: (data) => api.post('/bookings', data),
  getAllBookings: () => api.get('/bookings'),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  cancelBooking: (id) => api.patch(`/bookings/${id}/cancel`)
};

export default api;
