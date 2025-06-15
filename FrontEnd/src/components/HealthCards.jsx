import React from "react";

const HealthCards = () => {
  return (
    <div className="bg-[#eefcfc] py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        It's Easy To Be Healthy
      </h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
        Take control of your health with our comprehensive monitoring and care products
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-blue-100 p-6 rounded-xl relative flex items-center justify-between shadow-md hover:shadow-xl transition-shadow duration-300">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Manage Diabetes with Ease - Stay in Control
            </h3>
            <p className="text-gray-700 text-sm mb-4 max-w-sm">
              Take control of your diabetes with our comprehensive range of blood glucose monitors, test strips, and diabetic care products.
            </p>
            <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-green-600 transition">
              Shop Now →
            </button>
          </div>
          <div className="ml-4 relative">
            <img
              src="/path-to-your-image.png"
              alt="Diabetes"
              className="w-24 h-24 object-cover rounded-lg"
            />
            <span className="w-4 h-4 bg-green-400 rounded-full absolute -top-2 -left-2"></span>
            <span className="w-3 h-3 bg-pink-400 rounded-full absolute -bottom-2 -right-2"></span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-purple-100 p-6 rounded-xl relative flex items-center justify-between shadow-md hover:shadow-xl transition-shadow duration-300">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Manage Blood Pressure Effortlessly - A Healthy Heart Starts Here
            </h3>
            <p className="text-gray-700 text-sm mb-4 max-w-sm">
              Monitor and maintain healthy blood pressure with our selection of digital monitors and heart health supplements.
            </p>
            <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded-full text-sm hover:bg-green-600 transition">
              Shop Now →
            </button>
          </div>
          <div className="ml-4 relative">
            <img
              src="/path-to-your-image.png"
              alt="Blood Pressure"
              className="w-24 h-24 object-cover rounded-lg"
            />
            <span className="w-4 h-4 bg-green-400 rounded-full absolute -top-2 -left-2"></span>
            <span className="w-3 h-3 bg-pink-400 rounded-full absolute -bottom-2 -right-2"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCards;
