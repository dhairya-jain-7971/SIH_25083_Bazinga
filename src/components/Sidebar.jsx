import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';

const Sidebar = ({ userRole, userData, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const getMenuItems = () => {
    if (userRole === 'patient') {
      return [
        { label: 'Dashboard', path: '/dashboard/patient', icon: '🏠' },
        { label: 'My Profile', path: '/profile/patient', icon: '👤' },
        { label: 'Emergency', path: '/emergency', icon: '🚨' },
        { label: 'Help & Support', path: '/support', icon: '❓' },
      ];
    } else if (userRole === 'admin') {
      return [
        { label: 'Dashboard', path: '/dashboard/admin', icon: '👑' },
        { label: 'Provider Management', path: '/admin/providers', icon: '🏥' },
        { label: 'System Reports', path: '/admin/reports', icon: '📊' },
        { label: 'User Management', path: '/admin/users', icon: '👥' },
        { label: 'System Settings', path: '/admin/settings', icon: '⚙️' },
        { label: 'Audit Logs', path: '/admin/audit', icon: '📋' },
      ];
    } else if (userRole === 'laboratory') {
      return [
        { label: 'Dashboard', path: '/dashboard/laboratory', icon: '🏠' },
        { label: 'Reports', path: '/lab/reports', icon: '📊' },
        { label: 'My Profile', path: '/profile/laboratory', icon: '👤' },
      ];
    } else if (userRole === 'chemist') {
      return [
        { label: 'Dashboard', path: '/dashboard/chemist', icon: '🏠' },
        { label: 'Inventory', path: '/chemist/inventory', icon: '📦' },
        { label: 'Sales Report', path: '/chemist/sales', icon: '💰' },
        { label: 'Customer Support', path: '/chemist/support', icon: '📞' },
        { label: 'My Profile', path: '/profile/chemist', icon: '👤' },
      ];
    } else {
      // Default provider (doctor)
      return [
        { label: 'Dashboard', path: '/dashboard/doctor', icon: '🏠' },
        { label: 'Patient Search', path: '/provider/patients/search', icon: '🔍' },
        { label: 'Appointments', path: '/provider/appointments', icon: '📅' },
        { label: 'My Profile', path: '/profile/doctor', icon: '👤' },
        { label: 'Settings', path: '/settings', icon: '⚙️' },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Swasthya Sutra</h2>
          <p className="text-sm text-gray-600 capitalize">{userRole} Portal</p>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800">{userData?.fullName || 'User'}</h3>
            <p className="text-sm text-gray-600">{userData?.email || 'user@example.com'}</p>
            <p className="text-xs text-gray-500 mt-1">
              ID: {userData?.id || 'N/A'}
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
