import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const LabEquipment = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }

    // Load equipment data
    loadEquipment();
  }, []);

  const loadEquipment = () => {
    const mockEquipment = [
      {
        id: 'EQ001',
        name: 'Automated Blood Analyzer',
        category: 'Hematology',
        model: 'BA-3000',
        manufacturer: 'MedTech Solutions',
        serialNumber: 'MT-2023-001',
        purchaseDate: '2023-03-15',
        warrantyExpiry: '2026-03-15',
        status: 'operational',
        location: 'Lab Room A',
        lastMaintenance: '2024-01-05',
        nextMaintenance: '2024-04-05',
        maintenanceInterval: '3 months',
        cost: '₹12,50,000',
        technician: 'Rajesh Kumar',
        notes: 'Regular calibration completed. Working optimally.'
      },
      {
        id: 'EQ002',
        name: 'Digital X-Ray Machine',
        category: 'Radiology',
        model: 'DXR-500',
        manufacturer: 'RadiCare Systems',
        serialNumber: 'RC-2022-045',
        purchaseDate: '2022-08-20',
        warrantyExpiry: '2025-08-20',
        status: 'operational',
        location: 'X-Ray Room 1',
        lastMaintenance: '2023-12-20',
        nextMaintenance: '2024-06-20',
        maintenanceInterval: '6 months',
        cost: '₹25,00,000',
        technician: 'Priya Sharma',
        notes: 'Image quality excellent. Radiation levels within safe limits.'
      },
      {
        id: 'EQ003',
        name: 'MRI Scanner',
        category: 'Radiology',
        model: 'MRI-1.5T',
        manufacturer: 'Advanced Imaging Corp',
        serialNumber: 'AIC-2021-012',
        purchaseDate: '2021-11-10',
        warrantyExpiry: '2024-11-10',
        status: 'maintenance',
        location: 'MRI Suite',
        lastMaintenance: '2024-01-10',
        nextMaintenance: '2024-01-25',
        maintenanceInterval: '3 months',
        cost: '₹1,20,00,000',
        technician: 'Dr. Amit Patel',
        notes: 'Scheduled maintenance in progress. Expected completion: Jan 25.'
      },
      {
        id: 'EQ004',
        name: 'CT Scanner',
        category: 'Radiology',
        model: 'CT-64 Slice',
        manufacturer: 'ScanTech Medical',
        serialNumber: 'STM-2023-008',
        purchaseDate: '2023-06-01',
        warrantyExpiry: '2026-06-01',
        status: 'operational',
        location: 'CT Room',
        lastMaintenance: '2023-12-01',
        nextMaintenance: '2024-03-01',
        maintenanceInterval: '3 months',
        cost: '₹85,00,000',
        technician: 'Suresh Nair',
        notes: 'High-resolution imaging capability. All systems functioning normally.'
      },
      {
        id: 'EQ005',
        name: 'Chemistry Analyzer',
        category: 'Clinical Chemistry',
        model: 'CA-800',
        manufacturer: 'BioLab Instruments',
        serialNumber: 'BLI-2022-156',
        purchaseDate: '2022-12-15',
        warrantyExpiry: '2025-12-15',
        status: 'operational',
        location: 'Chemistry Lab',
        lastMaintenance: '2024-01-08',
        nextMaintenance: '2024-04-08',
        maintenanceInterval: '3 months',
        cost: '₹18,00,000',
        technician: 'Meera Krishnan',
        notes: 'Reagent levels optimal. Quality control tests passed.'
      },
      {
        id: 'EQ006',
        name: 'Ultrasound Machine',
        category: 'Radiology',
        model: 'US-Pro 3D',
        manufacturer: 'UltraSound Systems',
        serialNumber: 'USS-2023-023',
        purchaseDate: '2023-09-12',
        warrantyExpiry: '2026-09-12',
        status: 'operational',
        location: 'Ultrasound Room',
        lastMaintenance: '2023-12-12',
        nextMaintenance: '2024-03-12',
        maintenanceInterval: '3 months',
        cost: '₹8,50,000',
        technician: 'Kavitha Reddy',
        notes: '3D imaging capability. Probe functionality excellent.'
      },
      {
        id: 'EQ007',
        name: 'Microscope - Research Grade',
        category: 'Pathology',
        model: 'RM-2000',
        manufacturer: 'Precision Optics',
        serialNumber: 'PO-2022-089',
        purchaseDate: '2022-05-30',
        warrantyExpiry: '2025-05-30',
        status: 'out_of_order',
        location: 'Pathology Lab',
        lastMaintenance: '2023-11-30',
        nextMaintenance: '2024-02-28',
        maintenanceInterval: '3 months',
        cost: '₹4,50,000',
        technician: 'Dr. Ravi Kumar',
        notes: 'Objective lens damaged. Replacement ordered. ETA: Feb 20.'
      },
      {
        id: 'EQ008',
        name: 'Centrifuge Machine',
        category: 'General Lab',
        model: 'CF-5000',
        manufacturer: 'LabTech Equipment',
        serialNumber: 'LTE-2023-034',
        purchaseDate: '2023-04-18',
        warrantyExpiry: '2026-04-18',
        status: 'operational',
        location: 'Sample Prep Room',
        lastMaintenance: '2023-12-18',
        nextMaintenance: '2024-03-18',
        maintenanceInterval: '3 months',
        cost: '₹2,25,000',
        technician: 'Anita Sharma',
        notes: 'High-speed centrifugation. Balance calibration up to date.'
      }
    ];

    setEquipment(mockEquipment);
    setFilteredEquipment(mockEquipment);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('providerType');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(query, filterStatus, filterCategory);
  };

  const applyFilters = (search, status, category) => {
    let filtered = [...equipment];

    // Apply search filter
    if (search.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.model.toLowerCase().includes(search.toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()) ||
        item.technician.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (status !== 'all') {
      filtered = filtered.filter(item => item.status === status);
    }

    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    setFilteredEquipment(filtered);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    applyFilters(searchQuery, status, filterCategory);
  };

  const handleCategoryFilter = (category) => {
    setFilterCategory(category);
    applyFilters(searchQuery, filterStatus, category);
  };

  const handleUpdateStatus = (equipmentId, newStatus) => {
    setEquipment(prev => prev.map(item =>
      item.id === equipmentId ? { ...item, status: newStatus } : item
    ));
    applyFilters(searchQuery, filterStatus, filterCategory);
    alert(`Equipment status updated to ${newStatus.replace('_', ' ')}`);
  };

  const handleScheduleMaintenance = (equipmentId) => {
    const item = equipment.find(eq => eq.id === equipmentId);
    if (item) {
      const newDate = prompt('Enter maintenance date (YYYY-MM-DD):', item.nextMaintenance);
      if (newDate) {
        setEquipment(prev => prev.map(eq =>
          eq.id === equipmentId ? { ...eq, nextMaintenance: newDate } : eq
        ));
        applyFilters(searchQuery, filterStatus, filterCategory);
        alert('Maintenance scheduled successfully!');
      }
    }
  };

  const handleViewDetails = (equipmentId) => {
    const item = equipment.find(eq => eq.id === equipmentId);
    if (item) {
      alert(`Equipment Details:\n\nName: ${item.name}\nModel: ${item.model}\nManufacturer: ${item.manufacturer}\nSerial: ${item.serialNumber}\nLocation: ${item.location}\nTechnician: ${item.technician}\nNotes: ${item.notes}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_order': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isMaintenanceDue = (nextMaintenanceDate) => {
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenanceDate);
    const diffTime = maintenanceDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Due within 7 days
  };

  const getEquipmentStats = () => {
    return {
      total: equipment.length,
      operational: equipment.filter(eq => eq.status === 'operational').length,
      maintenance: equipment.filter(eq => eq.status === 'maintenance').length,
      outOfOrder: equipment.filter(eq => eq.status === 'out_of_order').length,
      maintenanceDue: equipment.filter(eq => isMaintenanceDue(eq.nextMaintenance)).length
    };
  };

  const stats = getEquipmentStats();

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Laboratory Equipment</h1>
            <p className="text-gray-600">Manage and monitor laboratory equipment and maintenance</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Equipment</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.operational}</div>
                <div className="text-sm text-gray-600">Operational</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.maintenance}</div>
                <div className="text-sm text-gray-600">In Maintenance</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.outOfOrder}</div>
                <div className="text-sm text-gray-600">Out of Order</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.maintenanceDue}</div>
                <div className="text-sm text-gray-600">Maintenance Due</div>
              </div>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar
                    placeholder="Search equipment by name, model, manufacturer, or location..."
                    onSearch={handleSearch}
                    value={searchQuery}
                  />
                </div>
                <Button>Add New Equipment</Button>
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
                    <option value="operational">Operational</option>
                    <option value="maintenance">In Maintenance</option>
                    <option value="out_of_order">Out of Order</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                  <select
                    value={filterCategory}
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="Hematology">Hematology</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Clinical Chemistry">Clinical Chemistry</option>
                    <option value="Pathology">Pathology</option>
                    <option value="General Lab">General Lab</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Equipment List */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Equipment Inventory ({filteredEquipment.length})
              </h2>
            </div>

            <div className="space-y-4">
              {filteredEquipment.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">🔬</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.model} - {item.manufacturer}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                          {item.status.replace('_', ' ')}
                        </span>
                        {isMaintenanceDue(item.nextMaintenance) && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                            Maintenance Due
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Category:</span> {item.category}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span> {item.location}
                        </div>
                        <div>
                          <span className="font-medium">Serial:</span> {item.serialNumber}
                        </div>
                        <div>
                          <span className="font-medium">Technician:</span> {item.technician}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Purchase Date:</span> {new Date(item.purchaseDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Warranty Expires:</span> {new Date(item.warrantyExpiry).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Cost:</span> {item.cost}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Last Maintenance:</span> {new Date(item.lastMaintenance).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Next Maintenance:</span> {new Date(item.nextMaintenance).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 mt-3">
                        <span className="font-medium text-gray-900">Notes:</span>
                        <p className="text-sm text-gray-700 mt-1">{item.notes}</p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        size="sm"
                        onClick={() => handleViewDetails(item.id)}
                      >
                        View Details
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleScheduleMaintenance(item.id)}
                      >
                        Schedule Maintenance
                      </Button>

                      {item.status === 'operational' && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleUpdateStatus(item.id, 'maintenance')}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white"
                        >
                          Mark for Maintenance
                        </Button>
                      )}

                      {item.status === 'maintenance' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(item.id, 'operational')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Mark Operational
                        </Button>
                      )}

                      {item.status === 'out_of_order' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(item.id, 'operational')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Mark Fixed
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredEquipment.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <p className="text-gray-500">No equipment found matching your criteria.</p>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default LabEquipment;
