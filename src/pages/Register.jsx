import React from 'react'
import { FaRegEye } from "react-icons/fa";

const  Register = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-gradient-to-br from-purple-800 to-indigo-700 flex flex-col justify-center items-center text-white p-10">
        <h1 className="text-4xl font-bold mb-4">CodeSquid</h1>
        <p className="text-xl mb-2">Online Community For Front-end Developers</p>
        <p className="mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
        <div className="relative">
          <img
            src="your-image-url-here"
            alt="Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
        <h2 className="text-2xl font-bold mb-6">
          Join & Connect the Fastest Growing Online Community
        </h2>

        <div className="mb-4">
          <button className="w-full flex items-center justify-center px-4 py-2 bg-white border rounded-lg shadow-sm text-sm font-medium text-gray-600 border-gray-300 hover:bg-gray-50 mb-4">
            <img src="/google-logo.png" alt="Google Logo" className="h-5 mr-2" />
            Sign up with Google
          </button>

          <button className="w-full flex items-center justify-center px-4 py-2 bg-white border rounded-lg shadow-sm text-sm font-medium text-gray-600 border-gray-300 hover:bg-gray-50">
            <img src="/github-logo.png" alt="Github Logo" className="h-5 mr-2" />
            Sign up with Github
          </button>
        </div>

        <form className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="johndadev"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="johndoe@email.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="**********"
              />
              <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {/* <img src="/eye-icon.png" alt="Show Password" className="h-5" /> */}
                <FaRegEye />
              </button>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I accept the terms & conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          Own an account?{" "}
          <a href="/login" className="text-indigo-600 font-bold">
            JUMP RIGHT IN
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
