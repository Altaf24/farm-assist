
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Body from './components/Body'
import SignUp from './components/SignUp'
import Login from './components/Login'



function App() {
  

  return (
    <>
    
    <BrowserRouter basename='/'>
         <Routes>
             <Route path='/' element={<Body/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            
            
         
       
          
         </Routes>

    </BrowserRouter>
    
   
    </>
  )
}

export default App
