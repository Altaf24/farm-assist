
// // import { useUser, UserButton } from "@clerk/clerk-react"
//   "use client"

//   import { useState, useEffect } from "react"
//   import { Link } from "react-router-dom"
//   import { Menu, X, Leaf, ChevronDown, Search, User } from "lucide-react"

//   const NavBar = () => {
//     const [isOpen, setIsOpen] = useState(false)
//     const [scrolled, setScrolled] = useState(false)
//     const [isSignedIn, setIsSignedIn] = useState(false)
//     const [userData, setUserData] = useState(null)

//     // Function to check authentication status
//     const checkAuthStatus = () => {
//       const token = localStorage.getItem('token')
//       const user = localStorage.getItem('user')
    
//       if (token && user) {
//         setIsSignedIn(true)
//         try {
//           setUserData(JSON.parse(user))
//         } catch (e) {
//           console.error("Error parsing user data:", e)
//         }
//       } else {
//         setIsSignedIn(false)
//         setUserData(null)
//       }
//     }

//     useEffect(() => {
//       // Check auth status on initial load
//       checkAuthStatus()

//       // Set up scroll event listener
//       const handleScroll = () => {
//         if (window.scrollY > 10) {
//           setScrolled(true)
//         } else {
//           setScrolled(false)
//         }
//       }
//       window.addEventListener("scroll", handleScroll)

//       // Create a custom event listener for auth changes
//       window.addEventListener('storage', (event) => {
//         if (event.key === 'token' || event.key === 'user') {
//           checkAuthStatus()
//         }
//       })

//       // Check auth status every time component is focused
//       window.addEventListener('focus', checkAuthStatus)

//       // Clean up event listeners
//       return () => {
//         window.removeEventListener("scroll", handleScroll)
//         window.removeEventListener('storage', checkAuthStatus)
//         window.removeEventListener('focus', checkAuthStatus)
//       }
//     }, [])

//     // Function to handle logout
//     const handleLogout = () => {
//       localStorage.removeItem('token')
//       localStorage.removeItem('user')
//       setIsSignedIn(false)
//       setUserData(null)
//       // Optionally redirect to home or login page
//       window.location.href = '/'
//     }

//     // Get user initials for the profile circle
//     const getUserInitials = () => {
//       if (!userData) return "U"
    
//       const firstName = userData.firstName || ""
//       const lastName = userData.lastName || ""
    
//       return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
//     }
//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center">
//             <Link to="/" className="flex items-center">
//               <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-lg">
//                 <Leaf className="h-6 w-6 text-white" />
//               </div>
//               <span className={`ml-3 text-xl font-bold ${scrolled ? "text-green-800" : "text-white"}`}>
//                 Farm<span className="text-green-500">Assist</span>
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex md:items-center md:space-x-8">
//             {/* Navigation items... */}
//             <div className="relative group">
//               <button
//                 className={`flex items-center text-sm font-medium ${
//                   scrolled ? "text-gray-700" : "text-white"
//                 } hover:text-green-500 transition-colors`}
//               >
//                 Solutions
//                 <ChevronDown className="ml-1 h-4 w-4" />
//               </button>
//               <div className="absolute left-0 w-56 mt-2 origin-top-left bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10">
//                 <div className="py-2 p-3 space-y-1">
//                   <Link
//                     to="/solutions/PredictDiseases"
//                     className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
//                   >
//                     Disease Prediction & Analysis
//                   </Link>
//                   <Link
//                     to="/solutions/smart_bot"
//                     className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
//                   >
//                     Smart Bot
//                   </Link>
//                   <Link
//                     to="/solutions/pest-control"
//                     className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
//                   >
//                     Pest & Disease Control
//                   </Link>
//                   <Link
//                     to="/solutions/crop-prediction"
//                     className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
//                   >
//                     Crop Prediction & Planning
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             <Link
//               to="/pricing"
//               className={`text-sm font-medium ${scrolled ? "text-gray-700" : "text-white"} hover:text-green-500 transition-colors`}
//             >
//               Pricing
//             </Link>

