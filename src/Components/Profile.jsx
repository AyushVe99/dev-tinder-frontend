import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addUser, editUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const userData = useSelector((store) => store?.user?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fName: '',
    lName: '',
    email: '',
    skills: '',
    age: '',
    gender: 'Male',
  });
  useEffect(() => {
    if (userData) {
      setUser({
        fName: userData.fName || '',
        lName: userData.lName || '',
        email: userData.email || '',
        skills: userData.skills?.join(', ') || '',
        age: userData.age || '',
        gender: userData.gender || 'Male',
      });
    }
  }, [userData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle Save button click
  const handleSave = async () => {
    const res = await axios.patch(BASE_URL + "/profile/edit", {
      _id: userData._id,
      fName: user?.fName,
      lName: user?.lName,
      gender: user?.gender,
      age: user?.age,
      skills: user?.skills?.split(',').map(skill => skill?.trim())
    }, { withCredentials: true })
    if (res.status = 200) {
      dispatch(editUser(res?.data))
      alert("User Updated Successfully!")

    }

    console.log("RES", res);
  };

  return (
    <> {userData && <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center"><b>User Profile</b></h2>

      {/* First Name Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium">First Name</span>
        </label>
        <input
          type="text"
          name="fName"
          placeholder="First Name"
          className="input input-bordered w-full"
          value={user.fName}
          onChange={handleChange}
        />
      </div>

      {/* Last Name Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium">Last Name</span>
        </label>
        <input
          type="text"
          name="lName"
          placeholder="Last Name"
          className="input input-bordered w-full"
          value={user.lName}
          onChange={handleChange}
        />
      </div>

      {/* Email Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium">Email</span>
        </label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={user.email}
          disabled
        />
      </div>

      {/* Age Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium">Age</span>
        </label>
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          className="input input-bordered w-full"
          value={user.age}
          onChange={handleChange}
        />
      </div>

      {/* Skills Section */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium">Skills</span>
        </label>
        <input
          type="text"
          name="skills"
          placeholder="Enter skills separated by commas"
          className="input input-bordered w-full"
          value={user.skills}
          onChange={handleChange}
        />
      </div>

      {/* Gender Selection */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-medium">Gender</span>
        </label>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="male"
              className="radio radio-primary"
              checked={user.gender === 'male'}
              onChange={handleChange}
            />
            <span>Male</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              className="radio radio-primary"
              checked={user.gender === 'female'}
              onChange={handleChange}
            />
            <span>Female</span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 text-center">
        <button onClick={handleSave} className="btn btn-primary px-6 py-2">
          Save
        </button>
      </div>
    </div>}</>
  );
};

export default Profile;
