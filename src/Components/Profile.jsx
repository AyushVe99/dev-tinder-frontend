import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { editUser } from '../utils/userSlice';
import Cards from './Cards';

const Profile = () => {
  const userData = useSelector((store) => store?.user?.data);
  const dispatch = useDispatch();
  const [isEditProfile, setIsEditProfile] = useState(false);
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

  const editProfile = () => {
    setIsEditProfile(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          _id: userData._id,
          fName: user?.fName,
          lName: user?.lName,
          gender: user?.gender,
          age: user?.age,
          skills: user?.skills?.split(',').map((skill) => skill.trim()),
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(editUser(res?.data));
        alert('User Updated Successfully!');
        setIsEditProfile(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 justify-center items-center p-6 min-h-screen">
      {isEditProfile && userData && (
        <div className="p-8 max-w-lg w-full bg-white rounded-xl shadow-lg border border-gray-200 transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Edit Profile</h2>
          <form className="space-y-6">
            <div className="form-control">
              <label className="label text-gray-700">First Name</label>
              <input
                type="text"
                name="fName"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={user.fName}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label text-gray-700">Last Name</label>
              <input
                type="text"
                name="lName"
                placeholder="Last Name"
                className="input input-bordered w-full"
                value={user.lName}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full bg-gray-100"
                value={user.email}
                disabled
              />
            </div>
            <div className="form-control">
              <label className="label text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                className="input input-bordered w-full"
                value={user.age}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label text-gray-700">Skills</label>
              <input
                type="text"
                name="skills"
                placeholder="Enter skills separated by commas"
                className="input input-bordered w-full"
                value={user.skills}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label text-gray-700">Gender</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="radio radio-primary"
                    checked={user.gender === 'male'}
                    onChange={handleChange}
                  />
                  Male
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
                  Female
                </label>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button onClick={handleSave} className="btn btn-primary w-full">Save Changes</button>
            </div>
          </form>
        </div>
      )}
      {userData && !isEditProfile && (
        <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <Cards User={userData} isEditProfile={editProfile} />
        </div>
      )}
    </div>
  );
};

export default Profile;
