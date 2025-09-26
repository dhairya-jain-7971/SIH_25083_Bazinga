import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const PatientReports = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }

    // Load patients data
    loadPatients();
  }, []);

  const loadPatients = () => {
    const mockPatients = [
      {
        id: 'PAT001',
        name: 'Aarav Kumar',
        phone: '+91 9876543210',
        email: 'aarav.kumar@email.com',
        dateOfBirth: '1985-06-15',
        gender: 'Male',
        address: '123 MG Road, Kochi',
        totalTests: 5,
        completedTests: 4,
        pendingTests: 1,
        lastVisit: '2024-01-15',
        reports: [
          { id: 'RPT001', testName: 'Complete Blood Count', date: '2024-01-15', status: 'completed' },
          { id: 'RPT002', testName: 'Lipid Profile', date: '2024-01-10', status: 'completed' },
          { id: 'RPT003', testName: 'Thyroid Function Test', date: '2024-01-05', status: 'completed' },
          { id: 'RPT004', testName: 'X-Ray Chest', date: '2024-01-12', status: 'completed' }
        ]
      },
      {
        id: 'PAT002',
        name: 'Ananya Patel',
        phone: '+91 9876543211',
        email: 'ananya.patel@email.com',
        dateOfBirth: '1990-03-22',
        gender: 'Female',
        address: '456 Residency Road, Thiruvananthapuram',
        totalTests: 3,
        completedTests: 3,
        pendingTests: 0,
        lastVisit: '2024-01-18',
        reports: [
          { id: 'RPT005', testName: 'MRI Brain', date: '2024-01-18', status: 'completed' },
          { id: 'RPT006', testName: 'Blood Test', date: '2024-01-16', status: 'completed' },
          { id: 'RPT007', testName: 'CT Scan', date: '2024-01-14', status: 'completed' }
        ]
      },
      {
        id: 'PAT003',
        name: 'Vihaan Singh',
        phone: '+91 9876543212',
        email: 'vihaan.singh@email.com',
        dateOfBirth: '1978-11-08',
        gender: 'Male',
        address: '789 Marine Drive, Kozhikode',
        totalTests: 7,
        completedTests: 6,
        pendingTests: 1,
        lastVisit: '2024-01-20',
        reports: [
          { id: 'RPT008', testName: 'Ultrasound Abdomen', date: '2024-01-20', status: 'completed' },
          { id: 'RPT009', testName: 'ECG', date: '2024-01-19', status: 'completed' },
          { id: 'RPT010', testName: 'Blood Sugar Test', date: '2024-01-17', status: 'completed' }
        ]
      },
      {
        id: 'PAT004',
        name: 'Diya Reddy',
        phone: '+91 9876543213',
        email: 'diya.reddy@email.com',
        dateOfBirth: '1995-09-12',
        gender: 'Female',
        address: '321 Palace Road, Thrissur',
        totalTests: 2,
        completedTests: 2,
        pendingTests: 0,
        lastVisit: '2024-01-22',
        reports: [
          { id: 'RPT011', testName: 'Complete Health Checkup', date: '2024-01-22', status: 'completed' },
          { id: 'RPT012', testName: 'Vitamin D Test', date: '2024-01-21', status: 'completed' }
        ]
      },
      {
        id: 'PAT005',
        name: 'Ishaan Gupta',
        phone: '+91 9876543214',
        email: 'ishaan.gupta@email.com',
        dateOfBirth: '1982-04-30',
        gender: 'Male',
        address: '654 Hill Station Road, Munnar',
        totalTests: 4,
        completedTests: 3,
        pendingTests: 1,
        lastVisit: '2024-01-25',
        reports: [
          { id: 'RPT013', testName: 'Cardiac Stress Test', date: '2024-01-25', status: 'completed' },
          { id: 'RPT014', testName: 'Cholesterol Test', date: '2024-01-23', status: 'completed' },
          { id: 'RPT015', testName: 'Liver Function Test', date: '2024-01-24', status: 'in_progress' }
        ]
      },
      {
        id: 'PAT006',
        name: 'Meera Joshi',
        phone: '+91 9876543215',
        email: 'meera.joshi@email.com',
        dateOfBirth: '1998-12-05',
        gender: 'Female',
        address: '987 Beach Road, Kovalam',
        totalTests: 1,
        completedTests: 1,
        pendingTests: 0,
        lastVisit: '2024-01-28',
        reports: [
          { id: 'RPT016', testName: 'Annual Health Checkup', date: '2024-01-28', status: 'completed' }
        ]
      }
    ];

    setPatients(mockPatients);
    setFilteredPatients(mockPatients);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('providerType');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(query.toLowerCase()) ||
        patient.id.toLowerCase().includes(query.toLowerCase()) ||
        patient.phone.includes(query)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  };

  const handleDownloadReport = (patientId, reportId) => {
    const patient = patients.find(p => p.id === patientId);
    const report = patient.reports.find(r => r.id === reportId);

    // Mock download functionality
    alert(`Downloading report for ${patient.name}:\nTest: ${report.testName}\nDate: ${report.date}\nStatus: ${report.status}\n\nReport downloaded successfully!`);
  };

  const handleDownloadAllReports = (patientId) => {
    const patient = patients.find(p => p.id === patientId);

    // Mock download all reports functionality
    alert(`Downloading all reports for ${patient.name}:\nTotal Reports: ${patient.reports.length}\n\nAll reports downloaded successfully!`);
  };

  const handleCallPatient = (phone) => {
    window.open(`tel:${phone}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPatientStats = () => {
    return {
      total: patients.length,
      withReports: patients.filter(p => p.reports.length > 0).length,
      pendingTests: patients.reduce((sum, p) => sum + p.pendingTests, 0),
      completedTests: patients.reduce((sum, p) => sum + p.completedTests, 0)
    };
  };

  const stats = getPatientStats();

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Reports</h1>
            <p className="text-gray-600">Download and manage patient medical reports</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Patients</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.withReports}</div>
                <div className="text-sm text-gray-600">With Reports</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.completedTests}</div>
                <div className="text-sm text-gray-600">Completed Tests</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.pendingTests}</div>
                <div className="text-sm text-gray-600">Pending Tests</div>
              </div>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              placeholder="Search patients by name, ID, or phone number..."
              onSearch={handleSearch}
              value={searchQuery}
            />
          </div>

          {/* Patients List */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Patients ({filteredPatients.length})
              </h2>
              <Button onClick={() => navigate('/dashboard/laboratory')}>Back to Dashboard</Button>
            </div>

            <div className="space-y-6">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-blue-600">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-600">Patient ID: {patient.id}</p>
                          <p className="text-sm text-gray-600">Phone: {patient.phone}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                          <span className="font-medium">Email:</span> {patient.email}
                        </div>
                        <div>
                          <span className="font-medium">DOB:</span> {new Date(patient.dateOfBirth).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Last Visit:</span> {new Date(patient.lastVisit).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                          {patient.totalTests} Total Tests
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                          {patient.completedTests} Completed
                        </span>
                        {patient.pendingTests > 0 && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                            {patient.pendingTests} Pending
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        size="sm"
                        onClick={() => handleCallPatient(patient.phone)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        📞 Call
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleDownloadAllReports(patient.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        📥 Download All
                      </Button>
                    </div>
                  </div>

                  {/* Patient Reports */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Test Reports ({patient.reports.length})</h4>
                    <div className="space-y-2">
                      {patient.reports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{report.testName}</div>
                            <div className="text-sm text-gray-600">
                              Date: {new Date(report.date).toLocaleDateString()} | Status: {report.status.replace('_', ' ')}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleDownloadReport(patient.id, report.id)}
                            >
                              📄 Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-gray-500">No patients found matching your search.</p>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default PatientReports;
