"use client"

import { useState, useEffect } from "react"
import {
  Tractor,
  Upload,
  MapPin,
  Plus,
  Minus,
  Camera,
  Check,
  AlertTriangle,
  Loader,
  Navigation,
  Info,
  X,
} from "lucide-react"

const BASE_URL = "http://localhost:56789"

const RegisterTractor = () => {
  // State variables
  const [formData, setFormData] = useState({
    name: "",
    type: "medium",
    horsepower: 50,
    hourlyRate: 450,
    location: "",
    features: [],
    description: "",
    engine: "",
    transmission: "",
    liftCapacity: "",
    fuelTank: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
  })

  const [images, setImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [availableFeatures, setAvailableFeatures] = useState([
    { id: 1, name: "4WD", selected: false },
    { id: 2, name: "Power Steering", selected: false },
    { id: 3, name: "Adjustable Seat", selected: false },
    { id: 4, name: "Canopy", selected: false },
    { id: 5, name: "AC Cabin", selected: false },
    { id: 6, name: "Oil Immersed Brakes", selected: false },
    { id: 7, name: "Deluxe Seat", selected: false },
    { id: 8, name: "Hydraulic System", selected: false },
    { id: 9, name: "LED Lights", selected: false },
    { id: 10, name: "GPS Navigation", selected: false },
  ])
  const [showTips, setShowTips] = useState(true)
  const [step, setStep] = useState(1)

  // Tractor models for autocomplete
  const tractorModels = [
    "John Deere 5050D",
    "Mahindra 575",
    "Sonalika 60",
    "New Holland 3630",
    "Massey Ferguson 241",
    "Eicher 380",
    "Swaraj 744",
    "Farmtrac 60",
    "Powertrac 439",
    "Kubota MU4501",
  ]

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type } = e.target

    if (type === "number") {
      setFormData({
        ...formData,
        [name]: value === "" ? "" : Number(value),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Handle feature toggle
  const handleFeatureToggle = (id) => {
    const updatedFeatures = availableFeatures.map((feature) =>
      feature.id === id ? { ...feature, selected: !feature.selected } : feature,
    )

    setAvailableFeatures(updatedFeatures)

    // Update formData.features with selected feature names
    const selectedFeatures = updatedFeatures.filter((feature) => feature.selected).map((feature) => feature.name)

    setFormData({
      ...formData,
      features: selectedFeatures,
    })
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)

    if (files.length > 0) {
      setImages([...images, ...files])

      // Create preview URLs
      const newPreviewImages = files.map((file) => URL.createObjectURL(file))
      setPreviewImages([...previewImages, ...newPreviewImages])
    }
  }

  // Remove image
  const removeImage = (index) => {
    const newImages = [...images]
    const newPreviewImages = [...previewImages]

    newImages.splice(index, 1)
    URL.revokeObjectURL(previewImages[index])
    newPreviewImages.splice(index, 1)

    setImages(newImages)
    setPreviewImages(newPreviewImages)
  }

  // Get user's location
  const getUserLocation = () => {
    setIsGettingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Convert coordinates to address using reverse geocoding
          // For demo, we'll just use Punjab locations
          const punjabLocations = [
            "Amritsar, Punjab",
            "Ludhiana, Punjab",
            "Jalandhar, Punjab",
            "Patiala, Punjab",
            "Bathinda, Punjab",
          ]
          const randomLocation = punjabLocations[Math.floor(Math.random() * punjabLocations.length)]
          setFormData({
            ...formData,
            location: randomLocation,
          })
          setIsGettingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsGettingLocation(false)
          alert("Unable to get your location. Please enter it manually.")
        },
      )
    } else {
      alert("Geolocation is not supported by your browser. Please enter your location manually.")
      setIsGettingLocation(false)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Validate form
      if (!formData.name || !formData.type || !formData.horsepower || !formData.hourlyRate || !formData.location) {
        throw new Error("Please fill in all required fields")
      }

      if (images.length === 0) {
        throw new Error("Please upload at least one image of your tractor")
      }

      // In a real app, this would be an API call to upload images and create tractor listing
      // For demo purposes, we'll simulate a successful submission
      setTimeout(() => {
        setIsLoading(false)
        setSuccess(true)
        window.scrollTo(0, 0)
      }, 2000)
    } catch (err) {
      console.error("Error registering tractor:", err)
      setError(err.message || "Failed to register tractor. Please try again later.")
      setIsLoading(false)
    }
  }

  // Handle next step
  const handleNextStep = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.name || !formData.type || !formData.horsepower || !formData.hourlyRate) {
        setError("Please fill in all required fields in this section")
        return
      }
    } else if (step === 2) {
      if (!formData.location || formData.features.length === 0) {
        setError("Please fill in location and select at least one feature")
        return
      }
    }

    setError(null)
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  // Handle previous step
  const handlePrevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previewImages])

  // Render success message
  if (success) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tractor Registered Successfully!</h2>
            <p className="text-gray-600 mb-6">Your tractor has been listed and is now available for booking.</p>

            <div className="bg-gray-50 p-6 rounded-xl max-w-md mx-auto mb-8">
              <div className="flex items-center mb-4">
                {previewImages.length > 0 && (
                  <img
                    src={previewImages[0] || "/placeholder.svg"}
                    alt={formData.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                )}
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">{formData.name}</h4>
                  <p className="text-sm text-gray-600">
                    {formData.horsepower} HP • {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} Duty
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-left">
                <div>
                  <p className="text-gray-500">Hourly Rate</p>
                  <p className="font-medium">₹{formData.hourlyRate}</p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">{formData.location}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Features</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Listing ID</p>
                  <p className="font-medium">
                    TRAC
                    {Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md"
              >
                Register Another Tractor
              </button>

              <a
                href="/my-tractors"
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                View My Tractors
              </a>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-md mx-auto">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-800 text-left">
                  You will be notified when someone books your tractor. Make sure to keep your contact information
                  updated to receive booking requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Register Your Tractor
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            Earn money by renting out your tractor to farmers in need
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                <Tractor className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">Tractor Details</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-green-600" : "bg-gray-200"}`}></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                <MapPin className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">Location & Features</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-green-600" : "bg-gray-200"}`}></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                <Camera className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">Photos & Contact</span>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        {showTips && (
          <div className="bg-blue-50 rounded-xl p-4 mb-6 relative">
            <button
              onClick={() => setShowTips(false)}
              className="absolute top-2 right-2 text-blue-400 hover:text-blue-600"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex">
              <Info className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800">Tips for a Successful Listing</h3>
                <ul className="mt-2 text-sm text-blue-700 space-y-1">
                  <li>• Provide accurate details about your tractor's specifications</li>
                  <li>• Upload clear, high-quality photos from multiple angles</li>
                  <li>• Set a competitive hourly rate based on your tractor's features</li>
                  <li>• Keep your contact information up to date</li>
                  <li>• Respond quickly to booking requests</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <div>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Tractor Details */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Tractor Details</h2>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Tractor Model <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g. John Deere 5050D"
                        list="tractor-models"
                        required
                      />
                      <datalist id="tractor-models">
                        {tractorModels.map((model, index) => (
                          <option key={index} value={model} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Tractor Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="light">Light Duty (30-45 HP)</option>
                      <option value="medium">Medium Duty (45-60 HP)</option>
                      <option value="heavy">Heavy Duty (60+ HP)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="horsepower" className="block text-sm font-medium text-gray-700 mb-1">
                      Horsepower <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, horsepower: Math.max(30, formData.horsepower - 5) })}
                        className="px-3 py-2 border border-gray-300 bg-gray-100 rounded-l-lg"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        id="horsepower"
                        name="horsepower"
                        value={formData.horsepower}
                        onChange={handleChange}
                        className="block w-full border-y border-gray-300 px-3 py-2 focus:ring-green-500 focus:border-green-500 text-center"
                        min="30"
                        max="100"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, horsepower: Math.min(100, formData.horsepower + 5) })}
                        className="px-3 py-2 border border-gray-300 bg-gray-100 rounded-r-lg"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <span className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 bg-gray-50 rounded-lg">
                        HP
                      </span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
                      Hourly Rate (₹) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 rounded-l-lg">
                        ₹
                      </span>
                      <input
                        type="number"
                        id="hourlyRate"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-r-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                        min="100"
                        max="2000"
                        required
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Recommended: ₹350-₹600 for medium duty tractors</p>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Describe your tractor, its condition, and any special features..."
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location & Features */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Location & Features</h2>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <div className="relative flex-grow">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="block w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter your location"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={getUserLocation}
                        className="ml-2 p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                        disabled={isGettingLocation}
                      >
                        {isGettingLocation ? (
                          <Loader className="h-5 w-5 animate-spin" />
                        ) : (
                          <Navigation className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">This is where farmers will pick up your tractor</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Features <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {availableFeatures.map((feature) => (
                        <div
                          key={feature.id}
                          onClick={() => handleFeatureToggle(feature.id)}
                          className={`p-3 border rounded-lg cursor-pointer flex items-center ${
                            feature.selected ? "border-green-500 bg-green-50" : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                              feature.selected ? "bg-green-500" : "border border-gray-400"
                            }`}
                          >
                            {feature.selected && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span className="text-sm">{feature.name}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Select all features that apply to your tractor</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="engine" className="block text-sm font-medium text-gray-700 mb-1">
                        Engine
                      </label>
                      <input
                        type="text"
                        id="engine"
                        name="engine"
                        value={formData.engine}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g. 3-cylinder diesel"
                      />
                    </div>

                    <div>
                      <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
                        Transmission
                      </label>
                      <input
                        type="text"
                        id="transmission"
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g. 8 forward + 2 reverse"
                      />
                    </div>

                    <div>
                      <label htmlFor="liftCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                        Lift Capacity
                      </label>
                      <input
                        type="text"
                        id="liftCapacity"
                        name="liftCapacity"
                        value={formData.liftCapacity}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g. 1500 kg"
                      />
                    </div>

                    <div>
                      <label htmlFor="fuelTank" className="block text-sm font-medium text-gray-700 mb-1">
                        Fuel Tank Capacity
                      </label>
                      <input
                        type="text"
                        id="fuelTank"
                        name="fuelTank"
                        value={formData.fuelTank}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g. 60 L"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Photos & Contact */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Photos & Contact Information</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tractor Photos <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                          >
                            <span>Upload photos</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                      </div>
                    </div>

                    {previewImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        {previewImages.map((url, index) => (
                          <div key={index} className="relative">
                            <img
                              src={url || "/placeholder.svg"}
                              alt={`Preview ${index + 1}`}
                              className="h-24 w-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="ownerName"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="ownerPhone"
                        name="ownerPhone"
                        value={formData.ownerPhone}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="ownerEmail"
                        name="ownerEmail"
                        value={formData.ownerEmail}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-yellow-800">Important Information</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            By registering your tractor, you agree to our terms and conditions. You are responsible for:
                          </p>
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>Ensuring your tractor is in good working condition</li>
                            <li>Providing accurate information about your tractor</li>
                            <li>Responding to booking requests in a timely manner</li>
                            <li>Delivering the tractor as per the booking details</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md flex items-center"
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                      Registering...
                    </>
                  ) : (
                    <>Register Tractor</>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterTractor

