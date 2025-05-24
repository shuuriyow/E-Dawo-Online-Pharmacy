import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMinus, FiPlusCircle } from 'react-icons/fi';
import axios from 'axios';

const initialForm = {
  name: '',
  category: '',
  batchId: '',
  expiryDate: '',
  stock: 0,
  price: 0,
  discount: '',
};

const PharmacyMedicineManagement = () => {
  const pharmacy = JSON.parse(localStorage.getItem('pharmacy') || '{}');
  const pharmacyId = pharmacy._id;

  const [medicines, setMedicines] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch medicines, categories, and discounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch medicines for this pharmacy
        const medRes = await axios.get(`http://localhost:3000/api/medicines?pharmacy=${pharmacyId}`);
        setMedicines(medRes.data);

        // Fetch categories
        const catRes = await axios.get('http://localhost:3000/api/categories');
        setCategories(catRes.data);

        // Fetch discounts
        const discRes = await axios.get('http://localhost:3000/api/discounts');
        setDiscounts(discRes.data);
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
      }
      setLoading(false);
    };
    if (pharmacyId) fetchData();
  }, [pharmacyId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'stock' || name === 'price' ? Number(value) : value,
    }));
  };

  // Add or update medicine
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update (category and discount cannot be changed)
        const res = await axios.put(
          `http://localhost:3000/api/medicines/${editingId}`,
          {
            ...form,
            category: medicines.find(m => m._id === editingId)?.category?._id || medicines.find(m => m._id === editingId)?.category,
            discount: medicines.find(m => m._id === editingId)?.discount?._id || medicines.find(m => m._id === editingId)?.discount,
            pharmacy: pharmacyId,
          }
        );
        setMedicines(medicines.map((m) => (m._id === editingId ? res.data : m)));
      } else {
        // Add
        const res = await axios.post('http://localhost:3000/api/medicines', {
          ...form,
          pharmacy: pharmacyId,
        });
        setMedicines([res.data, ...medicines]);
      }
      setForm(initialForm);
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      alert('Error saving medicine: ' + (error.response?.data?.message || error.message));
    }
  };

  // Edit medicine
  const startEdit = (medicine) => {
    setEditingId(medicine._id);
    setForm({
      name: medicine.name,
      category: medicine.category?._id || medicine.category || '',
      batchId: medicine.batchId || '',
      expiryDate: medicine.expiryDate ? medicine.expiryDate.split('T')[0] : '',
      stock: medicine.stock,
      price: medicine.price,
      discount: medicine.discount?._id || medicine.discount || '',
    });
    setShowForm(true);
  };

  // Delete medicine
  const deleteMedicine = async (id) => {
    if (!window.confirm('Are you sure you want to delete this medicine?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/medicines/${id}`);
      setMedicines(medicines.filter((m) => m._id !== id));
    } catch (error) {
      alert('Error deleting medicine: ' + (error.response?.data?.message || error.message));
    }
  };

  // Update stock
  const updateStock = async (id, amount) => {
    const med = medicines.find((m) => m._id === id);
    if (!med) return;
    const newStock = Math.max(0, med.stock + amount);
    try {
      const res = await axios.put(`http://localhost:3000/api/medicines/${id}`, {
        ...med,
        stock: newStock,
        pharmacy: pharmacyId,
        category: med.category?._id || med.category,
        discount: med.discount?._id || med.discount,
      });
      setMedicines(medicines.map((m) => (m._id === id ? res.data : m)));
    } catch (error) {
      alert('Error updating stock: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Medicine Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setForm(initialForm);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <FiPlus /> <span>{showForm ? 'Cancel' : 'Add Medicine'}</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Medicine' : 'Add New Medicine'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Medicine Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800"
                required
                disabled={!!editingId} // Disable when editing
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Batch Number</label>
              <input
                type="text"
                name="batchId"
                value={form.batchId}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Discount</label>
              <select
                name="discount"
                value={form.discount}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800"
                disabled={!!editingId} // Disable when editing
              >
                <option value="">Select Discount</option>
                {discounts.map((discount) => (
                  <option key={discount._id} value={discount._id}>
                    {discount.name} - {discount.discountValue}%
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 flex space-x-2 mt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {editingId ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm(initialForm);
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Medicines Table */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-300">Loading...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Medicine</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Batch</th>
                <th className="px-6 py-3 text-left">Expiry</th>
                <th className="px-6 py-3 text-left">Stock</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Discount</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              {medicines.map((medicine) => (
                <tr key={medicine._id}>
                  <td className="px-6 py-4">{medicine.name}</td>
                  <td className="px-6 py-4">
                    {medicine.category?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4">{medicine.batchId || 'N/A'}</td>
                  <td className="px-6 py-4">
                    {medicine.expiryDate ? medicine.expiryDate.split('T')[0] : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateStock(medicine._id, -1)}
                        className="p-1 text-red-600 hover:text-red-800 dark:hover:text-red-400"
                        disabled={medicine.stock <= 0}
                      >
                        <FiMinus />
                      </button>
                      <span
                        className={`px-2 ${medicine.stock < 10
                          ? 'text-red-600 dark:text-red-400'
                          : medicine.stock < 20
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-green-600 dark:text-green-400'
                          }`}
                      >
                        {medicine.stock}
                      </span>
                      <button
                        onClick={() => updateStock(medicine._id, 1)}
                        className="p-1 text-green-600 hover:text-green-800 dark:hover:text-green-400"
                      >
                        <FiPlusCircle />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">${medicine.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {medicine.discount?.discountValue
                      ? `${medicine.discount.discountValue}%`
                      : discounts.find(d => d._id === medicine.discount)
                        ? `${discounts.find(d => d._id === medicine.discount).discountValue}%`
                        : medicine.discount
                          ? `${medicine.discount}%`
                          : '0%'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                        onClick={() => startEdit(medicine)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                        onClick={() => deleteMedicine(medicine._id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {medicines.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                    No medicines available. Click "Add Medicine" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PharmacyMedicineManagement;