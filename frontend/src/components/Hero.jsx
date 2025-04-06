import { Link } from "react-router-dom"
import { ArrowRight, Zap, BarChart, CloudRain, Sprout } from "lucide-react"

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0c4a2c] via-[#1a6540] to-[#0d3d29]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated circles */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-10 animate-pulse"
              style={{
                width: Math.random() * 300 + 100 + "px",
                height: Math.random() * 300 + 100 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${Math.random() * 8 + 10}s`,
              }}
            />
          ))}
        </div>

        {/* Decorative pattern */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 text-[#0c4a2c] opacity-20"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-20 pb-24 md:pt-32 md:pb-32">
          {/* Hero content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-900 bg-opacity-50 backdrop-blur-sm rounded-full text-green-200 text-sm font-medium border border-green-700">
                <Zap size={16} className="mr-2 text-yellow-400" />
                AI-Powered Farming Solutions
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                <span className="block">Revolutionize</span>
                <span className="block mt-1 bg-gradient-to-r from-green-300 via-yellow-300 to-green-200 bg-clip-text text-transparent">
                  Your Farming Future
                </span>
              </h1>

              <p className="text-xl text-green-100 max-w-2xl leading-relaxed">
                FarmAssist empowers farmers with cutting-edge AI technology to optimize yields, reduce costs, and
                implement sustainable practices with unprecedented precision.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-green-400 to-emerald-600 text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="https://youtu.be/Vi01hPm3mLM?si=R7lUfvFAovrQ13oZ"
                  className="inline-flex items-center px-8 py-4 text-lg font-bold rounded-xl bg-white bg-opacity-10 backdrop-blur-sm text-white border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
                >
                  Watch Video
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">30%</div>
                  <div className="text-green-200 text-sm">Yield Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">25%</div>
                  <div className="text-green-200 text-sm">Water Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">10K+</div>
                  <div className="text-green-200 text-sm">Farmers Helped</div>
                </div>
              </div>
            </div>

            {/* Hero image/graphic */}
            <div className="relative">
              <div className="absolute -top-16 -left-16 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

              <div className="relative bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-2 shadow-2xl border border-green-700">
                <div className="absolute -top-6 -right-6 bg-yellow-500 rounded-full p-3 shadow-lg border-4 border-green-900">
                  <Sprout size={28} className="text-green-900" />
                </div>

                <div className="rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    alt="Smart farming technology"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating cards */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg max-w-[200px]">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                      <BarChart size={20} className="text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Crop Analysis</p>
                      <p className="text-xs text-gray-500">Real-time insights</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-4 shadow-lg max-w-[200px]">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                      <CloudRain size={20} className="text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Smart Irrigation</p>
                      <p className="text-xs text-gray-500">Water optimization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted by section */}
          <div className="mt-20">
            <p className="text-center text-green-200 text-sm font-medium uppercase tracking-wider mb-6">
              Trusted by leading agricultural organizations
            </p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {["AgriTech", "FarmCorp", "GreenHarvest", "CropInnovate", "EcoFarm"].map((company, i) => (
                <div key={i} className="text-white text-xl font-bold opacity-50">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

