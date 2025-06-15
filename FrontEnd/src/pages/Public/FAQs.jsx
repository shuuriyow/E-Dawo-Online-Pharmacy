import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
    {
        question: "What is E-Dawo Online Pharmacy?",
        answer: "E-Dawo Online Pharmacy is a convenient platform to order prescription and over-the-counter medicines online and have them delivered to your doorstep. We provide reliable healthcare solutions with professional guidance.",
        category: "General"
    },
    {
        question: "How do I place an order?",
        answer: "Simply browse our catalog, add items to your cart, and proceed to checkout. You can upload your prescription if required. Our system will verify your prescription before processing your order.",
        category: "Ordering"
    },
    {
        question: "Is my personal information secure?",
        answer: "Yes, we use industry-standard encryption (SSL/TLS) and strict privacy practices to keep your data safe. We comply with all healthcare data protection regulations.",
        category: "Security"
    },
    {
        question: "How long does delivery take?",
        answer: "Delivery typically takes 1-3 business days depending on your location. We offer express delivery options for urgent needs in select areas.",
        category: "Delivery"
    },
    {
        question: "Can I consult with a pharmacist?",
        answer: "Yes, we have licensed pharmacists available 24/7 for online consultations. Click the 'Chat with Pharmacist' button on our website to start a consultation.",
        category: "Support"
    },
];

const FAQItem = ({ faq, isOpen, onClick }) => (
    <div className="border-b border-gray-200 last:border-b-0">
        <motion.button
            className="w-full flex justify-between items-center py-5 text-left focus:outline-none"
            onClick={onClick}
            whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.05)" }}
        >
            <div className="flex items-start">
                <span className="hidden md:block bg-indigo-100 text-indigo-600 text-xs font-medium px-2.5 py-0.5 rounded mr-3">
                    {faq.category}
                </span>
                <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                </span>
            </div>
            {isOpen ? (
                <FiChevronUp className="w-5 h-5 text-indigo-600 ml-4 flex-shrink-0" />
            ) : (
                <FiChevronDown className="w-5 h-5 text-gray-500 ml-4 flex-shrink-0" />
            )}
        </motion.button>

        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                >
                    <div className="pb-6 text-gray-600">
                        {faq.answer}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default function FAQs() {
    const [openIndex, setOpenIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", ...new Set(faqs.map(faq => faq.category))];
    const filteredFaqs = activeCategory === "All" 
        ? faqs 
        : faqs.filter(faq => faq.category === activeCategory);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Find answers to common questions about E-Dawo Online Pharmacy
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        activeCategory === category
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {filteredFaqs.map((faq, idx) => (
                            <FAQItem
                                key={idx}
                                faq={faq}
                                isOpen={openIndex === idx}
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            />
                        ))}
                    </div>

                    <div className="p-6 bg-gray-50 text-center">
                        <p className="text-gray-600 mb-4">
                            Still have questions?
                        </p>
                        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Contact Support
                            <svg className="ml-3 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}