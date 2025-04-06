import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, Save, X, Shield, Key, Bell, LogOut } from "lucide-react";
import { BASE_URL } from "../utils/constants";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // First try to get user data from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserData(parsedUser);
          setEditedData(parsedUser);
          setLoading(false);
          return;
        }

        // If not in localStorage, try to fetch from API
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Not authenticated");
        }

        const response = await fetch(`${BASE_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
        setEditedData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setSaveLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Not authenticated");
      }

      // In a real application, you would send this to your API
      // const response = await fetch(`${BASE_URL}/api/user/profile`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify(editedData),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to update profile");
      // }

      // Simulate API call success
      await new Promise(resolve => setTimeout(resolve, 800));

      // Update local storage with new user data
      localStorage.setItem("user", JSON.stringify(editedData));
      
      setUserData(editedData);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");

      // Dispatch an event to notify other components about the auth change
      window.dispatchEvent(new Event("authChanged"));
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedData(userData);
    setIsEditing(false);
    setError(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event("authChanged"));
    window.location.href = '/';
  };

  // Get user initials for the profile circle
  const getUserInitials = () => {
    if (!userData) return "U";
  
    const firstName = userData.firstName || "";
    const lastName = userData.lastName || "";
  
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Link
          to="/login"
          className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-green-500 to-emerald-600">
            <div className="absolute -bottom-16 left-8">
              <div className="h-32 w-32 rounded-full bg-white p-1 shadow-lg">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white text-4xl font-medium">
                  {getUserInitials()}
                </div>
              </div>
            </div>
          </div>

          {/* Success message */}
          {successMessage && (
            <div className="bg-green-50 text-green-800 p-4 mt-4 rounded-lg flex items-center justify-between">
              {successMessage}
              <button 
                onClick={() => setSuccessMessage(null)}
                className="text-green-600 hover:text-green-800"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-50 text-red-800 p-4 mt-4 rounded-lg flex items-center justify-between">
              {error}
              <button 
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-64 shrink-0">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                      activeTab === "profile"
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <User className="mr-3 h-5 w-5" />
                    Personal Information
                  </button>
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                      activeTab === "security"
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Shield className="mr-3 h-5 w-5" />
                    Security
                  </button>
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                      activeTab === "notifications"
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Bell className="mr-3 h-5 w-5" />
                    Notifications
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                  </button>
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {activeTab === "profile" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Profile
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleCancelEdit}
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                            disabled={saveLoading}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveProfile}
                            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                            disabled={saveLoading}
                          >
                            {saveLoading ? (
                              <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Save className="mr-2 h-4 w-4" />
                            )}
                            Save Changes
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="divide-y divide-gray-200">
                        <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="firstName"
                                value={editedData.firstName || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">{userData.firstName || "Not provided"}</p>
                            )}
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="lastName"
                                value={editedData.lastName || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">{userData.lastName || "Not provided"}</p>
                            )}
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1 flex items-center">
                              <Mail className="h-5 w-5 text-gray-400 mr-2" />
                              <p className="text-gray-900">{userData.email || "Not provided"}</p>
                            </div>
                          </div>
                        </div>

                        <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            {isEditing ? (
                              <input
                                type="tel"
                                name="phone"
                                value={editedData.phone || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                              />
                            ) : (
                              <div className="mt-1 flex items-center">
                                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                                <p className="text-gray-900">{userData.phone || "Not provided"}</p>
                              </div>
                            )}
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="location"
                                value={editedData.location || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                              ) : (
                                <div className="mt-1 flex items-center">
                                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                                  <p className="text-gray-900">{userData.location || "Not provided"}</p>
                                </div>
                              )}
                            </div>
                            <div className="md:col-span-1">
                              <label className="block text-sm font-medium text-gray-700">Member Since</label>
                              <div className="mt-1 flex items-center">
                                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                                <p className="text-gray-900">
                                  {userData.createdAt 
                                    ? new Date(userData.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })
                                    : "Not available"}
                                </p>
                              </div>
                            </div>
                          </div>
  
                          <div className="px-6 py-5">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                            {isEditing ? (
                              <textarea
                                name="bio"
                                rows="4"
                                value={editedData.bio || ""}
                                onChange={handleInputChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                placeholder="Tell us about yourself and your farming experience..."
                              ></textarea>
                            ) : (
                              <p className="text-gray-900 whitespace-pre-line">
                                {userData.bio || "No bio provided yet."}
                              </p>
                            )}
                          </div>
  
                          <div className="px-6 py-5">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Farming Preferences</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Farm Type</label>
                                {isEditing ? (
                                  <select
                                    name="farmType"
                                    value={editedData.farmType || ""}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                  >
                                    <option value="">Select farm type</option>
                                    <option value="crop">Crop Farming</option>
                                    <option value="livestock">Livestock</option>
                                    <option value="mixed">Mixed Farming</option>
                                    <option value="organic">Organic Farming</option>
                                    <option value="plantation">Plantation</option>
                                    <option value="other">Other</option>
                                  </select>
                                ) : (
                                  <p className="mt-1 text-gray-900 capitalize">
                                    {userData.farmType || "Not specified"}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Farm Size (acres)</label>
                                {isEditing ? (
                                  <input
                                    type="number"
                                    name="farmSize"
                                    value={editedData.farmSize || ""}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    min="0"
                                    step="0.1"
                                  />
                                ) : (
                                  <p className="mt-1 text-gray-900">
                                    {userData.farmSize ? `${userData.farmSize} acres` : "Not specified"}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
  
                  {activeTab === "security" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                      
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                        <div className="px-6 py-5 border-b border-gray-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                              <p className="mt-1 text-sm text-gray-500">
                                Update your password to maintain account security
                              </p>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100">
                              Change Password
                            </button>
                          </div>
                        </div>
                        
                        <div className="px-6 py-5 border-b border-gray-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                              <p className="mt-1 text-sm text-gray-500">
                                Add an extra layer of security to your account
                              </p>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100">
                              Enable
                            </button>
                          </div>
                        </div>
                        
                        <div className="px-6 py-5">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">Active Sessions</h3>
                              <p className="mt-1 text-sm text-gray-500">
                                Manage devices where you're currently logged in
                              </p>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100">
                              Manage
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <h3 className="text-lg font-medium text-yellow-800 mb-2 flex items-center">
                          <Shield className="h-5 w-5 mr-2" />
                          Security Recommendations
                        </h3>
                        <p className="text-yellow-700 mb-4">
                          Enhance your account security by following these recommendations:
                        </p>
                        <ul className="space-y-2 text-yellow-700">
                          <li className="flex items-start">
                            <span className="inline-block h-5 w-5 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">!</span>
                            Use a strong, unique password that you don't use elsewhere
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block h-5 w-5 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">!</span>
                            Enable two-factor authentication for additional security
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block h-5 w-5 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">!</span>
                            Regularly check your account for any suspicious activity
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
  
                  {activeTab === "notifications" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                      
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-700">Weather Alerts</p>
                                <p className="text-sm text-gray-500">Receive notifications about weather changes affecting your farm</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                              </label>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-700">Pest Alerts</p>
                                <p className="text-sm text-gray-500">Get notified about potential pest threats in your area</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                              </label>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-700">Market Updates</p>
                                <p className="text-sm text-gray-500">Receive updates about crop prices and market trends</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                              </label>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-700">New Features & Updates</p>
                                <p className="text-sm text-gray-500">Stay informed about new features and platform updates</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="px-6 py-5 border-b border-gray-200">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">SMS Notifications</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-700">Critical Weather Alerts</p>
                                <p className="text-sm text-gray-500">Receive SMS for severe weather conditions</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                              </label>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-700">Tractor Booking Reminders</p>
                                <p className="text-sm text-gray-500">Get SMS reminders about your upcoming tractor bookings</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-6 py-5">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Frequency</h3>
                        
                        <div className="max-w-md">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Digest Frequency</label>
                          <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                            <option>Real-time (as they happen)</option>
                            <option>Daily digest</option>
                            <option>Weekly digest</option>
                            <option>Monthly digest</option>
                          </select>
                          <p className="mt-2 text-sm text-gray-500">
                            Choose how often you want to receive email notifications
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

                               