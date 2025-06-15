import { useState, useEffect } from 'react';
import { FiUpload, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const MiddleHeader = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { cartItems } = useCart();
  const fileInputRef = useRef();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('http://localhost:3000/api/categories');

        // Validate response structure
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid data format received from server');
        }

        setCategories(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch categories');
        console.error('Category fetch error:', err);
        setCategories([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
 

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // You can add additional logic here when category changes
  };

  // Handle file selection and upload
  // ...existing code...
const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const formData = new FormData();
    formData.append('prescription', file);

    // Get token from localStorage (adjust if you store it elsewhere)
    const token = localStorage.getItem('token');

    await axios.post('http://localhost:3000/api/prescriptions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });
    alert('Prescription uploaded successfully!');
  } catch (err) {
    alert('Failed to upload prescription');
    console.error(err);
  }
};


  return (
    <div className="bg-white px-6 py-3 flex items-center justify-between shadow border-b border-blue-200">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="bg-blue-600 text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-md">E</div>
        <div>
          <span className="text-xl font-extrabold text-blue-700">E-DAWO</span>
          <div className="text-xs text-gray-500 font-medium -mt-1">Online Pharmacy</div>
        </div>
      </div>

      {/* Category & Search */}
      <div className="flex items-center w-1/2 max-w-2xl">
        <div className="relative w-full flex">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            disabled={loading}
            className={`border border-gray-200 rounded-l-md px-4 py-2 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 min-w-[180px] ${loading ? 'cursor-not-allowed opacity-70' : ''
              }`}
          >
            {loading ? (
              <option>Loading categories...</option>
            ) : error ? (
              <option>Failed to load categories</option>
            ) : categories.length === 0 ? (
              <option>No categories available</option>
            ) : (
              <>
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </>
            )}
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search medicines, brands, or symptoms..."
            className="w-full px-4 py-2 border-t border-b border-gray-200 text-sm focus:outline-none"
          />

          {/* Search Button */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-r-md flex items-center justify-center transition-colors duration-200">
            <FiSearch className="text-lg" />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-3">
      <button
          type="button"
          className="flex items-center border border-gray-200 px-4 py-2 rounded-md bg-white hover:bg-gray-50 font-medium text-gray-700 transition-colors duration-200"
          onClick={() => fileInputRef.current.click()}
        >
          <FiUpload className="mr-2" /> Upload Prescription
        </button>
         {/* Hidden file input */}
        <input
          type="file"
          accept="image/*,.pdf"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {/* link to the cart */}
        <Link to="/cart" className="relative">
          <button className="flex items-center border border-gray-200 px-4 py-2 rounded-md bg-white hover:bg-gray-50 font-medium text-gray-700 transition-colors duration-200">
            <FiShoppingCart className="mr-2" />
            Cart
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </Link>
        <button className="flex items-center border border-gray-200 px-4 py-2 rounded-md bg-white hover:bg-gray-50 font-medium text-gray-700 transition-colors duration-200">
          <FiUser className="mr-2" /> Account <span className="ml-1">&#9662;</span>
        </button>
      </div>
    </div>
  );
};

export default MiddleHeader;