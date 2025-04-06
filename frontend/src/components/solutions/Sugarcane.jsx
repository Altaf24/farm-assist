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

const SugarcanePage = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [prediction, setPrediction] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [dragActive, setDragActive] = useState(false)

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
      const client = await Client.connect("Vinit710/Sugarcane_die_class")

      // Predict using the '/predict' API endpoint
      const result = await client.predict("/predict", { img: selectedImage })

      // result.data contains the predicted output from your model
      setPrediction(result.data)
    } catch (error) {
      console.error("Error predicting sugarcane disease:", error)
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
    if (!prediction) return "bg-gray-100"
    return typeof prediction === "string" && prediction.toLowerCase().includes("healthy")
      ? "bg-green-50 border-green-200"
      : "bg-amber-50 border-amber-200"
  }

  const getConditionTextColor = () => {
    if (!prediction) return "text-gray-700"
    return typeof prediction === "string" && prediction.toLowerCase().includes("healthy")
      ? "text-green-700"
      : "text-amber-700"
  }

  const getConditionIcon = () => {
    if (!prediction) return <Info className="h-5 w-5" />
    return typeof prediction === "string" && prediction.toLowerCase().includes("healthy") ? (
      <Check className="h-5 w-5 text-green-600" />
    ) : (
      <AlertTriangle className="h-5 w-5 text-amber-600" />
    )
  }

  // Disease information based on prediction
  const getDiseaseInfo = () => {
    if (!prediction) return null

    // Ensure prediction is a string before using toLowerCase
    const predictionStr = typeof prediction === "string" ? prediction : String(prediction)
    const predictionLower = predictionStr.toLowerCase()

    // This would ideally come from a database or API
    // For now, we'll provide some sample information for sugarcane diseases
    const infoMap = {
      bacterialblights: {
        description:
          "Bacterial blights are caused by bacteria that infect the vascular system of sugarcane plants, leading to wilting, leaf streaking, and reduced growth.",
        treatment:
          "Apply copper-based bactericides as recommended by local agricultural extension services. Remove and destroy infected plants to prevent spread.",
        prevention:
          "Use disease-free planting material. Ensure proper field drainage. Implement crop rotation with non-host crops. Maintain proper plant spacing for good air circulation.",
      },
      healthy: {
        description: "Your sugarcane plant appears to be healthy with no visible signs of disease.",
        treatment: "Continue regular care and maintenance.",
        prevention:
          "Maintain good cultural practices including proper irrigation, fertilization, and regular monitoring for early signs of pests or diseases.",
      },
      mosaic: {
        description:
          "Sugarcane mosaic is a viral disease that causes a mottled pattern of light and dark green or yellowish patches on leaves, stunting plant growth and reducing yield.",
        treatment:
          "There is no cure for viral diseases. Remove and destroy infected plants to prevent spread to healthy plants.",
        prevention:
          "Plant resistant varieties. Control aphid populations that transmit the virus. Use disease-free seed cane for planting.",
      },
      redrot: {
        description:
          "Red rot is a fungal disease that affects the stem of sugarcane plants, causing internal reddening and deterioration of tissues, leading to wilting and death.",
        treatment:
          "Remove and destroy infected plants. Apply recommended fungicides as a preventive measure in high-risk areas.",
        prevention:
          "Use disease-free planting material. Avoid waterlogging. Implement crop rotation. Plant resistant varieties when available.",
      },
      rust: {
        description:
          "Sugarcane rust is a fungal disease that appears as orange-brown or reddish-brown pustules on leaves, reducing photosynthetic area and plant vigor.",
        treatment:
          "Apply appropriate fungicides as recommended by local agricultural experts. Remove heavily infected leaves.",
        prevention:
          "Plant resistant varieties. Avoid excessive nitrogen fertilization. Ensure proper spacing between plants for good air circulation.",
      },
      yellow: {
        description:
          "Yellow leaf disease is caused by a virus that results in yellowing of the midrib and leaf blades, leading to reduced growth and sugar content.",
        treatment: "There is no cure for viral diseases. Remove and destroy infected plants to prevent spread.",
        prevention:
          "Use disease-free planting material. Control insect vectors like aphids and leafhoppers. Plant resistant varieties when available.",
      },
    }

    // Try to match the prediction to our info map
    const matchedKey = Object.keys(infoMap).find((key) => predictionLower.includes(key))

    return matchedKey
      ? infoMap[matchedKey]
      : {
          description: "This appears to be a condition affecting your sugarcane plant.",
          treatment: "Consult with a local agricultural extension service for specific treatment recommendations.",
          prevention: "Practice good field hygiene, crop rotation, and use disease-free planting material.",
        }
  }

  const diseaseInfo = getDiseaseInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sugarcane Disease Classifier</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload an image of a sugarcane leaf to identify diseases or confirm if it's healthy. Our AI model can
            recognize various sugarcane diseases to help farmers take timely action.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Upload Section */}
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Leaf className="h-6 w-6 mr-2 text-green-600" />
                Upload Sugarcane Leaf Image
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
                        src={preview || "/placeholder.svg?height=400&width=400"}
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

              {/* Disease Types Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Detectable Diseases</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Bacterial Blights", "Healthy", "Mosaic", "Red Rot", "Rust", "Yellow Leaf"].map((disease) => (
                    <div key={disease} className="flex items-center bg-gray-50 px-3 py-2 rounded-md">
                      <Plant className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">{disease}</span>
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
                        <h3 className="text-xl font-bold">Sugarcane</h3>
                        <p className="font-medium capitalize">{prediction}</p>
                      </div>
                    </div>
                  </div>

                  {diseaseInfo && (
                    <div className="space-y-6">
                      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5">
                        <h4 className="font-semibold text-lg mb-2">Description</h4>
                        <p className="text-green-100">{diseaseInfo.description}</p>
                      </div>

                      {prediction && !typeof prediction === "string"
                        ? prediction.toLowerCase().includes("healthy")
                        : false && (
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
                  <h2 className="text-2xl font-bold mb-2">Sugarcane Health Analysis</h2>
                  <p className="text-green-100 max-w-md">
                    Our AI model can identify various sugarcane diseases and health conditions by analyzing leaf images.
                    Upload a clear image of a sugarcane leaf to get started.
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
                      <span className="text-sm">Multiple Disease Detection</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-sm">Accurate Identification</span>
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
                Take a clear photo of the sugarcane leaf showing any visible symptoms or discoloration.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-4 shadow-lg">
                <Microscope className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 text-center">AI Analysis</h3>
              <p className="text-gray-600 text-center">
                Our machine learning model analyzes the image to identify patterns associated with various sugarcane
                diseases.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-4 shadow-lg">
                <FileWarning className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 text-center">Get Diagnosis</h3>
              <p className="text-gray-600 text-center">
                Receive a diagnosis of the sugarcane's condition along with treatment recommendations and prevention
                tips.
              </p>
            </div>
          </div>
        </div>

        {/* Sugarcane Disease Information */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Common Sugarcane Diseases</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-3 bg-red-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Red Rot</h3>
                <p className="text-gray-600 mb-4">
                  A fungal disease that affects the stem of sugarcane plants, causing internal reddening and
                  deterioration of tissues.
                </p>
                <div className="text-sm text-gray-500">
                  <p className="mb-1">
                    <strong>Symptoms:</strong> Reddening of internal tissues, wilting, and drying of leaves.
                  </p>
                  <p>
                    <strong>Impact:</strong> Can cause up to 30% yield loss in susceptible varieties.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-3 bg-yellow-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Mosaic</h3>
                <p className="text-gray-600 mb-4">
                  A viral disease that causes a mottled pattern of light and dark green or yellowish patches on leaves.
                </p>
                <div className="text-sm text-gray-500">
                  <p className="mb-1">
                    <strong>Symptoms:</strong> Mottled leaf pattern, stunted growth, and reduced tillering.
                  </p>
                  <p>
                    <strong>Impact:</strong> Can reduce yields by 10-15% in infected fields.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-3 bg-amber-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Rust</h3>
                <p className="text-gray-600 mb-4">
                  A fungal disease that appears as orange-brown or reddish-brown pustules on leaves.
                </p>
                <div className="text-sm text-gray-500">
                  <p className="mb-1">
                    <strong>Symptoms:</strong> Orange-brown pustules on leaves, premature drying of leaves.
                  </p>
                  <p>
                    <strong>Impact:</strong> Can reduce photosynthetic area and cause yield losses of 10-40%.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-3 bg-blue-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Bacterial Blights</h3>
                <p className="text-gray-600 mb-4">
                  Bacterial infections that affect the vascular system of sugarcane plants.
                </p>
                <div className="text-sm text-gray-500">
                  <p className="mb-1">
                    <strong>Symptoms:</strong> Leaf streaking, wilting, and reduced growth.
                  </p>
                  <p>
                    <strong>Impact:</strong> Can cause significant yield losses in severe infections.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-3 bg-yellow-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Yellow Leaf</h3>
                <p className="text-gray-600 mb-4">
                  A viral disease that results in yellowing of the midrib and leaf blades.
                </p>
                <div className="text-sm text-gray-500">
                  <p className="mb-1">
                    <strong>Symptoms:</strong> Yellowing of midrib and leaf blades, reduced growth.
                  </p>
                  <p>
                    <strong>Impact:</strong> Can reduce sugar content and yield by 5-20%.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-3 bg-green-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Preventive Measures</h3>
                <p className="text-gray-600 mb-4">Best practices to prevent sugarcane diseases in your fields.</p>
                <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
                  <li>Use disease-free planting material</li>
                  <li>Implement crop rotation practices</li>
                  <li>Maintain proper field drainage</li>
                  <li>Plant resistant varieties when available</li>
                  <li>Regular monitoring for early detection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SugarcanePage

