import { useState, useEffect } from 'react';
import { FiUpload, FiDownload, FiEye, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import axios from 'axios';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual API call
        // const response = await axios.get('/api/prescriptions');
        // setPrescriptions(response.data);

        // Mock data for demonstration
        const mockPrescriptions = [
          {
            _id: '1',
            originalFilename: 'prescription1.pdf',
            imageUrl: 'https://example.com/prescription1.pdf',
            status: 'approved',
            createdAt: new Date(),
            fileSize: 1024,
            fileType: 'application/pdf',
          },
          {
            _id: '2',
            originalFilename: 'prescription2.jpg',
            imageUrl: 'https://example.com/prescription2.jpg',
            status: 'pending',
            createdAt: new Date(Date.now() - 86400000),
            fileSize: 2048,
            fileType: 'image/jpeg',
          },
        ];

        setTimeout(() => {
          setPrescriptions(mockPrescriptions);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch prescriptions');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const uploadPrescription = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('prescription', selectedFile);

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API response
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);

        const newPrescription = {
          _id: Date.now().toString(),
          originalFilename: selectedFile.name,
          imageUrl: URL.createObjectURL(selectedFile),
          status: 'pending',
          createdAt: new Date(),
          fileSize: selectedFile.size,
          fileType: selectedFile.type,
        };

        setPrescriptions([newPrescription, ...prescriptions]);
        setSelectedFile(null);
        setIsUploading(false);
        setUploadProgress(0);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Upload failed');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const deletePrescription = async (id) => {
    try {
      setPrescriptions(prescriptions.filter((p) => p._id !== id));
    } catch (err) {
      setError('Failed to delete prescription');
    }
  };

  const updateStatus = (id, newStatus) => {
    setPrescriptions(
      prescriptions.map((p) =>
        p._id === id ? { ...p, status: newStatus } : p
      )
    );
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Prescription Management</h1>

      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Upload New Prescription</h2>
        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Prescription File (JPG, PNG, PDF)
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              disabled={isUploading}
            />
          </div>
          <button
            onClick={uploadPrescription}
            disabled={!selectedFile || isUploading}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
              selectedFile && !isUploading
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FiUpload />
            <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
          </button>
        </div>
      </div>

      {/* Prescriptions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Prescription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : prescriptions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No prescriptions found. Upload one to get started.
                  </td>
                </tr>
              ) : (
                prescriptions.map((prescription) => (
                  <tr key={prescription._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs">
                        {prescription.originalFilename}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {prescription.fileType}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {new Date(prescription.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {`${(prescription.fileSize / 1024).toFixed(2)} KB`}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(prescription.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => window.open(prescription.imageUrl, '_blank')}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                          title="View"
                        >
                          <FiEye size={18} />
                        </button>
                        <button
                          onClick={() => updateStatus(prescription._id, 'approved')}
                          className="text-green-600 hover:text-green-900 dark:hover:text-green-400"
                          title="Approve"
                        >
                          <FiCheck size={18} />
                        </button>
                        <button
                          onClick={() => updateStatus(prescription._id, 'rejected')}
                          className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                          title="Reject"
                        >
                          <FiX size={18} />
                        </button>
                        <button
                          onClick={() => deletePrescription(prescription._id)}
                          className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = prescription.imageUrl;
                            link.download = prescription.originalFilename;
                            link.click();
                          }}
                          className="text-gray-600 hover:text-gray-900 dark:hover:text-gray-400"
                          title="Download"
                        >
                          <FiDownload size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;