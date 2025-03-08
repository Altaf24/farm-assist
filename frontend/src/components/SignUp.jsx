"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Leaf, User, Mail, Lock, Check, ArrowRight } from "lucide-react"

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    farmType: "",
  })

  const farmTypes = [
    { value: "crop", label: "Crop Farming", icon: "🌾" },
    { value: "livestock", label: "Livestock Farming", icon: "🐄" },
    { value: "mixed", label: "Mixed Farming", icon: "🚜" },
    { value: "organic", label: "Organic Farming", icon: "🌱" },
    { value: "other", label: "Other", icon: "🌿" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.farmType) {
      newErrors.farmType = "Farm type is required"
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Here you would normally make an API call to your backend
      console.log("Signup submitted:", formData)

      // If signup is successful, you can redirect the user
      // window.location.href = "/dashboard";

      // For demo purposes, we'll just show a success message
      alert("Account created successfully! Redirecting to dashboard...")
    } catch (error) {
      console.error("Signup error:", error)
      setErrors({
        form: "Failed to create account. Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-800 relative overflow-hidden pt-32 pb-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 300 + 100 + "px",
                height: Math.random() * 300 + 100 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5,
              }}
            />
          ))}
        </div>

        {/* Decorative pattern */}
        <svg
          className="absolute bottom-0 left-0 right-0 text-white fill-current opacity-10"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="max-w-2xl w-full mx-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left side - Form */}
            <div className="md:w-3/5 p-8">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-md">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <h2 className="ml-3 text-2xl font-bold text-gray-900">Create Your Account</h2>
              </div>

              {errors.form && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {errors.form}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 border ${
                          errors.firstName ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 border ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-2 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters long</p>
                </div>

                <div>
                  <label htmlFor="farmType" className="block text-sm font-medium text-gray-700 mb-1">
                    Type of Farming
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                    {farmTypes.map((type) => (
                      <div key={type.value}>
                        <input
                          type="radio"
                          id={`farmType-${type.value}`}
                          name="farmType"
                          value={type.value}
                          className="sr-only"
                          checked={formData.farmType === type.value}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor={`farmType-${type.value}`}
                          className={`flex items-center p-3 border ${
                            formData.farmType === type.value
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300 hover:bg-gray-50"
                          } rounded-lg cursor-pointer transition-colors`}
                        >
                          <span className="text-xl mr-2">{type.icon}</span>
                          <span className="text-sm font-medium text-gray-900">{type.label}</span>
                          {formData.farmType === type.value && <Check className="ml-auto h-5 w-5 text-green-500" />}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.farmType && <p className="mt-1 text-sm text-red-600">{errors.farmType}</p>}
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={() => setAgreeToTerms(!agreeToTerms)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">
                      I agree to the{" "}
                      <Link to="/terms" className="text-green-600 hover:text-green-500">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-green-600 hover:text-green-500">
                        Privacy Policy
                      </Link>
                    </label>
                    {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-md transform transition-all duration-300 hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Sign Up
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                  Log in
                </Link>
              </p>
            </div>

            {/* Right side - Benefits */}
            <div className="md:w-2/5 bg-gradient-to-br from-green-500 to-emerald-700 p-8 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">Join FarmAssist Today</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="ml-3 text-sm">Access AI-powered farming insights and recommendations</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="ml-3 text-sm">Monitor crop health and optimize irrigation in real-time</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="ml-3 text-sm">Increase yields by up to 30% with data-driven decisions</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="ml-3 text-sm">Join a community of forward-thinking farmers</p>
                  </li>
                </ul>

                <div className="mt-8 text-sm text-green-100">
                  "FarmAssist has revolutionized how we manage our crops. The insights and recommendations have helped
                  us increase yields while using fewer resources."
                  <p className="mt-2 font-medium">— John D., Crop Farmer</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                <div className="w-64 h-64 rounded-full bg-white opacity-10"></div>
              </div>
              <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4">
                <div className="w-48 h-48 rounded-full bg-white opacity-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

