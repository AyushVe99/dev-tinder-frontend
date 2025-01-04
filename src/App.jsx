import { useState } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Components/Body'
import Login from './Components/Login'
import Profile from './Components/Profile'
function App() {

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          {/* Parent Route */}
          <Route path='/' element={<Body/>}>
            {/* Child Routes */}
            <Route path='/login' element={<Login/>} />
            <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
