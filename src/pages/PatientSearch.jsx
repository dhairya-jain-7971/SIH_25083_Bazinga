import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const PatientSearch = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [searchType, setSearchType] = useState('name');
  const [isSearching, setIsSearching] = useState(false);

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
        emergencyContact: '+91 9876543299'
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
        emergencyContact: '+91 9876543288'
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
        emergencyContact: '+91 9876543277'
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
        emergencyContact: '+91 9876543266'
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
        emergencyContact: '+91 9876543255'
      }
    ];
    setAllPatients(mockPatients);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('providerType');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    if (query.trim()) {
      const filtered = allPatients.filter(patient => {
        switch (searchType) {
          case 'name':
            return patient.name.toLowerCase().includes(query.toLowerCase());
          case 'id':
            return patient.id.toLowerCase().includes(query.toLowerCase());
          case 'phone':
            return patient.phone.includes(query);
          case 'email':
            return patient.email.toLowerCase().includes(query.toLowerCase());
          case 'condition':
            return patient.conditions.some(condition => 
              condition.toLowerCase().includes(query.toLowerCase())
            );
          default:
            return patient.name.toLowerCase().includes(query.toLowerCase()) ||
                   patient.id.toLowerCase().includes(query.toLowerCase());
        }
      });
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const handleCallPatient = (phone) => {
    window.open(`tel:${phone}`);
  };

  const handleEmailPatient = (email) => {
    window.open(`mailto:${email}`);
  };

  const handleViewDetails = (patientId) => {
    // Navigate to patient details page
    navigate(`/patient/${patientId}`);
  };

  const handleBookAppointment = (patientId) => {
    // Navigate to appointment booking with pre-filled patient
    navigate(`/appointments/book?patient=${patientId}`);
  };

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Search</h1>
            <p className="text-gray-600">Search and find patient records quickly</p>
          </div>

          {/* Search Controls */}
          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar
                    placeholder={`Search patients by ${searchType}...`}
                    onSearch={handleSearch}
                    value={searchQuery}
                  />
                </div>
                <div className="md:w-48">
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="name">Name</option>
                    <option value="id">Patient ID</option>
                    <option value="phone">Phone Number</option>
                    <option value="email">Email</option>
                    <option value="condition">Medical Condition</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Quick filters:</span>
                <button
                  onClick={() => {
                    setSearchType('condition');
                    handleSearch('Diabetes');
                  }}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
                >
                  Diabetes
                </button>
                <button
                  onClick={() => {
                    setSearchType('condition');
                    handleSearch('Hypertension');
                  }}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200"
                >
                  Hypertension
                </button>
                <button
                  onClick={() => {
                    setSearchType('condition');
                    handleSearch('Asthma');
                  }}
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200"
                >
                  Asthma
                </button>
              </div>
            </div>
          </Card>

          {/* Search Results */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {searchQuery ? `Search Results (${searchResults.length})` : 'Start typing to search patients'}
              </h2>
              {searchQuery && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                >
                  Clear Search
                </Button>
              )}
            </div>

            {isSearching && (
              <div className="text-center py-8">
                <p className="text-gray-500">Searching...</p>
              </div>
            )}

            {!isSearching && searchQuery && searchResults.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No patients found matching your search criteria.</p>
              </div>
            )}

            {!searchQuery && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <p className="text-gray-500 mb-2">Search for patients using the search bar above</p>
                <p className="text-sm text-gray-400">You can search by name, ID, phone, email, or medical condition</p>
              </div>
            )}

            <div className="space-y-4">
              {searchResults.map((patient) => (
                <div key={patient.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-blue-600">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg">{patient.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              patient.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {patient.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
                            <div><strong>ID:</strong> {patient.id}</div>
                            <div><strong>Phone:</strong> {patient.phone}</div>
                            <div><strong>Email:</strong> {patient.email}</div>
                            <div><strong>Age:</strong> {patient.age} years</div>
                            <div><strong>Gender:</strong> {patient.gender}</div>
                            <div><strong>Blood Group:</strong> {patient.bloodGroup}</div>
                          </div>
                          
                          <div className="mt-2 text-sm text-gray-600">
                            <div><strong>Address:</strong> {patient.address}</div>
                            <div><strong>Last Visit:</strong> {new Date(patient.lastVisit).toLocaleDateString()}</div>
                            <div><strong>Appointments:</strong> {patient.appointments}</div>
                          </div>
                          
                          {patient.conditions.length > 0 && (
                            <div className="mt-2">
                              <span className="text-sm font-medium text-gray-700">Conditions: </span>
                              {patient.conditions.map((condition, index) => (
                                <span key={index} className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full mr-1">
                                  {condition}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {patient.allergies[0] !== 'None' && (
                            <div className="mt-2">
                              <span className="text-sm font-medium text-gray-700">Allergies: </span>
                              {patient.allergies.map((allergy, index) => (
                                <span key={index} className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full mr-1">
                                  {allergy}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        size="sm"
                        onClick={() => handleViewDetails(patient.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleBookAppointment(patient.id)}
                      >
                        Book Appointment
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleCallPatient(patient.phone)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        📞 Call
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEmailPatient(patient.email)}
                      >
                        📧 Email
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default PatientSearch;
