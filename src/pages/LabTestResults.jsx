import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const LabTestResults = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [testRequests, setTestRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }

    // Load test requests data
    loadTestRequests();
  }, []);

  const loadTestRequests = () => {
    const mockTestRequests = [
      {
        id: 'TEST001',
        patientName: 'John Doe',
        patientId: 'PAT001',
        phone: '+91 9876543210',
        testType: 'Blood Test',
        testName: 'Complete Blood Count (CBC)',
        requestedDate: '2024-01-10',
        completedDate: '2024-01-11',
        status: 'completed',
        priority: 'normal',
        results: {
          hemoglobin: '14.2 g/dL',
          wbc: '6,800/μL',
          rbc: '4.8 million/μL',
          platelets: '280,000/μL'
        },
        normalRanges: {
          hemoglobin: '12.0-15.5 g/dL',
          wbc: '4,000-11,000/μL',
          rbc: '4.2-5.4 million/μL',
          platelets: '150,000-450,000/μL'
        },
        doctorName: 'Dr. Sarah Johnson'
      },
      {
        id: 'TEST002',
        patientName: 'Jane Smith',
        patientId: 'PAT002',
        phone: '+91 9876543211',
        testType: 'X-Ray',
        testName: 'Chest X-Ray',
        requestedDate: '2024-01-09',
        completedDate: '2024-01-10',
        status: 'completed',
        priority: 'urgent',
        results: {
          findings: 'Clear lung fields, normal heart size',
          impression: 'Normal chest X-ray'
        },
        doctorName: 'Dr. Michael Chen'
      },
      {
        id: 'TEST003',
        patientName: 'Robert Johnson',
        patientId: 'PAT003',
        phone: '+91 9876543212',
        testType: 'MRI Scan',
        testName: 'Brain MRI',
        requestedDate: '2024-01-08',
        completedDate: null,
        status: 'in_progress',
        priority: 'normal',
        results: null,
        doctorName: 'Dr. Emily Davis'
      },
      {
        id: 'TEST004',
        patientName: 'Maria Garcia',
        patientId: 'PAT004',
        phone: '+91 9876543213',
        testType: 'Blood Test',
        testName: 'Lipid Profile',
        requestedDate: '2024-01-12',
        completedDate: '2024-01-13',
        status: 'completed',
        priority: 'normal',
        results: {
          totalCholesterol: '195 mg/dL',
          ldl: '120 mg/dL',
          hdl: '55 mg/dL',
          triglycerides: '100 mg/dL'
        },
        normalRanges: {
          totalCholesterol: '<200 mg/dL',
          ldl: '<100 mg/dL',
          hdl: '>40 mg/dL (M), >50 mg/dL (F)',
          triglycerides: '<150 mg/dL'
        },
        doctorName: 'Dr. Sarah Johnson'
      },
      {
        id: 'TEST005',
        patientName: 'David Wilson',
        patientId: 'PAT005',
        phone: '+91 9876543214',
        testType: 'CT Scan',
        testName: 'Abdominal CT',
        requestedDate: '2024-01-11',
        completedDate: null,
        status: 'pending',
        priority: 'urgent',
        results: null,
        doctorName: 'Dr. John Smith'
      },
      {
        id: 'TEST006',
        patientName: 'Sarah Brown',
        patientId: 'PAT006',
        phone: '+91 9876543215',
        testType: 'Blood Test',
        testName: 'Thyroid Function Test',
        requestedDate: '2024-01-13',
        completedDate: '2024-01-14',
        status: 'completed',
        priority: 'normal',
        results: {
          tsh: '2.5 mIU/L',
          t3: '1.2 ng/mL',
          t4: '8.5 μg/dL'
        },
        normalRanges: {
          tsh: '0.4-4.0 mIU/L',
          t3: '0.8-2.0 ng/mL',
          t4: '5.0-12.0 μg/dL'
        },
        doctorName: 'Dr. Lisa Wong'
      }
    ];

    setTestRequests(mockTestRequests);
    setFilteredRequests(mockTestRequests);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('providerType');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(query, filterStatus, filterType);
  };

  const applyFilters = (search, status, type) => {
    let filtered = [...testRequests];

    // Apply search filter
    if (search.trim()) {
      filtered = filtered.filter(request =>
        request.patientName.toLowerCase().includes(search.toLowerCase()) ||
        request.patientId.toLowerCase().includes(search.toLowerCase()) ||
        request.testName.toLowerCase().includes(search.toLowerCase()) ||
        request.testType.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (status !== 'all') {
      filtered = filtered.filter(request => request.status === status);
    }

    // Apply type filter
    if (type !== 'all') {
      filtered = filtered.filter(request => request.testType === type);
    }

    setFilteredRequests(filtered);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    applyFilters(searchQuery, status, filterType);
  };

  const handleTypeFilter = (type) => {
    setFilterType(type);
    applyFilters(searchQuery, filterStatus, type);
  };

  const handleUpdateStatus = (testId, newStatus) => {
    const updatedRequests = testRequests.map(request => {
      if (request.id === testId) {
        const updatedRequest = { ...request, status: newStatus };
        if (newStatus === 'completed' && !request.completedDate) {
          updatedRequest.completedDate = new Date().toISOString().split('T')[0];
        }
        return updatedRequest;
      }
      return request;
    });
    
    setTestRequests(updatedRequests);
    applyFilters(searchQuery, filterStatus, filterType);
    alert(`Test status updated to ${newStatus}`);
  };

  const handleCallPatient = (phone) => {
    window.open(`tel:${phone}`);
  };

  const handleViewResults = (testId) => {
    const test = testRequests.find(t => t.id === testId);
    if (test && test.results) {
      alert(`Results for ${test.testName}:\n${JSON.stringify(test.results, null, 2)}`);
    } else {
      alert('Results not available yet.');
    }
  };

  const handlePrintResults = (testId) => {
    const test = testRequests.find(t => t.id === testId);
    if (test && test.results) {
      alert(`Printing results for ${test.testName} - ${test.patientName}`);
    } else {
      alert('No results to print.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTestStats = () => {
    return {
      total: testRequests.length,
      pending: testRequests.filter(t => t.status === 'pending').length,
      inProgress: testRequests.filter(t => t.status === 'in_progress').length,
      completed: testRequests.filter(t => t.status === 'completed').length,
      urgent: testRequests.filter(t => t.priority === 'urgent').length
    };
  };

  const stats = getTestStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar
          userRole="laboratory"
          userData={userData}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Results</h1>
            <p className="text-gray-600">Manage laboratory test requests and results</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Tests</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.urgent}</div>
                <div className="text-sm text-gray-600">Urgent</div>
              </div>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar
                    placeholder="Search by patient name, ID, or test type..."
                    onSearch={handleSearch}
                    value={searchQuery}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => handleStatusFilter(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Test Type:</span>
                  <select
                    value={filterType}
                    onChange={(e) => handleTypeFilter(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="Blood Test">Blood Test</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="MRI Scan">MRI Scan</option>
                    <option value="CT Scan">CT Scan</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Test Requests List */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Test Requests ({filteredRequests.length})
              </h2>
            </div>

            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {request.patientName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.patientName}</h3>
                          <p className="text-sm text-gray-600">ID: {request.patientId}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                          {request.status.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Test:</span> {request.testName}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {request.testType}
                        </div>
                        <div>
                          <span className="font-medium">Requested:</span> {new Date(request.requestedDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Doctor:</span> {request.doctorName}
                        </div>
                      </div>

                      {request.completedDate && (
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Completed:</span> {new Date(request.completedDate).toLocaleDateString()}
                        </div>
                      )}

                      {request.results && (
                        <div className="bg-gray-50 rounded-lg p-3 mt-3">
                          <h4 className="font-medium text-gray-900 mb-2">Results:</h4>
                          <div className="text-sm text-gray-700">
                            {Object.entries(request.results).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        size="sm"
                        onClick={() => handleCallPatient(request.phone)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        📞 Call
                      </Button>
                      
                      {request.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(request.id, 'in_progress')}
                        >
                          Start Test
                        </Button>
                      )}
                      
                      {request.status === 'in_progress' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(request.id, 'completed')}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Mark Complete
                        </Button>
                      )}

                      {request.results && (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleViewResults(request.id)}
                          >
                            View Results
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handlePrintResults(request.id)}
                          >
                            Print Report
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRequests.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧪</span>
                </div>
                <p className="text-gray-500">No test requests found matching your criteria.</p>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default LabTestResults;
