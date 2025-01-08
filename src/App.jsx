import { useState } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Components/Body'
import Login from './Components/Login'
import Profile from './Components/Profile'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
function App() {

  return (
    <>
    <Provider store={appStore}>
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
      </Provider>
    </>
  )
}

export default App
