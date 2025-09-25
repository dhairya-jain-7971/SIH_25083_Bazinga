import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const UserManagement = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Check if user is admin
    const data = localStorage.getItem('userData');
    const role = localStorage.getItem('userRole');
    if (data && role === 'admin') {
      setUserData(JSON.parse(data));
    } else {
      navigate('/');
      return;
    }

    // Load mock users data
    loadUsersData();
  }, [navigate]);

  const loadUsersData = () => {
    const mockUsers = [
      {
        id: 'PAT001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        role: 'patient',
        registrationDate: '2024-01-10',
        status: 'active',
        lastLogin: '2024-01-21',
        profileComplete: true,
        emergencyContact: 'Jane Doe (+91 9876543211)',
        location: 'Kochi, Kerala'
      },
      {
        id: 'PAT002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+91 9876543212',
        role: 'patient',
        registrationDate: '2024-01-08',
        status: 'active',
        lastLogin: '2024-01-20',
        profileComplete: true,
        emergencyContact: 'John Smith (+91 9876543213)',
        location: 'Trivandrum, Kerala'
      },
      {
        id: 'PAT003',
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        phone: '+91 9876543214',
        role: 'patient',
        registrationDate: '2024-01-12',
        status: 'inactive',
        lastLogin: '2024-01-15',
        profileComplete: false,
        emergencyContact: 'Mary Johnson (+91 9876543215)',
        location: 'Kochi, Kerala'
      },
      {
        id: 'DOC001',
        name: 'Dr. John Smith',
        email: 'john.smith@example.com',
        phone: '+91 9876543216',
        role: 'doctor',
        registrationDate: '2024-01-15',
        status: 'active',
        lastLogin: '2024-01-21',
        profileComplete: true,
        specialization: 'General Medicine',
        licenseNumber: 'MC123456'
      },
      {
        id: 'DOC002',
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+91 9876543217',
        role: 'doctor',
        registrationDate: '2024-01-10',
        status: 'suspended',
        lastLogin: '2024-01-18',
        profileComplete: true,
        specialization: 'Cardiology',
        licenseNumber: 'MC123457'
      },
      {
        id: 'LAB001',
        name: 'City Diagnostic Lab',
        email: 'citylab@example.com',
        phone: '+91 9876543218',
        role: 'laboratory',
        registrationDate: '2024-01-08',
        status: 'active',
        lastLogin: '2024-01-21',
        profileComplete: true,
        licenseNumber: 'LAB789012',
        accreditation: 'NABL Certified'
      },
      {
        id: 'CHEM001',
        name: 'HealthPlus Pharmacy',
        email: 'healthplus@example.com',
        phone: '+91 9876543219',
        role: 'chemist',
        registrationDate: '2024-01-05',
        status: 'active',
        lastLogin: '2024-01-21',
        profileComplete: true,
        licenseNumber: 'PHARM456789',
        pharmacyType: 'Retail Pharmacy'
      }
    ];

    setUsers(mockUsers);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(user =>
      user.id === id
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'patient': return '👤';
      case 'doctor': return '👨‍⚕️';
      case 'laboratory': return '🧪';
      case 'chemist': return '💊';
      default: return '👥';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'patient': return 'Patient';
      case 'doctor': return 'Doctor';
      case 'laboratory': return 'Laboratory';
      case 'chemist': return 'Chemist Shop';
      default: return 'User';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar
          userRole="admin"
          userData={userData}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              User Management
            </h1>
            <p className="text-gray-600">
              Manage all system users, monitor activity, and handle account issues
            </p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <SearchBar
                placeholder="Search users..."
                onSearch={handleSearch}
                value={searchQuery}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="patient">Patients</option>
                <option value="doctor">Doctors</option>
                <option value="laboratory">Laboratories</option>
                <option value="chemist">Chemist Shops</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setFilterRole('all');
                  setFilterStatus('all');
                }}
                variant="secondary"
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">👤</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Patients</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'patient').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Doctors</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'doctor').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <span className="text-2xl">🧪</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Labs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'laboratory').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <span className="text-2xl">💊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Chemists</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'chemist').length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Users Table */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                System Users ({filteredUsers.length})
              </h2>
              <Button>Export Users</Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-sm">{getRoleIcon(user.role)}</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getRoleLabel(user.role)}</div>
                        {user.specialization && (
                          <div className="text-sm text-gray-500">{user.specialization}</div>
                        )}
                        {user.licenseNumber && (
                          <div className="text-sm text-gray-500">License: {user.licenseNumber}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                        {user.emergencyContact && (
                          <div className="text-sm text-gray-500">Emergency: {user.emergencyContact}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(user.registrationDate).toLocaleDateString()}
                        </div>
                        <div className={`text-sm ${user.profileComplete ? 'text-green-600' : 'text-yellow-600'}`}>
                          {user.profileComplete ? 'Complete' : 'Incomplete'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </div>
                        {user.location && (
                          <div className="text-sm text-gray-500">{user.location}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => toggleUserStatus(user.id)}
                            className={
                              user.status === 'active'
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-green-600 hover:bg-green-700'
                            }
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button size="sm" variant="secondary">
                            View Profile
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No users found matching your criteria.</p>
              </div>
            )}
          </Card>

          {/* User Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Send Notification</h3>
              <p className="text-sm text-gray-600 mb-4">Send bulk notifications to users</p>
              <Button size="sm">Send Notification</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User Groups</h3>
              <p className="text-sm text-gray-600 mb-4">Manage user groups and permissions</p>
              <Button size="sm">Manage Groups</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User Analytics</h3>
              <p className="text-sm text-gray-600 mb-4">View detailed user analytics</p>
              <Button size="sm">View Analytics</Button>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
