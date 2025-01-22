import { Link } from "react-router-dom"
import { Tractor } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="bg-green-500 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center text-white text-2xl font-bold">
          <Tractor className="h-8 w-8 mr-2" />
          Farm-Assist
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-white hover:text-green-100">
            Home
          </Link>
          <Link href="/services" className="text-white hover:text-green-100">
            Services
          </Link>
          <Link href="/about" className="text-white hover:text-green-100">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-green-100">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

