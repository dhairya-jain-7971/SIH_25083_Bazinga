import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const tabs = [
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'diagnosis', label: 'Diagnosis', icon: '🔍' },
    { id: 'prescriptions', label: 'Prescriptions', icon: '💊' },
    { id: 'lab-data', label: 'Lab Data', icon: '🧪' },
    { id: 'schemes', label: 'Govt Schemes', icon: '🏛️' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <AppointmentsTab />;
      case 'diagnosis':
        return <DiagnosisTab />;
      case 'prescriptions':
        return <PrescriptionsTab />;
      case 'lab-data':
        return <LabDataTab />;
      case 'schemes':
        return <SchemesTab />;
      default:
        return <AppointmentsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar
          userRole="patient"
          userData={userData}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userData?.fullName || 'Patient'}!
            </h1>
            <p className="text-gray-600">
              Manage your health records and appointments
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Upcoming Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">💊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Active Prescriptions</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-2xl">🧪</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Lab Reports</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Eligible Schemes</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

// Appointments Tab Component
const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      type: 'Consultation',
      date: '2024-01-15',
      time: '11:00 AM',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialization: 'General Physician',
      type: 'Follow-up',
      date: '2024-01-20',
      time: '2:30 PM',
      status: 'pending'
    },
    {
      id: 3,
      doctor: 'Dr. Emily Davis',
      specialization: 'Dermatologist',
      type: 'Consultation',
      date: '2024-01-25',
      time: '11:15 AM',
      status: 'completed'
    }
  ]);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    specialization: '',
    doctor: '',
    appointmentType: 'consultation',
    preferredDate: '',
    preferredTime: '',
    symptoms: '',
    notes: ''
  });

  const availableDoctors = {
    'cardiology': [
      { name: 'Dr. Sarah Johnson', specialization: 'Cardiologist' },
      { name: 'Dr. Rajesh Gupta', specialization: 'Cardiologist' }
    ],
    'general': [
      { name: 'Dr. Michael Chen', specialization: 'General Physician' },
      { name: 'Dr. Priya Sharma', specialization: 'General Physician' }
    ],
    'dermatology': [
      { name: 'Dr. Emily Davis', specialization: 'Dermatologist' },
      { name: 'Dr. Amit Kumar', specialization: 'Dermatologist' }
    ],
    'orthopedics': [
      { name: 'Dr. John Smith', specialization: 'Orthopedic Surgeon' },
      { name: 'Dr. Kavita Patel', specialization: 'Orthopedic Surgeon' }
    ],
    'pediatrics': [
      { name: 'Dr. Lisa Wong', specialization: 'Pediatrician' },
      { name: 'Dr. Ravi Menon', specialization: 'Pediatrician' }
    ]
  };

  const handleReschedule = (appointmentId) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      const newDate = prompt('Enter new date (YYYY-MM-DD):', appointment.date);
      const newTime = prompt('Enter new time (HH:MM AM/PM):', appointment.time);
      
      if (newDate && newTime) {
        setAppointments(prev => prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, date: newDate, time: newTime, status: 'pending' }
            : apt
        ));
        alert('Appointment rescheduled successfully!');
      }
    }
  };

  const handleCancel = (appointmentId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this appointment?');
    if (confirmed) {
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' }
          : apt
      ));
      alert('Appointment cancelled successfully!');
    }
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    
    if (!bookingForm.specialization || !bookingForm.doctor || !bookingForm.preferredDate || !bookingForm.preferredTime) {
      alert('Please fill in all required fields.');
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      doctor: bookingForm.doctor,
      specialization: availableDoctors[bookingForm.specialization]?.find(doc => doc.name === bookingForm.doctor)?.specialization || bookingForm.specialization,
      type: bookingForm.appointmentType,
      date: bookingForm.preferredDate,
      time: bookingForm.preferredTime,
      status: 'pending'
    };

    setAppointments(prev => [...prev, newAppointment]);
    setShowBookingModal(false);
    setBookingForm({
      specialization: '',
      doctor: '',
      appointmentType: 'consultation',
      preferredDate: '',
      preferredTime: '',
      symptoms: '',
      notes: ''
    });
    
    alert('Appointment booked successfully! You will receive a confirmation shortly.');
  };

  const getDoctorsForSpecialization = (specialization) => {
    return availableDoctors[specialization] || [];
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Appointments</h2>
        <Button onClick={() => setShowBookingModal(true)}>Book New Appointment</Button>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
                <p className="text-sm text-gray-600">{appointment.specialization}</p>
                <p className="text-sm text-gray-600">{appointment.type}</p>
                <p className="text-sm text-gray-600">
                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : appointment.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {appointment.status}
                </span>
                {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                  <div className="mt-2 space-x-2">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => handleReschedule(appointment.id)}
                    >
                      Reschedule
                    </Button>
                    <Button 
                      size="sm" 
                      variant="danger"
                      onClick={() => handleCancel(appointment.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Book New Appointment</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <select
                    name="specialization"
                    value={bookingForm.specialization}
                    onChange={handleBookingInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Specialization</option>
                    <option value="general">General Medicine</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor *
                  </label>
                  <select
                    name="doctor"
                    value={bookingForm.doctor}
                    onChange={handleBookingInputChange}
                    required
                    disabled={!bookingForm.specialization}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Select Doctor</option>
                    {getDoctorsForSpecialization(bookingForm.specialization).map((doctor, index) => (
                      <option key={index} value={doctor.name}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type
                  </label>
                  <select
                    name="appointmentType"
                    value={bookingForm.appointmentType}
                    onChange={handleBookingInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="consultation">Consultation</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="check-up">Check-up</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={bookingForm.preferredDate}
                    onChange={handleBookingInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    name="preferredTime"
                    value={bookingForm.preferredTime}
                    onChange={handleBookingInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms/Reason for Visit
                </label>
                <textarea
                  name="symptoms"
                  value={bookingForm.symptoms}
                  onChange={handleBookingInputChange}
                  rows="3"
                  placeholder="Describe your symptoms or reason for the appointment..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={bookingForm.notes}
                  onChange={handleBookingInputChange}
                  rows="2"
                  placeholder="Any additional information or special requests..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Book Appointment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Diagnosis Tab Component
const DiagnosisTab = () => {
  const diagnoses = [
    {
      id: 1,
      date: '2024-01-10',
      doctor: 'Dr. Sarah Johnson',
      condition: 'Hypertension',
      notes: 'Blood pressure reading: 140/90 mmHg. Patient advised to monitor regularly.',
      severity: 'moderate'
    },
    {
      id: 2,
      date: '2023-12-15',
      doctor: 'Dr. Michael Chen',
      condition: 'Seasonal Allergies',
      notes: 'Allergic rhinitis symptoms. Prescribed antihistamines.',
      severity: 'mild'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Medical History</h2>

      <div className="space-y-4">
        {diagnoses.map((diagnosis) => (
          <Card key={diagnosis.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{diagnosis.condition}</h3>
                <p className="text-sm text-gray-600">Diagnosed by {diagnosis.doctor}</p>
                <p className="text-sm text-gray-600">
                  {new Date(diagnosis.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700 mt-2">{diagnosis.notes}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                diagnosis.severity === 'mild'
                  ? 'bg-green-100 text-green-800'
                  : diagnosis.severity === 'moderate'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {diagnosis.severity}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Prescriptions Tab Component
const PrescriptionsTab = () => {
  const prescriptions = [
    {
      id: 1,
      medication: 'Amlodipine',
      dosage: '5mg',
      frequency: 'Once daily',
      duration: '30 days',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-01-10',
      status: 'active'
    },
    {
      id: 2,
      medication: 'Cetirizine',
      dosage: '10mg',
      frequency: 'Once daily as needed',
      duration: '15 days',
      doctor: 'Dr. Michael Chen',
      date: '2023-12-15',
      status: 'completed'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">My Prescriptions</h2>

      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{prescription.medication}</h3>
                <p className="text-sm text-gray-600">{prescription.dosage} - {prescription.frequency}</p>
                <p className="text-sm text-gray-600">Duration: {prescription.duration}</p>
                <p className="text-sm text-gray-600">Prescribed by {prescription.doctor}</p>
                <p className="text-sm text-gray-600">
                  {new Date(prescription.date).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                prescription.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {prescription.status}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Lab Data Tab Component
const LabDataTab = () => {
  const labReports = [
    {
      id: 1,
      test: 'Complete Blood Count',
      date: '2024-01-05',
      lab: 'City Diagnostic Center',
      status: 'completed',
      results: 'Normal ranges'
    },
    {
      id: 2,
      test: 'Lipid Profile',
      date: '2023-12-20',
      lab: 'MedLab Kerala',
      status: 'completed',
      results: 'Slightly elevated cholesterol'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Lab Reports</h2>

      <div className="space-y-4">
        {labReports.map((report) => (
          <Card key={report.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{report.test}</h3>
                <p className="text-sm text-gray-600">Conducted at {report.lab}</p>
                <p className="text-sm text-gray-600">
                  {new Date(report.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700 mt-2">{report.results}</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {report.status}
                </span>
                <div className="mt-2">
                  <Button size="sm" variant="secondary">View Details</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Government Schemes Tab Component
const SchemesTab = () => {
  const schemes = [
    {
      id: 1,
      name: 'Ayushman Bharat',
      description: 'National health protection scheme providing coverage up to ₹5 lakhs per family',
      eligibility: 'Based on SECC 2011 data',
      benefits: 'Cashless treatment at empaneled hospitals',
      status: 'eligible'
    },
    {
      id: 2,
      name: 'Kerala Arogya Scheme',
      description: 'State health insurance scheme for Kerala residents',
      eligibility: 'Kerala residents with annual income below ₹3 lakhs',
      benefits: 'Free medical treatment up to ₹2 lakhs',
      status: 'eligible'
    },
    {
      id: 3,
      name: 'Pradhan Mantri Jan Arogya Yojana',
      description: 'Health insurance scheme for vulnerable families',
      eligibility: 'Socio-economic caste census data',
      benefits: 'Health coverage for secondary and tertiary care',
      status: 'pending'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Government Health Schemes</h2>

      <div className="space-y-4">
        {schemes.map((scheme) => (
          <Card key={scheme.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{scheme.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
                <p className="text-sm text-gray-700 mt-2"><strong>Eligibility:</strong> {scheme.eligibility}</p>
                <p className="text-sm text-gray-700"><strong>Benefits:</strong> {scheme.benefits}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                scheme.status === 'eligible'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {scheme.status}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientDashboard;
