import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Components/Body'
import Login from './Components/Login'
import Profile from './Components/Profile'
import { Provider, useDispatch, useSelector } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './Components/Feed'
import { BASE_URL } from './utils/constants'
import { addUser } from './utils/userSlice'
import axios from 'axios'
import ConnectionRequests from './Components/ConnectionRequests'
function App() {
  //const user = useSelector((store) => store?.user?.data);

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            {/* Parent Route */}
            <Route path='/' element={<Body />}>
              {/* Child Routes */}
              <Route path='/' element={<Feed />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/feed' element={<Feed/>} />
              <Route path='/connections' element={<ConnectionRequests/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
