import React, { useState } from 'react'
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = async () => {
    try {
      const res= await axios.post("http://localhost:4000/login", {
        email: email,
        password: password
      },{withCredentials:true})
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
          <button className="btn btn-primary" onClick={userLogin}>Login</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login