//             <div className="relative group">
//               <button
//                 className={`flex items-center text-sm font-medium ${
//                   scrolled ? "text-gray-700" : "text-white"
//                 } hover:text-green-500 transition-colors`}
//               >
//                 Resources
//                 <ChevronDown className="ml-1 h-4 w-4" />
//               </button>
//               <div className="absolute left-0 w-56 mt-2 origin-top-left bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10">
//                 <div className="py-2 p-3 space-y-1">
//                   <Link
//                     to="/resources/blog"
//                     className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
//                   >
//                     Blog & Articles
//                   </Link>
//                   <Link
//                     to="/resources/case-studies"
//                     className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
//                   >
//                     Case Studies
//                   </Link>
//                   <Link
//                     to="/resources/webinars"
//                     className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
//                   >
//                     Webinars & Events
//                   </Link>
//                   <Link
//                     to="/resources/knowledge-base"
//                     className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
//                   >
//                     Knowledge Base
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             <Link
//               to="/about"
//               className={`text-sm font-medium ${scrolled ? "text-gray-700" : "text-white"} hover:text-green-500 transition-colors`}
//             >
//               About Us
//             </Link>

//             <Link
//               to="/contact"
//               className={`text-sm font-medium ${scrolled ? "text-gray-700" : "text-white"} hover:text-green-500 transition-colors`}
//             >
//               Contact
//             </Link>
//           </div>

//           {/* Right side buttons */}
//           <div className="hidden md:flex md:items-center md:space-x-4">
//             <button
//               className={`p-2 rounded-full ${
//                 scrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"
//               } transition-colors`}
//             >
//               <Search className="h-5 w-5" />
//             </button>

//             {isSignedIn ? (
//               <div className="flex items-center space-x-4 relative group">
//                 {/* Custom profile circle instead of UserButton */}
//                 <button className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white font-medium shadow-md hover:shadow-lg transition-all">
//                   {getUserInitials()}
//                 </button>
                
//                 {/* Dropdown menu for profile */}
//                 <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10 top-full">
//                   <div className="py-1">
//                     <div className="px-4 py-3 border-b border-gray-100">
//                       <p className="text-sm font-medium text-gray-900">
//                         {userData?.firstName} {userData?.lastName}
//                       </p>
//                       <p className="text-xs text-gray-500 truncate">
//                         {userData?.email}
//                       </p>
//                     </div>
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Your Profile
//                     </Link>
//                     <Link
//                       to="/settings"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Settings
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                     >
//                       Sign out
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className={`px-4 py-2 text-sm font-medium ${
//                     scrolled ? "text-gray-700 hover:text-green-700" : "text-white hover:text-green-300"
//                   } transition-colors`}
//                 >
//                   Log in
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className={`p-2 rounded-md ${scrolled ? "text-gray-600" : "text-white"}`}
//             >
//               <span className="sr-only">Open main menu</span>
//               {isOpen ? (
//                 <X className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Menu className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-white shadow-xl rounded-b-2xl`}>
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           <div className="px-5 py-2 text-base font-medium text-gray-500">Solutions</div>
//           <Link
//             to="/solutions/PredictDiseases"
//             className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
//           >
//             Disease Prediction & Analysis
//           </Link>
//           <Link
//             to="/solutions/smart_bot"
//             className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
//           >
//             Smart Bot
//           </Link>
//           <Link
//             to="/solutions/pest-control"
//             className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
//           >
//             Pest Control
//           </Link>

//           <div className="px-5 py-2 text-base font-medium text-gray-500 border-t border-gray-200 mt-4 pt-4">
//             Main Menu
//           </div>
//           <Link
//             to="/pricing"
//             className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
//           >
//             Pricing
//           </Link>
//           <Link
//             to="/resources"
//             className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
//           >
//             Resources
//           </Link>
//           <Link
//             to="/about"
//             className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
//           >
//             About Us
//           </Link>
//           <Link
//             to="/contact"
//             className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
//           >
//             Contact
//           </Link>

