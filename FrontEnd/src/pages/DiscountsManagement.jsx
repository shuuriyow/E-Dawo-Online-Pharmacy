import { useState } from 'react';
import { FiPlus, FiToggleLeft, FiToggleRight, FiEdit2, FiTrash2 } from 'react-icons/fi';

const DiscountsManagement = () => {
  const [discounts, setDiscounts] = useState([
    { id: 1, name: 'Summer Sale', code: 'SUMMER20', value: 20, startDate: '2023-06-01', endDate: '2023-08-31', active: true },
    { id: 2, name: 'New Customer', code: 'WELCOME10', value: 10, startDate: '2023-01-01', endDate: '2023-12-31', active: false }
  ]);
  const [newDiscount, setNewDiscount] = useState({
    name: '',
    code: '',
    value: 0,
    startDate: '',
    endDate: ''
  });
  const [showForm, setShowForm] = useState(false);

  const toggleDiscount = (id) => {
    setDiscounts(discounts.map(d => 
      d.id === id ? {...d, active: !d.active} : d
    ));
  };

  const addDiscount = () => {
    if (newDiscount.name && newDiscount.code) {
      setDiscounts([...discounts, {
        ...newDiscount,
        id: discounts.length + 1,
        active: true,
        value: parseInt(newDiscount.value)
      }]);
      setNewDiscount({
        name: '',
        code: '',
        value: 0,
        startDate: '',
        endDate: ''
      });
      setShowForm(false);
    }
  };

  const deleteDiscount = (id) => {
    setDiscounts(discounts.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Discounts Management</h1>
      
      <button 
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
      >
        <FiPlus /> <span>{showForm ? 'Cancel' : 'Create New Discount'}</span>
      </button>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">New Discount Campaign</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Campaign Name</label>
              <input
                type="text"
                value={newDiscount.name}
                onChange={(e) => setNewDiscount({...newDiscount, name: e.target.value})}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1">Discount Code</label>
              <input
                type="text"
                value={newDiscount.code}
                onChange={(e) => setNewDiscount({...newDiscount, code: e.target.value})}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1">Discount Value (%)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={newDiscount.value}
                onChange={(e) => setNewDiscount({...newDiscount, value: e.target.value})}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1">Start Date</label>
              <input
                type="date"
                value={newDiscount.startDate}
                onChange={(e) => setNewDiscount({...newDiscount, startDate: e.target.value})}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1">End Date</label>
              <input
                type="date"
                value={newDiscount.endDate}
                onChange={(e) => setNewDiscount({...newDiscount, endDate: e.target.value})}
                className="w-full p-2 border rounded-lg dark:bg-gray-700"
              />
            </div>
          </div>
          <button
            onClick={addDiscount}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save Discount
          </button>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Campaign</th>
              <th className="px-6 py-3 text-left">Code</th>
              <th className="px-6 py-3 text-left">Value</th>
              <th className="px-6 py-3 text-left">Period</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {discounts.map(discount => (
              <tr key={discount.id}>
                <td className="px-6 py-4">{discount.name}</td>
                <td className="px-6 py-4 font-mono">{discount.code}</td>
                <td className="px-6 py-4">{discount.value}%</td>
                <td className="px-6 py-4">
                  {discount.startDate} to {discount.endDate}
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleDiscount(discount.id)}
                    className="flex items-center"
                  >
                    {discount.active ? (
                      <FiToggleRight className="w-6 h-6 text-green-500" />
                    ) : (
                      <FiToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                    <span className="ml-1">
                      {discount.active ? 'Active' : 'Inactive'}
                    </span>
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                      <FiEdit2 />
                    </button>
                    <button 
                      onClick={() => deleteDiscount(discount.id)}
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

export default DiscountsManagement;