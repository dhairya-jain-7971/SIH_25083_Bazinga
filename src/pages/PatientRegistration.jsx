import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    village: '',
    city: '',
    state: 'Kerala',
    pincode: '',
    emergencyContact: '',
    emergencyPhone: '',
    governmentId: null,
    idNumber: '',
    bloodGroup: '',
    allergies: '',
    currentMedications: '',
    medicalHistory: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      governmentId: file
    }));

    if (errors.governmentId) {
      setErrors(prev => ({
        ...prev,
        governmentId: ''
      }));
    }
  };

  const handleMedicalHistoryUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024; // 10MB per file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

    // Validate files
    const validFiles = [];
    const fileErrors = [];

    files.forEach((file, index) => {
      if (validFiles.length >= maxFiles) {
        fileErrors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      if (file.size > maxSize) {
        fileErrors.push(`${file.name} is too large (max 10MB)`);
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        fileErrors.push(`${file.name} has invalid format (only JPG, PNG, PDF allowed)`);
        return;
      }

      validFiles.push(file);
    });

    if (fileErrors.length > 0) {
      setErrors(prev => ({
        ...prev,
        medicalHistory: fileErrors.join(', ')
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        medicalHistory: ''
      }));
    }

    setFormData(prev => ({
      ...prev,
      medicalHistory: [...prev.medicalHistory, ...validFiles]
    }));
  };

  const removeMedicalHistoryFile = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: prev.medicalHistory.filter((_, index) => index !== indexToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

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
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'Emergency phone is required';
    } else if (!/^\d{10}$/.test(formData.emergencyPhone.replace(/\D/g, ''))) {
      newErrors.emergencyPhone = 'Emergency phone must be 10 digits';
    }
    if (!formData.governmentId) newErrors.governmentId = 'Government ID is required';
    if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';

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
      // Placeholder API call for patient registration
      const response = await mockApiCall('/api/patient/register', formData);

      if (response.success) {
        // Store user data in localStorage for demo purposes
        localStorage.setItem('userRole', 'patient');
        localStorage.setItem('userData', JSON.stringify(response.data));

        navigate('/dashboard/patient');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar showBackButton={true} onBackClick={handleBack} showAdminPanel={false} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Patient Registration
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
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  error={errors.dateOfBirth}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.gender ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                  )}
                </div>

                <FormInput
                  label="Blood Group"
                  name="bloodGroup"
                  type="select"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  error={errors.bloodGroup}
                  options={[
                    { value: '', label: 'Select Blood Group' },
                    { value: 'A+', label: 'A+' },
                    { value: 'A-', label: 'A-' },
                    { value: 'B+', label: 'B+' },
                    { value: 'B-', label: 'B-' },
                    { value: 'AB+', label: 'AB+' },
                    { value: 'AB-', label: 'AB-' },
                    { value: 'O+', label: 'O+' },
                    { value: 'O-', label: 'O-' },
                  ]}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Emergency Contact Name"
                  name="emergencyContact"
                  type="text"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  error={errors.emergencyContact}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Government ID <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="idType"
                    value={formData.idType || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                  >
                    <option value="">Select ID Type</option>
                    <option value="aadhaar">Aadhaar Card</option>
                    <option value="passport">Passport</option>
                    <option value="voter">Voter ID</option>
                    <option value="driving">Driving License</option>
                  </select>

                  <input
                    type="file"
                    name="governmentId"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.governmentId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.governmentId && (
                    <p className="text-red-500 text-sm mt-1">{errors.governmentId}</p>
                  )}
                </div>

                <FormInput
                  label="ID Number"
                  name="idNumber"
                  type="text"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  error={errors.idNumber}
                  required
                />
              </div>

              <FormInput
                label="Allergies (if any)"
                name="allergies"
                type="textarea"
                value={formData.allergies}
                onChange={handleInputChange}
                placeholder="List any known allergies"
              />

              <FormInput
                label="Current Medications (if any)"
                name="currentMedications"
                type="textarea"
                value={formData.currentMedications}
                onChange={handleInputChange}
                placeholder="List current medications"
              />

              {/* Medical History Upload Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                    <path d="M9 8a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zM9 12a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zM6 8a1 1 0 100 2 1 1 0 000-2zM6 12a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                  Previous Medical History (Optional)
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload any previous medical records, test reports, prescriptions, or health documents you have. This will help healthcare providers better understand your medical background.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Medical Documents
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleMedicalHistoryUpload}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: JPG, PNG, PDF | Max 5 files | Max 10MB per file
                    </p>
                    {errors.medicalHistory && (
                      <p className="text-red-500 text-sm mt-1">{errors.medicalHistory}</p>
                    )}
                  </div>

                  {/* Display uploaded files */}
                  {formData.medicalHistory.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                      <div className="space-y-2">
                        {formData.medicalHistory.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                {file.type === 'application/pdf' ? (
                                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeMedicalHistoryFile(index)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Remove file"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}

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

export default PatientRegistration;
