import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiEye, FiTrash2, FiEdit2, FiPlus, FiClock, FiPhone, FiUser, FiSearch, FiImage } from 'react-icons/fi';
import axios from 'axios';

const initialFormData = {
  name: '',
  address: '',
  phone: '',
  license: '',
  manager: '',
  status: 'Pending',
  logo: null,
};

const PharmacyManagement = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [pharmacies, setPharmacies] = useState([]); // Start with an empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [managers, setManagers] = useState([]);

  // ⬅ Move this to the top level, not inside useEffect
  const fetchPharmacies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/pharmacies');
      const fetched = Array.isArray(response.data) ? response.data : response.data.pharmacies || [];
      setPharmacies(fetched);
    } catch (error) {
      console.error('Error fetching pharmacies:', error.response?.data || error.message);
      setPharmacies([]); // fallback to empty array
    }
  };

  // Use it in useEffect
  useEffect(() => {
    fetchPharmacies();
  }, []);

  // Fetch managers
  useEffect(() => {
    async function fetchManagers() {
      try {
        const res = await axios.get('http://localhost:3000/api/users?role=Pharmacy Manager');
        setManagers(res.data);
      } catch (err) {
        console.error('Failed to fetch managers:', err);
      }
    }
    fetchManagers();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, logo: reader.result }); // base64 string
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Update pharmacy
        await axios.put(`http://localhost:3000/api/pharmacies/${formData.id}`, formData);
      } else {
        // Add new pharmacy
        const token = localStorage.getItem('token');
        await axios.post(
          'http://localhost:3000/api/pharmacies',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }
      fetchPharmacies();
      setFormData(initialFormData);
      setIsAdding(false);
    } catch (error) {
      console.error('Error saving pharmacy:', error.response?.data || error.message);
    }
  };


  // Handle edit
  const handleEdit = (pharmacy) => {
    setFormData({ ...pharmacy, id: pharmacy._id });
    setIsAdding(true);
  };
  // Add the approve and reject functions to update the pharmacy status.
  const approvePharmacy = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/pharmacies/${id}`, { status: 'Approved' });
      console.log('Pharmacy approved:', response.data);
      setPharmacies(pharmacies.map(ph => (ph._id === id ? { ...ph, status: 'Approved' } : ph)));
    } catch (error) {
      console.error('Error approving pharmacy:', error.response?.data || error.message);
    }
  };


  // Handle delete
  const handleDelete = async (id) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this Pharmacy?');
    if (!confirmDelete) return; // If the user cancels, do nothing

    try {
      await axios.delete(`http://localhost:3000/api/pharmacies/${id}`);
      fetchPharmacies();
    } catch (error) {
      console.error('Error deleting pharmacy:', error.response?.data || error.message);
    }
  };

  const rejectPharmacy = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/pharmacies/${id}`, { status: 'Rejected' });
      console.log('Pharmacy rejected:', response.data);
      setPharmacies(pharmacies.map(ph => (ph._id === id ? { ...ph, status: 'Rejected' } : ph)));
    } catch (error) {
      console.error('Error rejecting pharmacy:', error.response?.data || error.message);
    }
  };

  const filteredPharmacies = pharmacies.filter((pharmacy) =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pharmacy Management</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          {isAdding ? 'Cancel' : 'Add Pharmacy'}
        </button>
      </div>

      {/* Add Pharmacy Form */}
      {isAdding && (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            {formData.id ? 'Edit Pharmacy' : 'Add New Pharmacy'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pharmacy Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">License Number</label>
                <input
                  type="text"
                  name="license"
                  value={formData.license}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Manager Name</label>
                <select
                  name="manager"
                  value={formData.manager}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select Manager</option>
                  {managers.map((manager) => (
                    <option key={manager._id} value={manager._id}>
                      {manager.name} ({manager.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pharmacy Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
                {formData.logo && (
                  <div className="mt-2">
                    <img
                      src={formData.logo}
                      alt="Pharmacy Logo"
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setFormData(initialFormData); // Reset the form
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {formData.id ? 'Update Pharmacy' : 'Save Pharmacy'}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Pharmacies Table */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 border rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              placeholder="Search pharmacies..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pharmacy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">License</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Manager</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              {filteredPharmacies.map((pharmacy) => (
                <tr key={pharmacy._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {pharmacy.logo ? (
                          <img className="h-10 w-10 rounded-full object-cover" src={pharmacy.logo} alt={pharmacy.name} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            <FiImage className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{pharmacy.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{pharmacy.license}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {pharmacy.manager ? pharmacy.manager.name : 'N/A'}
                    <br />
                    <span className="text-xs text-gray-400">{pharmacy.manager ? pharmacy.manager.email : ''}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{pharmacy.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{pharmacy.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <div className="flex items-center">
                      <FiClock className="flex-shrink-0 mr-2 text-gray-400" />
                      {new Date(pharmacy.createdAt).toISOString().split('T')[0]}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
        ${pharmacy.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        pharmacy.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                      {pharmacy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {pharmacy.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => approvePharmacy(pharmacy._id)}
                            className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-500"
                            title="Approve"
                          >
                            <FiCheck className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => rejectPharmacy(pharmacy._id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-500"
                            title="Reject"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleEdit(pharmacy)}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-500"
                        title="Edit"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(pharmacy._id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-500"
                        title="Delete"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
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

export default PharmacyManagement;