import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';

const SystemSettings = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      systemName: 'Swasthya Sutra',
      systemDescription: 'Digital Health Record Management System',
      contactEmail: 'admin@swasthyasutra.com',
      supportPhone: '+91 1800-XXX-XXXX',
      maintenanceMode: false,
      allowRegistrations: true,
      requireEmailVerification: true,
      enableNotifications: true
    },
    security: {
      passwordMinLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
      requireUppercase: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      enableTwoFactor: false,
      passwordExpiryDays: 90,
      ipWhitelistEnabled: false,
      ipWhitelist: ''
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: false,
      appointmentReminders: true,
      prescriptionReminders: true,
      testResultNotifications: true,
      systemAlerts: true,
      marketingEmails: false
    },
    dataRetention: {
      patientRecords: 10,
      auditLogs: 5,
      temporaryFiles: 30,
      backupFrequency: 'daily',
      autoDeleteInactive: true,
      inactiveThreshold: 365
    },
    integrations: {
      smsProvider: 'twilio',
      emailProvider: 'sendgrid',
      paymentGateway: 'razorpay',
      cloudStorage: 'aws-s3',
      analytics: 'google-analytics',
      apiRateLimit: 1000
    }
  });

  useEffect(() => {
    // Check if user is admin
    const data = localStorage.getItem('userData');
    const role = localStorage.getItem('userRole');
    if (data && role === 'admin') {
      setUserData(JSON.parse(data));
    } else {
      navigate('/');
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const saveSettings = () => {
    // Mock save functionality
    alert('Settings saved successfully!');
    console.log('Settings saved:', settings);
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset to default values
      alert('Settings reset to defaults!');
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'dataRetention', label: 'Data Retention', icon: '💾' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            System Name
          </label>
          <input
            type="text"
            value={settings.general.systemName}
            onChange={(e) => handleSettingChange('general', 'systemName', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email
          </label>
          <input
            type="email"
            value={settings.general.contactEmail}
            onChange={(e) => handleSettingChange('general', 'contactEmail', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Support Phone
          </label>
          <input
            type="tel"
            value={settings.general.supportPhone}
            onChange={(e) => handleSettingChange('general', 'supportPhone', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            System Description
          </label>
          <textarea
            value={settings.general.systemDescription}
            onChange={(e) => handleSettingChange('general', 'systemDescription', e.target.value)}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Maintenance Mode</label>
            <p className="text-sm text-gray-500">Enable to prevent user access during maintenance</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.maintenanceMode}
              onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Allow New Registrations</label>
            <p className="text-sm text-gray-500">Enable/disable new user registrations</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.allowRegistrations}
              onChange={(e) => handleSettingChange('general', 'allowRegistrations', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Email Verification Required</label>
            <p className="text-sm text-gray-500">Require email verification for new accounts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.requireEmailVerification}
              onChange={(e) => handleSettingChange('general', 'requireEmailVerification', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Enable Notifications</label>
            <p className="text-sm text-gray-500">Allow system-wide notifications</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.enableNotifications}
              onChange={(e) => handleSettingChange('general', 'enableNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Password Length
          </label>
          <input
            type="number"
            min="6"
            max="20"
            value={settings.security.passwordMinLength}
            onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            min="15"
            max="480"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Login Attempts
          </label>
          <input
            type="number"
            min="3"
            max="10"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Expiry (days)
          </label>
          <input
            type="number"
            min="30"
            max="365"
            value={settings.security.passwordExpiryDays}
            onChange={(e) => handleSettingChange('security', 'passwordExpiryDays', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Require Special Characters</label>
            <p className="text-sm text-gray-500">Passwords must contain special characters</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.requireSpecialChars}
              onChange={(e) => handleSettingChange('security', 'requireSpecialChars', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Require Numbers</label>
            <p className="text-sm text-gray-500">Passwords must contain numbers</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.requireNumbers}
              onChange={(e) => handleSettingChange('security', 'requireNumbers', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Require Uppercase Letters</label>
            <p className="text-sm text-gray-500">Passwords must contain uppercase letters</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.requireUppercase}
              onChange={(e) => handleSettingChange('security', 'requireUppercase', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Enable Two-Factor Authentication</label>
            <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.enableTwoFactor}
              onChange={(e) => handleSettingChange('security', 'enableTwoFactor', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">IP Whitelist Enabled</label>
            <p className="text-sm text-gray-500">Restrict access to specific IP addresses</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.ipWhitelistEnabled}
              onChange={(e) => handleSettingChange('security', 'ipWhitelistEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {settings.security.ipWhitelistEnabled && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IP Whitelist (comma-separated)
            </label>
            <textarea
              value={settings.security.ipWhitelist}
              onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value)}
              placeholder="192.168.1.1, 10.0.0.1, 203.0.113.0"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Email Notifications</label>
            <p className="text-sm text-gray-500">Send notifications via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
            <p className="text-sm text-gray-500">Send notifications via SMS</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.smsNotifications}
              onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Push Notifications</label>
            <p className="text-sm text-gray-500">Send browser push notifications</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.pushNotifications}
              onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Appointment Reminders</label>
            <p className="text-sm text-gray-500">Send appointment reminders to patients</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.appointmentReminders}
              onChange={(e) => handleSettingChange('notifications', 'appointmentReminders', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Prescription Reminders</label>
            <p className="text-sm text-gray-500">Send prescription refill reminders</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.prescriptionReminders}
              onChange={(e) => handleSettingChange('notifications', 'prescriptionReminders', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Test Result Notifications</label>
            <p className="text-sm text-gray-500">Notify patients when test results are ready</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.testResultNotifications}
              onChange={(e) => handleSettingChange('notifications', 'testResultNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">System Alerts</label>
            <p className="text-sm text-gray-500">Send system status and security alerts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.systemAlerts}
              onChange={(e) => handleSettingChange('notifications', 'systemAlerts', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Marketing Emails</label>
            <p className="text-sm text-gray-500">Send promotional and marketing emails</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.marketingEmails}
              onChange={(e) => handleSettingChange('notifications', 'marketingEmails', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderDataRetentionSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Records Retention (years)
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={settings.dataRetention.patientRecords}
            onChange={(e) => handleSettingChange('dataRetention', 'patientRecords', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Audit Logs Retention (years)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={settings.dataRetention.auditLogs}
            onChange={(e) => handleSettingChange('dataRetention', 'auditLogs', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temporary Files Retention (days)
          </label>
          <input
            type="number"
            min="1"
            max="365"
            value={settings.dataRetention.temporaryFiles}
            onChange={(e) => handleSettingChange('dataRetention', 'temporaryFiles', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Backup Frequency
          </label>
          <select
            value={settings.dataRetention.backupFrequency}
            onChange={(e) => handleSettingChange('dataRetention', 'backupFrequency', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Auto-delete Inactive Accounts</label>
            <p className="text-sm text-gray-500">Automatically delete accounts inactive for specified period</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.dataRetention.autoDeleteInactive}
              onChange={(e) => handleSettingChange('dataRetention', 'autoDeleteInactive', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {settings.dataRetention.autoDeleteInactive && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inactive Threshold (days)
            </label>
            <input
              type="number"
              min="180"
              max="1095"
              value={settings.dataRetention.inactiveThreshold}
              onChange={(e) => handleSettingChange('dataRetention', 'inactiveThreshold', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMS Provider
          </label>
          <select
            value={settings.integrations.smsProvider}
            onChange={(e) => handleSettingChange('integrations', 'smsProvider', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="twilio">Twilio</option>
            <option value="aws-sns">AWS SNS</option>
            <option value="msg91">MSG91</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Provider
          </label>
          <select
            value={settings.integrations.emailProvider}
            onChange={(e) => handleSettingChange('integrations', 'emailProvider', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="sendgrid">SendGrid</option>
            <option value="aws-ses">AWS SES</option>
            <option value="mailgun">Mailgun</option>
            <option value="smtp">Custom SMTP</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Gateway
          </label>
          <select
            value={settings.integrations.paymentGateway}
            onChange={(e) => handleSettingChange('integrations', 'paymentGateway', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="razorpay">Razorpay</option>
            <option value="stripe">Stripe</option>
            <option value="payu">PayU</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cloud Storage
          </label>
          <select
            value={settings.integrations.cloudStorage}
            onChange={(e) => handleSettingChange('integrations', 'cloudStorage', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="aws-s3">AWS S3</option>
            <option value="google-cloud">Google Cloud Storage</option>
            <option value="azure-blob">Azure Blob Storage</option>
            <option value="local">Local Storage</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Analytics Provider
          </label>
          <select
            value={settings.integrations.analytics}
            onChange={(e) => handleSettingChange('integrations', 'analytics', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="google-analytics">Google Analytics</option>
            <option value="mixpanel">Mixpanel</option>
            <option value="amplitude">Amplitude</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            API Rate Limit (requests/hour)
          </label>
          <input
            type="number"
            min="100"
            max="10000"
            value={settings.integrations.apiRateLimit}
            onChange={(e) => handleSettingChange('integrations', 'apiRateLimit', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar
          userRole="admin"
          userData={userData}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              System Settings
            </h1>
            <p className="text-gray-600">
              Configure system parameters, security settings, and integrations
            </p>
          </div>

          {/* Settings Tabs */}
          <div className="mb-8">
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

          {/* Settings Content */}
          <Card className="p-6 mb-8">
            {activeTab === 'general' && renderGeneralSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'dataRetention' && renderDataRetentionSettings()}
            {activeTab === 'integrations' && renderIntegrationSettings()}
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              variant="secondary"
              onClick={resetToDefaults}
            >
              Reset to Defaults
            </Button>
            <Button onClick={saveSettings}>
              Save Settings
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SystemSettings;
