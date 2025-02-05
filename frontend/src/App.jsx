
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/NavBar'
import Body from './components/Body'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Store from './components/Store'

function App() {
  return (
    <>
      <BrowserRouter basename='/'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Body/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/store' element={<Store/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
