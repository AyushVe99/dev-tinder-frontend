import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((store) => store?.user?.data);
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const handleLogout = async () => {
    try {
        const res = await axios.post(BASE_URL+"/logout", {}, { withCredentials: true });
        console.log(res.status);       
        if (res.status==200) {
          dispatch(removeUser());
          navigate("/")
        }
    } catch (error) {
        console.log(error)
    }
   
  };
  return (
    <>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DevTinder</a>
        </div>
        {user ? (
          <div className="flex-none gap-2 mx-5">
            <div>Welcome, {user?.fName}</div>
            <div className="dropdown dropdown-end">
              {user && (
                <div className="avatar online">
                  <div tabIndex={0} className="w-24 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
              )}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ):
        (<div className="flex-none gap-2 mx-5">
        <div className="dropdown dropdown-end">
          {!user && (
            <div className="avatar offline">
              <div tabIndex={0} className="w-24 rounded-full">
                <img src="male-avatar-profile-picture-vector-10211761.jpg" />
              </div>
            </div>
          )}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>)}
      </div>
    </>
  );
};

export default Navbar;
