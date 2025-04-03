"use client"

import { useState } from "react"
import { Client } from "@gradio/client"
import {
  Leaf,
  Upload,
  X,
  AlertTriangle,
  Loader2,
  Check,
  Info,
  Microscope,
  TreesIcon as Plant,
  FileWarning,
  RefreshCw,
} from "lucide-react"

const PredictDisease = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [prediction, setPrediction] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [dragActive, setDragActive] = useState(false)

  // Format the prediction result to be more readable
  const formatPrediction = (prediction) => {
    // Check if prediction is a string and not empty
    if (!prediction || typeof prediction !== "string") return null

    // Replace underscores with spaces and split by "___"
    const parts = prediction.split("___")
    if (parts.length !== 2) return { plant: "Unknown", condition: prediction }

    const plant = parts[0].replace(/_/g, " ")
    const condition = parts[1].replace(/_/g, " ")

    return {
      plant,
      condition,
      isHealthy: condition.toLowerCase() === "healthy",
    }
  }

  const formattedPrediction = formatPrediction(prediction)

  // Handle image file selection and generate a preview URL
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]
      setSelectedImage(image)
      setPreview(URL.createObjectURL(image))
      setPrediction("")
      setError("")
    }
  }

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const image = e.dataTransfer.files[0]
      if (image.type.startsWith("image/")) {
        setSelectedImage(image)
        setPreview(URL.createObjectURL(image))
        setPrediction("")
        setError("")
      } else {
        setError("Please upload an image file")
      }
    }
  }

  // Use the Gradio client to send the image and get a prediction
  const handlePredict = async (e) => {
    e.preventDefault()
    if (!selectedImage) return

    setLoading(true)
    setError("")

    try {
      // Connect to your Hugging Face Space
      const client = await Client.connect("Vinit710/farm_die_class")

      // Predict using the '/predict' API endpoint
      const result = await client.predict("/predict", { image: selectedImage })

      // result.data will contain the predicted text response
      setPrediction(result.data)
    } catch (error) {
      console.error("Error predicting disease:", error)
      setError("Error predicting disease. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Reset the selected image and prediction
  const clearImage = () => {
    setSelectedImage(null)
    setPreview(null)
    setPrediction("")
    setError("")
  }

  // Get condition-based styling
  const getConditionColor = () => {
    if (!formattedPrediction) return "bg-gray-100"
    return formattedPrediction.isHealthy ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
  }

  const getConditionTextColor = () => {
    if (!formattedPrediction) return "text-gray-700"
    return formattedPrediction.isHealthy ? "text-green-700" : "text-amber-700"
  }

  const getConditionIcon = () => {
    if (!formattedPrediction) return <Info className="h-5 w-5" />
    return formattedPrediction.isHealthy ? (
      <Check className="h-5 w-5 text-green-600" />
    ) : (
      <AlertTriangle className="h-5 w-5 text-amber-600" />
    )
  }

  // Disease information based on prediction
  const getDiseaseInfo = () => {
    if (!formattedPrediction) return null

    // This would ideally come from a database or API
    // For now, we'll provide some sample information for a few conditions
    const infoMap = {
      "apple scab": {
        description: "A fungal disease that affects apple trees, causing dark, scabby lesions on leaves and fruit.",
        treatment:
          "Apply fungicides early in the growing season. Remove and destroy fallen leaves to reduce fungal spores.",
        prevention:
          "Plant resistant varieties. Ensure good air circulation by proper pruning. Apply preventative fungicides.",
      },
      "black rot": {
        description: "A fungal disease affecting grapes and apples, causing circular lesions and fruit rot.",
        treatment: "Remove infected plant parts. Apply appropriate fungicides according to local recommendations.",
        prevention:
          "Maintain good air circulation. Remove mummified fruits. Apply protective fungicides during the growing season.",
      },
      "cedar apple rust": {
        description: "A fungal disease that requires both apple trees and cedar trees to complete its life cycle.",
        treatment: "Apply fungicides in spring. Remove galls from cedar trees if possible.",
        prevention: "Plant resistant apple varieties. Remove cedar trees within a 2-mile radius if practical.",
      },
      healthy: {
        description: "Your plant appears to be healthy with no visible signs of disease.",
        treatment: "Continue regular care and maintenance.",
        prevention: "Maintain good cultural practices including proper watering, fertilization, and pest monitoring.",
      },
    }

    // Try to match the condition to our info map
    const condition = formattedPrediction.condition.toLowerCase()
    const matchedInfo = Object.keys(infoMap).find((key) => condition.includes(key))

    return matchedInfo
      ? infoMap[matchedInfo]
      : {
          description: "This appears to be a plant disease affecting your " + formattedPrediction.plant + ".",
          treatment: "Consult with a local agricultural extension service for specific treatment recommendations.",
          prevention: "Practice crop rotation, ensure proper plant spacing, and maintain good garden hygiene.",
        }
  }

  const diseaseInfo = getDiseaseInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plant Disease Classifier</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload an image of a plant leaf to identify diseases or confirm if it's healthy. Our AI model can recognize
            various plant diseases across multiple species.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Upload Section */}
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Leaf className="h-6 w-6 mr-2 text-green-600" />
                Upload Leaf Image
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}

              <form onSubmit={handlePredict} className="space-y-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    dragActive ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-500"
                  } transition-colors duration-200`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {!preview ? (
                    <div className="space-y-4">
                      <div className="mx-auto h-20 w-20 text-gray-400 flex items-center justify-center rounded-full bg-gray-100">
                        <Upload className="h-10 w-10" />
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Drag and drop your image here, or</p>
                        <label className="mt-2 inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Browse Files
                          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                      </div>
                      <p className="text-sm text-gray-500">Supported formats: JPG, PNG, GIF</p>
                    </div>
                  ) : (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="Preview"
                        className="max-h-[400px] mx-auto rounded-md"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!selectedImage || loading}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Microscope className="h-5 w-5 mr-2" />
                        Analyze Image
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Plant Types Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Supported Plants</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Apple",
                    "Blueberry",
                    "Cherry",
                    "Corn",
                    "Grape",
                    "Orange",
                    "Peach",
                    "Pepper",
                    "Potato",
                    "Raspberry",
                    "Soybean",
                    "Squash",
                    "Strawberry",
                    "Tomato",
                  ].map((plant) => (
                    <div key={plant} className="flex items-center bg-gray-50 px-3 py-2 rounded-md">
                      <Plant className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">{plant}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="md:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 p-8 text-white">
              {prediction ? (
                <div className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Microscope className="h-6 w-6 mr-2" />
                    Analysis Results
                  </h2>

                  <div className={`${getConditionColor()} ${getConditionTextColor()} rounded-xl p-6 mb-6`}>
                    <div className="flex items-center">
                      {getConditionIcon()}
                      <div className="ml-3">
                        <h3 className="text-xl font-bold capitalize">{formattedPrediction?.plant || "Plant"}</h3>
                        <p className="font-medium capitalize">{formattedPrediction?.condition || prediction}</p>
                      </div>
                    </div>
                  </div>

                  {diseaseInfo && (
                    <div className="space-y-6">
                      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5">
                        <h4 className="font-semibold text-lg mb-2">Description</h4>
                        <p className="text-green-100">{diseaseInfo.description}</p>
                      </div>

                      {formattedPrediction && !formattedPrediction.isHealthy && (
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5">
                          <h4 className="font-semibold text-lg mb-2">Treatment</h4>
                          <p className="text-green-100">{diseaseInfo.treatment}</p>
                        </div>
                      )}

                      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5">
                        <h4 className="font-semibold text-lg mb-2">Prevention</h4>
                        <p className="text-green-100">{diseaseInfo.prevention}</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-6 flex space-x-4">
                    <button
                      onClick={clearImage}
                      className="inline-flex items-center px-4 py-2 bg-white text-green-700 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Analyze Another Image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-6 mb-6">
                    <Leaf className="h-16 w-16" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Plant Health Analysis</h2>
                  <p className="text-green-100 max-w-md">
                    Our AI model can identify various plant diseases and health conditions by analyzing leaf images.
                    Upload a clear image of a plant leaf to get started.
                  </p>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm">Fast Analysis</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm">Multiple Plant Species</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm">Disease Identification</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm">Treatment Recommendations</span>
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
                <Upload className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 text-center">Upload Leaf Image</h3>
              <p className="text-gray-600 text-center">
                Take a clear photo of the plant leaf showing any visible symptoms or discoloration.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-4 shadow-lg">
                <Microscope className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 text-center">AI Analysis</h3>
              <p className="text-gray-600 text-center">
                Our machine learning model analyzes the image to identify patterns associated with various plant
                diseases.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-4 shadow-lg">
                <FileWarning className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 text-center">Get Diagnosis</h3>
              <p className="text-gray-600 text-center">
                Receive a diagnosis of the plant's condition along with treatment recommendations and prevention tips.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictDisease

