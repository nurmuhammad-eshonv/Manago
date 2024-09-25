
import logo2 from "../assets/img/manago.jpg";
import React, { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is imported

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email
        if (!emailRef.current.value) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(emailRef.current.value)) {
            newErrors.email = "Invalid email address";
        }

        // Validate password
        if (!passwordRef.current.value) {
            newErrors.password = "Password is required";
        } else if (passwordRef.current.value.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; 
        }

        const loginData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const response = await axios.post("https://trello.vimlc.uz:8000/api/auth/login", loginData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Login successful:", response.data);
            navigate("/"); 
        } catch (error) {
            console.error("Error during login:", error);
            if (error.response) {
                const apiErrors = error.response.data.errors || {};
                setErrors(apiErrors); // Set API errors to state
            } else if (error) {
                setErrors({ api: "No response from the server. Please try again." });
            } else {
                setErrors({ api: "An error occurred during login." });
            }
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Section */}
            <div className="w-1/2 bg-gradient-to-br from-purple-800 to-indigo-700 flex flex-col justify-center items-center text-white p-10">
                <h1 className="text-4xl font-bold mb-4">MANAGO</h1>
                <p className="text-xl mb-2">Website For Developers</p>
                <p className="mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt.
                </p>
                <div className="relative">
                    <img
                        src={logo2}
                        alt="Illustration"
                        className="rounded-[50%] w-64 h-52"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
                <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>

                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={emailRef}
                            className={`mt-1 block w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="johndoe@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                ref={passwordRef}
                                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                placeholder="**********"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* Error Message from API */}
                    {errors.api && <p className="text-red-500 text-xs mt-1">{errors.api}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-500">
                    No accounts yet?
                    <a href="/register" className="text-indigo-600 font-bold">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
