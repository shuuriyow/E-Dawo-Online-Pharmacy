import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheck, FiSearch, FiCalendar } from 'react-icons/fi';
import axios from 'axios';

const initialFormData = {
  name: '',
  description: '',
  createdAt: new Date().toISOString().split('T')[0],
};

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new category
  // const addCategory = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:3000/api/categories', formData);
  //     setCategories([response.data, ...categories]);
  //     setIsAdding(false);
  //     setFormData(initialFormData);
  //   } catch (error) {
  //     console.error('Error adding category:', error.response?.data || error.message);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing category
        const response = await axios.put(`http://localhost:3000/api/categories/${editingId}`, formData);
        setCategories(categories.map((cat) => (cat._id === editingId ? response.data : cat)));
      } else {
        // Add new category
        const response = await axios.post('http://localhost:3000/api/categories', formData);
        setCategories([response.data, ...categories]);
      }
      setFormData(initialFormData); // Reset the form
      setEditingId(null); // Clear the editing ID
      setIsAdding(false); // Hide the form
    } catch (error) {
      console.error('Error saving category:', error.response?.data || error.message);
    }
  };

  const startEditing = (category) => {
    setEditingId(category._id); // Set the ID of the category being edited
    setFormData({
      name: category.name,
      description: category.description,
      createdAt: category.createdAt.split('T')[0],
    });
    setIsAdding(true); // Show the form
  };

  // Save edited category
  // const saveEdit = async () => {
  //   try {
  //     const response = await axios.put(`http://localhost:3000/api/categories/${editingId}`, formData);
  //     setCategories(categories.map((cat) => (cat._id === editingId ? response.data : cat)));
  //     setEditingId(null);
  //     setFormData(initialFormData);
  //   } catch (error) {
  //     console.error('Error updating category:', error.response?.data || error.message);
  //   }
  // };

  // Delete a category
  const deleteCategory = async (id) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (!confirmDelete) return; // If the user cancels, do nothing
    try {
      await axios.delete(`http://localhost:3000/api/categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error.response?.data || error.message);
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Category Management</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          {isAdding ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {/* Add Category Form */}
      {isAdding && (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            {editingId ? 'Edit Category' : 'Add New Category'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Name</label>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Created Date</label>
                <input
                  type="date"
                  name="createdAt"
                  value={formData.createdAt}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setFormData(initialFormData);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {editingId ? 'Update Category' : 'Save Category'}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Categories Table */}
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
              placeholder="Search categories..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Medicines</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              {filteredCategories.map((category) => (
                <tr key={category._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === category._id ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded-md dark:bg-gray-800"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === category._id ? (
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-2 py-1 border rounded-md dark:bg-gray-800"
                      />
                    ) : (
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {category.description || 'No description'}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {category.medicineCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {editingId === category._id ? (
                      <input
                        type="date"
                        name="createdAt"
                        value={formData.createdAt}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 border rounded-md dark:bg-gray-800"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiCalendar className="flex-shrink-0 mr-2 text-gray-400" />
                        {category.createdAt.split('T')[0]}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {editingId === category._id ? (
                        <>
                          <button
                            onClick={handleSubmit}
                            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-500"
                          >
                            <FiCheck className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setFormData(initialFormData);
                            }}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-500"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(category)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500"
                          >
                            <FiEdit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteCategory(category._id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500"
                          >
                            <FiTrash2 className="w-5 h-5" />
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

export default CategoryManagement;