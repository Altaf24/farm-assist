import {Link} from "react-router-dom";
import { ArrowRight } from "lucide-react";


const Hero = () => {
  return (
    <div className="relative bg-green-800 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-green-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          {/* Decorative SVG */}
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-green-800 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          {/* Main content */}
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Revolutionize your</span>{" "}
                <span className="block text-green-400 xl:inline">farming practices</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              FarmAssist is an AI-driven platform aimed at assisting everyday farmers in optimizing their agricultural practices, 
              managing resources,and improving productivity.With user-friendly tools and intelligent features, FarmAssist empowers farmers
               to make informed decisions effortlessly.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                {/* Get started button */}
                <div className="rounded-md shadow">
                  <Link
                    to="/signup"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </Link>
                </div>
                
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* Image section */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
       
      </div>
    </div>
  );
};

export default Hero;
