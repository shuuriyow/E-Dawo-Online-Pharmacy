import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { usePharmacy } from '../../context/PharmacyContext';
import { FaHeart, FaRegEye, FaStar, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const PharmacyPage = () => {
  const { pharmacyId } = useParams();
  const [medicines, setMedicines] = useState([]);
  const { pharmacy, setPharmacy } = usePharmacy();
  const [bestSells, setBestSells] = useState([]);

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

  // Cart context
  const { addToCart, cartItems } = useCart();

  // Helper to get cart quantity for a medicine
  const getCartQuantity = (id) => {
    const item = cartItems.find((m) => m._id === id);
    return item ? item.quantity : 0;
  };

 useEffect(() => {
  const fetchData = async () => {
    try {
      const pharmacyRes = await axios.get(`http://localhost:3000/api/pharmacies/${pharmacyId}`);
      const medicineRes = await axios.get(`http://localhost:3000/api/medicines/pharmacy/${pharmacyId}`);
      setPharmacy(pharmacyRes.data);
      setMedicines(Array.isArray(medicineRes.data) ? medicineRes.data : []);
      // Best sells: top 4 by rating or sales (adjust as needed)
      const sorted = [...medicineRes.data].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      setBestSells(sorted.slice(0, 4));
    } catch (error) {
      console.error('Error loading pharmacy data', error);
    }
  };
  fetchData();
}, [pharmacyId, setPharmacy]);

  if (!pharmacy) return <div>Loading pharmacy...</div>;

  return (
    <div className="px-2 py-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 rounded-3xl shadow-lg" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl">
          <div className="flex-shrink-0">
            <div className="w-36 h-36 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-extrabold shadow-lg border-4 border-white">
              {pharmacy.name?.charAt(0) || 'P'}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold text-blue-800 mb-2">{pharmacy.name}</h2>
            <p className="text-lg text-gray-700 mb-3">{pharmacy.description || 'Trusted provider of healthcare products.'}</p>
            <div className="flex flex-wrap gap-4 text-gray-600 text-base">
              <span className="bg-white/80 rounded px-3 py-1 shadow"><strong>Address:</strong> {pharmacy.address}</span>
              <span className="bg-white/80 rounded px-3 py-1 shadow"><strong>Phone:</strong> {pharmacy.phone}</span>
              <span className="bg-white/80 rounded px-3 py-1 shadow"><strong>License:</strong> {pharmacy.license}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Medicines Section */}
      <section className="mb-14">
        <h3 className="text-2xl font-bold mb-6 text-blue-700">Available Medicines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {medicines.length === 0 ? (
            <div className="col-span-full text-gray-400 text-center">No medicines available.</div>
          ) : (
            medicines.map((med) => (
              <div
                key={med._id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl group relative"
              >
                {/* Medicine Image */}
                <div className="w-32 h-24 mb-4 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-blue-100">
                  <img
                    src={`http://localhost:3000/uploads/medicines/${med.image}`}
                    alt={med.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Name */}
                <h4 className="font-bold text-lg text-gray-800 mb-1 text-center">{med.name}</h4>
                {/* Description */}
                <p className="text-gray-500 text-sm mb-2 text-center">{med.description}</p>
                {/* Price */}
                {med.price && (
                  <div className="text-blue-700 font-bold text-lg mb-2">${med.price}</div>
                )}
                {/* Stock */}
                {typeof med.stock !== 'undefined' && (
                  <div className="bg-green-100 text-green-700 rounded-md px-3 py-1 text-sm font-semibold mb-4 w-full text-center">
                    In Stock: {med.stock}
                  </div>
                )}
                {/* Add to Cart Button */}
                <button
                  className="mt-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 w-full font-semibold text-base"
                  onClick={() => addToCart(med)}
                >
                  <FaShoppingCart className="text-lg" />
                  Add to Cart
                  {getCartQuantity(med._id) > 0 && (
                    <span className="ml-2 bg-white text-blue-600 font-bold px-2 py-1 rounded-full text-xs shadow">
                      {getCartQuantity(med._id)}
                    </span>
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Best Sellers Section */}
  <section className="mb-14">
  <h3 className="text-2xl font-bold mb-6 text-pink-700">All Medicines</h3>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
    {bestSells.length === 0 ? (
      <div className="col-span-full text-center text-gray-400">No best sellers yet.</div>
    ) : (
      bestSells.map((med) => {
        const hasDiscount = med.discount && med.discount > 0;
        const discountedPrice = hasDiscount
          ? (med.price - (med.price * med.discount) / 100).toFixed(2)
          : med.price;

        return (
          <div
            key={med._id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300"
          >
            {/* Product Image */}
            <div className="h-28 w-full flex items-center justify-center bg-white p-2 border-b">
              <img
                src={`http://localhost:3000/uploads/medicines/${med.image}`}
                alt={med.name}
                className="max-h-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="p-3 text-center space-y-1">
              <span className="text-xs text-gray-500">Medicine</span>
              <h4 className="font-semibold text-sm text-gray-800">{med.name}</h4>

              {/* Static rating stars */}
              <div className="flex justify-center items-center text-xs text-green-600">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-green-500 text-[12px]" />
                ))}
                <span className="ml-1 text-gray-500 text-xs">(4)</span>
              </div>

              {/* Price, old price, and Add to cart */}
              <div className="flex items-center justify-between mt-2">
                <div className="text-left">
                  <div className="text-green-600 text-sm font-bold">${discountedPrice}</div>
                  {hasDiscount && (
                    <div className="text-xs text-gray-400 line-through">${med.price}</div>
                  )}
                </div>

                <button
                  onClick={() => addToCart(med)}
                  className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 text-xs rounded-md border border-green-300 hover:bg-green-200 transition"
                >
                  <FaShoppingCart className="text-xs" />
                  Add
                  {getCartQuantity(med._id) > 0 && (
                    <span className="ml-1 bg-white px-1 rounded-full text-green-700 text-[10px] font-bold shadow">
                      {getCartQuantity(med._id)}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })
    )}
  </div>
</section>

      {/* Reviews Section */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-blue-700">Customer Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-extrabold text-2xl mb-3 shadow">
                {review.user.charAt(0)}
              </div>
              <div className="font-semibold text-blue-900 mb-1">{review.user}</div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) =>
                  i < review.rating ? (
                    <FaStar key={i} className="text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} className="text-yellow-300" />
                  )
                )}
              </div>
              <p className="text-gray-700 text-center">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PharmacyPage;