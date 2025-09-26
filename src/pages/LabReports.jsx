import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';

const LabReports = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('analytics');
  const [dateRange, setDateRange] = useState('month');
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }

    // Load report data
    loadReportData();
  }, []);

  const loadReportData = () => {
    const mockReportData = {
      analytics: {
        totalTests: 156,
        completedTests: 142,
        pendingTests: 8,
        inProgressTests: 6,
        testsByType: {
          'Blood Test': 65,
          'X-Ray': 28,
          'MRI Scan': 15,
          'CT Scan': 22,
          'Ultrasound': 18,
          'Other': 8
        },
        monthlyTrends: [
          { month: 'Jan', tests: 120, revenue: 480000 },
          { month: 'Feb', tests: 135, revenue: 540000 },
          { month: 'Mar', tests: 156, revenue: 624000 },
          { month: 'Apr', tests: 142, revenue: 568000 },
          { month: 'May', tests: 168, revenue: 672000 },
          { month: 'Jun', tests: 175, revenue: 700000 }
        ],
        topDoctors: [
          { name: 'Dr. Priya Sharma', tests: 45, revenue: 180000 },
          { name: 'Dr. Arjun Patel', tests: 38, revenue: 152000 },
          { name: 'Dr. Kavita Singh', tests: 32, revenue: 128000 },
          { name: 'Dr. Rohan Kumar', tests: 27, revenue: 108000 }
        ]
      },
      quality: {
        accuracyRate: 98.5,
        turnaroundTime: {
          average: 2.3,
          target: 2.0,
          bloodTests: 1.8,
          imaging: 3.2,
          pathology: 2.8
        },
        qualityMetrics: [
          { metric: 'Sample Rejection Rate', value: '1.2%', target: '<2%', status: 'good' },
          { metric: 'Report Accuracy', value: '98.5%', target: '>95%', status: 'excellent' },
          { metric: 'Equipment Uptime', value: '97.8%', target: '>95%', status: 'excellent' },
          { metric: 'Customer Satisfaction', value: '4.6/5', target: '>4.0', status: 'excellent' }
        ],
        calibrationStatus: [
          { equipment: 'Blood Analyzer', lastCalibration: '2024-01-05', nextDue: '2024-04-05', status: 'current' },
          { equipment: 'X-Ray Machine', lastCalibration: '2023-12-20', nextDue: '2024-06-20', status: 'current' },
          { equipment: 'MRI Scanner', lastCalibration: '2024-01-10', nextDue: '2024-04-10', status: 'current' },
          { equipment: 'CT Scanner', lastCalibration: '2023-12-01', nextDue: '2024-03-01', status: 'due_soon' }
        ]
      },
      financial: {
        totalRevenue: 624000,
        monthlyRevenue: [
          { month: 'Jan', revenue: 480000, tests: 120, avgPerTest: 4000 },
          { month: 'Feb', revenue: 540000, tests: 135, avgPerTest: 4000 },
          { month: 'Mar', revenue: 624000, tests: 156, avgPerTest: 4000 }
        ],
        revenueByCategory: {
          'Blood Tests': 260000,
          'Imaging': 280000,
          'Pathology': 84000
        },
        expenses: {
          reagents: 125000,
          maintenance: 45000,
          staff: 180000,
          utilities: 35000,
          other: 25000
        },
        profitMargin: 22.5
      }
    };

    setReportData(mockReportData);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('providerType');
    navigate('/');
  };

  const handleExportReport = (reportType) => {
    alert(`Exporting ${reportType} report...`);
  };

  const handlePrintReport = (reportType) => {
    alert(`Printing ${reportType} report...`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'current': return 'bg-green-100 text-green-800';
      case 'due_soon': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Laboratory Reports</h1>
            <p className="text-gray-600">Analytics, quality metrics, and financial reports</p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'analytics'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📊 Analytics
                </button>
                <button
                  onClick={() => setActiveTab('quality')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'quality'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  🎯 Quality Metrics
                </button>
                <button
                  onClick={() => setActiveTab('financial')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'financial'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  💰 Financial
                </button>
              </nav>
            </div>
          </div>

          {/* Analytics Tab */}
          {activeTab === 'analytics' && reportData.analytics && (
            <div className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{reportData.analytics.totalTests}</div>
                    <div className="text-sm text-gray-600">Total Tests</div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{reportData.analytics.completedTests}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">{reportData.analytics.pendingTests}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{reportData.analytics.inProgressTests}</div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </div>
                </Card>
              </div>

              {/* Tests by Type */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Tests by Type</h3>
                  <Button size="sm" onClick={() => handleExportReport('analytics')}>Export Report</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(reportData.analytics.testsByType).map(([type, count]) => (
                    <div key={type} className="bg-gray-50 rounded-lg p-4">
                      <div className="text-lg font-semibold text-gray-900">{count}</div>
                      <div className="text-sm text-gray-600">{type}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Monthly Trends */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trends</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tests</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Avg per Test</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reportData.analytics.monthlyTrends.map((month) => (
                        <tr key={month.month}>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">{month.month}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{month.tests}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">₹{month.revenue.toLocaleString()}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">₹{(month.revenue / month.tests).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Top Doctors */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Referring Doctors</h3>
                <div className="space-y-4">
                  {reportData.analytics.topDoctors.map((doctor, index) => (
                    <div key={doctor.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{doctor.name}</div>
                          <div className="text-sm text-gray-600">{doctor.tests} tests</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">₹{doctor.revenue.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Quality Metrics Tab */}
          {activeTab === 'quality' && reportData.quality && (
            <div className="space-y-6">
              {/* Quality Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{reportData.quality.accuracyRate}%</div>
                    <div className="text-sm text-gray-600">Overall Accuracy</div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{reportData.quality.turnaroundTime.average}</div>
                    <div className="text-sm text-gray-600">Avg Turnaround (days)</div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{reportData.quality.turnaroundTime.target}</div>
                    <div className="text-sm text-gray-600">Target Time (days)</div>
                  </div>
                </Card>
              </div>

              {/* Quality Metrics */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Quality Metrics</h3>
                  <Button size="sm" onClick={() => handleExportReport('quality')}>Export Report</Button>
                </div>
                <div className="space-y-4">
                  {reportData.quality.qualityMetrics.map((metric) => (
                    <div key={metric.metric} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{metric.metric}</div>
                        <div className="text-sm text-gray-600">Target: {metric.target}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-lg font-semibold text-gray-900">{metric.value}</div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metric.status)}`}>
                          {metric.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Turnaround Time by Category */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Turnaround Time by Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-lg font-semibold text-blue-900">{reportData.quality.turnaroundTime.bloodTests} days</div>
                    <div className="text-sm text-blue-700">Blood Tests</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-lg font-semibold text-green-900">{reportData.quality.turnaroundTime.imaging} days</div>
                    <div className="text-sm text-green-700">Imaging</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-lg font-semibold text-purple-900">{reportData.quality.turnaroundTime.pathology} days</div>
                    <div className="text-sm text-purple-700">Pathology</div>
                  </div>
                </div>
              </Card>

              {/* Equipment Calibration Status */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Equipment Calibration Status</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Equipment</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Last Calibration</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Next Due</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reportData.quality.calibrationStatus.map((item) => (
                        <tr key={item.equipment}>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">{item.equipment}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{new Date(item.lastCalibration).toLocaleDateString()}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{new Date(item.nextDue).toLocaleDateString()}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                              {item.status.replace('_', ' ')}
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

          {/* Financial Tab */}
          {activeTab === 'financial' && reportData.financial && (
            <div className="space-y-6">
              {/* Financial Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">₹{reportData.financial.totalRevenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Revenue</div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{reportData.financial.profitMargin}%</div>
                    <div className="text-sm text-gray-600">Profit Margin</div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">₹{Object.values(reportData.financial.expenses).reduce((a, b) => a + b, 0).toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Expenses</div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">₹{(reportData.financial.totalRevenue - Object.values(reportData.financial.expenses).reduce((a, b) => a + b, 0)).toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Net Profit</div>
                  </div>
                </Card>
              </div>

              {/* Revenue by Category */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Revenue by Category</h3>
                  <Button size="sm" onClick={() => handleExportReport('financial')}>Export Report</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(reportData.financial.revenueByCategory).map(([category, revenue]) => (
                    <div key={category} className="bg-gray-50 rounded-lg p-4">
                      <div className="text-lg font-semibold text-gray-900">₹{revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{category}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Monthly Revenue */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Revenue Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tests</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Avg per Test</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reportData.financial.monthlyRevenue.map((month) => (
                        <tr key={month.month}>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">{month.month}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">₹{month.revenue.toLocaleString()}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{month.tests}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">₹{month.avgPerTest.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Expense Breakdown */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(reportData.financial.expenses).map(([category, amount]) => (
                    <div key={category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="capitalize font-medium text-gray-900">{category}</div>
                      <div className="text-lg font-semibold text-gray-900">₹{amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default LabReports;
