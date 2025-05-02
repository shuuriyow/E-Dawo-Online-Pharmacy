import { useState } from 'react';
import { FiUpload, FiDownload, FiEye, FiTrash2 } from 'react-icons/fi';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([
    { id: '#RX-5001', patient: 'John Doe', doctor: 'Dr. Smith', pharmacy: 'City Pharmacy', date: '2023-05-15', status: 'Filled', file: 'prescription_5001.pdf' },
    { id: '#RX-5002', patient: 'Jane Smith', doctor: 'Dr. Johnson', pharmacy: 'Health Plus', date: '2023-05-16', status: 'Pending', file: 'prescription_5002.pdf' }
  ]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadPrescription = () => {
    if (selectedFile) {
      const newPrescription = {
        id: `#RX-${Math.floor(1000 + Math.random() * 9000)}`,
        patient: 'New Patient',
        doctor: 'Uploaded Doctor',
        pharmacy: 'To be assigned',
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        file: selectedFile.name
      };
      setPrescriptions([newPrescription, ...prescriptions]);
      setSelectedFile(null);
    }
  };

  const deletePrescription = (id) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Prescriptions</h1>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Upload New Prescription</h2>
        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label className="block mb-1">Select Prescription File</label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
            />
          </div>
          <button
            onClick={uploadPrescription}
            disabled={!selectedFile}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              selectedFile ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FiUpload /> <span>Upload</span>
          </button>
        </div>
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Selected: {selectedFile.name}
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Prescription ID</th>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Doctor</th>
              <th className="px-6 py-3 text-left">Pharmacy</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {prescriptions.map(prescription => (
              <tr key={prescription.id}>
                <td className="px-6 py-4">{prescription.id}</td>
                <td className="px-6 py-4">{prescription.patient}</td>
                <td className="px-6 py-4">{prescription.doctor}</td>
                <td className="px-6 py-4">{prescription.pharmacy}</td>
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
                    <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                      <FiEye />
                    </button>
                    <button className="text-green-600 hover:text-green-800 dark:hover:text-green-400">
                      <FiDownload />
                    </button>
                    <button 
                      onClick={() => deletePrescription(prescription.id)}
                      className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prescriptions;