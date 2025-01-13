import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const navigate =useNavigate()
  const dispatch = useDispatch(); // To Call the Functions to perform specific actions which are made inside userSlice...
  const userData=useSelector((store)=>store?.user?.data)

  const fetchUser = (async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      })
      if (res.status == 200) {
        dispatch(addUser(res?.data))
        //return navigate("/");
      }
    } catch (error) {
      if(error.status==401)
      {
        navigate('/login')
      }
      console.log(error)
    }
  })

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Body;