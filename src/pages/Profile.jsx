import React, { useState, useEffect } from "react";

const AdvancedProfile = () => {
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "Software Engineer",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="bg-transparent mt-4 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-opacity-10 backdrop-filter backdrop-blur-lg  shadow-2xl overflow-hidden">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="md:w-1/3 bg-gradient-to-b rounded-[20px] from-white to-dark p-8">
            <div className="text-center">
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto mb-4 transform hover:scale-105 transition-transform duration-300"
              />
              <h2 className="text-2xl font-bold text-white mb-2">{`${userData.firstName} ${userData.lastName}`}</h2>
              <p className="text-blue-200 mb-6">{userData.role}</p>
            </div>
            <nav>
              {["Profile", "Portfolio", "Messages", "Settings"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item.toLowerCase())}
                  className={`w-full text-left py-2 px-4 rounded mb-2 transition-colors duration-300 ${
                    activeTab === item.toLowerCase()
                      ? "bg-white bg-opacity-20 text-white"
                      : "text-blue-200 hover:bg-white hover:bg-opacity-10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold text-white mb-8">My Profile</h1>
            {!isEditing ? (
              <div className="space-y-6 animate-fade-in">
                {Object.entries(userData).map(([key, value]) => (
                  <div key={key} className="group">
                    <label className="block text-blue-300 text-sm font-semibold mb-2">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <p
                      contentEditable
                      className="text-white text-lg pb-2 border-b-2 border-blue-400 group-hover:border-pink-400 transition-colors duration-300"
                    >
                      {value}
                    </p>
                  </div>
                ))}
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 px-6 py-3 bg-green-700  text-white rounded-full font-semibold text-lg shadow-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-300"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 animate-fade-in"
              >
                {Object.entries(userData).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-blue-300 text-sm font-semibold mb-2">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setUserData({ ...userData, [key]: e.target.value })
                      }
                      className="w-full bg-white bg-opacity-20 text-white border-0 rounded-lg p-3 focus:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                    />
                  </div>
                ))}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedProfile;
