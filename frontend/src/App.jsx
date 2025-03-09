import { Route, Routes } from 'react-router-dom'
import Navbar from './components/NavBar'
import Body from './components/Body'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Store from './components/Store'
import PredictDisease from './components/PredictDisease'
import SsoCallback from './components/SsoCallback' // We'll create this next

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/store" element={<Store />} />
        <Route path="/predictdisease" element={<PredictDisease />} />
        <Route path="/sso-callback" element={<SsoCallback />} />
      </Routes>
    </>
  )
}

export default App