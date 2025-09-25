import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';

const ChemistSales = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [todaySales, setTodaySales] = useState([]);
  const [weekSales, setWeekSales] = useState([]);
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }

    // Load mock sales data
    loadSalesData();
  }, []);

  const loadSalesData = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Today's sales
    const mockTodaySales = [
      {
        id: 'SALE001',
        time: '09:30 AM',
        customerName: 'Rajesh Kumar',
        prescriptionId: 'PRE001',
        medicines: [
          { name: 'Paracetamol 500mg', quantity: 2, price: 25.00 },
          { name: 'Cough Syrup', quantity: 1, price: 45.00 }
        ],
        total: 95.00,
        paymentMethod: 'Cash'
      },
      {
        id: 'SALE002',
        time: '11:15 AM',
        customerName: 'Priya Sharma',
        prescriptionId: 'PRE002',
        medicines: [
          { name: 'Amoxicillin 250mg', quantity: 1, price: 75.00 },
          { name: 'Vitamin D3', quantity: 1, price: 120.00 }
        ],
        total: 195.00,
        paymentMethod: 'UPI'
      },
      {
        id: 'SALE003',
        time: '02:45 PM',
        customerName: 'Mohammed Ali',
        prescriptionId: 'PRE003',
        medicines: [
          { name: 'Insulin Injection', quantity: 2, price: 450.00 },
          { name: 'Blood Glucose Strips', quantity: 1, price: 280.00 }
        ],
        total: 1180.00,
        paymentMethod: 'Card'
      },
      {
        id: 'SALE004',
        time: '04:20 PM',
        customerName: 'Sunita Devi',
        prescriptionId: null,
        medicines: [
          { name: 'Aspirin 75mg', quantity: 1, price: 15.00 },
          { name: 'Antacid Tablets', quantity: 1, price: 35.00 }
        ],
        total: 50.00,
        paymentMethod: 'Cash'
      }
    ];

    // This week's sales (last 7 days)
    const mockWeekSales = [
      { date: '2024-01-25', sales: 15, revenue: 3250.00 },
      { date: '2024-01-24', sales: 12, revenue: 2890.00 },
      { date: '2024-01-23', sales: 18, revenue: 4120.00 },
      { date: '2024-01-22', sales: 14, revenue: 3680.00 },
      { date: '2024-01-21', sales: 10, revenue: 2340.00 },
      { date: '2024-01-20', sales: 16, revenue: 3950.00 },
      { date: '2024-01-19', sales: 13, revenue: 3180.00 }
    ];

    setTodaySales(mockTodaySales);
    setWeekSales(mockWeekSales);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('providerType');
    navigate('/');
  };

  const getTodayStats = () => {
    const totalSales = todaySales.length;
    const totalRevenue = todaySales.reduce((sum, sale) => sum + sale.total, 0);
    const avgSaleValue = totalSales > 0 ? totalRevenue / totalSales : 0;
    const cashSales = todaySales.filter(sale => sale.paymentMethod === 'Cash').length;
    
    return { totalSales, totalRevenue, avgSaleValue, cashSales };
  };

  const getWeekStats = () => {
    const totalSales = weekSales.reduce((sum, day) => sum + day.sales, 0);
    const totalRevenue = weekSales.reduce((sum, day) => sum + day.revenue, 0);
    const avgDailyRevenue = weekSales.length > 0 ? totalRevenue / weekSales.length : 0;
    const bestDay = weekSales.reduce((best, day) => day.revenue > best.revenue ? day : best, weekSales[0] || {});
    
    return { totalSales, totalRevenue, avgDailyRevenue, bestDay };
  };

  const todayStats = getTodayStats();
  const weekStats = getWeekStats();

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Report</h1>
            <p className="text-gray-600">Track your daily and weekly sales performance</p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('today')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'today'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📅 Today's Sales
                </button>
                <button
                  onClick={() => setActiveTab('week')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'week'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📊 Weekly Report
                </button>
              </nav>
            </div>
          </div>

          {/* Today's Sales Tab */}
          {activeTab === 'today' && (
            <>
              {/* Today's Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <span className="text-2xl">🛒</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Sales</p>
                      <p className="text-2xl font-bold text-gray-900">{todayStats.totalSales}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <span className="text-2xl">₹</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">₹{todayStats.totalRevenue.toFixed(2)}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <span className="text-2xl">📈</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Avg Sale Value</p>
                      <p className="text-2xl font-bold text-gray-900">₹{todayStats.avgSaleValue.toFixed(2)}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <span className="text-2xl">💵</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Cash Sales</p>
                      <p className="text-2xl font-bold text-gray-900">{todayStats.cashSales}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Today's Sales List */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Today's Sales ({new Date().toLocaleDateString()})
                  </h2>
                  <Button>Export Report</Button>
                </div>

                <div className="space-y-4">
                  {todaySales.map((sale) => (
                    <div key={sale.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {sale.customerName} - {sale.time}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              sale.paymentMethod === 'Cash' ? 'bg-green-100 text-green-800' :
                              sale.paymentMethod === 'UPI' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {sale.paymentMethod}
                            </span>
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-2">
                            Sale ID: {sale.id} 
                            {sale.prescriptionId && ` | Prescription: ${sale.prescriptionId}`}
                          </div>
                          
                          <div className="space-y-1">
                            {sale.medicines.map((med, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{med.name} x{med.quantity}</span>
                                <span>₹{(med.price * med.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-semibold">
                              <span>Total</span>
                              <span>₹{sale.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {/* Weekly Report Tab */}
          {activeTab === 'week' && (
            <>
              {/* Week Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <span className="text-2xl">🛒</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Sales (7 days)</p>
                      <p className="text-2xl font-bold text-gray-900">{weekStats.totalSales}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <span className="text-2xl">₹</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">₹{weekStats.totalRevenue.toFixed(2)}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Avg Daily Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">₹{weekStats.avgDailyRevenue.toFixed(2)}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Best Day</p>
                      <p className="text-lg font-bold text-gray-900">
                        {weekStats.bestDay?.date ? new Date(weekStats.bestDay.date).toLocaleDateString() : 'N/A'}
                      </p>
                      <p className="text-sm text-gray-600">₹{weekStats.bestDay?.revenue?.toFixed(2) || '0'}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Weekly Sales Chart */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Weekly Sales Breakdown</h2>
                  <Button>Export Weekly Report</Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Day
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sales Count
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Performance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {weekSales.map((day, index) => {
                        const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' });
                        const isToday = day.date === new Date().toISOString().split('T')[0];
                        const performance = day.revenue >= weekStats.avgDailyRevenue ? 'Above Average' : 'Below Average';
                        
                        return (
                          <tr key={index} className={`hover:bg-gray-50 ${isToday ? 'bg-blue-50' : ''}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {new Date(day.date).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{dayName}</div>
                              {isToday && <div className="text-xs text-blue-600">Today</div>}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {day.sales}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ₹{day.revenue.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                performance === 'Above Average' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {performance}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChemistSales;
