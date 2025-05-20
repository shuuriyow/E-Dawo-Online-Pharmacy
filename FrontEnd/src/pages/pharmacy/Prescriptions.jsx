import { useState } from 'react';
import { FiDownload, FiEye, FiX, FiClock, FiCheck } from 'react-icons/fi';

const PharmacyPrescriptions = ({ pharmacyId }) => {
  // Mock prescriptions filtered by pharmacyId
  const [prescriptions, setPrescriptions] = useState([
    { id: '#RX-5001', patient: 'John Doe', doctor: 'Dr. Smith', date: '2023-06-15', status: 'Pending', file: 'prescription_5001.pdf' },
    { id: '#RX-5002', patient: 'Jane Smith', doctor: 'Dr. Johnson', date: '2023-06-14', status: 'Filled', file: 'prescription_5002.pdf' }
  ]);

  const updateStatus = (id, newStatus) => {
    setPrescriptions(prescriptions.map(rx => 
      rx.id === id ? {...rx, status: newStatus} : rx
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Prescriptions</h1>
      
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Prescriptions</h2>
            <select className="p-2 border rounded-lg dark:bg-gray-800">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Filled</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Prescription ID</th>
                <th className="px-6 py-3 text-left">Patient</th>
                <th className="px-6 py-3 text-left">Doctor</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              {prescriptions.map(prescription => (
                <tr key={prescription.id}>
                  <td className="px-6 py-4">{prescription.id}</td>
                  <td className="px-6 py-4">{prescription.patient}</td>
                  <td className="px-6 py-4">{prescription.doctor}</td>
                  <td className="px-6 py-4">{prescription.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      prescription.status === 'Filled' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      prescription.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {prescription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                        title="View prescription"
                      >
                        <FiEye />
                      </button>
                      <button 
                        className="p-1 text-green-600 hover:text-green-800 dark:hover:text-green-400"
                        title="Download"
                      >
                        <FiDownload />
                      </button>
                      {prescription.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => updateStatus(prescription.id, 'Filled')}
                            className="p-1 text-green-600 hover:text-green-800 dark:hover:text-green-400"
                            title="Mark as filled"
                          >
                            <FiCheck />
                          </button>
                          <button 
                            onClick={() => updateStatus(prescription.id, 'Rejected')}
                            className="p-1 text-red-600 hover:text-red-800 dark:hover:text-red-400"
                            title="Reject prescription"
                          >
                            <FiX />
                          </button>
                        </>
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