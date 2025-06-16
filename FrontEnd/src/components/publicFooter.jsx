import React, { useState } from 'react';
import {
  FiPhone, FiMail, FiMapPin,
  FiInstagram, FiFacebook, FiLinkedin
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const PublicFooter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();

    // You can replace this with your API call
    if (email.includes('@')) {
      setMessage('Thank you for subscribing!');
      setEmail('');
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <footer className="bg-blue-600 text-white pt-12 pb-6">
      <div className="container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo and About */}
        <div className="flex flex-col">
          {/* Logo with blue background and white E */}
          <div className="flex items-center mb-4">
            <div className="bg-white rounded-lg w-12 h-12 flex items-center justify-center mr-3">
              <span className="text-blue-600 font-bold text-2xl">E</span>
            </div>
            <div>
              <span className="text-white font-extrabold text-xl tracking-wide">E-DAWO</span>
              <div className="text-gray-200 text-sm">Online Pharmacy</div>
            </div>
          </div>
          <p className="text-sm text-gray-100">
            E-Dawo Online Pharmacy is a modern digital platform that connects customers to multiple pharmacies, offering a wide range of medicines and healthcare.
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="hover:scale-110 transition-transform duration-300 text-white"><FiInstagram /></a>
            <a href="#" className="hover:scale-110 transition-transform duration-300 text-white"><FaWhatsapp /></a>
            <a href="#" className="hover:scale-110 transition-transform duration-300 text-white"><FiFacebook /></a>
            <a href="#" className="hover:scale-110 transition-transform duration-300 text-white"><FiLinkedin /></a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-300">Home</a></li>
            <li><a href="#" className="hover:text-yellow-300">All Pharmacies</a></li>
            <li><a href="#" className="hover:text-yellow-300">Categories</a></li>
            <li><a href="#" className="hover:text-yellow-300">FAQs</a></li>
            <li><a href="#" className="hover:text-yellow-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-yellow-300">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-4 text-white">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2"><FiPhone /> <span>+252 61 2583729</span></li>
            <li className="flex items-center space-x-2"><FiMail /> <span>E-Dawo@gmail.com</span></li>
            <li className="flex items-center space-x-2"><FiMapPin /> <span>Mogadishu, Somalia</span></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold mb-4 text-white">Sign up Newsletter</h4>
          <p className="text-sm text-gray-100 mb-3">
            Join our community to receive valuable health information and exclusive discounts!
          </p>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 rounded-l-lg bg-gray-100 text-gray-600 w-full"
            />
            <button type="submit" className="px-4 bg-yellow-400 text-white font-semibold rounded-r-lg hover:bg-yellow-500">
              Subscribe
            </button>
          </form>
          {message && <p className="text-sm text-white mt-2">{message}</p>}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 mt-10 pt-6 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center text-sm text-gray-100">
        <p>© 2025 E-Dawo Online Pharmacy. All Rights Reserved.</p>
        <div className="mt-3 md:mt-0 flex space-x-3">
          <img src="payments/Group 46.png" alt="EVC" className="h-6" />
          <img src="/payments/download (13) 1.png" alt="MasterCard" className="h-6" />
          <img src="/payments/image (4).png" alt="Visa" className="h-6" />
          <img src="/payments/image (5).png" alt="Salaam" className="h-6" />
          <img src="/payments/image (3).png" alt="Somtel" className="h-6" />
          <img src="/payments/image (2).png" alt="SB" className="h-6" />
          <img src="/payments/image (1).png" alt="Zaad" className="h-6" />
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
