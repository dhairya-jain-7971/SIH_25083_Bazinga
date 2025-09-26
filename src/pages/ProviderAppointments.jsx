import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';

const ProviderAppointments = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState('doctor');
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('today');

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    const role = localStorage.getItem('userRole');
    
    if (data) {
      setUserData(JSON.parse(data));
    }
    if (role) {
      setUserRole(role);
    }

    // Load appointments data
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const mockAppointments = [
      {
        id: 'APT001',
        patientName: 'Ramesh Kumar',
        patientId: 'PAT001',
        phone: '+91 9876543210',
        date: today.toISOString().split('T')[0],
        time: '09:00 AM',
        duration: '30 min',
        type: 'Consultation',
        status: 'confirmed',
        reason: 'Regular checkup for diabetes',
        notes: 'Patient reports stable blood sugar levels'
      },
      {
        id: 'APT002',
        patientName: 'Suresh Patel',
        patientId: 'PAT002',
        phone: '+91 9876543211',
        date: today.toISOString().split('T')[0],
        time: '10:30 AM',
        duration: '45 min',
        type: 'Follow-up',
        status: 'confirmed',
        reason: 'Migraine follow-up',
        notes: 'Review medication effectiveness'
      },
      {
        id: 'APT003',
        patientName: 'Akshat Sharma',
        patientId: 'PAT003',
        phone: '+91 9876543212',
        date: today.toISOString().split('T')[0],
        time: '02:00 PM',
        duration: '30 min',
        type: 'Consultation',
        status: 'pending',
        reason: 'Arthritis pain management',
        notes: 'Patient experiencing increased joint pain'
      },
      {
        id: 'APT004',
        patientName: 'Priya Menon',
        patientId: 'PAT004',
        phone: '+91 9876543213',
        date: tomorrow.toISOString().split('T')[0],
        time: '11:00 AM',
        duration: '30 min',
        type: 'Consultation',
        status: 'confirmed',
        reason: 'Asthma management',
        notes: 'Review inhaler technique and medication'
      },
      {
        id: 'APT005',
        patientName: 'Arjun Kumar',
        patientId: 'PAT005',
        phone: '+91 9876543214',
        date: tomorrow.toISOString().split('T')[0],
        time: '03:30 PM',
        duration: '30 min',
        type: 'Follow-up',
        status: 'confirmed',
        reason: 'Cholesterol management',
        notes: 'Review lab results and adjust medication'
      },
      {
        id: 'APT006',
        patientName: 'Kavita Patel',
        patientId: 'PAT006',
        phone: '+91 9876543215',
        date: nextWeek.toISOString().split('T')[0],
        time: '09:30 AM',
        duration: '60 min',
        type: 'Consultation',
        status: 'pending',
        reason: 'Annual physical examination',
        notes: 'Comprehensive health checkup'
      },
      {
        id: 'APT007',
        patientName: 'Rohit Sharma',
        patientId: 'PAT007',
        phone: '+91 9876543216',
        date: '2024-01-08',
        time: '04:00 PM',
        duration: '30 min',
        type: 'Consultation',
        status: 'completed',
        reason: 'Hypertension consultation',
        notes: 'Blood pressure controlled, continue current medication'
      },
      {
        id: 'APT008',
        patientName: 'Anjali Singh',
        patientId: 'PAT008',
        phone: '+91 9876543217',
        date: '2024-01-09',
        time: '01:00 PM',
        duration: '30 min',
        type: 'Follow-up',
        status: 'cancelled',
        reason: 'Skin condition follow-up',
        notes: 'Patient cancelled due to travel'
      }
    ];

    setAppointments(mockAppointments);
    setFilteredAppointments(mockAppointments);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('providerType');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(query, filterStatus, filterDate);
  };

  const applyFilters = (search, status, dateFilter) => {
    let filtered = [...appointments];

    // Apply search filter
    if (search.trim()) {
      filtered = filtered.filter(appointment =>
        appointment.patientName.toLowerCase().includes(search.toLowerCase()) ||
        appointment.patientId.toLowerCase().includes(search.toLowerCase()) ||
        appointment.reason.toLowerCase().includes(search.toLowerCase()) ||
        appointment.type.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (status !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === status);
    }

    // Apply date filter
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    if (dateFilter === 'today') {
      filtered = filtered.filter(appointment => appointment.date === today);
    } else if (dateFilter === 'tomorrow') {
      filtered = filtered.filter(appointment => appointment.date === tomorrowStr);
    } else if (dateFilter === 'week') {
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      filtered = filtered.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= new Date() && appointmentDate <= weekFromNow;
      });
    }

    setFilteredAppointments(filtered);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    applyFilters(searchQuery, status, filterDate);
  };

  const handleDateFilter = (dateFilter) => {
    setFilterDate(dateFilter);
    applyFilters(searchQuery, filterStatus, dateFilter);
  };

  const handleCallPatient = (phone) => {
    window.open(`tel:${phone}`);
  };

  const handleUpdateStatus = (appointmentId, newStatus) => {
    setAppointments(prev => prev.map(apt =>
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
    // Reapply filters
    applyFilters(searchQuery, filterStatus, filterDate);
    alert(`Appointment status updated to ${newStatus}`);
  };

  const handleReschedule = (appointmentId) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      const newDate = prompt('Enter new date (YYYY-MM-DD):', appointment.date);
      const newTime = prompt('Enter new time (HH:MM AM/PM):', appointment.time);
      
      if (newDate && newTime) {
        setAppointments(prev => prev.map(apt =>
          apt.id === appointmentId 
            ? { ...apt, date: newDate, time: newTime, status: 'confirmed' }
            : apt
        ));
        applyFilters(searchQuery, filterStatus, filterDate);
        alert('Appointment rescheduled successfully!');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAppointmentStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(apt => apt.date === today);
    
    return {
      total: appointments.length,
      today: todayAppointments.length,
      confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
      pending: appointments.filter(apt => apt.status === 'pending').length,
      completed: appointments.filter(apt => apt.status === 'completed').length
    };
  };

  const stats = getAppointmentStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar
          userRole={userRole}
          userData={userData}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
            <p className="text-gray-600">Manage your patient appointments and schedule</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.today}</div>
                <div className="text-sm text-gray-600">Today</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
                <div className="text-sm text-gray-600">Confirmed</div>
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
                <div className="text-2xl font-bold text-purple-600">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar
                    placeholder="Search appointments by patient name, ID, or reason..."
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
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Date:</span>
                  <select
                    value={filterDate}
                    onChange={(e) => handleDateFilter(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="week">This Week</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Appointments List */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Appointments ({filteredAppointments.length})
              </h2>
            </div>

            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {appointment.patientName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                          <p className="text-sm text-gray-600">ID: {appointment.patientId}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Date:</span> {new Date(appointment.date).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {appointment.time}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {appointment.duration}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {appointment.type}
                        </div>
                      </div>

                      <div className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">Reason:</span> {appointment.reason}
                      </div>
                      
                      {appointment.notes && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Notes:</span> {appointment.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        size="sm"
                        onClick={() => handleCallPatient(appointment.phone)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        📞 Call
                      </Button>
                      
                      {appointment.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(appointment.id, 'confirmed')}
                        >
                          Confirm
                        </Button>
                      )}
                      
                      {(appointment.status === 'confirmed' || appointment.status === 'pending') && (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleReschedule(appointment.id)}
                          >
                            Reschedule
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(appointment.id, 'completed')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Mark Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleUpdateStatus(appointment.id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAppointments.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <p className="text-gray-500">No appointments found matching your criteria.</p>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ProviderAppointments;
