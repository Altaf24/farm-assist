import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tractor, Upload, AlertTriangle, Check, Info, X } from 'lucide-react';

const RegisterTractor = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    tractorName: '',
    brand: '',
    model: '',
    year: '',
    horsepower: '',
    tractorType: 'medium',
    features: [],
    hourlyRate: '',
    dailyRate: '',
    weeklyRate: '',
    location: '',
    description: '',
    availabilityType: 'fulltime',
    specificDays: [],
    tractorImage: null,
    registrationNumber: '',
    insuranceStatus: false,
    ownershipProof: null
  });

  // Available features for checkboxes
  const availableFeatures = [
    'Air Conditioned Cabin',
    'GPS Navigation',
    'Power Steering',
    '4WD',
    'Implements Available',
    'Adjustable Seat',
    'Digital Dashboard',
    'Heavy Duty Hydraulics',
    'Fuel Efficient',
    'Low Noise'
  ];

  // Days of the week for availability selection
  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  useEffect(() => {
    // Check if user is signed in
    const token = localStorage.getItem('token');
    if (token) {
      setIsSignedIn(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'features') {
        // Handle features checkboxes
        const updatedFeatures = [...formData.features];
        if (checked) {
          updatedFeatures.push(value);
        } else {
          const index = updatedFeatures.indexOf(value);
          if (index > -1) {
            updatedFeatures.splice(index, 1);
          }
        }
        setFormData({ ...formData, features: updatedFeatures });
      } else if (name === 'specificDays') {
        // Handle specific days checkboxes
        const updatedDays = [...formData.specificDays];
        if (checked) {
          updatedDays.push(value);
        } else {
          const index = updatedDays.indexOf(value);
          if (index > -1) {
            updatedDays.splice(index, 1);
          }
        }
        setFormData({ ...formData, specificDays: updatedDays });
      } else {
        // Handle other checkboxes
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      // Handle regular inputs
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, tractorImage: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, ownershipProof: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Validate form
    if (!formData.tractorName || !formData.brand || !formData.horsepower || !formData.hourlyRate || !formData.location) {
      setErrorMessage('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    if (!formData.tractorImage) {
      setErrorMessage('Please upload an image of your tractor');
      setIsSubmitting(false);
      return;
    }

    if (formData.availabilityType === 'specific' && formData.specificDays.length === 0) {
      setErrorMessage('Please select at least one day of availability');
      setIsSubmitting(false);
      return;
    }

    // In a real app, you would send this data to your API
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      setSuccessMessage('Your tractor has been registered successfully! Our team will review your submission and contact you shortly.');
      setIsSubmitting(false);
      
      // Reset form after successful submission
      setTimeout(() => {
        navigate('/tractor/my-tractors');
      }, 3000);
    }, 2000);
  };

  if (!isSignedIn) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Please sign in to register your tractor</h3>
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Register Your Tractor</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Earn money by renting out your tractor to local farmers
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-8 bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                {/* Basic Information Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h2>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="tractorName" className="block text-sm font-medium text-gray-700">
                        Tractor Name/Title <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="tractorName"
                          id="tractorName"
                          value={formData.tractorName}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="e.g. John Deere 5E Series"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                        Brand <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="brand"
                          id="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="e.g. John Deere"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                        Model
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="model"
                          id="model"
                          value={formData.model}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="e.g. 5075E"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                        Year of Manufacture
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="year"
                          id="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="e.g. 2020"
                          min="1980"
                          max={new Date().getFullYear()}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="horsepower" className="block text-sm font-medium text-gray-700">
                        Horsepower <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="horsepower"
                          id="horsepower"
                          value={formData.horsepower}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="e.g. 75"
                          min="1"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="tractorType" className="block text-sm font-medium text-gray-700">
                        Tractor Type <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <select
                          id="tractorType"
                          name="tractorType"
                          value={formData.tractorType}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          required
                        >
                          <option value="light">Light Duty</option>
                          <option value="medium">Medium Duty</option>
                          <option value="heavy">Heavy Duty</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
                        Registration Number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="registrationNumber"
                          id="registrationNumber"
                          value={formData.registrationNumber}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="e.g. PB-01-AB-1234"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="location"
                          id="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="e.g. Amritsar, Punjab"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                                {/* Features Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Features</h2>
                  <div className="mt-6">
                    <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2">
                      {availableFeatures.map((feature) => (
                        <div key={feature} className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={`feature-${feature}`}
                              name="features"
                              type="checkbox"
                              value={feature}
                              checked={formData.features.includes(feature)}
                              onChange={handleInputChange}
                              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={`feature-${feature}`} className="font-medium text-gray-700">
                              {feature}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Description</h2>
                  <div className="mt-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Tractor Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Describe your tractor, its condition, and any special features..."
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Pricing</h2>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                        Hourly Rate (₹) <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="number"
                          name="hourlyRate"
                          id="hourlyRate"
                          value={formData.hourlyRate}
                          onChange={handleInputChange}
                          className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          min="0"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dailyRate" className="block text-sm font-medium text-gray-700">
                        Daily Rate (₹)
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="number"
                          name="dailyRate"
                          id="dailyRate"
                          value={formData.dailyRate}
                          onChange={handleInputChange}
                          className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          min="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="weeklyRate" className="block text-sm font-medium text-gray-700">
                        Weekly Rate (₹)
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="number"
                          name="weeklyRate"
                          id="weeklyRate"
                          value={formData.weeklyRate}
                          onChange={handleInputChange}
                          className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Availability Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Availability</h2>
                  <div className="mt-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Availability Type</label>
                      <fieldset className="mt-2">
                        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                          <div className="flex items-center">
                            <input
                              id="fulltime"
                              name="availabilityType"
                              type="radio"
                              value="fulltime"
                              checked={formData.availabilityType === 'fulltime'}
                              onChange={handleInputChange}
                              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                            />
                            <label htmlFor="fulltime" className="ml-3 block text-sm font-medium text-gray-700">
                              Full-time (Always available)
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="specific"
                              name="availabilityType"
                              type="radio"
                              value="specific"
                              checked={formData.availabilityType === 'specific'}
                              onChange={handleInputChange}
                              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                            />
                            <label htmlFor="specific" className="ml-3 block text-sm font-medium text-gray-700">
                              Specific Days
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>

                    {formData.availabilityType === 'specific' && (
                      <div className="mt-4">
                        <label className="text-sm font-medium text-gray-700">Select Available Days</label>
                        <div className="mt-2 grid grid-cols-2 gap-y-2 sm:grid-cols-4">
                          {daysOfWeek.map((day) => (
                            <div key={day} className="relative flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id={`day-${day}`}
                                  name="specificDays"
                                  type="checkbox"
                                  value={day}
                                  checked={formData.specificDays.includes(day)}
                                  onChange={handleInputChange}
                                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor={`day-${day}`} className="font-medium text-gray-700">
                                  {day}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Images and Documents Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Images and Documents</h2>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="tractorImage" className="block text-sm font-medium text-gray-700">
                        Tractor Image <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {previewImage ? (
                            <div>
                              <img src={previewImage} alt="Tractor preview" className="mx-auto h-32 w-auto" />
                              <p className="text-xs text-gray-500 mt-2">
                                Click "Choose File" to change the image
                              </p>
                            </div>
                          ) : (
                            <div>
                              <Tractor className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="ownershipProof" className="block text-sm font-medium text-gray-700">
                        Ownership Proof (Registration Certificate)
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="document-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="document-upload"
                                name="document-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleDocumentChange}
                                accept=".pdf,.jpg,.jpeg,.png"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insurance Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Insurance</h2>
                  <div className="mt-6">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="insuranceStatus"
                          name="insuranceStatus"
                          type="checkbox"
                          checked={formData.insuranceStatus}
                          onChange={handleInputChange}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="insuranceStatus" className="font-medium text-gray-700">
                          My tractor is insured
                        </label>
                        <p className="text-gray-500">
                          Having insurance can increase your booking rate and provide peace of mind.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Important Information</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          By registering your tractor, you agree to our <Link to="/terms" className="underline">Terms and Conditions</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>. 
                          Our team will review your submission within 24-48 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-5">
                  <div className="flex justify-end">
                  <Link
                      to="/tractor/my-tractors"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Register Tractor'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTractor;
