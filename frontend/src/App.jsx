import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import Body from './components/Body'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Store from './components/Store'
import PredictDisease from './components/solutions/PredictDisease'
import SsoCallback from './components/SsoCallback'
import { Provider } from 'react-redux'
import appStore from './utils/userSlice'
import CropPrediction from './components/solutions/crop-prediction'
import TractorBooking from './components/TractorBooking'
import MyBookings from './components/MyBookings'
import RegisterTractor from './components/RegisterTractor'
import TractorPricing from './components/TractorPricing'
import BookingHistory from './components/BookingHistory'
import SugarcanePage from './components/solutions/Sugarcane'
import Webinars from './components/resources/Webinars'
import CaseStudies from './components/resources/CaseStudies'
import Blog from './components/resources/Blog'
import Profile from './components/Profile'
import WeatherForecast from './components/solutions/WeatherForecast'
import Pricing from './components/pricing'


export default function App() {
  return (
    <>
      <Navbar />
     
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/store" element={<Store />} />
          <Route path="/solutions/predictdisease" element={<PredictDisease />} />
          <Route path="/solutions/sugarcane" element={<SugarcanePage />} />
          <Route path="/sso-callback" element={<SsoCallback />} />
          <Route path='/solutions/crop-prediction' element={<CropPrediction />} />
          <Route path="/tractor/book-now" element={<TractorBooking/>}/>
          <Route path="/tractor/my-bookings" element={<BookingHistory/>}/>
          <Route path="/tractor/register-tractor" element={<RegisterTractor/>}/>
          <Route path="/solutions/weather-forecast" element={<WeatherForecast />} />
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/tractor/pricing" element={<TractorPricing/>}/>
          <Route path="/solutions/Sugarcane" element={<SugarcanePage/>}/>
          <Route path="/resources/blog" element={<Blog/>} />
          <Route path="/resources/case-studies" element={<CaseStudies/>} />
          <Route path="/resources/webinars" element={<Webinars/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
   
    </>
  )
}
