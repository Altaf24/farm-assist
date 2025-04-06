import React, { useState } from "react";
import { Client } from "@gradio/client";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "#f5f5f5",
  padding: "20px"
};

const formStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const labelStyle = {
  display: "flex",
  flexDirection: "column",
  fontSize: "14px",
  fontWeight: "500"
};

const inputStyle = {
  padding: "8px",
  fontSize: "14px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginTop: "5px"
};

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const headerStyle = {
  marginBottom: "20px",
  fontSize: "24px",
  fontWeight: "600"
};

const CropPrediction = () => {
  const [inputs, setInputs] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: ""
  });
  const [result, setResult] = useState("");

  // Create a client connection. Replace "Vinit710/crop_recom" with your Hugging Face Space repo name.
  const clientPromise = Client.connect("Vinit710/crop_recom");

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const client = await clientPromise;
      const response = await client.predict("/predict", {
        N: Number(inputs.N),
        P: Number(inputs.P),
        K: Number(inputs.K),
        temperature: Number(inputs.temperature),
        humidity: Number(inputs.humidity),
        ph: Number(inputs.ph),
        rainfall: Number(inputs.rainfall)
      });
      setResult(response.data);
    } catch (error) {
      console.error("Prediction error:", error);
      setResult("Error while fetching prediction.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headerStyle}>Crop Recommendation</h2>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>
            Nitrogen (N):
            <input
              style={inputStyle}
              type="number"
              name="N"
              value={inputs.N}
              onChange={handleChange}
            />
          </label>
          <label style={labelStyle}>
            Phosphorous (P):
            <input
              style={inputStyle}
              type="number"
              name="P"
              value={inputs.P}
              onChange={handleChange}
            />
          </label>
          <label style={labelStyle}>
            Potassium (K):
            <input
              style={inputStyle}
              type="number"
              name="K"
              value={inputs.K}
              onChange={handleChange}
            />
          </label>
          <label style={labelStyle}>
            Temperature (°C):
            <input
              style={inputStyle}
              type="number"
              name="temperature"
              value={inputs.temperature}
              onChange={handleChange}
            />
          </label>
          <label style={labelStyle}>
            Humidity (%):
            <input
              style={inputStyle}
              type="number"
              name="humidity"
              value={inputs.humidity}
              onChange={handleChange}
            />
          </label>
          <label style={labelStyle}>
            pH:
            <input
              style={inputStyle}
              type="number"
              name="ph"
              value={inputs.ph}
              onChange={handleChange}
            />
          </label>
          <label style={labelStyle}>
            Rainfall (mm):
            <input
              style={inputStyle}
              type="number"
              name="rainfall"
              value={inputs.rainfall}
              onChange={handleChange}
            />
          </label>
          <button style={buttonStyle} type="submit">
            Predict Crop
          </button>
        </form>
        {result && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h3>Recommended Crop:</h3>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPrediction;
