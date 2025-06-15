import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
    {
        name: "Jane Doe",
        role: "Founder & CEO",
        img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "John Smith",
        role: "Lead Pharmacist",
        img: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
        name: "Emily Clark",
        role: "Customer Support",
        img: "https://randomuser.me/api/portraits/women/47.jpg",
    },
];

const AboutUs = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-sans">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    About <span className="text-blue-600">E-Dawo</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Welcome to E-Dawo Online Pharmacy! We're revolutionizing healthcare with safe, convenient, and affordable access to medications and wellness products.
                </p>
            </motion.div>

            {/* Team Section */}
            <div className="mb-20">
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-12">
                    Meet Our <span className="text-blue-600">Team</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            <div className="p-6 flex flex-col items-center">
                                <div className="relative mb-5">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1.5">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                                <p className="text-blue-500 font-medium mt-1">{member.role}</p>
                                <div className="mt-4 flex space-x-3">
                                    <a href="#" className="text-gray-400 hover:text-blue-500">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-blue-500">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Values Section */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8 md:p-10 max-w-4xl mx-auto"
            >
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
                    Our <span className="text-blue-600">Core Values</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Customer-Centric Care",
                            description: "Your health and satisfaction are our top priorities in every interaction.",
                            icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        },
                        {
                            title: "Trusted Expertise",
                            description: "Our licensed professionals provide reliable, evidence-based guidance.",
                            icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        },
                        {
                            title: "Innovation & Accessibility",
                            description: "Leveraging technology to make healthcare accessible to everyone.",
                            icon: "M13 10V3L4 14h7v7l9-11h-7z"
                        }
                    ].map((value, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-blue-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                            <p className="text-gray-600">{value.description}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    </div>
);

export default AboutUs;