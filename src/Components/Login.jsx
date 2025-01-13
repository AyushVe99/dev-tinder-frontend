import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
const Login = () => {
  const [email, setEmail] = useState("anup22@gmail.com");
  const [password, setPassword] = useState("Anup@1234");
  const dispatch=useDispatch();
  const navigate= useNavigate();

  const handleLogin = async () => {
    try {
      const res= await axios.post(BASE_URL+"/login", {
        email: email,
        password: password
      },{withCredentials:true})
      if(res.status==200)
      {
        dispatch(addUser(res?.data))
        return navigate("/");
      }
      
      console.log(res?.data?.data)
    } catch (error) {
      console.log(error)
    }
   
  }

  return (
    <div className='flex justify-center my-10'>
    <div className="card bg-base-300 w-96 shadow-xl align-center">
      <div className="card-body">
        <h2 className="card-title">Login Page!</h2>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input type="text" className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }} />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input type="text" className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }} />
        </label>
        <div className="card-actions justify-center">
        <button type="button" className="btn btn-primary" onClick={userLogin}>Login</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login