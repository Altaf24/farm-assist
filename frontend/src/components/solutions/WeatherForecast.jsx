import React, { useState } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [weather, setWeather] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const OPEN_CAGE_API = "89813ebf14a9496e84541d52052cb288";

  // Helper function to capitalize the first letter of each word
  const capitalizeLocation = (location) => {
    if (!location) return "";
    return location
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getWeather = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&current=temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m&timezone=auto`
      );

      setWeather(data.current);
      setHourly({
        time: data.hourly.time.slice(0, 6),
        temp: data.hourly.temperature_2m.slice(0, 6),
      });
      setCoords({ lat, lon });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchByCity = async () => {
    if (!city.trim()) return;
    setError("");
    try {
      const { data } = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          city
        )}&key=${OPEN_CAGE_API}`
      );

      if (!data.results.length) throw new Error();

      const { lat, lng } = data.results[0].geometry;
      const components = data.results[0].components;
      const location =
        components.city ||
        components.town ||
        components.village ||
        city;
      setLocationName(capitalizeLocation(location));
      getWeather(lat, lng);
    } catch (err) {
      console.error(err);
      setError("City not found.");
    }
  };

  const fetchByCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    setError("");
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const { data } = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPEN_CAGE_API}`
          );
          const components = data.results[0].components;
          const location =
            components.city ||
            components.town ||
            components.village ||
            "Your Location";
          setLocationName(capitalizeLocation(location));
        } catch {
          setLocationName("Your Location");
        }
        getWeather(latitude, longitude);
      },
      () => setError("Unable to retrieve location.")
    );
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-green-800">
          🌤️ Weather Forecast
        </h1>

        <div className="flex gap-2">
          <input
            type="text"
            autoFocus
            placeholder="Enter city"
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchByCity}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Search
          </button>
          <button
            onClick={fetchByCurrentLocation}
            className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 flex items-center justify-center"
            title="Use my location"
          >
            <MapPin size={20} />
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-500 animate-pulse">Loading weather...</p>
        )}
        {error && <p className="text-center text-red-600">{error}</p>}

        {weather && (
          <div className="bg-white rounded-lg p-4 shadow-inner text-center space-y-2">
            {locationName && (
              <div className="flex justify-center">
                <span className="text-2xl font-bold text-green-900 bg-green-100 border border-green-300 px-4 py-2 rounded-full shadow-sm transition-all duration-300">
                  {locationName}
                </span>
              </div>
            )}

            <p className="text-sm text-gray-600">
              🌐 Lat {coords.lat?.toFixed(2)}, Lon {coords.lon?.toFixed(2)}
            </p>
            <div className="text-4xl font-bold text-green-800">
              {weather.temperature_2m}°C
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mt-2">
              <p>💧 Humidity: {weather.relative_humidity_2m}%</p>
              <p>🌧 Precipitation: {weather.precipitation} mm</p>
              <p>☔ Rain: {weather.rain} mm</p>
              <p>💨 Wind: {weather.wind_speed_10m} m/s</p>
            </div>
          </div>
        )}

        {hourly && (
          <div className="mt-4 bg-gray-50 rounded-lg p-4 text-sm border border-gray-200">
            <h2 className="font-semibold text-center text-green-700 mb-2">
              🌡 Hourly Forecast
            </h2>
            <ul className="space-y-1">
              {hourly.time.map((time, i) => (
                <li key={i} className="flex justify-between text-gray-800">
                  <span>
                    {new Date(time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span>{hourly.temp[i]}°C</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