//           <div className="px-5 py-2 text-base font-medium text-gray-500 border-t border-gray-200 mt-4 pt-4">
//             Account
//           </div>
//           {isSignedIn ? (
//             <div className="px-5 py-3">
//               <div className="flex items-center">
//                 <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white font-medium shadow-md">
//                   {getUserInitials()}
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-900">
//                     {userData?.firstName} {userData?.lastName}
//                   </p>
//                   <p className="text-xs text-gray-500 truncate">
//                     {userData?.email}
//                   </p>
//                 </div>
//               </div>
//               <div className="mt-3 space-y-1">
//                 <Link
//                   to="/profile"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
//                 >
//                   Your Profile
//                 </Link>
//                 <Link
//                   to="/settings"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
//                 >
//                   Settings
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
//                 >
//                   Sign out
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
//               >
//                 Log in
//               </Link>
//               <Link
//                 to="/signup"
//                 className="block mx-5 my-3 px-5 py-3 rounded-md text-base font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-center shadow-md"
//               >
//                 Get Started
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default NavBar;

                // import { useUser, UserButton } from "@clerk/clerk-react"

                "use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Leaf, ChevronDown, Search, User, Tractor } from "lucide-react"

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userData, setUserData] = useState(null)

  // Function to check authentication status
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

 
  
    if (token && user) {
      setIsSignedIn(true)
      try {
        setUserData(JSON.parse(user))
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    } else {
      setIsSignedIn(false)
      setUserData(null)
    }
  }

  useEffect(() => {
    // Check auth status on initial load
    checkAuthStatus()
    

    // Set up scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)


    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("authChanged", handleAuthChange);


    // Create a custom event listener for auth changes
    window.addEventListener('storage', (event) => {
      if (event.key === 'token' || event.key === 'user') {
        checkAuthStatus()
      }
    })

    // Check auth status every time component is focused
    window.addEventListener('focus', checkAuthStatus)

    // Clean up event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener('storage', checkAuthStatus)
      window.removeEventListener('focus', checkAuthStatus)
      window.removeEventListener("authChanged", handleAuthChange);
    }
  }, [])

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsSignedIn(false)
    setUserData(null)
    // Optionally redirect to home or login page
    window.location.href = '/'
  }

  // Get user initials for the profile circle
  const getUserInitials = () => {
    if (!userData) return "U"
  
    const firstName = userData.firstName || ""
    const lastName = userData.lastName || ""
  
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }
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
          {/* Navigation items... */}
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
                  to="/solutions/PredictDisease"
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

          {/* New Tractor Booking Option */}
          <div className="relative group">
            <button
              className={`flex items-center text-sm font-medium ${
                scrolled ? "text-gray-700" : "text-white"
              } hover:text-green-500 transition-colors`}
            >
              Tractor Booking
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 w-56 mt-2 origin-top-left bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10">
              <div className="py-2 p-3 space-y-1">
                <Link
                  to="/tractor/book-now"
                  className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  Book a Tractor
                </Link>
                <Link
                  to="/tractor/my-bookings"
                  className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  My Bookings
                </Link>
                <Link
                  to="/tractor/register-tractor"
                  className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  Register Your Tractor
                </Link>
                <Link
                  to="/tractor/pricing"
                  className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  Rental Rates
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
            <div className="flex items-center space-x-4 relative group">
              {/* Custom profile circle instead of UserButton */}
              <button className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white font-medium shadow-md hover:shadow-lg transition-all">
                {getUserInitials()}
              </button>
              
              {/* Dropdown menu for profile */}
              <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10 top-full">
                <div className="py-1">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {userData?.firstName} {userData?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {userData?.email}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
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

        {/* New Tractor Booking Section for Mobile */}
        <div className="px-5 py-2 text-base font-medium text-gray-500 border-t border-gray-200 mt-4 pt-4">
          Tractor Booking
        </div>
        <Link
          to="/tractor/book-now"
          className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
        >
          Book a Tractor
        </Link>
        <Link
          to="/tractor/my-bookings"
          className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
        >
          My Bookings
        </Link>
        <Link
          to="/tractor/register-tractor"
          className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
        >
          Register Your Tractor
        </Link>
        <Link
          to="/tractor/pricing"
          className="block px-5 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
        >
          Rental Rates
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
          <div className="px-5 py-3">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white font-medium shadow-md">
                {getUserInitials()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {userData?.firstName} {userData?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {userData?.email}
                </p>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                Sign out
              </button>
            </div>
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

export default NavBar;
