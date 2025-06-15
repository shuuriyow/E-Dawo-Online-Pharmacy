import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMinus, FiPlusCircle } from 'react-icons/fi';
import axios from 'axios';

const initialForm = {
  name: '',
  description: '', // added
  category: '',
  batchId: '',
  expiryDate: '',
  stock: 0,
  price: 0,
  discount: '',
  image: null, // For image upload
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
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const medRes = await axios.get(`http://localhost:3000/api/medicines?pharmacy=${pharmacyId}`);
        setMedicines(medRes.data);
        const catRes = await axios.get('http://localhost:3000/api/categories');
        setCategories(catRes.data);
        const discRes = await axios.get('http://localhost:3000/api/discounts');
        setDiscounts(discRes.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
      setLoading(false);
    };
    if (pharmacyId) fetchData();
  }, [pharmacyId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm((prev) => ({ ...prev, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: name === 'stock' || name === 'price' ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    formData.append('pharmacy', pharmacyId);

    try {
      let res;
      if (editingId) {
        const med = medicines.find((m) => m._id === editingId);
        formData.append('category', med.category._id || med.category);
        formData.append('discount', med.discount?._id || med.discount);
        res = await axios.put(
          `http://localhost:3000/api/medicines/${editingId}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setMedicines(medicines.map((m) => (m._id === editingId ? res.data : m)));
      } else {
        res = await axios.post('http://localhost:3000/api/medicines', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setMedicines([res.data, ...medicines]);
      }

      setForm(initialForm);
      setImagePreview(null);
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      alert('Error saving medicine: ' + error.message);
    }
  };

  const startEdit = (medicine) => {
    setEditingId(medicine._id);
    setForm({
      name: medicine.name,
      description: medicine.description || '', // added
      category: medicine.category._id || medicine.category,
      batchId: medicine.batchId || '',
      expiryDate: medicine.expiryDate ? medicine.expiryDate.split('T')[0] : '',
      stock: medicine.stock,
      price: medicine.price,
      discount: medicine.discount?._id || medicine.discount,
      image: null,
    });
    setImagePreview(medicine.image || null);
    setShowForm(true);
  };

  const deleteMedicine = async (id) => {
    if (!window.confirm('Are you sure you want to delete this medicine?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/medicines/${id}`);
      setMedicines(medicines.filter((m) => m._id !== id));
    } catch (error) {
      alert('Error deleting medicine: ' + error.message);
    }
  };

  const updateStock = async (id, amount) => {
    const med = medicines.find((m) => m._id === id);
    if (!med) return;
    const newStock = Math.max(0, med.stock + amount);

    try {
      const res = await axios.put(`http://localhost:3000/api/medicines/${id}`, {
        ...med,
        stock: newStock,
        pharmacy: pharmacyId,
        category: med.category._id || med.category,
        discount: med.discount?._id || med.discount,
      });
      setMedicines(medicines.map((m) => (m._id === id ? res.data : m)));
    } catch (error) {
      alert('Error updating stock: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header + Toggle Form */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Medicine Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setForm(initialForm);
            setImagePreview(null);
          }}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus /> {showForm ? 'Cancel' : 'Add Medicine'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Medicine Name" required className="p-2 border rounded" />
          <textarea  name="description" value={form.description} onChange={handleChange} placeholder="Description"
            className="p-2 border rounded md:col-span-2"
          />
          <select name="category" value={form.category} onChange={handleChange} disabled={!!editingId} required className="p-2 border rounded">
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <input name="batchId" value={form.batchId} onChange={handleChange} placeholder="Batch ID" required className="p-2 border rounded" />
          <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} required className="p-2 border rounded" />
          <input type="number" name="stock" value={form.stock} onChange={handleChange} min="0" required className="p-2 border rounded" />
          <input type="number" name="price" value={form.price} onChange={handleChange} min="0" step="0.01" required className="p-2 border rounded" />
          <select name="discount" value={form.discount} onChange={handleChange} disabled={!!editingId} className="p-2 border rounded">
            <option value="">Select Discount</option>
            {discounts.map((d) => (
              <option key={d._id} value={d._id}>{d.name} - {d.discountValue}%</option>
            ))}
          </select>
          <div>
            <input type="file" accept="image/*" name="image" onChange={handleChange} className="p-2 border rounded" />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded" />
            )}
          </div>
          <div className="md:col-span-2 flex space-x-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
            <button type="button" onClick={() => { setForm(initialForm); setImagePreview(null); setShowForm(false); }} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="overflow-auto bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2"> Description</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Batch</th>
                <th className="px-4 py-2">Expiry</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Discount</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine._id}>
                  <td className="px-4 py-2">
                    {medicine.image ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={`http://localhost:3000/uploads/medicines/${medicine.image}`}
                          alt={medicine.name}
                          title={medicine.originalImageName || "Medicine"}
                          className="w-12 h-12 object-cover rounded mb-1"
                        />
                        <span className="text-xs text-gray-500">{medicine.originalImageName}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>

                  <td className="px-4 py-2">{medicine.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {medicine.description || <span className="text-gray-400">No description</span>}
                  </td>
                  <td className="px-4 py-2">{medicine.category?.name}</td>
                  <td className="px-4 py-2">{medicine.batchId}</td>
                  <td className="px-4 py-2">{medicine.expiryDate?.split('T')[0]}</td>
                  <td className="px-4 py-2">{medicine.stock}</td>
                  <td className="px-4 py-2">${medicine.price}</td>
                  <td className="px-4 py-2">{medicine.discount?.discountValue || '0'}%</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => startEdit(medicine)} className="text-blue-600"><FiEdit2 /></button>
                    <button onClick={() => deleteMedicine(medicine._id)} className="text-red-600"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
              {medicines.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center p-4 text-gray-500">No medicines available.</td>
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
