import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { usePharmacy } from '../../context/PharmacyContext';

const PharmacyPage = () => {
  const { pharmacyId } = useParams();
  const [medicines, setMedicines] = useState([]);
  const { pharmacy, setPharmacy } = usePharmacy();
  const [reviews, setReviews] = useState([
    {
      user: 'Amina M.',
      comment: 'Great service and fast delivery!',
      rating: 5,
    },
    {
      user: 'Mohamed A.',
      comment: 'Wide selection of medicines and helpful staff.',
      rating: 4,
    },
    {
      user: 'Fatima S.',
      comment: 'Easy to order and very reliable.',
      rating: 5,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pharmacyRes = await axios.get(`http://localhost:3000/api/pharmacies/${pharmacyId}`);
        const medicineRes = await axios.get(`http://localhost:3000/api/medicines/pharmacy/${pharmacyId}`);
        setPharmacy(pharmacyRes.data);
        setMedicines(Array.isArray(medicineRes.data) ? medicineRes.data : []);
      } catch (error) {
        console.error('Error loading pharmacy data', error);
      }
    };
    fetchData();
  }, [pharmacyId, setPharmacy]);

  if (!pharmacy) return <div>Loading pharmacy...</div>;

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      {/* Section 1: About Pharmacy */}
      <section className="mb-10 bg-blue-50 rounded-xl p-6 shadow flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">{pharmacy.name}</h2>
          <p className="text-gray-700 mb-2">{pharmacy.description || 'Trusted provider of healthcare products.'}</p>
          <div className="text-gray-600 mb-1">
            <span className="font-semibold">Address:</span> {pharmacy.address}
          </div>
          <div className="text-gray-600 mb-1">
            <span className="font-semibold">Phone:</span> {pharmacy.phone}
          </div>
          <div className="text-gray-600">
            <span className="font-semibold">License:</span> {pharmacy.license}
          </div>
        </div>
        <div className="flex-shrink-0">
          {/* Placeholder for logo or pharmacy image */}
          <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {pharmacy.name?.charAt(0) || 'P'}
          </div>
        </div>
      </section>

      {/* Section 2: Available Medicines */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-blue-700">Available Medicines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicines.length === 0 ? (
            <div className="col-span-full text-gray-400 text-center">No medicines available.</div>
          ) : (
            medicines.map((med) => (
              <div
                key={med._id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <div className="w-24 h-24 mb-3 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={med.image || '/medicine-placeholder.png'}
                    alt={med.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-bold text-lg text-blue-800 mb-1">{med.name}</h4>
                <p className="text-gray-500 text-sm mb-2">{med.description}</p>
                <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200">
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Section 3: Customer Reviews */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 text-blue-700">Customer Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3">
                  {review.user.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{review.user}</div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PharmacyPage;