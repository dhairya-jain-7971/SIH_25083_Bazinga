import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const ProviderRegistration = ({ providerType: propProviderType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [providerType] = useState(propProviderType || location.state?.providerType || 'doctor');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    specialization: '',
    experience: '',
    address: '',
    village: '',
    city: '',
    state: 'Kerala',
    pincode: '',
    certificate: null,
    license: null,
    establishmentName: '',
    registrationNumber: '',
    operatingHours: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    // Provider-specific validations
    if (providerType === 'doctor') {
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'Medical license number is required';
      if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
      if (!formData.experience) newErrors.experience = 'Experience is required';
      if (!formData.certificate) newErrors.certificate = 'Medical certificate is required';
    } else if (providerType === 'laboratory') {
      if (!formData.establishmentName.trim()) newErrors.establishmentName = 'Laboratory name is required';
      if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
      if (!formData.license) newErrors.license = 'Laboratory license is required';
    } else if (providerType === 'chemist') {
      if (!formData.establishmentName.trim()) newErrors.establishmentName = 'Pharmacy name is required';
      if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
      if (!formData.license) newErrors.license = 'Pharmacy license is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await mockApiCall('/api/provider/register', {
        ...formData,
        providerType
      });

      if (response.success) {
        localStorage.setItem('userRole', 'provider');
        localStorage.setItem('providerType', providerType);
        localStorage.setItem('userData', JSON.stringify(response.data));

        navigate(`/dashboard/${providerType}`);
      } else {
        setErrors({ submit: response.message || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const getProviderTitle = () => {
    switch (providerType) {
      case 'doctor':
        return 'Doctor Registration';
      case 'laboratory':
        return 'Laboratory Registration';
      case 'chemist':
        return 'Chemist Shop Registration';
      default:
        return 'Provider Registration';
    }
  };

  const renderProviderSpecificFields = () => {
    switch (providerType) {
      case 'doctor':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Medical License Number"
                name="licenseNumber"
                type="text"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                error={errors.licenseNumber}
                required
              />

              <FormInput
                label="Specialization"
                name="specialization"
                type="text"
                value={formData.specialization}
                onChange={handleInputChange}
                error={errors.specialization}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Years of Experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleInputChange}
                error={errors.experience}
                required
                min="0"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Certificate <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="certificate"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.certificate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.certificate && (
                  <p className="text-red-500 text-sm mt-1">{errors.certificate}</p>
                )}
              </div>
            </div>
          </>
        );

      case 'laboratory':
      case 'chemist':
        return (
          <>
            <FormInput
              label={providerType === 'laboratory' ? 'Laboratory Name' : 'Pharmacy Name'}
              name="establishmentName"
              type="text"
              value={formData.establishmentName}
              onChange={handleInputChange}
              error={errors.establishmentName}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Registration Number"
                name="registrationNumber"
                type="text"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                error={errors.registrationNumber}
                required
              />

              <FormInput
                label="Operating Hours"
                name="operatingHours"
                type="text"
                value={formData.operatingHours}
                onChange={handleInputChange}
                placeholder="e.g., 9:00 AM - 6:00 PM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {providerType === 'laboratory' ? 'Laboratory License' : 'Pharmacy License'} <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="license"
                onChange={handleFileChange}
                accept="image/*,.pdf"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.license ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.license && (
                <p className="text-red-500 text-sm mt-1">{errors.license}</p>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar showBackButton={true} onBackClick={handleBack} showAdminPanel={false} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {getProviderTitle()}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Full Name"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={errors.fullName}
                  required
                />

                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  required
                />

                <FormInput
                  label="Emergency Contact Phone"
                  name="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  error={errors.emergencyPhone}
                  required
                />
              </div>

              <FormInput
                label="Address"
                name="address"
                type="textarea"
                value={formData.address}
                onChange={handleInputChange}
                error={errors.address}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Village/Town"
                  name="village"
                  type="text"
                  value={formData.village}
                  onChange={handleInputChange}
                  error={errors.village}
                  placeholder="Enter village or town name"
                />

                <FormInput
                  label="City/District"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={errors.city}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="State"
                  name="state"
                  type="select"
                  value={formData.state}
                  onChange={handleInputChange}
                  options={[
                    { value: 'Kerala', label: 'Kerala' },
                  ]}
                  disabled
                />

                <FormInput
                  label="Pincode"
                  name="pincode"
                  type="text"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  error={errors.pincode}
                  required
                />
              </div>

              {renderProviderSpecificFields()}

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> Your registration will be verified by our admin team.
                  {providerType === 'doctor' && ' An interview will be scheduled after document verification.'}
                  {(providerType === 'laboratory' || providerType === 'chemist') &&
                    ' License verification will be done offline by our admin team.'}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="secondary"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

// Mock API call function
const mockApiCall = (url, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          registrationDate: new Date().toISOString(),
          status: 'pending_verification'
        }
      });
    }, 2000);
  });
};

export default ProviderRegistration;
