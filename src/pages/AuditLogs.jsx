import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const AuditLogs = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('24hours');

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

    // Load mock audit logs
    loadAuditLogs();
  }, [navigate, filterType, filterUser, filterDateRange]);

  const loadAuditLogs = () => {
    const mockLogs = [
      {
        id: 'LOG001',
        timestamp: '2024-01-21T10:30:00Z',
        userId: 'ADMIN001',
        userName: 'System Administrator',
        userRole: 'admin',
        action: 'LOGIN',
        resource: 'System',
        description: 'Administrator logged into the system',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        status: 'success',
        severity: 'info'
      },
      {
        id: 'LOG002',
        timestamp: '2024-01-21T10:32:15Z',
        userId: 'DOC001',
        userName: 'Dr. Tamboli',
        userRole: 'doctor',
        action: 'UPDATE_PROFILE',
        resource: 'User Profile',
        description: 'Updated personal information and contact details',
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        status: 'success',
        severity: 'info'
      },
      {
        id: 'LOG003',
        timestamp: '2024-01-21T10:35:22Z',
        userId: 'DOC002',
        userName: 'Dr. Shah',
        userRole: 'doctor',
        action: 'SUSPEND_PROVIDER',
        resource: 'Provider Management',
        description: 'Suspended Dr. Shah license due to policy violation',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        status: 'success',
        severity: 'warning'
      },
      {
        id: 'LOG004',
        timestamp: '2024-01-21T10:38:45Z',
        userId: 'LAB001',
        userName: 'City Diagnostic Lab',
        userRole: 'laboratory',
        action: 'UPLOAD_REPORT',
        resource: 'Test Results',
        description: 'Uploaded test results for patient PAT001',
        ipAddress: '192.168.1.102',
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
        status: 'success',
        severity: 'info'
      },
      {
        id: 'LOG005',
        timestamp: '2024-01-21T10:42:10Z',
        userId: 'PAT001',
        userName: 'Dr Tamboli',
        userRole: 'patient',
        action: 'BOOK_APPOINTMENT',
        resource: 'Appointments',
        description: 'Booked appointment with Dr. Jain for general consultation',
        ipAddress: '192.168.1.103',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
        status: 'success',
        severity: 'info'
      },
      {
        id: 'LOG006',
        timestamp: '2024-01-21T10:45:33Z',
        userId: 'CHEM001',
        userName: 'HealthPlus Pharmacy',
        userRole: 'chemist',
        action: 'DISPENSE_MEDICINE',
        resource: 'Prescriptions',
        description: 'Dispensed prescribed medicines for patient PAT001',
        ipAddress: '192.168.1.104',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        status: 'success',
        severity: 'info'
      },
      {
        id: 'LOG007',
        timestamp: '2024-01-21T10:48:55Z',
        userId: 'DOC002',
        userName: 'Dr. Shah',
        userRole: 'doctor',
        action: 'FAILED_LOGIN',
        resource: 'Authentication',
        description: 'Failed login attempt - invalid credentials',
        ipAddress: '192.168.1.105',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        status: 'failed',
        severity: 'warning'
      },
      {
        id: 'LOG008',
        timestamp: '2024-01-21T10:52:18Z',
        userId: 'ADMIN001',
        userName: 'System Administrator',
        userRole: 'admin',
        action: 'SYSTEM_BACKUP',
        resource: 'System Maintenance',
        description: 'Initiated daily system backup process',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        status: 'success',
        severity: 'info'
      },
      {
        id: 'LOG009',
        timestamp: '2024-01-21T10:55:40Z',
        userId: 'PAT002',
        userName: 'Jay',
        userRole: 'patient',
        action: 'UPDATE_EMERGENCY_CONTACT',
        resource: 'Patient Profile',
        description: 'Updated emergency contact information',
        ipAddress: '192.168.1.106',
        userAgent: 'Mozilla/5.0 (Android 11; Mobile) AppleWebKit/537.36',
        status: 'success',
        severity: 'info'
      },
      {
        id: 'LOG010',
        timestamp: '2024-01-21T10:58:02Z',
        userId: 'LAB002',
        userName: 'Modern Pathology Lab',
        userRole: 'laboratory',
        action: 'EXPORT_REPORTS',
        resource: 'Reports',
        description: 'Exported monthly test reports for analysis',
        ipAddress: '192.168.1.107',
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
        status: 'success',
        severity: 'info'
      }
    ];

    setLogs(mockLogs);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'success'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'LOGIN': return '🔐';
      case 'LOGOUT': return '🚪';
      case 'UPDATE_PROFILE': return '👤';
      case 'SUSPEND_PROVIDER': return '⚠️';
      case 'UPLOAD_REPORT': return '📄';
      case 'BOOK_APPOINTMENT': return '📅';
      case 'DISPENSE_MEDICINE': return '💊';
      case 'FAILED_LOGIN': return '❌';
      case 'SYSTEM_BACKUP': return '💾';
      case 'EXPORT_REPORTS': return '📊';
      default: return '📝';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return '👑';
      case 'doctor': return '👨‍⚕️';
      case 'patient': return '👤';
      case 'laboratory': return '🧪';
      case 'chemist': return '💊';
      default: return '👥';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || log.action === filterType;
    const matchesUser = filterUser === 'all' || log.userRole === filterUser;

    return matchesSearch && matchesType && matchesUser;
  });

  const exportLogs = (format) => {
    // Mock export functionality
    alert(`Exporting audit logs as ${format.toUpperCase()}`);
  };

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
              Audit Logs
            </h1>
            <p className="text-gray-600">
              Monitor and track all system activities, user actions, and security events
            </p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <SearchBar
                placeholder="Search logs..."
                onSearch={handleSearch}
                value={searchQuery}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Actions</option>
                <option value="LOGIN">Login</option>
                <option value="LOGOUT">Logout</option>
                <option value="UPDATE_PROFILE">Profile Updates</option>
                <option value="SUSPEND_PROVIDER">Provider Actions</option>
                <option value="UPLOAD_REPORT">File Uploads</option>
                <option value="BOOK_APPOINTMENT">Appointments</option>
                <option value="FAILED_LOGIN">Security Events</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User Role</label>
              <select
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Users</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctors</option>
                <option value="patient">Patients</option>
                <option value="laboratory">Laboratories</option>
                <option value="chemist">Chemist Shops</option>
              </select>
            </div>

            <div className="flex items-end space-x-2">
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                  setFilterUser('all');
                }}
                variant="secondary"
                className="flex-1"
              >
                Clear Filters
              </Button>
              <Button
                onClick={() => exportLogs('csv')}
                className="flex-1"
              >
                Export CSV
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Logs</p>
                  <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Successful Actions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {logs.filter(l => l.status === 'success').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Warnings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {logs.filter(l => l.severity === 'warning').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <span className="text-2xl">❌</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Failed Actions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {logs.filter(l => l.status === 'failed').length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Audit Logs Table */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                System Audit Trail ({filteredLogs.length} entries)
              </h2>
              <div className="flex space-x-2">
                <Button size="sm" variant="secondary" onClick={() => exportLogs('pdf')}>
                  Export PDF
                </Button>
                <Button size="sm" onClick={() => exportLogs('json')}>
                  Export JSON
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resource
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-xs">{getRoleIcon(log.userRole)}</span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                            <div className="text-sm text-gray-500">{log.userRole}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm mr-2">{getActionIcon(log.action)}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{log.action}</div>
                            <div className="text-sm text-gray-500">{log.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{log.resource}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{log.ipAddress}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredLogs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No audit logs found matching your criteria.</p>
              </div>
            )}
          </Card>

          {/* Log Analysis */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Log Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Actions Today</span>
                  <span className="font-semibold text-gray-900">{logs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-semibold text-green-600">
                    {Math.round((logs.filter(l => l.status === 'success').length / logs.length) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Failed Actions</span>
                  <span className="font-semibold text-red-600">
                    {logs.filter(l => l.status === 'failed').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Security Events</span>
                  <span className="font-semibold text-yellow-600">
                    {logs.filter(l => l.severity === 'warning').length}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">System backup completed</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">New patient registration</p>
                    <p className="text-xs text-gray-500">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Failed login attempt detected</p>
                    <p className="text-xs text-gray-500">8 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Lab report uploaded</p>
                    <p className="text-xs text-gray-500">12 minutes ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuditLogs;
