import React, { useState } from "react";

const PredictDisease = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");

  // Handle image file selection and generate a preview URL
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      setSelectedImage(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  // Simulate disease prediction (integrate your Hugging Face model here)
  const handlePredict = async (e) => {
    e.preventDefault();
    console.log("Predicting disease for:", selectedImage);
    // TODO: Integrate your Hugging Face API call here
    // For now, we simulate a response:
    setPrediction("Prediction will appear here after integrating the model.");
  };

  // Reset the selected image and prediction
  const clearImage = () => {
    setSelectedImage(null);
    setPreview(null);
    setPrediction("");
  };

  return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center py-10">
      <h1 className="text-4xl text-white font-bold mb-6">Predict Plant Disease</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <form onSubmit={handlePredict} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-700"
            />
          </div>

          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto rounded-md border"
              />
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            {preview && (
              <button
                type="button"
                onClick={clearImage}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Clear Image
              </button>
            )}
            <button
              type="submit"
              disabled={!selectedImage}
              className="ml-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              Predict Disease
            </button>
          </div>
        </form>

        {prediction && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-md">
            <p className="text-green-800">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictDisease;
