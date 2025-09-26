import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';

const Emergency = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    const role = localStorage.getItem('userRole');
    
    if (role) {
      setUserRole(role);
      if (data) {
        setUserData(JSON.parse(data));
      } else {
        // Create minimal user data if missing
        setUserData({ fullName: 'User', email: 'user@example.com' });
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const emergencyContacts = [
    {
      name: 'Ambulance Service',
      number: '108',
      description: '24/7 Emergency Medical Services',
      icon: '🚑'
    },
    {
      name: 'Police',
      number: '100',
      description: 'Emergency Police Services',
      icon: '👮'
    },
    {
      name: 'Fire Department',
      number: '101',
      description: 'Fire & Rescue Services',
      icon: '🚒'
    },
    {
      name: 'Women Helpline',
      number: '1091',
      description: '24x7 Helpline for Women',
      icon: '👩'
    },
    {
      name: 'Child Helpline',
      number: '1098',
      description: 'Emergency helpline for children',
      icon: '👶'
    },
    {
      name: 'Poison Control',
      number: '1066',
      description: 'Poison Control Center',
      icon: '☠️'
    }
  ];

  const nearbyHospitals = [
    {
      name: 'Government Medical College Hospital',
      address: 'Thiruvananthapuram, Kerala',
      phone: '+91 471 2528300',
      distance: '2.5 km',
      emergency: true
    },
    {
      name: 'KIMS Hospital',
      address: 'Anayara, Thiruvananthapuram',
      phone: '+91 471 3041000',
      distance: '4.2 km',
      emergency: true
    },
    {
      name: 'Sree Chitra Tirunal Institute',
      address: 'Medical College P.O, Thiruvananthapuram',
      phone: '+91 471 2524266',
      distance: '3.8 km',
      emergency: true
    }
  ];

  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showAdminPanel={userRole === 'admin'} />

      <div className="flex">
        <Sidebar
          userRole={userRole}
          userData={userData}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-red-600 mb-2">🚨 Emergency Services</h1>
            <p className="text-gray-600">Quick access to emergency contacts and nearby hospitals</p>
          </div>

          {/* Emergency Alert */}
          <Card className="p-6 mb-6 bg-red-50 border-red-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-4xl">🚨</span>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-red-800">In Case of Emergency</h2>
                <p className="text-red-700">
                  If this is a life-threatening emergency, call 108 immediately for ambulance services.
                </p>
              </div>
              <div className="ml-auto">
                <Button 
                  onClick={() => handleCall('108')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-3"
                >
                  Call 108
                </Button>
              </div>
            </div>
          </Card>

          {/* Emergency Contacts */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contacts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{contact.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">{contact.number}</span>
                    <Button 
                      size="sm" 
                      onClick={() => handleCall(contact.number)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Nearby Hospitals */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Nearby Hospitals</h2>
            <div className="space-y-4">
              {nearbyHospitals.map((hospital, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                        {hospital.emergency && (
                          <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            24/7 Emergency
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{hospital.address}</p>
                      <p className="text-sm text-gray-600">Distance: {hospital.distance}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{hospital.phone}</p>
                      <div className="mt-2 space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleCall(hospital.phone)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Call
                        </Button>
                        <Button size="sm" variant="secondary">Directions</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Personal Emergency Info */}
          {userData && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Emergency Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700">Personal Details</h3>
                  <p className="text-sm text-gray-600 mt-1">Name: {userData.fullName || 'Not provided'}</p>
                  <p className="text-sm text-gray-600">Blood Group: {userData.bloodGroup || 'Not provided'}</p>
                  <p className="text-sm text-gray-600">Phone: {userData.phone || 'Not provided'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Emergency Contact</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Contact: {userData.emergencyContact || 'Not provided'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Phone: {userData.emergencyPhone || 'Not provided'}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-medium text-gray-700">Medical Information</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Allergies: {userData.allergies || 'None reported'}
                </p>
                <p className="text-sm text-gray-600">
                  Current Medications: {userData.currentMedications || 'None reported'}
                </p>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Emergency;
