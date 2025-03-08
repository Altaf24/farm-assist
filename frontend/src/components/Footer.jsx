import { Link } from "react-router-dom"
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Globe,
  Shield,
  Award,
} from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-100 rounded-full opacity-50"></div>
        <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-yellow-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-green-200 rounded-full opacity-40"></div>
      </div>

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:py-16 md:px-12 lg:flex lg:items-center lg:justify-between relative z-10">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to transform your farming?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-green-100">
                Join thousands of farmers who are already using FarmAssist to revolutionize their agricultural
                practices.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <div className="sm:flex">
                <Link
                  to="/signup"
                  className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50 md:text-lg md:px-8 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact-sales"
                  className="mt-3 sm:mt-0 sm:ml-3 flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-800 bg-opacity-60 hover:bg-opacity-70 md:text-lg md:px-8"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative pattern */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-32 text-white fill-current opacity-20"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-md">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">
                Farm<span className="text-green-500">Assist</span>
              </span>
            </div>
            <p className="mt-4 text-base text-gray-500 max-w-md">
              Empowering farmers with AI-driven solutions for sustainable and efficient farming practices. Our platform
              helps optimize yields, reduce costs, and implement eco-friendly agricultural methods.
            </p>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect with us</h3>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  <span className="sr-only">YouTube</span>
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="ml-2 text-sm text-gray-500">Secure & Encrypted</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-green-500" />
                <span className="ml-2 text-sm text-gray-500">Award Winning</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-green-500" />
                <span className="ml-2 text-sm text-gray-500">Global Support</span>
              </div>
            </div>
          </div>

          {/* Links sections */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/solutions/PredictDisease"
                  className="text-base text-gray-500 hover:text-green-600 transition-colors"
                >
                  Disease Analysis
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/smart-bot"
                  className="text-base text-gray-500 hover:text-green-600 transition-colors"
                >
                  Smart Bot
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/pest-control"
                  className="text-base text-gray-500 hover:text-green-600 transition-colors"
                >
                  Pest Control
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/crop-prediction"
                  className="text-base text-gray-500 hover:text-green-600 transition-colors"
                >
                  Crop Prediction
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/soil-monitoring"
                  className="text-base text-gray-500 hover:text-green-600 transition-colors"
                >
                  Soil Monitoring
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/weather"
                  className="text-base text-gray-500 hover:text-green-600 transition-colors"
                >
                  Weather Forecasting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-base text-gray-500 hover:text-green-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-base text-gray-500 hover:text-green-600 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-base text-gray-500 hover:text-green-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-base text-gray-500 hover:text-green-600 transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-base text-gray-500 hover:text-green-600 transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact & Support</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-500">AISSMS IOIT PUNE, MAHARASHTRA, INDIA</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <a href="tel:+91 0000000000" className="text-gray-500 hover:text-green-600 transition-colors">
                  +91 0000000000
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <a href="mailto:info@farmassist.com" className="text-gray-500 hover:text-green-600 transition-colors">
                  info@farmassist.com
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
              <div className="mt-4 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-900 placeholder-gray-500 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Cookie Policy
              </Link>
              <Link to="/sitemap" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Sitemap
              </Link>
            </div>
            <p className="mt-8 text-sm text-gray-500 md:mt-0 md:order-1">
              &copy; {new Date().getFullYear()} FarmAssist Technologies Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

