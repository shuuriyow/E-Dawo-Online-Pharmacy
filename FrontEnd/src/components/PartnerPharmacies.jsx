// src/components/PartnerPharmacies.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

const partners = [
  {
    name: 'Kalkaal Pharmacy',
    logo: '/bartenerPharmaciesLogo/kalkaal.png',
    rating: 4.8,
    reviews: 1250,
  },
  {
    name: 'Shaafi Pharmacy',
    logo: '/bartenerPharmaciesLogo/Shaafi.png',
    rating: 4.7,
    reviews: 980,
  },
  {
    name: 'Banadir Pharmacy',
    logo: '/bartenerPharmaciesLogo/Banadir.png',
    rating: 4.9,
    reviews: 1500,
  },
  {
    name: 'Digfeer Pharmacy',
    logo: '/bartenerPharmaciesLogo/Digfeer.png',
    rating: 4.6,
    reviews: 750,
  },
];

const PartnerPharmacies = () => {
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Our Partner Pharmacies</h2>
            <p className="text-gray-500">Trusted pharmacy networks nationwide</p>
          </div>
          <button className="border border-emerald-500 text-emerald-500 px-4 py-2 rounded-full hover:bg-emerald-50 transition">
            View All →
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 text-center"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-20 h-20 rounded-full shadow-md hover:shadow-xl transition"
                />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">{partner.name}</h3>
              <div className="flex justify-center items-center mt-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
                <span className="text-gray-700 text-sm ml-2">{partner.rating}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">({partner.reviews} reviews)</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerPharmacies;
