import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image 53.png';
import doctorImage from '../assets/doc.png';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Login functionality disabled - no database access currently
    // navigate('/onboarding');
  };

  const handleSignUp = () => {
    navigate('/onboarding');
  };

  const handleAdminLogin = () => {
    navigate('/admin/login');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 flex-shrink-0">
        <div className="flex items-center">
          <img src={logo} alt="Swasthya Sutra Logo" className="h-30 w-40" />
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleLogin}
            className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 font-medium text-sm"
          >
            Login
          </button>
          <button
            onClick={handleSignUp}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-sm"
          >
            Sign-up
          </button>
          <button
            onClick={handleAdminLogin}
            className="px-4 py-2 border-2 border-purple-500 text-purple-500 rounded-lg hover:bg-purple-500 hover:text-white transition-colors duration-200 font-medium text-sm"
          >
            Login as Admin
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-8 py-4 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-8 text-left ml-20">
              <h1 className="text-4xl lg:text-5xl font-bold text-teal-600 leading-tight text-left">
                Your Health Records
                <br />
                <span className="text-teal-700 ">anytime, anywhere</span>
              </h1>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg text-left ">
                Swasthya Sutra gives every citizen a unique Health ID and QR card
                linked to their medical history, keeping records secure, portable, and
                always updated. It connects patients with doctors, labs, pharmacies,
                and government health schemes in a simple, inclusive way.
              </p>
            </div>
          </div>

          {/* Right Content - Doctor Image */}
          <div className="flex justify-center lg:justify-center">
            <div className="relative max-w-sm lg:max-w-md -ml-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full transform rotate-6 scale-110 opacity-20"></div>
              <img
                src={doctorImage}
                alt="Doctor with health records"
                className="relative z-10 w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Process Steps - Bottom Center */}
      <footer className="flex-shrink-0 pb-6">
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs lg:text-sm font-medium text-gray-700">Register Yourself</span>
            </div>

            <div className="flex items-center">
              <div className="w-6 lg:w-8 h-0.5 bg-gray-300"></div>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs lg:text-sm font-medium text-gray-700">Verify your Health ID</span>
            </div>

            <div className="flex items-center">
              <div className="w-6 lg:w-8 h-0.5 bg-gray-300"></div>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <span className="text-xs lg:text-sm font-medium text-gray-700">Access Records</span>
            </div>

            <div className="flex items-center">
              <div className="w-6 lg:w-8 h-0.5 bg-gray-300"></div>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </div>
              <span className="text-xs lg:text-sm font-medium text-gray-700">Seamless Record Sharing</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
