
import React, { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const termsAcceptedRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const newErrors = {};

    if (!firstNameRef.current.value) {
      newErrors.firstName = "First name is required.";
    }

    if (!lastNameRef.current.value) {
      newErrors.lastName = "Last name is required.";
    }

    if (!emailRef.current.value) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      newErrors.email = "Email is invalid.";
    }

    if (!passwordRef.current.value) {
      newErrors.password = "Password is required.";
    } else if (passwordRef.current.value.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(passwordRef.current.value)) {
      newErrors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(passwordRef.current.value)) {
      newErrors.password = "Password must contain at least one lowercase letter.";
    } else if (!/\d/.test(passwordRef.current.value)) {
      newErrors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordRef.current.value)) {
      newErrors.password = "Password must contain at least one special character.";
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!termsAcceptedRef.current.checked) {
      newErrors.termsAccepted = "You must accept the terms and conditions.";
    }

    // If errors exist, update the state and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed with form submission
    const formData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value, // Include confirm password
    };

    try {
      const response = await axios.post("https://trello.vimlc.uz/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json", 
        },
      });
      console.log("Registration successful:", response.data);
      navigate("/login"); 
      setErrors({});
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setErrors({ api: error.response.data.message || "Registration failed. Please try again." });
      } else {
        setErrors({ api: "An error occurred during registration." });
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gradient-to-br from-purple-800 to-indigo-700 flex flex-col justify-center items-center text-white p-10">
        <h1 className="text-4xl font-bold mb-4">MANAGO</h1>
        <p className="text-xl mb-2">Website For Developers</p>
        <p className="mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
        <h2 className="text-2xl font-bold mb-6">
          Join & Connect the Fastest Growing Online Community
        </h2>

        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              ref={firstNameRef}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="John"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              ref={lastNameRef}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Doe"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="johndoe@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              ref={passwordRef}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="**********"
            />
            <button
              type="button"
              className="absolute right-2 top-11 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash className="text-gray-500" /> : <FaRegEye className="text-gray-500" />}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              ref={confirmPasswordRef}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="**********"
            />
            <button
              type="button"
              className="absolute right-2 top-11 transform -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaRegEyeSlash className="text-gray-500" /> : <FaRegEye className="text-gray-500" />}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              ref={termsAcceptedRef}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I accept the terms and conditions
            </label>
            {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}
          </div>

          {/* Error Message from API */}
          {errors.api && <p className="text-red-500 text-xs mt-1">{errors.api}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
