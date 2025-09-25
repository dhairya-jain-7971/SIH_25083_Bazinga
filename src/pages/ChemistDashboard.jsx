import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const ChemistDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }

    // Load mock data
    loadPrescriptions();
    loadInventory();
  }, []);

  const loadPrescriptions = () => {
    const mockPrescriptions = [
      {
        id: 'PRE001',
        patientName: 'John Doe',
        patientId: 'PAT001',
        phone: '+91 9876543210',
        medicines: ['Paracetamol 500mg', 'Cough Syrup'],
        prescribedDate: '2024-01-10',
        status: 'pending',
        doctorName: 'Dr. Smith'
      },
      {
        id: 'PRE002',
        patientName: 'Jane Smith',
        patientId: 'PAT002',
        phone: '+91 9876543211',
        medicines: ['Amoxicillin 250mg', 'Pain Relief Gel'],
        prescribedDate: '2024-01-09',
        status: 'ready',
        doctorName: 'Dr. Johnson'
      },
      {
        id: 'PRE003',
        patientName: 'Robert Johnson',
        patientId: 'PAT003',
        phone: '+91 9876543212',
        medicines: ['Vitamin D3', 'Calcium Tablets'],
        prescribedDate: '2024-01-08',
        status: 'completed',
        doctorName: 'Dr. Brown'
      }
    ];
    setPrescriptions(mockPrescriptions);
  };

  const loadInventory = () => {
    const mockInventory = [
      {
        id: 'MED001',
        name: 'Paracetamol 500mg',
        category: 'Pain Relief',
        stock: 150,
        minStock: 50,
        price: 25.00,
        expiryDate: '2025-06-15'
      },
      {
        id: 'MED002',
        name: 'Amoxicillin 250mg',
        category: 'Antibiotics',
        stock: 45,
        minStock: 50,
        price: 75.00,
        expiryDate: '2024-08-20'
      },
      {
        id: 'MED003',
        name: 'Cough Syrup',
        category: 'Cold & Flu',
        stock: 30,
        minStock: 25,
        price: 45.00,
        expiryDate: '2024-12-10'
      }
    ];
    setInventory(mockInventory);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('providerType');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter prescriptions based on search query
    if (query.trim()) {
      const filtered = prescriptions.filter(prescription =>
        prescription.patientName.toLowerCase().includes(query.toLowerCase()) ||
        prescription.id.toLowerCase().includes(query.toLowerCase()) ||
        prescription.medicines.some(med => med.toLowerCase().includes(query.toLowerCase()))
      );
      setPrescriptions(filtered);
    } else {
      loadPrescriptions();
    }
  };

  const handleCallPatient = (phone) => {
    window.open(`tel:${phone}`);
  };

  const updatePrescriptionStatus = (id, newStatus) => {
    setPrescriptions(prev => prev.map(prescription =>
      prescription.id === id ? { ...prescription, status: newStatus } : prescription
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLowStockItems = () => {
    return inventory.filter(item => item.stock <= item.minStock);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar
          userRole="chemist"
          userData={userData}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userData?.fullName || 'Pharmacist'}!
            </h1>
            <p className="text-gray-600">
              Chemist Shop Dashboard - Manage prescriptions and inventory
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">💊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Pending Prescriptions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {prescriptions.filter(p => p.status === 'pending').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Ready for Pickup</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {prescriptions.filter(p => p.status === 'ready').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-2xl">📦</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Low Stock Items</p>
                  <p className="text-2xl font-bold text-gray-900">{getLowStockItems().length}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              placeholder="Search prescriptions by patient name, ID, or medicine..."
              onSearch={handleSearch}
              value={searchQuery}
            />
          </div>

          {/* Prescriptions List */}
          <Card className="p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {searchQuery ? 'Search Results' : 'Recent Prescriptions'}
              </h2>
              <Button>View All Prescriptions</Button>
            </div>

            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {prescription.patientName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{prescription.patientName}</h3>
                          <p className="text-sm text-gray-600">Patient ID: {prescription.patientId}</p>
                          <p className="text-sm text-gray-600">Phone: {prescription.phone}</p>
                          <p className="text-sm text-gray-600">Doctor: {prescription.doctorName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Medicines</p>
                        <div className="font-medium text-gray-900">
                          {prescription.medicines.map((med, idx) => (
                            <div key={idx} className="text-sm">{med}</div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          Date: {new Date(prescription.prescribedDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(prescription.status)}`}>
                        {prescription.status}
                      </div>

                      <div className="flex space-x-2">
                        {prescription.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => updatePrescriptionStatus(prescription.id, 'ready')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Prepare
                          </Button>
                        )}
                        {prescription.status === 'ready' && (
                          <Button
                            size="sm"
                            onClick={() => updatePrescriptionStatus(prescription.id, 'completed')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Complete
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => handleCallPatient(prescription.phone)}
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

            {prescriptions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No prescriptions found matching your search.</p>
              </div>
            )}
          </Card>

          {/* Low Stock Alert */}
          {getLowStockItems().length > 0 && (
            <Card className="p-6 mb-8 border-red-200 bg-red-50">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">⚠️</span>
                <h2 className="text-xl font-semibold text-red-900">Low Stock Alert</h2>
              </div>
              <div className="space-y-2">
                {getLowStockItems().map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Stock: {item.stock} | Min: {item.minStock}</p>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Order Now
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Manage Inventory</h3>
              <p className="text-sm text-gray-600 mb-4">Update stock levels and add new medicines</p>
              <Button size="sm">View Inventory</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sales Report</h3>
              <p className="text-sm text-gray-600 mb-4">View daily and monthly sales reports</p>
              <Button size="sm">View Reports</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Customer Support</h3>
              <p className="text-sm text-gray-600 mb-4">Manage customer inquiries and support</p>
              <Button size="sm">Support Center</Button>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChemistDashboard;
