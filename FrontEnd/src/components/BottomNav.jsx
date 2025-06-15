import React, { useState } from 'react';
import { FiHeadphones } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { usePharmacy } from  '../context/PharmacyContext'; // Adjust the import path as necessary

const pharmacies = [
  { name: 'Kalkaal Pharmacy', _id: '662e13a056e8f6c7a07d1dbb' },
  { name: 'Shaafi Pharmacy', _id: '682e13a056e8f6c7a07d10ba' },
  { name: 'Banadir Pharmacy', _id: '692e13a056e8f6c7a07d1dbc' },
];

const pages = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'FAQs', href: '/faqs' },
];

const BottomNav = () => {
  const [pharmacyOpen, setPharmacyOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const { pharmacy } = usePharmacy(); // ⬅️ Read current pharmacy

  return (
    <div className="bg-white shadow-sm px-10 py-2 flex justify-between items-center border-b border-gray-100 relative">
      {/* Left nav */}
      <div className="flex space-x-8 text-[16px] font-medium text-gray-800">
        {/* Pharmacies Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setPharmacyOpen(true)}
          onMouseLeave={() => setPharmacyOpen(false)}
        >
          <button className="flex items-center gap-1 hover:text-blue-600 transition">
            {pharmacy?.name || 'All Pharmacies'} <span className="ml-1">&#9662;</span>
          </button>

          {/* Dropdown menu */}
          {pharmacyOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded shadow z-10">
              {pharmacies.map((p) => (
                <Link
                  to={`/pharmacies/${p._id}`}
                  key={p._id}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/" className="hover:text-blue-600 transition">Home</Link>

        {/* Categories (can be made dynamic later) */}
        <div className="relative">
          <button className="flex items-center gap-1 hover:text-blue-600 transition">
            Categories <span className="ml-1">&#9662;</span>
          </button>
        </div>

        <Link to="/rate-review" className="hover:text-blue-600 transition">Rate & Review</Link>

        {/* Pages Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setPagesOpen(true)}
          onMouseLeave={() => setPagesOpen(false)}
        >
          <button className="flex items-center gap-1 hover:text-blue-600 transition">
            Pages <span className="ml-1">&#9662;</span>
          </button>
          {pagesOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white border-gray-50 rounded shadow z-10">
              {pages.map((page) => (
                <Link
                  to={page.href}
                  key={page.name}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right contact */}
      <div className="flex items-center space-x-2 text-gray-700">
        <FiHeadphones className="text-xl text-purple-500" />
        <span className="text-sm">Call Us 24/7</span>
        <span className="flex items-center bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs ml-2 font-semibold">
          <span className="mr-1 text-green-500 text-base">●</span> Online
        </span>
      </div>
    </div>
  );
};

export default BottomNav;
