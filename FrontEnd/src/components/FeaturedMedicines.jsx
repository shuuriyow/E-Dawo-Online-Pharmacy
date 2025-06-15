import React, { useEffect, useState } from 'react';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, type: 'spring', stiffness: 70 }
  }),
  hover: { scale: 1.04, rotate: -1, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120 } },
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.2 } }
};

const FeaturedMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/medicines');
        const data = await res.json();
        setMedicines(data);
      } catch (err) {
        console.error('Failed to load medicines:', err);
      }
    };
    fetchMedicines();
  }, []);

  const getCartQuantity = (name) => {
    const item = cartItems.find((m) => m.name === name);
    return item ? item.quantity : 0;
  };

  return (
    <section className="py-14 bg-gradient-to-br from-blue-50 via-white to-pink-50 min-h-[100vh]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 drop-shadow">Featured Medicines</h2>
            <p className="text-gray-500 mt-1">Best selling and most trusted products</p>
          </div>
          <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all shadow hover:shadow-lg">
            View All →
          </button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {medicines.map((med, index) => (
            <motion.div
              key={index}
              className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-lg transition-all duration-300 group border border-gray-100 overflow-hidden"
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
            >
              {/* Discount Badge */}
              {med.discount && (
                <div className="absolute top-4 left-4 bg-pink-500/90 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow">
                  -{med.discount?.discountValue || 0}%
                </div>
              )}

              {/* Favorite and View Icons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <button className="bg-white/80 p-2 rounded-full shadow hover:bg-pink-100 transition">
                  <FiHeart className="text-pink-500" />
                </button>
                <button
                  className="bg-white/80 p-2 rounded-full shadow hover:bg-blue-100 transition"
                  onClick={() => {
                    setSelectedMedicine(med);
                    setShowModal(true);
                  }}
                >
                  <FiEye className="text-blue-600" />
                </button>
              </div>

              <div className="overflow-hidden rounded-t-3xl">
                <motion.img
                  src={`http://localhost:3000/uploads/medicines/${med.image}`}
                  alt={med.name}
                  className="w-full h-44 object-cover object-center bg-gradient-to-br from-orange-200 to-orange-400 group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                />
              </div>

              <div className="p-5 flex flex-col gap-2">
                <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{med.name}</h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2 min-h-[36px]">{med.description}</p>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-500 text-xl font-bold">${med.price?.toFixed(2)}</span>
                  {med.originalPrice && (
                    <span className="line-through text-gray-400 ml-1">${med.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                {/* Stock Display */}
                <div
                  className={`text-xs inline-block px-2 py-1 rounded mb-2 font-semibold ${
                    med.stock < 10
                      ? 'bg-red-100 text-red-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {med.stock < 10 ? 'Low Stock: ' : 'In Stock: '}
                  {med.stock}
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(med)}
                  className="flex items-center justify-center w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-full shadow transition-all duration-200 hover:shadow-xl active:scale-95"
                >
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                  {getCartQuantity(med.name) > 0 && (
                    <span className="ml-2 bg-white text-blue-600 font-bold px-2 py-1 rounded-full text-xs shadow">
                      {getCartQuantity(med.name)}
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View Details Modal */}
      <AnimatePresence>
        {showModal && selectedMedicine && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <img
                src={`http://localhost:3000/uploads/medicines/${selectedMedicine.image}`}
                alt={selectedMedicine.name}
                className="w-full h-56 object-cover rounded-xl mb-6 shadow"
              />
              <h2 className="text-3xl font-extrabold mb-2 text-gray-800">{selectedMedicine.name}</h2>
              <p className="mb-3 text-gray-600">{selectedMedicine.description}</p>
              <div className="text-blue-600 font-bold text-2xl mb-2">${selectedMedicine.price?.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Stock: {selectedMedicine.stock}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedMedicines;