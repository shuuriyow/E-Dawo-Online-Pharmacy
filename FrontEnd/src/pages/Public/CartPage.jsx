import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiTrash2, FiArrowLeft, FiChevronDown } from 'react-icons/fi';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, calculateTotal } = useCart();
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [promoCode, setPromoCode] = useState('');

  const shippingOptions = [
    { id: 'standard', label: 'Standard Delivery', cost: 5.00 },
    { id: 'express', label: 'Express Delivery', cost: 10.00 },
    { id: 'priority', label: 'Priority Delivery', cost: 15.00 },
    { id: 'free', label: 'Free Shipping', cost: 0.00 }
  ];

  const subtotal = calculateTotal();
  const selectedShipping = shippingOptions.find(option => option.id === shippingMethod);
  const shippingCost = selectedShipping ? selectedShipping.cost : 0;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 bg-transparent">
        {/* Cart Items */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-center mb-8 border-b pb-4">
            <FiShoppingCart className="text-2xl mr-2 text-indigo-600" />
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>
            <span className="ml-auto text-gray-500 text-lg font-semibold">{cartItems.length} Items</span>
          </div>
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link
                to="/"
                className="inline-flex items-center text-indigo-600 hover:underline"
              >
                <FiArrowLeft className="mr-1" /> Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-4 gap-4 text-gray-500 text-xs font-semibold mb-4 px-2">
                <div className="col-span-2">PRODUCT DETAILS</div>
                <div className="text-center">QUANTITY</div>
                <div className="text-right">TOTAL</div>
              </div>
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex flex-col md:flex-row items-center py-6 px-2">
                    <div className="flex items-center gap-4 w-full md:w-2/4">
                      <img
                        src={`http://localhost:3000/uploads/medicines/${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-contain bg-gray-100 rounded"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-500 text-xs mt-1">${item.price.toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-xs text-red-400 hover:text-red-600 mt-1 flex items-center gap-1"
                        >
                          <FiTrash2 className="inline" /> Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-full md:w-1/4 mt-4 md:mt-0">
                      <button
                        onClick={() => updateQuantity(item._id, -1)}
                        className="w-8 h-8 border border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-50 text-lg"
                      >
                        -
                      </button>
                      <span className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, 1)}
                        className="w-8 h-8 border border-gray-300 rounded-r flex items-center justify-center hover:bg-gray-50 text-lg"
                      >
                        +
                      </button>
                    </div>
                    <div className="w-full md:w-1/4 text-right mt-4 md:mt-0">
                      <span className="font-medium text-gray-900 text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/"
                className="inline-flex items-center mt-8 text-indigo-600 hover:underline"
              >
                <FiArrowLeft className="mr-1" /> Continue Shopping
              </Link>
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3 bg-gray-100 rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-lg font-bold mb-6 text-gray-900">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>ITEMS {cartItems.length}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">SHIPPING</label>
              <div className="relative">
                <select
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm bg-white"
                >
                  {shippingOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.label} - ${option.cost.toFixed(2)}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">PROMO CODE</label>
              <div className="flex">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter your code"
                  className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-r text-sm transition-colors"
                  onClick={() => {
                    alert('Promo code functionality would be implemented here');
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-200">
              <span>TOTAL COST</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded font-semibold text-lg hover:bg-indigo-700 transition">
                CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;