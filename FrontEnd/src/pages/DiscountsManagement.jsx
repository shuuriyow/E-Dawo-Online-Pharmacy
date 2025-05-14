import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX } from 'react-icons/fi';
import axios from 'axios';

const initialFormData = {
  campaignName: '',
  discountCode: '',
  discountValue: 0,
  startDate: '',
  endDate: '',
  status: true,
};

const DiscountManagement = () => {
  const [discounts, setDiscounts] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch discounts
  const fetchDiscounts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/discounts');
      setDiscounts(response.data);
    } catch (error) {
      console.error('Error fetching discounts:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update discount
        const response = await axios.put(`http://localhost:3000/api/discounts/${editingId}`, formData);
        setDiscounts(discounts.map((d) => (d._id === editingId ? response.data : d)));
      } else {
        // Create new discount
        const response = await axios.post('http://localhost:3000/api/discounts', formData);
        setDiscounts([response.data, ...discounts]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving discount:', error.response?.data || error.message);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setIsFormOpen(false);
  };

  // Start editing
  const startEditing = (discount) => {
    setEditingId(discount._id);
    setFormData({
      campaignName: discount.campaignName,
      discountCode: discount.discountCode,
      discountValue: discount.discountValue,
      startDate: discount.startDate.split('T')[0],
      endDate: discount.endDate.split('T')[0],
      status: discount.status,
    });
    setIsFormOpen(true);
  };

  // Delete discount
  const deleteDiscount = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this discount?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:3000/api/discounts/${id}`);
      setDiscounts(discounts.filter((d) => d._id !== id));
    } catch (error) {
      console.error('Error deleting discount:', error.response?.data || error.message);
    }
  };

  // Toggle status
  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/discounts/${id}`, {
        status: !currentStatus
      });
      setDiscounts(discounts.map(d => d._id === id ? response.data : d));
    } catch (error) {
      console.error('Error updating status:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Discount Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus className="text-lg" />
          New Discount
        </button>
      </div>

      {/* Discount Form */}
      {(isFormOpen || editingId) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {editingId ? 'Edit Discount' : 'Create New Discount'}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  name="campaignName"
                  value={formData.campaignName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Summer Sale"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Code</label>
                <input
                  type="text"
                  name="discountCode"
                  value={formData.discountCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  placeholder="SUMMER20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value (%)</label>
              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="20"
                min="0"
                max="100"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiSave className="text-lg" />
                {editingId ? 'Update Discount' : 'Save Discount'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Discounts Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {discounts.map((discount) => (
                <tr key={discount._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {discount.campaignName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {discount.discountCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {discount.discountValue}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(discount.startDate).toLocaleDateString()} - {new Date(discount.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      onClick={() => toggleStatus(discount._id, discount.status)}
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${discount.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {discount.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(discount)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteDiscount(discount._id)}
                        className="text-red-600 hover:text-red-900"
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

      {discounts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No discounts found. Create your first discount campaign.
        </div>
      )}
    </div>
  );
};

export default DiscountManagement;