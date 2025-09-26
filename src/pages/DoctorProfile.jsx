import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import FormInput from '../components/FormInput';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const data = localStorage.getItem('userData');
    const role = localStorage.getItem('userRole');

    if (data && (role === 'doctor' || role === 'provider')) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
      setFormData(parsedData);
    } else {
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
          userRole="doctor"
          userData={userData}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your professional information</p>
          </div>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Professional Information</h2>
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
                label="Specialization"
                name="specialization"
                value={formData.specialization || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />

              <FormInput
                label="License Number"
                name="licenseNumber"
                value={formData.licenseNumber || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />

              <FormInput
                label="Experience (Years)"
                name="experience"
                type="number"
                value={formData.experience || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
              />

              <div className="md:col-span-2">
                <FormInput
                  label="Clinic Address"
                  name="clinicAddress"
                  type="textarea"
                  value={formData.clinicAddress || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your clinic address..."
                />
              </div>

              <div className="md:col-span-2">
                <FormInput
                  label="Qualifications"
                  name="qualifications"
                  type="textarea"
                  value={formData.qualifications || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your qualifications..."
                />
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DoctorProfile;
