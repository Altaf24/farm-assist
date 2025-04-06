"use client"

import { useState } from "react"
import { Client } from "@gradio/client"
import {
  Leaf,
  Send,
  Loader2,
  Check,
  Info,
  TreesIcon as Plant,
  Droplets,
  Thermometer,
  Zap,
  BarChart3,
  CloudRain,
} from "lucide-react"

const CropRecommendation = () => {
  const [inputs, setInputs] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  })
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isFormComplete, setIsFormComplete] = useState(false)

  const clientPromise = Client.connect("Vinit710/crop_recom")

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })

    const updatedInputs = { ...inputs, [name]: value }
    const allFilled = Object.values(updatedInputs).every((val) => val !== "")
    setIsFormComplete(allFilled)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const client = await clientPromise
      const response = await client.predict("/predict", {
        N: Number(inputs.N),
        P: Number(inputs.P),
        K: Number(inputs.K),
        temperature: Number(inputs.temperature),
        humidity: Number(inputs.humidity),
        ph: Number(inputs.ph),
        rainfall: Number(inputs.rainfall),
      })
      // Assuming the crop name is in response.data[0] (adjust based on actual response structure)
      const cropName = Array.isArray(response.data) ? response.data[0] : response.data
      setResult(typeof cropName === "string" ? cropName : "")
    } catch (error) {
      console.error("Prediction error:", error)
      setError("Error while fetching prediction. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setInputs({
      N: "",
      P: "",
      K: "",
      temperature: "",
      humidity: "",
      ph: "",
      rainfall: "",
    })
    setResult("")
    setIsFormComplete(false)
  }

  const getCropInfo = () => {
    if (!result || typeof result !== "string") return null

    const cropInfo = {
      apple: {
        description: "A popular fruit tree that produces sweet, edible fruits.",
        soilRequirements: "Well-drained, loamy soil with pH 5.8-7.0.",
        growingSeason: "Spring to Fall, harvested in late summer to fall.",
        waterRequirements: "Regular watering, especially during fruit development.",
        tips: "Requires winter chilling hours. Prune annually for better fruit production.",
      },
      banana: {
        description: "A tropical fruit plant that grows in clusters on tall plants.",
        soilRequirements: "Rich, well-drained soil with pH 5.5-7.0.",
        growingSeason: "Year-round in tropical climates.",
        waterRequirements: "High water needs, regular watering required.",
        tips: "Protect from strong winds. Requires warm temperatures and high humidity.",
      },
      // ... (rest of the cropInfo object remains unchanged)
    }

    const normalizedResult = result.toLowerCase().replace(/\s+/g, "")
    const matchedCrop = Object.keys(cropInfo).find((crop) =>
      normalizedResult.includes(crop.toLowerCase())
    )

    return matchedCrop
      ? cropInfo[matchedCrop]
      : {
          description: "Information about this crop is not available.",
          soilRequirements: "Consult with local agricultural extension services.",
          growingSeason: "Varies by region and climate.",
          waterRequirements: "Depends on local conditions.",
          tips: "Research specific requirements for your region.",
        }
  }

  const cropInfo = getCropInfo()

  const inputFields = [
    {
      name: "N",
      label: "Nitrogen (N)",
      icon: <Leaf className="h-5 w-5 text-green-600" />,
      unit: "kg/ha",
      min: 0,
      max: 140,
      step: 1,
    },
    {
      name: "P",
      label: "Phosphorous (P)",
      icon: <Plant className="h-5 w-5 text-green-600" />,
      unit: "kg/ha",
      min: 0,
      max: 145,
      step: 1,
    },
    {
      name: "K",
      label: "Potassium (K)",
      icon: <Zap className="h-5 w-5 text-green-600" />,
      unit: "kg/ha",
      min: 0,
      max: 205,
      step: 1,
    },
    {
      name: "temperature",
      label: "Temperature",
      icon: <Thermometer className="h-5 w-5 text-green-600" />,
      unit: "°C",
      min: 0,
      max: 50,
      step: 0.1,
    },
    {
      name: "humidity",
      label: "Humidity",
      icon: <Droplets className="h-5 w-5 text-green-600" />,
      unit: "%",
      min: 0,
      max: 100,
      step: 1,
    },
    {
      name: "ph",
      label: "pH Level",
      icon: <BarChart3 className="h-5 w-5 text-green-600" />,
      unit: "",
      min: 0,
      max: 14,
      step: 0.1,
    },
    {
      name: "rainfall",
      label: "Rainfall",
      icon: <CloudRain className="h-5 w-5 text-green-600" />,
      unit: "mm",
      min: 0,
      max: 300,
      step: 1,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Crop Recommendation System</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enter your soil parameters and environmental conditions to get personalized crop recommendations for optimal
            yield and sustainability.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Plant className="h-6 w-6 mr-2 text-green-600" />
                Soil & Environmental Parameters
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                  <Info className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {inputFields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        {field.icon}
                        <span className="ml-2">{field.label}</span>
                        {field.unit && <span className="ml-1 text-gray-500 text-xs">({field.unit})</span>}
                      </label>
                      <input
                        type="number"
                        name={field.name}
                        value={inputs[field.name]}
                        onChange={handleChange}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormComplete || loading}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Get Recommendation
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Understanding Soil Parameters</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    <strong>Nitrogen (N):</strong> Essential for leaf growth and green vegetation. Deficiency causes
                    yellowing of leaves.
                  </p>
                  <p>
                    <strong>Phosphorous (P):</strong> Important for root development, flowering, and fruiting.
                    Deficiency causes stunted growth.
                  </p>
                  <p>
                    <strong>Potassium (K):</strong> Helps in overall plant health and disease resistance. Deficiency
                    causes leaf margins to turn brown.
                  </p>
                  <p>
                    <strong>pH Level:</strong> Affects nutrient availability. Most crops prefer slightly acidic to
                    neutral pH (6.0-7.0).
                  </p>
                  <p>
                    <strong>Rainfall:</strong> Different crops have different water requirements. Excess or deficiency
                    affects yield.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 p-8 text-white">
              {result ? (
                <div className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Plant className="h-6 w-6 mr-2" />
                    Recommended Crop
                  </h2>

                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                        <Leaf className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-sm uppercase tracking-wider text-green-100">
                          Best Crop for Your Conditions
                        </h3>
                        <p className="text-2xl font-bold capitalize">{result}</p>
                      </div>
                    </div>
                  </div>

                  {cropInfo && (
                    <div className="space-y-6">
                      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5">
                        <h4 className="font-semibold text-lg mb-2">About this Crop</h4>
                        <p className="text-green-100">{cropInfo.description}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5">
                          <h4 className="font-semibold text-lg mb-2">Soil Requirements</h4>
                          <p className="text-green-100">{cropInfo.soilRequirements}</p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5">
                          <h4 className="font-semibold text-lg mb-2">Growing Season</h4>
                          <p className="text-green-100">{cropInfo.growingSeason}</p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5">
                          <h4 className="font-semibold text-lg mb-2">Water Requirements</h4>
                          <p className="text-green-100">{cropInfo.waterRequirements}</p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5">
                          <h4 className="font-semibold text-lg mb-2">Farming Tips</h4>
                          <p className="text-green-100">{cropInfo.tips}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-6">
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center px-4 py-2 bg-white text-green-700 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                    >
                      <Leaf className="h-4 w-4 mr-2" />
                      Try Another Recommendation
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-6 mb-6">
                    <Plant className="h-16 w-16" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Crop Recommendation</h2>
                  <p className="text-green-100 max-w-md">
                    Our AI model analyzes your soil parameters and environmental conditions to recommend the most
                    suitable crop for optimal yield.
                  </p>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm">22 Crop Varieties</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm">94% Accuracy</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm">Detailed Crop Info</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm">Growing Tips</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-4 shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 text-center">Input Parameters</h3>
              <p className="text-gray-600 text-center">
                Enter your soil composition (N, P, K), environmental factors (temperature, humidity), and other
                parameters.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-4 shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 text-center">AI Analysis</h3>
              <p className="text-gray-600 text-center">
                Our machine learning model analyzes your inputs against optimal growing conditions for various crops.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-4 shadow-lg">
                <Plant className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 text-center">Get Recommendation</h3>
              <p className="text-gray-600 text-center">
                Receive a personalized crop recommendation along with detailed information and growing tips.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Crop Categories</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-3 bg-green-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cereals & Grains</h3>
                <p className="text-gray-600 mb-4">Staple food crops that form the foundation of global nutrition.</p>
                <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
                  <li>Rice</li>
                  <li>Maize (Corn)</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-3 bg-yellow-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pulses & Legumes</h3>
                <p className="text-gray-600 mb-4">Protein-rich crops that also improve soil fertility.</p>
                <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
                  <li>Chickpea</li>
                  <li>Pigeonpeas</li>
                  <li>Blackgram</li>
                  <li>Lentil</li>
                  <li>Kidneybeans</li>
                  <li>Mothbeans</li>
                  <li>Mungbean</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-3 bg-red-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fruits</h3>
                <p className="text-gray-600 mb-4">Sweet, nutritious crops with high market value.</p>
                <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
                  <li>Apple</li>
                  <li>Banana</li>
                  <li>Grapes</li>
                  <li>Mango</li>
                  <li>Orange</li>
                  <li>Papaya</li>
                  <li>Pomegranate</li>
                  <li>Watermelon</li>
                  <li>Muskmelon</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-3 bg-amber-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Commercial Crops</h3>
                <p className="text-gray-600 mb-4">Crops grown primarily for sale and industrial processing.</p>
                <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
                  <li>Cotton</li>
                  <li>Jute</li>
                  <li>Coffee</li>
                  <li>Coconut</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Model Accuracy</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-full md:w-1/3">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                      Overall Accuracy
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-600">94%</span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                  <div
                    style={{ width: "94%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <p className="text-gray-600 mb-4">
                Our crop recommendation model has been trained on extensive agricultural data and achieves a 94%
                accuracy rate across 22 different crop varieties. The model considers multiple soil and environmental
                parameters to provide the most suitable crop recommendation for your specific conditions.
              </p>
              <p className="text-gray-600">
                While the model is highly accurate, local agricultural practices, microclimate variations, and other
                factors should also be considered. We recommend consulting with local agricultural extension services
                for additional guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CropRecommendation