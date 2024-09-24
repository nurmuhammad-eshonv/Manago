import React, { useState, useEffect } from 'react';
import profileImg from '../assets/img/profileImage.png'; 

function Profile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
      setIsEditMode(false);
    }
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters long';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters long';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem('formData', JSON.stringify(formData));
      setIsEditMode(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(true);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center container mt-[20px] ml-[20px]">
      <div className="w-full h-[200px] bg-gradient-to-r from-blue-400 to-purple-500 relative">
        <img
          className="w-[137px] h-[137px] rounded-full border-4 border-white absolute left-[30px] top-[130px]"
          src={profileImg}
          alt="Profile"
        />
      </div>

      <div className="mt-[90px] w-full max-w-[1400px] bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>

        <div className="flex space-x-4 mb-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Profile</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Password</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Team</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Plan</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Billing</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Email</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Notifications</button>
        </div>

        {isEditMode ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-600">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  placeholder="Killian"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-gray-600">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                  placeholder="James"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="w-full">
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                placeholder="killianjames@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-gray-600">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                placeholder="Product Designer"
              />
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex justify-between">
              <div className="w-1/2">
                <p className="text-gray-600">First Name:</p>
                <p className="text-lg font-semibold">{formData.firstName}</p>
              </div>
              <div className="w-1/2">
                <p className="text-gray-600">Last Name:</p>
                <p className="text-lg font-semibold">{formData.lastName}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-600">Email:</p>
              <p className="text-lg font-semibold">{formData.email}</p>
            </div>

            <div>
              <p className="text-gray-600">Role:</p>
              <p className="text-lg font-semibold">{formData.role}</p>
            </div>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
