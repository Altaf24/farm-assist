import { Link } from "react-router-dom"
import { Tractor } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="bg-green-500 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-white text-2xl font-bold">
          <Tractor className="h-8 w-8 mr-2" />
          Farm-Assist
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-white hover:text-green-100">
            Home
          </Link>
          <Link to="/store" className="text-white hover:text-green-100">
            Store
          </Link>
          <Link to="/about" className="text-white hover:text-green-100">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-green-100">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar