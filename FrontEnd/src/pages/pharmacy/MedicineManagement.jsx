import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMinus, FiPlusCircle } from 'react-icons/fi';

const PharmacyMedicineManagement = ({ pharmacyId }) => {
  // Mock data filtered by pharmacyId
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol', category: 'Pain Relief', stock: 42, price: 5.99, discount: 0 },
    { id: 2, name: 'Amoxicillin', category: 'Antibiotics', stock: 18, price: 12.50, discount: 10 }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    category: '',
    stock: 0,
    price: 0,
    discount: 0
  });

  const updateStock = (id, amount) => {
    setMedicines(medicines.map(med => 
      med.id === id ? {...med, stock: Math.max(0, med.stock + amount)} : med
    ));
  };

  const addMedicine = () => {
    setMedicines([...medicines, {
      ...newMedicine,
      id: medicines.length + 1,
      stock: parseInt(newMedicine.stock),
      price: parseFloat(newMedicine.price),
      discount: parseInt(newMedicine.discount)
    }]);
    setNewMedicine({
      name: '',
      category: '',
      stock: 0,
      price: 0,
      discount: 0
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Medicine Management</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <FiPlus /> <span>Add Medicine</span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Add New Medicine</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Medicine Name</label>
              <input
                type="text"
                value={newMedicine.name}
                onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                className="w-full p-2 border rounded-lg dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block mb-1">Category</label>
              <input
                type="text"
                value={newMedicine.category}
                onChange={(e) => setNewMedicine({...newMedicine, category: e.target.value})}
                className="w-full p-2 border rounded-lg dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block mb-1">Initial Stock</label>
              <input
                type="number"
                value={newMedicine.stock}
                onChange={(e) => setNewMedicine({...newMedicine, stock: e.target.value})}
                className="w-full p-2 border rounded-lg dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={newMedicine.price}
                onChange={(e) => setNewMedicine({...newMedicine, price: e.target.value})}
                className="w-full p-2 border rounded-lg dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block mb-1">Discount (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={newMedicine.discount}
                onChange={(e) => setNewMedicine({...newMedicine, discount: e.target.value})}
                className="w-full p-2 border rounded-lg dark:bg-gray-800"
              />
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={addMedicine}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-50 dark:bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Medicine</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Discount</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
            {medicines.map(medicine => (
              <tr key={medicine.id}>
                <td className="px-6 py-4">{medicine.name}</td>
                <td className="px-6 py-4">{medicine.category}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateStock(medicine.id, -1)}
                      className="p-1 text-red-600 hover:text-red-800 dark:hover:text-red-400"
                    >
                      <FiMinus />
                    </button>
                    <span className={`px-2 ${
                      medicine.stock < 10 ? 'text-red-600 dark:text-red-400' : 
                      medicine.stock < 20 ? 'text-yellow-600 dark:text-yellow-400' : 
                      'text-green-600 dark:text-green-400'
                    }`}>
                      {medicine.stock}
                    </span>
                    <button 
                      onClick={() => updateStock(medicine.id, 1)}
                      className="p-1 text-green-600 hover:text-green-800 dark:hover:text-green-400"
                    >
                      <FiPlusCircle />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">${medicine.price.toFixed(2)}</td>
                <td className="px-6 py-4">{medicine.discount}%</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                      <FiEdit2 />
                    </button>
                    <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400">
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

export default PharmacyMedicineManagement;