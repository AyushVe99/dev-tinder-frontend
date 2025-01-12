import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const user = useSelector((store) => store?.user?.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const res = await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
        if (res.status == 200) {
            dispatch(removeUser());
            navigate('/login')
        }
    }
    return (
        <>
            <div className="navbar bg-base-200">
                <div className="flex-1">
                    <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
                </div>
                {user && <div className="flex-none gap-2 mx-5">
                    <div>Welcome, {user?.fName}</div>
                    <div className="dropdown dropdown-end">
                        <div className="avatar online">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to='/profile' className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>}
                {!user && <div className="dropdown dropdown-end">
                    <div className="avatar offline">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link to='/login'>login</Link></li>
                    </ul>
                </div>
                }
            </div>
        </>
    )
}

export default Navbar