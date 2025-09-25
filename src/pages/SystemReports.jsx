import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';

const SystemReports = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');
  const [reportData, setReportData] = useState({});

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

    // Load report data
    loadReportData();
  }, [navigate, selectedReport, dateRange]);

  const loadReportData = () => {
    // Mock report data based on selected report type
    const mockData = {
      overview: {
        summary: {
          totalUsers: 1250,
          activeUsers: 1180,
          newRegistrations: 45,
          totalProviders: 7,
          activeProviders: 5,
          suspendedProviders: 2,
          systemUptime: '99.9%',
          averageResponseTime: '120ms'
        },
        charts: {
          userGrowth: [
            { month: 'Jan', users: 800, providers: 3 },
            { month: 'Feb', users: 950, providers: 4 },
            { month: 'Mar', users: 1100, providers: 5 },
            { month: 'Apr', users: 1180, providers: 6 },
            { month: 'May', users: 1250, providers: 7 }
          ],
          activityByType: [
            { type: 'Patient Logins', count: 450, color: '#3B82F6' },
            { type: 'Doctor Consultations', count: 320, color: '#10B981' },
            { type: 'Lab Tests', count: 280, color: '#8B5CF6' },
            { type: 'Prescription Fills', count: 200, color: '#F59E0B' }
          ]
        }
      },
      userActivity: {
        dailyActive: [
          { date: '2024-01-15', patients: 45, doctors: 12, labs: 8, chemists: 5 },
          { date: '2024-01-16', patients: 52, doctors: 15, labs: 10, chemists: 7 },
          { date: '2024-01-17', patients: 48, doctors: 13, labs: 9, chemists: 6 },
          { date: '2024-01-18', patients: 61, doctors: 18, labs: 12, chemists: 8 },
          { date: '2024-01-19', patients: 55, doctors: 16, labs: 11, chemists: 7 },
          { date: '2024-01-20', patients: 58, doctors: 17, labs: 13, chemists: 9 },
          { date: '2024-01-21', patients: 63, doctors: 19, labs: 14, chemists: 10 }
        ],
        topUsers: [
          { name: 'Dr. John Smith', type: 'Doctor', logins: 45, lastActive: '2024-01-21' },
          { name: 'City Diagnostic Lab', type: 'Laboratory', logins: 38, lastActive: '2024-01-21' },
          { name: 'HealthPlus Pharmacy', type: 'Chemist', logins: 42, lastActive: '2024-01-20' },
          { name: 'Dr. Sarah Johnson', type: 'Doctor', logins: 35, lastActive: '2024-01-21' },
          { name: 'Modern Pathology Lab', type: 'Laboratory', logins: 31, lastActive: '2024-01-19' }
        ]
      },
      providerPerformance: {
        providerStats: [
          {
            name: 'Dr. John Smith',
            type: 'Doctor',
            patients: 45,
            avgRating: 4.8,
            consultations: 156,
            responseTime: '2.3 hours'
          },
          {
            name: 'City Diagnostic Lab',
            type: 'Laboratory',
            tests: 89,
            avgRating: 4.6,
            reportsGenerated: 89,
            turnaroundTime: '4.2 hours'
          },
          {
            name: 'HealthPlus Pharmacy',
            type: 'Chemist',
            prescriptions: 234,
            avgRating: 4.7,
            fulfillmentRate: '98.5%',
            processingTime: '1.8 hours'
          }
        ],
        performanceMetrics: [
          { metric: 'Average Consultation Time', value: '25 mins', trend: '+5%' },
          { metric: 'Test Result Turnaround', value: '4.2 hours', trend: '-12%' },
          { metric: 'Prescription Fulfillment', value: '98.5%', trend: '+2%' },
          { metric: 'Patient Satisfaction', value: '4.6/5', trend: '+8%' }
        ]
      },
      systemHealth: {
        uptime: '99.9%',
        responseTimes: [
          { endpoint: '/api/login', avgTime: '85ms', status: 'excellent' },
          { endpoint: '/api/patient-data', avgTime: '120ms', status: 'good' },
          { endpoint: '/api/reports', avgTime: '450ms', status: 'moderate' },
          { endpoint: '/api/file-upload', avgTime: '2.1s', status: 'slow' }
        ],
        errorRates: [
          { service: 'Authentication', rate: '0.01%', status: 'excellent' },
          { service: 'Database', rate: '0.05%', status: 'good' },
          { service: 'File Storage', rate: '0.12%', status: 'moderate' },
          { service: 'Email Service', rate: '0.08%', status: 'good' }
        ]
      }
    };

    setReportData(mockData[selectedReport] || mockData.overview);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const exportReport = (format) => {
    // Mock export functionality
    alert(`Exporting ${selectedReport} report as ${format.toUpperCase()}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'moderate': return 'text-yellow-600';
      case 'slow': return 'text-red-600';
      default: return 'text-gray-600';
    }
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
              System Reports
            </h1>
            <p className="text-gray-600">
              Comprehensive analytics and insights about system performance and usage
            </p>
          </div>

          {/* Report Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="overview">System Overview</option>
                <option value="userActivity">User Activity</option>
                <option value="providerPerformance">Provider Performance</option>
                <option value="systemHealth">System Health</option>
              </select>
            </Card>

            <Card className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
            </Card>

            <Card className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => exportReport('pdf')}>
                  Export PDF
                </Button>
                <Button size="sm" variant="secondary" onClick={() => exportReport('csv')}>
                  Export CSV
                </Button>
              </div>
            </Card>
          </div>

          {/* Report Content */}
          {selectedReport === 'overview' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.summary?.totalUsers}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <span className="text-2xl">🏥</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Active Providers</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.summary?.activeProviders}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <span className="text-2xl">📈</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">New Registrations</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.summary?.newRegistrations}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">System Uptime</p>
                      <p className="text-2xl font-bold text-gray-900">{reportData.summary?.systemUptime}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Charts placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth Trend</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart would be displayed here</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity by Type</h3>
                  <div className="space-y-3">
                    {reportData.charts?.activityByType?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded mr-3"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm text-gray-600">{item.type}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {selectedReport === 'userActivity' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Active Users</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Patients</th>
                        <th className="px-4 py-2 text-left">Doctors</th>
                        <th className="px-4 py-2 text-left">Labs</th>
                        <th className="px-4 py-2 text-left">Chemists</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.dailyActive?.map((day, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{day.date}</td>
                          <td className="px-4 py-2">{day.patients}</td>
                          <td className="px-4 py-2">{day.doctors}</td>
                          <td className="px-4 py-2">{day.labs}</td>
                          <td className="px-4 py-2">{day.chemists}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Active Users</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Logins</th>
                        <th className="px-4 py-2 text-left">Last Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.topUsers?.map((user, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{user.name}</td>
                          <td className="px-4 py-2">{user.type}</td>
                          <td className="px-4 py-2">{user.logins}</td>
                          <td className="px-4 py-2">{user.lastActive}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {selectedReport === 'providerPerformance' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Provider Performance Metrics</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Provider</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Activity</th>
                        <th className="px-4 py-2 text-left">Rating</th>
                        <th className="px-4 py-2 text-left">Response Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.providerStats?.map((provider, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{provider.name}</td>
                          <td className="px-4 py-2">{provider.type}</td>
                          <td className="px-4 py-2">
                            {provider.patients && `${provider.patients} patients`}
                            {provider.tests && `${provider.tests} tests`}
                            {provider.prescriptions && `${provider.prescriptions} prescriptions`}
                          </td>
                          <td className="px-4 py-2">{provider.avgRating}/5</td>
                          <td className="px-4 py-2">{provider.responseTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Indicators</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportData.performanceMetrics?.map((metric, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">{metric.metric}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{metric.value}</span>
                        <span className={`text-sm ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {selectedReport === 'systemHealth' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Uptime</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{reportData.uptime}</div>
                    <p className="text-gray-600">Last 30 days</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Times</h3>
                  <div className="space-y-3">
                    {reportData.responseTimes?.map((endpoint, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{endpoint.endpoint}</span>
                        <span className={`font-semibold ${getStatusColor(endpoint.status)}`}>
                          {endpoint.avgTime}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Rates by Service</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Service</th>
                        <th className="px-4 py-2 text-left">Error Rate</th>
                        <th className="px-4 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.errorRates?.map((service, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{service.service}</td>
                          <td className="px-4 py-2">{service.rate}</td>
                          <td className="px-4 py-2">
                            <span className={`font-semibold ${getStatusColor(service.status)}`}>
                              {service.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SystemReports;
