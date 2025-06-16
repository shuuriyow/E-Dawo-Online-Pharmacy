import { FaShippingFast, FaCreditCard, FaHeadset } from 'react-icons/fa';

const highlights = [
  {
    icon: <FaShippingFast className="text-3xl text-blue-600" />,
    title: "Free shipping",
    desc: "Get your order delivered fast with free shipping!",
  },
  {
    icon: <FaCreditCard className="text-3xl text-green-600" />,
    title: "Secure payment",
    desc: "Shop with confidence – secure payment guaranteed!",
  },
  {
    icon: <FaHeadset className="text-3xl text-pink-600" />,
    title: "Support 24/7",
    desc: "We're always here for you!",
  },
];

const ServiceHighlights = () => (
  <div className="w-full max-w-6xl mx-auto my-8">
    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-8">
      {highlights.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4 flex-1 min-w-[200px]">
          <div className="flex-shrink-0 bg-blue-50 rounded-full p-3 shadow-md">{item.icon}</div>
          <div>
            <div className="font-bold text-lg text-gray-900">{item.title}</div>
            <div className="text-gray-500 text-sm">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ServiceHighlights;