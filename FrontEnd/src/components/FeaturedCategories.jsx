import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Top Categories</h2>
            <p className="text-gray-500">Browse by medical category</p>
          </div>
          <button className="flex items-center gap-1 text-sm text-teal-600 border border-teal-600 px-3 py-1.5 rounded hover:bg-teal-50">
            View All <ArrowRight size={16} />
          </button>
        </div>

       {loading ? (
  <div className="text-center py-10 text-gray-400">Loading...</div>
) : (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    {categories.slice(0, 6).map((cat) => (
      <div
        key={cat._id}
        className="flex flex-col items-center bg-gradient-to-b from-green-50 to-white rounded-2xl p-4 shadow-sm hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out transform hover:bg-green-100"
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex items-center justify-center mb-3">
          <img
            src={`http://localhost:3000/TopCategories/${cat.image}`}
            alt={cat.name}
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-sm font-semibold text-gray-900 mb-1">{cat.name}</p>
        <p className="text-xs text-gray-500">{cat.items} items</p>
      </div>
    ))}
  </div>
)}
      </div>
    </section>
  );
};

export default FeaturedCategories;