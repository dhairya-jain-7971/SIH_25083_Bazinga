import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ showBackButton = false, onBackClick }) => {
  const navigate = useNavigate();
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    labs: 0,
    chemists: 0
  });

  useEffect(() => {
    // Check if user is logged in as admin
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      setShowAdminButton(true);
      // Load mock stats
      loadStats();
    }
  }, []);

  const loadStats = () => {
    // Mock stats - in real app, this would come from API
    setStats({
      doctors: 2,
      patients: 1250,
      labs: 2,
      chemists: 2
    });
  };

  const handleAdminClick = () => {
    navigate('/dashboard/admin');
  };

  return (
    <nav className="bg-white shadow-md ">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={onBackClick}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Go back"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <h1 className="text-xl font-bold text-gray-800">
              Swasthya Sutra
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {showAdminButton && (
              <button
                onClick={handleAdminClick}
                className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                title="Admin Dashboard"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">👑</span>
                  <span className="font-semibold">Admin Panel</span>
                </div>
                <div className="flex items-center space-x-1 text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                  <div className="flex items-center space-x-1">
                    <span>👨‍⚕️{stats.doctors}</span>
                    <span>👥{stats.patients}</span>
                    <span>🧪{stats.labs}</span>
                    <span>💊{stats.chemists}</span>
                  </div>
                </div>
              </button>
            )}
            <span className="text-lg font-semibold text-gray-800">
              Digital Health Records
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
