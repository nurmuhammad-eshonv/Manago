import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // ThemeContextni import qilish
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

  // Tema kontekstini olish
  const { theme } = useContext(ThemeContext);

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
    <div className="bg-white min-h-screen flex flex-col items-center container max-w-7xl mx-auto overflow-y-auto">
    <div
      className={`min-h-screen flex flex-col items-center container mt-[20px] ml-[20px] ${
        theme === 'dark' ? 'bg-[#10141E]' : 'bg-white'
      }`}
    >
      <div className="w-full h-[200px] bg-gradient-to-r from-blue-400 to-purple-500 relative">
        <img
          className="w-[137px] h-[137px] rounded-full border-4 border-white absolute left-[30px] top-[130px]"
          src={profileImg}
          alt="Profile"
        />
      </div>

      <div
        className={`mt-[90px] w-full max-w-[1400px] p-8 shadow-lg rounded-lg ${
          theme === 'dark' ? 'bg-[#1F2A37] text-white' : 'bg-white text-black'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        {/* Form yoki ko'rinish */}
        {isEditMode ? (
          <form className="space-y-6 p-8" onSubmit={handleSubmit}>
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div>
              <h3 className="text-lg font-semibold">First Name</h3>
              <p>{formData.firstName}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Last Name</h3>
              <p>{formData.lastName}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p>{formData.email}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Role</h3>
              <p>{formData.role}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsEditMode(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
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
