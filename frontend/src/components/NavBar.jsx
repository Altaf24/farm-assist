"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Leaf, ChevronDown, Search } from "lucide-react"
import { useUser, UserButton } from "@clerk/clerk-react"

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className={`ml-3 text-xl font-bold ${scrolled ? "text-green-800" : "text-white"}`}>
                Farm<span className="text-green-500">Assist</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="relative group">
              <button
                className={`flex items-center text-sm font-medium ${
                  scrolled ? "text-gray-700" : "text-white"
                } hover:text-green-500 transition-colors`}
              >
                Solutions
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 w-56 mt-2 origin-top-left bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10">
                <div className="py-2 p-3 space-y-1">
                  <Link
                    to="/solutions/PredictDiseases"
                    className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    Disease Prediction & Analysis
                  </Link>
                  <Link
                    to="/solutions/smart_bot"
                    className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    Smart Bot
                  </Link>
                  <Link
                    to="/solutions/pest-control"
                    className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    Pest & Disease Control
                  </Link>
                  <Link
                    to="/solutions/crop-prediction"
                    className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    Crop Prediction & Planning
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/pricing"
              className={`text-sm font-medium ${scrolled ? "text-gray-700" : "text-white"} hover:text-green-500 transition-colors`}
            >
              Pricing
            </Link>

            <div className="relative group">
              <button
                className={`flex items-center text-sm font-medium ${
                  scrolled ? "text-gray-700" : "text-white"
                } hover:text-green-500 transition-colors`}
              >
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 w-56 mt-2 origin-top-left bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10">
                <div className="py-2 p-3 space-y-1">
                  <Link
                    to="/resources/blog"
                    className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    Blog & Articles
                  </Link>
                  <Link
                    to="/resources/case-studies"
                    className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    Case Studies
                  </Link>
                  <Link
                    to="/resources/webinars"
                    className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    Webinars & Events
                  </Link>
                  <Link
                    to="/resources/knowledge-base"
                    className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                  >
                    Knowledge Base
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className={`text-sm font-medium ${scrolled ? "text-gray-700" : "text-white"} hover:text-green-500 transition-colors`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium ${scrolled ? "text-gray-700" : "text-white"} hover:text-green-500 transition-colors`}
            >
              Contact
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              className={`p-2 rounded-full ${
                scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"
              } transition-colors`}
            >
              <Search className="h-5 w-5" />
            </button>

            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <UserButton />
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium ${
                    scrolled ? "text-gray-700 hover:text-green-700" : "text-white hover:text-green-300"
                  } transition-colors`}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${scrolled ? "text-gray-600" : "text-white"}`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-white shadow-xl rounded-b-2xl`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="px-5 py-2 text-base font-medium text-gray-500">Solutions</div>
          <Link
            to="/solutions/PredictDiseases"
            className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            Disease Prediction & Analysis
          </Link>
          <Link
            to="/solutions/smart_bot"
            className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            Smart Bot
          </Link>
          <Link
            to="/solutions/pest-control"
            className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            Pest Control
          </Link>

          <div className="px-5 py-2 text-base font-medium text-gray-500 border-t border-gray-200 mt-4 pt-4">
            Main Menu
          </div>
          <Link
            to="/pricing"
            className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            Pricing
          </Link>
          <Link
            to="/resources"
            className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            Resources
          </Link>
          <Link
            to="/about"
            className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            Contact
          </Link>

          <div className="px-5 py-2 text-base font-medium text-gray-500 border-t border-gray-200 mt-4 pt-4">
            Account
          </div>
          {isSignedIn ? (
            <div className="px-5 py-3 text-base font-medium text-gray-700">
              Signed in as {user.firstName}
              <UserButton />
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block mx-5 my-3 px-5 py-3 rounded-md text-base font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-center shadow-md"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar