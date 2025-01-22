import {Link} from "react-router-dom";
import { useState } from "react";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.target);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      farmType: formData.get("farmType"),
    };

    const newErrors = {};
    if (!data.firstName) newErrors.firstName = "First name is required";
    if (!data.lastName) newErrors.lastName = "Last name is required";
    if (!data.email) newErrors.email = "Email is required";
    if (!data.password) newErrors.password = "Password is required";
    if (!data.farmType) newErrors.farmType = "Farm type is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    console.log("Form submitted:", data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-400">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-4">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className={`w-full mt-1 p-2 border rounded ${errors.firstName ? "border-red-500" : ""}`}
            />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className={`w-full mt-1 p-2 border rounded ${errors.lastName ? "border-red-500" : ""}`}
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full mt-1 p-2 border rounded ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`w-full mt-1 p-2 border rounded ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="farmType" className="block text-sm font-medium">
              Type of Farming
            </label>
            <select
              id="farmType"
              name="farmType"
              className={`w-full mt-1 p-2 border rounded ${errors.farmType ? "border-red-500" : ""}`}
            >
              <option value="">Select farm type</option>
              <option value="crop">Crop Farming</option>
              <option value="livestock">Livestock Farming</option>
              <option value="mixed">Mixed Farming</option>
              <option value="organic">Organic Farming</option>
              <option value="other">Other</option>
            </select>
            {errors.farmType && <p className="text-sm text-red-500">{errors.farmType}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
