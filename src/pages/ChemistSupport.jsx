import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import FormInput from '../components/FormInput';

const ChemistSupport = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('contacts');
  const [supportForm, setSupportForm] = useState({
    issueType: '',
    priority: 'medium',
    subject: '',
    description: ''
  });

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
    localStorage.removeItem('providerType');
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupportForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    // Mock support request submission
    alert('Support request submitted successfully! A government official will contact you within 2 hours.');
    setSupportForm({
      issueType: '',
      priority: 'medium',
      subject: '',
      description: ''
    });
  };

  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleWhatsApp = (number, message) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${number}?text=${encodedMessage}`, '_blank');
  };

  const governmentContacts = [
    {
      name: 'Drug Control Officer',
      designation: 'Kerala State Drug Control Department',
      phone: '+91 471 2325678',
      whatsapp: '+91 9876543210',
      email: 'drugcontrol.kerala@gov.in',
      office: 'Thiruvananthapuram',
      icon: '👨‍⚕️',
      availability: '9 AM - 5 PM (Mon-Fri)'
    },
    {
      name: 'Pharmacy Inspector',
      designation: 'District Pharmacy Inspector',
      phone: '+91 471 2334567',
      whatsapp: '+91 9876543211',
      email: 'pharmacy.inspector@kerala.gov.in',
      office: 'District Collectorate',
      icon: '🔍',
      availability: '10 AM - 4 PM (Mon-Sat)'
    },
    {
      name: 'Health Department Helpline',
      designation: 'Kerala Health Department',
      phone: '+91 471 2518200',
      whatsapp: '+91 9876543212',
      email: 'health.helpline@kerala.gov.in',
      office: 'Health Secretariat',
      icon: '🏥',
      availability: '24/7 Available'
    },
    {
      name: 'Medical Supplies Coordinator',
      designation: 'Kerala Medical Services Corporation',
      phone: '+91 471 2447890',
      whatsapp: '+91 9876543213',
      email: 'supplies@kmscl.kerala.gov.in',
      office: 'KMSCL Head Office',
      icon: '📦',
      availability: '9 AM - 6 PM (Mon-Fri)'
    }
  ];

  const quickActions = [
    {
      title: 'Report Drug Shortage',
      description: 'Report shortage of essential medicines',
      action: () => handleWhatsApp('919876543210', 'Hello, I need to report a drug shortage at my pharmacy. Please assist.'),
      icon: '⚠️',
      color: 'bg-red-100 text-red-800'
    },
    {
      title: 'License Renewal',
      description: 'Get help with license renewal process',
      action: () => handleCall('+914712325678'),
      icon: '📄',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Quality Complaint',
      description: 'Report medicine quality issues',
      action: () => handleWhatsApp('919876543211', 'I need to report a medicine quality issue. Please provide guidance.'),
      icon: '🔬',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      title: 'Emergency Supply Request',
      description: 'Request emergency medicine supply',
      action: () => handleCall('+914712518200'),
      icon: '🚨',
      color: 'bg-green-100 text-green-800'
    }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Support</h1>
            <p className="text-gray-600">Connect with government officials and get support for your pharmacy</p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'contacts'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📞 Government Contacts
                </button>
                <button
                  onClick={() => setActiveTab('request')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'request'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📝 Submit Request
                </button>
                <button
                  onClick={() => setActiveTab('quick')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'quick'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  ⚡ Quick Actions
                </button>
              </nav>
            </div>
          </div>

          {/* Government Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Government Officials & Departments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {governmentContacts.map((contact, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">{contact.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{contact.designation}</p>
                          <p className="text-sm text-gray-600 mb-3">{contact.office}</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <span className="font-medium text-gray-700 w-20">Phone:</span>
                              <span className="text-blue-600">{contact.phone}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="font-medium text-gray-700 w-20">Email:</span>
                              <span className="text-blue-600">{contact.email}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="font-medium text-gray-700 w-20">Hours:</span>
                              <span className="text-gray-600">{contact.availability}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleCall(contact.phone)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              📞 Call
                            </Button>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => handleWhatsApp(contact.whatsapp, `Hello, I am a registered chemist and need assistance. My pharmacy details: ${userData?.fullName || 'N/A'}`)}
                            >
                              💬 WhatsApp
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Submit Request Tab */}
          {activeTab === 'request' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit Support Request</h2>
              <form onSubmit={handleSubmitRequest} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Type
                    </label>
                    <select
                      name="issueType"
                      value={supportForm.issueType}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Issue Type</option>
                      <option value="license">License Related</option>
                      <option value="supply">Medicine Supply</option>
                      <option value="quality">Quality Issues</option>
                      <option value="compliance">Compliance Query</option>
                      <option value="technical">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={supportForm.priority}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <FormInput
                  label="Subject"
                  name="subject"
                  value={supportForm.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief description of your issue"
                />

                <FormInput
                  label="Detailed Description"
                  name="description"
                  type="textarea"
                  value={supportForm.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Please provide detailed information about your issue, including any relevant details about your pharmacy, license number, etc."
                />

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Your Pharmacy Information</h3>
                  <div className="text-sm text-blue-800">
                    <p>Name: {userData?.fullName || 'Not provided'}</p>
                    <p>Email: {userData?.email || 'Not provided'}</p>
                    <p>Phone: {userData?.phone || 'Not provided'}</p>
                    <p className="mt-2 text-xs">This information will be automatically included with your support request.</p>
                  </div>
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Submit Support Request
                </Button>
              </form>
            </Card>
          )}

          {/* Quick Actions Tab */}
          {activeTab === 'quick' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quickActions.map((action, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">{action.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                          <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                          <Button 
                            size="sm" 
                            onClick={action.action}
                            className="w-full"
                          >
                            Take Action
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contacts</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🚨</span>
                    <h3 className="font-semibold text-red-900">Emergency Support</h3>
                  </div>
                  <p className="text-red-800 text-sm mb-4">
                    For urgent pharmacy-related emergencies, drug shortages, or critical compliance issues.
                  </p>
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => handleCall('+914712518200')}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      📞 Emergency Call
                    </Button>
                    <Button 
                      variant="secondary"
                      onClick={() => handleWhatsApp('919876543212', 'EMERGENCY: I need immediate assistance with a critical pharmacy issue.')}
                    >
                      💬 Emergency WhatsApp
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChemistSupport;
