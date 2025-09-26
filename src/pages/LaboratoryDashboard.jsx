import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const LaboratoryDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [testRequests, setTestRequests] = useState([]);

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }

    // Load mock test requests data
    loadTestRequests();
  }, []);

  const loadTestRequests = () => {
    const mockTestRequests = [
      {
        id: 'REQ001',
        patientName: 'Kalp',
        patientId: 'PAT001',
        phone: '+91 9876543210',
        testType: 'Blood Test',
        requestedDate: '2024-01-10',
        status: 'pending',
        priority: 'normal'
      },
      {
        id: 'REQ002',
        patientName: 'Kalash',
        patientId: 'PAT002',
        phone: '+91 9876543211',
        testType: 'X-Ray',
        requestedDate: '2024-01-09',
        status: 'in_progress',
        priority: 'urgent'
      },
      {
        id: 'REQ003',
        patientName: 'Phales',
        patientId: 'PAT003',
        phone: '+91 9876543212',
        testType: 'MRI Scan',
        requestedDate: '2024-01-08',
        status: 'completed',
        priority: 'normal'
      }
    ];
    setTestRequests(mockTestRequests);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('providerType');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter test requests based on search query
    if (query.trim()) {
      const filtered = testRequests.filter(request =>
        request.patientName.toLowerCase().includes(query.toLowerCase()) ||
        request.id.toLowerCase().includes(query.toLowerCase()) ||
        request.testType.toLowerCase().includes(query.toLowerCase())
      );
      setTestRequests(filtered);
    } else {
      loadTestRequests();
    }
  };

  const handleGenerateReport = () => {
    navigate('/lab/patient-reports');
  };

  const handleCallPatient = (phone) => {
    window.open(`tel:${phone}`);
  };

  const updateTestStatus = (id, newStatus) => {
    setTestRequests(prev => prev.map(request =>
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showAdminPanel={false} />

      <div className="flex">
        <Sidebar
          userRole="laboratory"
          userData={userData}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userData?.fullName || 'Lab Technician'}!
            </h1>
            <p className="text-gray-600">
              Laboratory Dashboard - Manage test requests and results
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">🧪</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Pending Tests</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {testRequests.filter(t => t.status === 'pending').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">🔬</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {testRequests.filter(t => t.status === 'in_progress').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Completed Today</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {testRequests.filter(t => t.status === 'completed').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Urgent Requests</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {testRequests.filter(t => t.priority === 'urgent').length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              placeholder="Search test requests by patient name, ID, or test type..."
              onSearch={handleSearch}
              value={searchQuery}
            />
          </div>

          {/* Test Requests List */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {searchQuery ? 'Search Results' : 'Recent Test Requests'}
              </h2>
              <Button>View All Requests</Button>
            </div>

            <div className="space-y-4">
              {testRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {request.patientName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.patientName}</h3>
                          <p className="text-sm text-gray-600">Patient ID: {request.patientId}</p>
                          <p className="text-sm text-gray-600">Phone: {request.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Test Type</p>
                        <p className="font-medium text-gray-900">{request.testType}</p>
                        <p className="text-sm text-gray-600">
                          Requested: {new Date(request.requestedDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                          {request.status.replace('_', ' ')}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        {request.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => updateTestStatus(request.id, 'in_progress')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Start Test
                          </Button>
                        )}
                        {request.status === 'in_progress' && (
                          <Button
                            size="sm"
                            onClick={() => updateTestStatus(request.id, 'completed')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Complete
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => handleCallPatient(request.phone)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          📞 Call
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {testRequests.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No test requests found matching your search.</p>
              </div>
            )}
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-1 gap-6 max-w-md mx-auto">
            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reports</h3>
              <p className="text-sm text-gray-600 mb-4">Generate lab reports</p>
              <Button size="sm" onClick={handleGenerateReport}>Generate Report</Button>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LaboratoryDashboard;
