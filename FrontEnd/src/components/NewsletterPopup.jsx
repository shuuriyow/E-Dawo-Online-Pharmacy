// src/components/NewsletterPopup.jsx
import React, { useEffect, useState } from 'react';
import { FiX, FiMail } from 'react-icons/fi';

const NewsletterPopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => setShow(false), 3000); // hide after 3s
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md p-6 rounded-xl shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-white"
          onClick={() => setShow(false)}
        >
          <FiX className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
              Subscribe to Health News & Offers
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Get health tips, new medicine updates, and discounts directly to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <div className="relative w-full">
                <FiMail className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
              ✅ Subscribed!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Thank you for subscribing to E-Dawo newsletters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup;
