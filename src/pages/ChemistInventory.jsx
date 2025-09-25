import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const ChemistInventory = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }

    // Load mock inventory data
    loadInventory();
  }, []);

  const loadInventory = () => {
    const mockInventory = [
      {
        id: 'MED001',
        name: 'Paracetamol 500mg',
        category: 'Pain Relief',
        stock: 150,
        minStock: 50,
        price: 25.00,
        expiryDate: '2025-06-15',
        manufacturer: 'PharmaCorp',
        batchNo: 'PC001'
      },
      {
        id: 'MED002',
        name: 'Amoxicillin 250mg',
        category: 'Antibiotics',
        stock: 45,
        minStock: 50,
        price: 75.00,
        expiryDate: '2024-08-20',
        manufacturer: 'MediLife',
        batchNo: 'ML002'
      },
      {
        id: 'MED003',
        name: 'Cough Syrup',
        category: 'Cold & Flu',
        stock: 30,
        minStock: 25,
        price: 45.00,
        expiryDate: '2024-12-10',
        manufacturer: 'HealthPlus',
        batchNo: 'HP003'
      },
      {
        id: 'MED004',
        name: 'Vitamin D3 Tablets',
        category: 'Vitamins',
        stock: 80,
        minStock: 30,
        price: 120.00,
        expiryDate: '2025-03-22',
        manufacturer: 'VitaHealth',
        batchNo: 'VH004'
      },
      {
        id: 'MED005',
        name: 'Insulin Injection',
        category: 'Diabetes',
        stock: 15,
        minStock: 20,
        price: 450.00,
        expiryDate: '2024-09-15',
        manufacturer: 'DiabetCare',
        batchNo: 'DC005'
      },
      {
        id: 'MED006',
        name: 'Blood Pressure Monitor',
        category: 'Medical Devices',
        stock: 12,
        minStock: 5,
        price: 1200.00,
        expiryDate: '2026-01-01',
        manufacturer: 'MedDevice',
        batchNo: 'MD006'
      },
      {
        id: 'MED007',
        name: 'Aspirin 75mg',
        category: 'Cardiovascular',
        stock: 200,
        minStock: 75,
        price: 15.00,
        expiryDate: '2025-11-30',
        manufacturer: 'CardioMed',
        batchNo: 'CM007'
      },
      {
        id: 'MED008',
        name: 'Antacid Tablets',
        category: 'Digestive',
        stock: 60,
        minStock: 40,
        price: 35.00,
        expiryDate: '2025-02-14',
        manufacturer: 'DigestWell',
        batchNo: 'DW008'
      }
    ];
    setInventory(mockInventory);
    setFilteredInventory(mockInventory);
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
      const filtered = inventory.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredInventory(filtered);
    } else {
      setFilteredInventory(inventory);
    }
  };

  const getStockStatus = (item) => {
    if (item.stock <= item.minStock) {
      return { status: 'Low Stock', color: 'bg-red-100 text-red-800' };
    } else if (item.stock <= item.minStock * 1.5) {
      return { status: 'Medium Stock', color: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { status: 'In Stock', color: 'bg-green-100 text-green-800' };
    }
  };

  const isExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90; // Expiring within 3 months
  };

  const updateStock = (id, newStock) => {
    setInventory(prev => prev.map(item =>
      item.id === id ? { ...item, stock: newStock } : item
    ));
    setFilteredInventory(prev => prev.map(item =>
      item.id === id ? { ...item, stock: newStock } : item
    ));
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
            <p className="text-gray-600">Manage your medication inventory and stock levels</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              placeholder="Search medicines by name, category, or manufacturer..."
              onSearch={handleSearch}
              value={searchQuery}
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">💊</span>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {inventory.filter(item => item.stock <= item.minStock).length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {inventory.filter(item => isExpiringSoon(item.expiryDate)).length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">₹</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{inventory.reduce((total, item) => total + (item.stock * item.price), 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Inventory Table */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Medication Inventory ({filteredInventory.length} items)
              </h2>
              <Button>Add New Medicine</Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Medicine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry Date
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
                  {filteredInventory.map((item) => {
                    const stockStatus = getStockStatus(item);
                    const expiringSoon = isExpiringSoon(item.expiryDate);
                    
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">
                              {item.manufacturer} | Batch: {item.batchNo}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.stock} units</div>
                          <div className="text-sm text-gray-500">Min: {item.minStock}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${expiringSoon ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                            {new Date(item.expiryDate).toLocaleDateString()}
                          </div>
                          {expiringSoon && (
                            <div className="text-xs text-red-500">Expiring Soon!</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
                            {stockStatus.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => {
                                const newStock = prompt(`Update stock for ${item.name}:`, item.stock);
                                if (newStock && !isNaN(newStock)) {
                                  updateStock(item.id, parseInt(newStock));
                                }
                              }}
                            >
                              Update Stock
                            </Button>
                            <Button size="sm" variant="secondary">View Details</Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ChemistInventory;
