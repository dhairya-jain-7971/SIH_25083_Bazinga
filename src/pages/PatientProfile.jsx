import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import FormInput from '../components/FormInput';

const PatientProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const data = localStorage.getItem('userData');
    const role = localStorage.getItem('userRole');

    if (data && role === 'patient') {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
      setFormData(parsedData);
    } else {
      // If not a patient or no data, redirect to home
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(formData));
    setUserData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showAdminPanel={false} />

      <div className="flex">
        <Sidebar
          userRole="patient"
          userData={userData}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your personal and medical information</p>
          </div>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              ) : (
                <div className="space-x-2">
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Full Name"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />

              <FormInput
                label="Phone Number"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />

              <FormInput
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />

              <FormInput
                label="Blood Group"
                name="bloodGroup"
                value={formData.bloodGroup || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />

              <FormInput
                label="Emergency Contact"
                name="emergencyContact"
                value={formData.emergencyContact || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />

              <div className="md:col-span-2">
                <FormInput
                  label="Address"
                  name="address"
                  type="textarea"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your full address..."
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Allergies"
                  name="allergies"
                  type="textarea"
                  value={formData.allergies || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="List any known allergies..."
                />

                <FormInput
                  label="Current Medications"
                  name="currentMedications"
                  type="textarea"
                  value={formData.currentMedications || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="List current medications and dosages..."
                />
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default PatientProfile;
