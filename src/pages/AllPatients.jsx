import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const AllPatients = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [allPatients, setAllPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }

    // Load all patients data
    loadAllPatients();
  }, []);

  const loadAllPatients = () => {
    const mockPatients = [
      {
        id: 'PAT001',
        name: 'John Doe',
        phone: '+91 9876543210',
        email: 'john.doe@email.com',
        age: 45,
        gender: 'Male',
        bloodGroup: 'O+',
        address: '123 Main St, Kochi, Kerala',
        lastVisit: '2024-01-10',
        status: 'active',
        appointments: 3,
        conditions: ['Hypertension', 'Diabetes'],
        allergies: ['Penicillin'],
        emergencyContact: '+91 9876543299',
        registrationDate: '2023-06-15'
      },
      {
        id: 'PAT002',
        name: 'Jane Smith',
        phone: '+91 9876543211',
        email: 'jane.smith@email.com',
        age: 32,
        gender: 'Female',
        bloodGroup: 'A+',
        address: '456 Oak Ave, Thiruvananthapuram, Kerala',
        lastVisit: '2024-01-08',
        status: 'active',
        appointments: 1,
        conditions: ['Migraine'],
        allergies: ['Shellfish'],
        emergencyContact: '+91 9876543288',
        registrationDate: '2023-08-22'
      },
      {
        id: 'PAT003',
        name: 'Robert Johnson',
        phone: '+91 9876543212',
        email: 'robert.johnson@email.com',
        age: 58,
        gender: 'Male',
        bloodGroup: 'B+',
        address: '789 Pine Rd, Kozhikode, Kerala',
        lastVisit: '2024-01-05',
        status: 'inactive',
        appointments: 0,
        conditions: ['Arthritis'],
        allergies: ['None'],
        emergencyContact: '+91 9876543277',
        registrationDate: '2023-04-10'
      },
      {
        id: 'PAT004',
        name: 'Maria Garcia',
        phone: '+91 9876543213',
        email: 'maria.garcia@email.com',
        age: 28,
        gender: 'Female',
        bloodGroup: 'AB+',
        address: '321 Cedar St, Kollam, Kerala',
        lastVisit: '2024-01-12',
        status: 'active',
        appointments: 2,
        conditions: ['Asthma'],
        allergies: ['Dust', 'Pollen'],
        emergencyContact: '+91 9876543266',
        registrationDate: '2023-09-05'
      },
      {
        id: 'PAT005',
        name: 'David Wilson',
        phone: '+91 9876543214',
        email: 'david.wilson@email.com',
        age: 41,
        gender: 'Male',
        bloodGroup: 'O-',
        address: '654 Elm St, Thrissur, Kerala',
        lastVisit: '2024-01-07',
        status: 'active',
        appointments: 4,
        conditions: ['High Cholesterol'],
        allergies: ['Latex'],
        emergencyContact: '+91 9876543255',
        registrationDate: '2023-07-18'
      },
      {
        id: 'PAT006',
        name: 'Sarah Brown',
        phone: '+91 9876543215',
        email: 'sarah.brown@email.com',
        age: 35,
        gender: 'Female',
        bloodGroup: 'A-',
        address: '987 Maple St, Palakkad, Kerala',
        lastVisit: '2024-01-06',
        status: 'active',
        appointments: 2,
        conditions: ['Thyroid'],
        allergies: ['Iodine'],
        emergencyContact: '+91 9876543244',
        registrationDate: '2023-05-30'
      },
      {
        id: 'PAT007',
        name: 'Michael Davis',
        phone: '+91 9876543216',
        email: 'michael.davis@email.com',
        age: 52,
        gender: 'Male',
        bloodGroup: 'B-',
        address: '147 Birch Ave, Kannur, Kerala',
        lastVisit: '2024-01-04',
        status: 'active',
        appointments: 5,
        conditions: ['Heart Disease'],
        allergies: ['Aspirin'],
        emergencyContact: '+91 9876543233',
        registrationDate: '2023-03-12'
      },
      {
        id: 'PAT008',
        name: 'Lisa Anderson',
        phone: '+91 9876543217',
        email: 'lisa.anderson@email.com',
        age: 29,
        gender: 'Female',
        bloodGroup: 'AB-',
        address: '258 Willow Dr, Malappuram, Kerala',
        lastVisit: '2024-01-03',
        status: 'inactive',
        appointments: 1,
        conditions: ['Skin Allergy'],
        allergies: ['Nickel', 'Fragrance'],
        emergencyContact: '+91 9876543222',
        registrationDate: '2023-10-08'
      },
      {
        id: 'PAT009',
        name: 'James Wilson',
        phone: '+91 9876543218',
        email: 'james.wilson@email.com',
        age: 67,
        gender: 'Male',
        bloodGroup: 'O+',
        address: '369 Spruce St, Wayanad, Kerala',
        lastVisit: '2024-01-02',
        status: 'active',
        appointments: 8,
        conditions: ['Diabetes', 'Hypertension', 'Kidney Disease'],
        allergies: ['Sulfa drugs'],
        emergencyContact: '+91 9876543211',
        registrationDate: '2023-01-20'
      },
      {
        id: 'PAT010',
        name: 'Emma Thompson',
        phone: '+91 9876543219',
        email: 'emma.thompson@email.com',
        age: 24,
        gender: 'Female',
        bloodGroup: 'A+',
        address: '741 Oak Ridge, Idukki, Kerala',
        lastVisit: '2024-01-01',
        status: 'active',
        appointments: 1,
        conditions: ['Anxiety'],
        allergies: ['None'],
        emergencyContact: '+91 9876543200',
        registrationDate: '2023-11-15'
      }
    ];

    setAllPatients(mockPatients);
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
    applyFilters(query, filterStatus, sortBy);
    setCurrentPage(1);
  };

  const applyFilters = (search, status, sort) => {
    let filtered = [...allPatients];

    // Apply search filter
    if (search.trim()) {
      filtered = filtered.filter(patient =>
        patient.name.toLowerCase().includes(search.toLowerCase()) ||
        patient.id.toLowerCase().includes(search.toLowerCase()) ||
        patient.phone.includes(search) ||
        patient.email.toLowerCase().includes(search.toLowerCase()) ||
        patient.conditions.some(condition => 
          condition.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (status !== 'all') {
      filtered = filtered.filter(patient => patient.status === status);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'age':
          return a.age - b.age;
        case 'lastVisit':
          return new Date(b.lastVisit) - new Date(a.lastVisit);
        case 'appointments':
          return b.appointments - a.appointments;
        case 'registrationDate':
          return new Date(b.registrationDate) - new Date(a.registrationDate);
        default:
          return 0;
      }
    });

    setFilteredPatients(filtered);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    applyFilters(searchQuery, status, sortBy);
    setCurrentPage(1);
  };

  const handleSort = (sort) => {
    setSortBy(sort);
    applyFilters(searchQuery, filterStatus, sort);
    setCurrentPage(1);
  };

  const handleCallPatient = (phone) => {
    window.open(`tel:${phone}`);
  };

  const handleEmailPatient = (email) => {
    window.open(`mailto:${email}`);
  };

  const handleViewDetails = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  const handleBookAppointment = (patientId) => {
    navigate(`/appointments/book?patient=${patientId}`);
  };

  const handleUpdateStatus = (patientId, newStatus) => {
    setAllPatients(prev => prev.map(patient =>
      patient.id === patientId ? { ...patient, status: newStatus } : patient
    ));
    applyFilters(searchQuery, filterStatus, sortBy);
    alert(`Patient status updated to ${newStatus}`);
  };

  // Pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPatientStats = () => {
    return {
      total: allPatients.length,
      active: allPatients.filter(p => p.status === 'active').length,
      inactive: allPatients.filter(p => p.status === 'inactive').length,
      avgAge: Math.round(allPatients.reduce((sum, p) => sum + p.age, 0) / allPatients.length),
      totalAppointments: allPatients.reduce((sum, p) => sum + p.appointments, 0)
    };
  };

  const stats = getPatientStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar
          userRole="provider"
          userData={userData}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Patients</h1>
            <p className="text-gray-600">Complete patient database and management</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Patients</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
                <div className="text-sm text-gray-600">Inactive</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.avgAge}</div>
                <div className="text-sm text-gray-600">Avg Age</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.totalAppointments}</div>
                <div className="text-sm text-gray-600">Total Appointments</div>
              </div>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar
                    placeholder="Search patients by name, ID, phone, email, or condition..."
                    onSearch={handleSearch}
                    value={searchQuery}
                  />
                </div>
                <Button>Add New Patient</Button>
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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="name">Name</option>
                    <option value="age">Age</option>
                    <option value="lastVisit">Last Visit</option>
                    <option value="appointments">Appointments</option>
                    <option value="registrationDate">Registration Date</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Patients Table */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Patients ({filteredPatients.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Medical Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-blue-600">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                            <div className="text-sm text-gray-500">{patient.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.phone}</div>
                        <div className="text-sm text-gray-500">{patient.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.age} years, {patient.gender}</div>
                        <div className="text-sm text-gray-500">Blood: {patient.bloodGroup}</div>
                        <div className="text-sm text-gray-500">{patient.appointments} appointments</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {patient.conditions.slice(0, 2).map((condition, index) => (
                            <span key={index} className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full mr-1 mb-1">
                              {condition}
                            </span>
                          ))}
                          {patient.conditions.length > 2 && (
                            <span className="text-xs text-gray-500">+{patient.conditions.length - 2} more</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          patient.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleViewDetails(patient.id)}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleBookAppointment(patient.id)}
                          >
                            Book
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleCallPatient(patient.phone)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            📞
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-700">
                  Showing {indexOfFirstPatient + 1} to {Math.min(indexOfLastPatient, filteredPatients.length)} of {filteredPatients.length} patients
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index + 1}
                      size="sm"
                      variant={currentPage === index + 1 ? "primary" : "secondary"}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {filteredPatients.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-gray-500">No patients found matching your criteria.</p>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AllPatients;
