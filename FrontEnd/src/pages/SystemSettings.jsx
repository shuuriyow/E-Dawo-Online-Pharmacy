import { useState } from 'react';
import { FiSave, FiMail, FiPhone, FiGlobe, FiServer, FiActivity } from 'react-icons/fi';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'E-Dawo Pharmacy',
    contactEmail: 'contact@edawo.com',
    contactPhone: '+1234567890',
    websiteUrl: 'https://edawo.com',
    maintenanceMode: false,
    smtpHost: 'smtp.edawo.com',
    smtpPort: '587',
    smtpUsername: 'noreply@edawo.com',
    smtpPassword: '',
    enableAuditLogs: true
  });

  const [activeTab, setActiveTab] = useState('general');
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, action: 'System settings updated', user: 'Admin User', timestamp: '2023-06-15 14:30:22' },
    { id: 2, action: 'User created', user: 'Admin User', timestamp: '2023-06-15 10:15:45' }
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add audit log entry
    setAuditLogs([{
      id: auditLogs.length + 1,
      action: 'System settings updated',
      user: 'Admin User',
      timestamp: new Date().toISOString()
    }, ...auditLogs]);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">System Settings</h1>
      
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 font-medium ${activeTab === 'general' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('email')}
          className={`px-4 py-2 font-medium ${activeTab === 'email' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          Email Settings
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 font-medium ${activeTab === 'audit' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          Audit Logs
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* General Settings */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <FiMail className="mr-2" /> Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <FiPhone className="mr-2" /> Contact Phone
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <FiGlobe className="mr-2" /> Website URL
              </label>
              <input
                type="url"
                name="websiteUrl"
                value={settings.websiteUrl}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Maintenance Mode
                </span>
              </label>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                When enabled, only administrators can access the system
              </p>
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SMTP Settings */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <FiServer className="mr-2" /> SMTP Host
              </label>
              <input
                type="text"
                name="smtpHost"
                value={settings.smtpHost}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                SMTP Port
              </label>
              <input
                type="number"
                name="smtpPort"
                value={settings.smtpPort}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                SMTP Username
              </label>
              <input
                type="text"
                name="smtpUsername"
                value={settings.smtpUsername}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                SMTP Password
              </label>
              <input
                type="password"
                name="smtpPassword"
                value={settings.smtpPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
                placeholder="Leave blank to keep current"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Test SMTP Connection
              </button>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <FiActivity className="mr-2" /> Audit Logs
              </h3>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="enableAuditLogs"
                    checked={settings.enableAuditLogs}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                  />
                  <span className="text-sm">Enable Logging</span>
                </label>
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Export Logs
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {auditLogs.map(log => (
                    <tr key={log.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{log.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{log.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== 'audit' && (
          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <FiSave /> <span>Save Settings</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SystemSettings;