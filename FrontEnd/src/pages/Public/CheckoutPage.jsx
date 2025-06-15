// CheckoutPage.js
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const { cartItems, clearCart, calculateTotal } = useCart();
    const navigate = useNavigate();
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const total = calculateTotal();
    const shipping = 5.0;
    const finalTotal = total + shipping;

    const handleCheckout = () => {
        // Simulate a successful checkout
        setCheckoutSuccess(true);
        clearCart();

        // Redirect to home after a delay
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            {checkoutSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> Order placed successfully. Redirecting to home...</span>
                </div>
            ) : cartItems.length === 0 ? (
                <p className="text-gray-500">No items to checkout.</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded shadow">
                            <h2 className="text-xl font-semibold mb-4">Order Details</h2>

                            <ul className="divide-y">
                                {cartItems.map((item, idx) => (
                                    <li key={item._id} className="flex justify-between py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={`http://localhost:3000/uploads/medicines/${item.image}`}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded bg-emerald-100"
                                            />
                                            <div>
                                                <h3 className="font-medium text-gray-800">{item.name}</h3>
                                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="font-semibold text-gray-700">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Placeholder for Billing / Shipping Forms */}
                        <div className="bg-white p-6 rounded shadow">
                            <h2 className="text-lg font-semibold mb-3">Shipping Info</h2>
                            <p className="text-gray-500 text-sm">For now, we use your account info. Later we will add a form here.</p>
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="bg-white p-6 rounded shadow h-fit">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between font-bold border-t pt-4 mt-4">
                            <span>Total</span>
                            <span>${finalTotal.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 font-semibold"
                        >
                            Confirm & Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
