import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import Theme from './Theme';

const Navbar = () => {
    const user = useSelector((store) => store?.user?.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        const res = await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
        if (res.status === 200) {
            dispatch(removeUser());
            navigate('/login');
        }
    };

    return (
        <>
            <div className="navbar bg-base-200 flex h-16 px-4 md:px-8">
                {/* Left section */}
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
                </div>

                {/* Right section for larger screens */}
                <div className="hidden md:flex items-center space-x-4">
                    <Theme />
                    <Link to="/connections">
                        <img
                            className="h-8 w-8"
                            src="https://cdn-icons-png.flaticon.com/128/1029/1029183.png"
                            alt="chat"
                        />
                    </Link>
                    {user ? (
                        <div className="flex items-center gap-2">
                            <div>Welcome, {user?.fName}</div>
                            <div className="dropdown dropdown-end">
                                <div className="avatar online">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                                >
                                    <li>
                                        <Link to="/connection-requests">Connection Requests</Link>
                                    </li>
                                    <li>
                                        <Link to="/profile" className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <a onClick={handleLogout}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div className="avatar offline">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Hamburger menu for mobile */}
                <div className="md:hidden flex items-center">
                    <button
                        className="btn btn-ghost btn-circle"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Collapsible menu for mobile */}
            {menuOpen && (
                <div className="bg-base-200 md:hidden">
                    <ul className="menu p-4 space-y-2">
                        <li>
                            <Theme />
                        </li>
                        <li>
                            <Link to="/connections">Connections</Link>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <Link to="/connection-requests">Connection Requests</Link>
                                </li>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <a onClick={handleLogout}>Logout</a>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Navbar;
