import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import FormInput from '../components/FormInput';

const Support = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [activeTab, setActiveTab] = useState('faq');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem('userData');
    const role = localStorage.getItem('userRole');
    
    if (data && role) {
      setUserData(JSON.parse(data));
      setUserRole(role);
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
    setTicketForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    // Mock ticket submission
    alert('Support ticket submitted successfully! We will get back to you within 24 hours.');
    setTicketForm({
      subject: '',
      category: '',
      priority: 'medium',
      description: ''
    });
  };

  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment by going to the Appointments tab in your dashboard and clicking "Book New Appointment". Select your preferred doctor, date, and time.'
    },
    {
      question: 'How can I access my medical records?',
      answer: 'All your medical records are available in your dashboard. You can view prescriptions, lab reports, and diagnosis history in their respective tabs.'
    },
    {
      question: 'How do I update my profile information?',
      answer: 'Go to "My Profile" from the sidebar menu. Click "Edit Profile" to update your personal and medical information.'
    },
    {
      question: 'What should I do in case of emergency?',
      answer: 'Click on the "Emergency" section from the sidebar for quick access to emergency contacts and nearby hospitals. For life-threatening emergencies, call 108 immediately.'
    },
    {
      question: 'How do I reschedule or cancel an appointment?',
      answer: 'In your Appointments tab, you will see "Reschedule" and "Cancel" buttons next to each upcoming appointment.'
    },
    {
      question: 'How can I download my health records?',
      answer: 'You can download your health records from the respective sections (Prescriptions, Lab Data, etc.) by clicking the download button.'
    }
  ];

  const contactInfo = [
    {
      type: 'Phone Support',
      value: '+91 1800-123-4567',
      hours: '24/7 Available',
      icon: '📞'
    },
    {
      type: 'Email Support',
      value: 'support@swasthyasutra.gov.in',
      hours: 'Response within 24 hours',
      icon: '📧'
    },
    {
      type: 'WhatsApp Support',
      value: '+91 9876543210',
      hours: '9 AM - 6 PM',
      icon: '💬'
    }
  ];

  if (!userData) {
    return <div>Loading...</div>;
  }

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
            <p className="text-gray-600">Get help with using Swasthya Sutra platform</p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'faq', label: 'FAQ', icon: '❓' },
                  { id: 'contact', label: 'Contact Us', icon: '📞' },
                  { id: 'ticket', label: 'Submit Ticket', icon: '🎫' }
                ].map((tab) => (
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

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {contactInfo.map((contact, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl mb-3">{contact.icon}</div>
                      <h3 className="font-semibold text-gray-900 mb-2">{contact.type}</h3>
                      <p className="text-blue-600 font-medium mb-1">{contact.value}</p>
                      <p className="text-sm text-gray-600">{contact.hours}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Office Address</h2>
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📍</span>
                  <div>
                    <p className="font-medium text-gray-900">Swasthya Sutra Support Center</p>
                    <p className="text-gray-600">Government Secretariat Complex</p>
                    <p className="text-gray-600">Thiruvananthapuram, Kerala 695001</p>
                    <p className="text-gray-600">India</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Submit Ticket Tab */}
          {activeTab === 'ticket' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit Support Ticket</h2>
              <form onSubmit={handleSubmitTicket} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Subject"
                    name="subject"
                    value={ticketForm.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description of your issue"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={ticketForm.category}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account Related</option>
                      <option value="appointment">Appointment Issue</option>
                      <option value="billing">Billing Query</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={ticketForm.priority}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={ticketForm.description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Please provide detailed information about your issue..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Submit Ticket
                </Button>
              </form>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Support;
