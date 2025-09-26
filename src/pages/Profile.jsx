import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem('userRole');

    // Redirect to specific profile page based on user role
    if (role === 'patient') {
      navigate('/profile/patient');
    } else if (role === 'doctor') {
      navigate('/profile/doctor');
    } else if (role === 'laboratory') {
      navigate('/profile/laboratory');
    } else if (role === 'chemist') {
      navigate('/profile/chemist');
    } else if (role === 'admin') {
      navigate('/dashboard/admin');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to your profile...</p>
      </div>
    </div>
  );
};

export default Profile;
