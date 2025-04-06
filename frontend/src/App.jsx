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
          <Route path="/sso-callback" element={<SsoCallback />} />
          <Route path='/solutions/crop-prediction' element={<CropPrediction />} />
          <Route path="/tractor/book-now" element={<TractorBooking/>}/>
          <Route path="/tractor/my-bookings" element={<BookingHistory/>}/>
          <Route path="/tractor/register-tractor" element={<RegisterTractor/>}/>
          <Route path="/tractor/pricing" element={<TractorPricing/>}/>
          <Route path="/solutions/Sugarcane" element={<SugarcanePage/>}/>
        </Routes>
   
    </>
  )
}
