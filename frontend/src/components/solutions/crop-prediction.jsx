"use client"

import { useState } from "react"
import {
  TreesIcon as Plant,
  Droplet,
  Thermometer,
  Activity,
  FlaskRoundIcon as Flask,
  CloudRain,
  Loader,
  Check,
  AlertTriangle,
} from "lucide-react"
import axios from "axios"

const CropPrediction = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorous: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  })

  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formErrors, setFormErrors] = useState({})

  // Input validation
  const validateForm = () => {
    const errors = {}
    const fields = [
      { name: "nitrogen", min: 0, max: 140, label: "Nitrogen" },
      { name: "phosphorous", min: 0, max: 145, label: "Phosphorous" },
      { name: "potassium", min: 0, max: 205, label: "Potassium" },
      { name: "temperature", min: 0, max: 50, label: "Temperature" },
      { name: "humidity", min: 0, max: 100, label: "Humidity" },
      { name: "ph", min: 0, max: 14, label: "pH" },
      { name: "rainfall", min: 0, max: 300, label: "Rainfall" },
    ]

    fields.forEach((field) => {
      const value = formData[field.name]
      if (!value) {
        errors[field.name] = `${field.label} is required`
      } else if (isNaN(value) || Number.parseFloat(value) < field.min || Number.parseFloat(value) > field.max) {
        errors[field.name] = `${field.label} must be between ${field.min} and ${field.max}`
      }
    })

    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      // Use the correct backend URL - adjust this to match your setup
      const backendUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"

      const response = await axios.post(`${backendUrl}/api/predict-crop`, {
        nitrogen: Number.parseFloat(formData.nitrogen),
        phosphorous: Number.parseFloat(formData.phosphorous),
        potassium: Number.parseFloat(formData.potassium),
        temperature: Number.parseFloat(formData.temperature),
        humidity: Number.parseFloat(formData.humidity),
        ph: Number.parseFloat(formData.ph),
        rainfall: Number.parseFloat(formData.rainfall),
      })

      setPrediction(response.data)
    } catch (err) {
      console.error("Error predicting crop:", err)

      // More detailed error message
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Server error: ${err.response.data.error || err.response.statusText}`)
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Please check if the backend is running.")
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      nitrogen: "",
      phosphorous: "",
      potassium: "",
      temperature: "",
      humidity: "",
      ph: "",
      rainfall: "",
    })
    setPrediction(null)
    setError(null)
    setFormErrors({})
  }

  // Sample data for the crop information cards
  const cropInfo = {
    rice: {
      description: "A staple food crop that thrives in wet conditions with high rainfall.",
      icon: "🌾",
      color: "bg-yellow-500",
    },
    wheat: {
      description: "A versatile grain crop that prefers moderate temperatures and well-drained soil.",
      icon: "🌿",
      color: "bg-yellow-600",
    },
    maize: {
      description: "Also known as corn, requires warm temperatures and moderate rainfall.",
      icon: "🌽",
      color: "bg-yellow-400",
    },
    chickpea: {
      description: "A drought-resistant legume that fixes nitrogen in the soil.",
      icon: "🥜",
      color: "bg-amber-600",
    },
    kidneybeans: {
      description: "A legume crop that prefers well-drained soil and moderate temperatures.",
      icon: "🫘",
      color: "bg-red-700",
    },
    pigeonpeas: {
      description: "A hardy legume that can grow in poor soil conditions.",
      icon: "🌱",
      color: "bg-green-600",
    },
    mothbeans: {
      description: "A drought-resistant legume suitable for arid regions.",
      icon: "🌿",
      color: "bg-green-700",
    },
    mungbean: {
      description: "A fast-growing legume that improves soil fertility.",
      icon: "🌱",
      color: "bg-green-500",
    },
    blackgram: {
      description: "A legume crop that thrives in warm, humid conditions.",
      icon: "🫘",
      color: "bg-gray-800",
    },
    lentil: {
      description: "A cool-season legume that prefers well-drained soils.",
      icon: "🥜",
      color: "bg-orange-700",
    },
    pomegranate: {
      description: "A fruit-bearing shrub that thrives in semi-arid conditions.",
      icon: "🍎",
      color: "bg-red-600",
    },
    banana: {
      description: "A tropical fruit that requires high humidity and rainfall.",
      icon: "🍌",
      color: "bg-yellow-400",
    },
    mango: {
      description: "A tropical fruit tree that prefers warm temperatures and seasonal rainfall.",
      icon: "🥭",
      color: "bg-yellow-500",
    },
    grapes: {
      description: "A vine crop that thrives in moderate temperatures with well-drained soil.",
      icon: "🍇",
      color: "bg-purple-600",
    },
    watermelon: {
      description: "A warm-season crop that requires plenty of sunlight and water.",
      icon: "🍉",
      color: "bg-green-500",
    },
    muskmelon: {
      description: "A summer crop that needs warm temperatures and moderate water.",
      icon: "🍈",
      color: "bg-yellow-300",
    },
    apple: {
      description: "A temperate fruit tree that requires cold winters and moderate summers.",
      icon: "🍎",
      color: "bg-red-500",
    },
    orange: {
      description: "A citrus fruit that thrives in subtropical climates with moderate rainfall.",
      icon: "🍊",
      color: "bg-orange-500",
    },
    papaya: {
      description: "A tropical fruit tree that needs warm temperatures and regular rainfall.",
      icon: "🍈",
      color: "bg-green-400",
    },
    coconut: {
      description: "A tropical palm that thrives in coastal areas with high humidity.",
      icon: "🥥",
      color: "bg-brown-500",
    },
    cotton: {
      description: "A fiber crop that prefers warm temperatures and moderate rainfall.",
      icon: "🧶",
      color: "bg-gray-200",
    },
    jute: {
      description: "A fiber crop that requires high temperatures and humidity.",
      icon: "🧵",
      color: "bg-yellow-700",
    },
    coffee: {
      description: "A tropical crop that grows best in elevated regions with moderate rainfall.",
      icon: "☕",
      color: "bg-brown-600",
    },
  }

  // Input field configuration
  const inputFields = [
    {
      name: "nitrogen",
      label: "Nitrogen (N)",
      icon: <Plant className="h-5 w-5" />,
      unit: "kg/ha",
      placeholder: "0-140",
    },
    {
      name: "phosphorous",
      label: "Phosphorous (P)",
      icon: <Plant className="h-5 w-5" />,
      unit: "kg/ha",
      placeholder: "0-145",
    },
    {
      name: "potassium",
      label: "Potassium (K)",
      icon: <Plant className="h-5 w-5" />,
      unit: "kg/ha",
      placeholder: "0-205",
    },
    {
      name: "temperature",
      label: "Temperature",
      icon: <Thermometer className="h-5 w-5" />,
      unit: "°C",
      placeholder: "0-50",
    },
    { name: "humidity", label: "Humidity", icon: <Droplet className="h-5 w-5" />, unit: "%", placeholder: "0-100" },
    { name: "ph", label: "pH Value", icon: <Flask className="h-5 w-5" />, unit: "", placeholder: "0-14" },
    { name: "rainfall", label: "Rainfall", icon: <CloudRain className="h-5 w-5" />, unit: "mm", placeholder: "0-300" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Crop Recommendation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enter your soil and environmental parameters to get AI-powered recommendations for the most suitable crops
            to plant.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Form Section */}
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Parameters</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {inputFields.map((field) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          {field.icon}
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          name={field.name}
                          id={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-12 py-3 border ${
                            formErrors[field.name] ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                          placeholder={field.placeholder}
                        />
                        {field.unit && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">{field.unit}</span>
                          </div>
                        )}
                      </div>
                      {formErrors[field.name] && <p className="mt-1 text-sm text-red-600">{formErrors[field.name]}</p>}
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader className="animate-spin h-5 w-5 mr-2" />
                        Predicting...
                      </>
                    ) : (
                      <>Get Recommendation</>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Results Section */}
            <div className="md:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 p-8 text-white">
              {prediction ? (
                <div className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold mb-4">Recommended Crop</h2>

                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <div className="flex items-center">
                      <div
                        className={`h-16 w-16 rounded-full ${cropInfo[prediction.crop.toLowerCase()]?.color || "bg-green-500"} flex items-center justify-center text-3xl`}
                      >
                        {cropInfo[prediction.crop.toLowerCase()]?.icon || "🌱"}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold capitalize">{prediction.crop}</h3>
                        <p className="text-green-100">Confidence: {prediction.confidence}%</p>
                      </div>
                    </div>

                    <p className="mt-4 text-green-100">
                      {cropInfo[prediction.crop.toLowerCase()]?.description ||
                        "This crop is suitable for your soil and environmental conditions."}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="bg-white bg-opacity-10 rounded-lg p-3">
                        <div className="text-sm text-green-200">Ideal Temperature</div>
                        <div className="font-medium">{prediction.idealConditions?.temperature || "20-30"}°C</div>
                      </div>
                      <div className="bg-white bg-opacity-10 rounded-lg p-3">
                        <div className="text-sm text-green-200">Ideal Humidity</div>
                        <div className="font-medium">{prediction.idealConditions?.humidity || "60-80"}%</div>
                      </div>
                      <div className="bg-white bg-opacity-10 rounded-lg p-3">
                        <div className="text-sm text-green-200">Ideal pH</div>
                        <div className="font-medium">{prediction.idealConditions?.ph || "6.0-7.5"}</div>
                      </div>
                      <div className="bg-white bg-opacity-10 rounded-lg p-3">
                        <div className="text-sm text-green-200">Growing Season</div>
                        <div className="font-medium">{prediction.growingSeason || "Spring-Summer"}</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3">Alternative Options</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {prediction.alternatives?.map((alt, index) => (
                      <div
                        key={index}
                        className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 flex items-center"
                      >
                        <div
                          className={`h-10 w-10 rounded-full ${cropInfo[alt.crop.toLowerCase()]?.color || "bg-green-500"} flex items-center justify-center text-xl mr-3`}
                        >
                          {cropInfo[alt.crop.toLowerCase()]?.icon || "🌱"}
                        </div>
                        <div>
                          <div className="font-medium capitalize">{alt.crop}</div>
                          <div className="text-sm text-green-200">Confidence: {alt.confidence}%</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <a
                      href={`/crop-guide/${prediction.crop.toLowerCase()}`}
                      className="inline-flex items-center px-4 py-2 bg-white text-green-700 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                    >
                      View Detailed Growing Guide
                    </a>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-6 mb-6">
                    <Plant className="h-16 w-16" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">AI Crop Recommendation</h2>
                  <p className="text-green-100 max-w-md">
                    Our advanced AI model will analyze your soil and environmental parameters to recommend the most
                    suitable crops for your farm.
                  </p>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm">Soil Analysis</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm">Climate Matching</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm">Yield Potential</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm">Growing Guides</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How it works section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-4 shadow-lg">
                <Flask className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 text-center">Input Soil Parameters</h3>
              <p className="text-gray-600 text-center">
                Enter your soil's NPK values, pH level, and environmental conditions like temperature, humidity, and
                rainfall.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-4 shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 text-center">AI Analysis</h3>
              <p className="text-gray-600 text-center">
                Our machine learning model analyzes your data against thousands of successful crop patterns to find the
                best match.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-4 shadow-lg">
                <Plant className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 text-center">Get Recommendations</h3>
              <p className="text-gray-600 text-center">
                Receive personalized crop recommendations with confidence scores and detailed growing guides.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CropPrediction

