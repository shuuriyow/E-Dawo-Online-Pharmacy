import { useState, useEffect } from 'react';
import { FiDownload, FiEye, FiX, FiClock, FiCheck } from 'react-icons/fi';
import axios from 'axios';

const PharmacyPrescriptions = () => {
  const pharmacy = JSON.parse(localStorage.getItem('pharmacy') || '{}');
  const pharmacyId = pharmacy._id;
  const [prescriptions, setPrescriptions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const res = await axios.get(`http://localhost:3000/api/pharmacy-prescriptions?pharmacy=${pharmacyId}`);
      setPrescriptions(res.data);
    };
    if (pharmacyId) fetchPrescriptions();
  }, [pharmacyId]);

  const updateStatus = async (id, newStatus) => {
    await axios.patch(`http://localhost:3000/api/pharmacy-prescriptions/${id}/status`, { status: newStatus });
    setPrescriptions(prescriptions =>
      prescriptions.map(rx =>
        rx._id === id ? { ...rx, status: newStatus } : rx
      )
    );
  };

  const filteredPrescriptions = prescriptions.filter(rx =>
    statusFilter === 'All' ? true : rx.status === statusFilter.toLowerCase()
  );

  const getFullImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:3000${imageUrl}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Prescriptions</h1>
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Prescriptions</h2>
            <select
              className="p-2 border rounded-lg dark:bg-gray-800"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Filled</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Prescription ID</th>
                <th className="px-6 py-3 text-left">Patient</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              {filteredPrescriptions.map(prescription => (
                <tr key={prescription._id}>
                  <td className="px-6 py-4">{prescription._id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4">{prescription.user?.name || 'N/A'}</td>
                  <td className="px-6 py-4">{new Date(prescription.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${prescription.status === 'filled' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      prescription.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        prescription.status === 'approved' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                        title="View prescription"
                        onClick={() => window.open(getFullImageUrl(prescription.imageUrl), '_blank')}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="p-1 text-green-600 hover:text-green-800 dark:hover:text-green-400"
                        title="Download"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = prescription.imageUrl;
                          link.download = prescription.originalFilename;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        <FiDownload />
                      </button>
                      {prescription.status === 'approved' && (
                        <button
                          onClick={() => updateStatus(prescription._id, 'filled')}
                          className="p-1 text-green-600 hover:text-green-800 dark:hover:text-green-400"
                          title="Mark as filled"
                        >
                          <FiCheck />
                        </button>
                      )}
                      {prescription.status === 'pending' && (
                        <button
                          onClick={() => updateStatus(prescription._id, 'rejected')}
                          className="p-1 text-red-600 hover:text-red-800 dark:hover:text-red-400"
                          title="Reject prescription"
                        >
                          <FiX />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PharmacyPrescriptions;