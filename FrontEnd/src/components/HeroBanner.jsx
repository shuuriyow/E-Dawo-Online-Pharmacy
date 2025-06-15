"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Zap, Heart, Pill } from "lucide-react"

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      background: "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700",
      title: "Verified & Authentic",
      titleHighlight: "Medicines Only",
      description: "All our medicines are sourced from licensed manufacturers and verified for authenticity.",
      primaryButton: "Learn More",
      secondaryButton: "Learn More",
      primaryButtonStyle: "bg-yellow-400 hover:bg-yellow-500 text-black",
      secondaryButtonStyle: "border-2 border-white/30 text-white hover:bg-white/10",
    },
    {
      id: 2,
      background: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700",
      title: "Find Medicines Easily, From",
      titleHighlight: "Trusted Pharmacies!",
      description: "Get your medications delivered fast with our network of trusted partner pharmacies across Somalia.",
      primaryButton: "Shop Now",
      secondaryButton: "Learn More",
      primaryButtonStyle: "bg-yellow-400 hover:bg-yellow-500 text-black",
      secondaryButtonStyle: "border-2 border-white/30 text-white hover:bg-white/10",
    },
    {
      id: 3,
      background: "bg-gradient-to-r from-green-500 via-green-600 to-green-700",
      title: "24/7 Emergency Medicine",
      titleHighlight: "Delivery",
      description: "Round-the-clock service for urgent medical needs. Your health is our priority.",
      primaryButton: "Order Now",
      secondaryButton: "Learn More",
      primaryButtonStyle: "bg-yellow-400 hover:bg-yellow-500 text-black",
      secondaryButtonStyle: "border-2 border-white/30 text-white hover:bg-white/10",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [slides.length])

  const currentSlideData = slides[currentSlide]

  return (
    <section
      className={`${currentSlideData.background} py-16 transition-all duration-1000 ease-in-out relative overflow-hidden`}
    >
      {/* Service Badge */}
      <div className="absolute top-8 left-8 z-10">
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-full flex items-center gap-2 font-semibold text-sm">
          <Zap className="w-4 h-4" />
          Fast & Reliable Service
        </div>
      </div>

      <div className="container mx-auto px-6 flex items-center justify-between min-h-[500px]">
        {/* Left Content */}
        <div className="w-1/2 pr-8">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-white leading-tight">
              {currentSlideData.title} <span className="text-yellow-300">{currentSlideData.titleHighlight}</span>
            </h1>

            <p className="text-white/90 text-lg leading-relaxed max-w-lg">{currentSlideData.description}</p>

            <div className="flex gap-4">
              <button
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${currentSlideData.primaryButtonStyle}`}
              >
                {currentSlideData.primaryButton}
              </button>
              <button
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${currentSlideData.secondaryButtonStyle}`}
              >
                {currentSlideData.secondaryButton}
              </button>
            </div>

            {/* Statistics */}
            <div className="flex gap-12 pt-8">
              <div>
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-white/80 text-sm">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-white/80 text-sm">Medicines</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-white/80 text-sm">Pharmacies</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Shopping Cart Animation */}
        <div className="w-1/2 flex justify-center items-center relative">
          <div className="relative">
            {/* Main Cart Container */}
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 w-80 h-80 flex items-center justify-center relative">
              {/* Floating Cart Icon */}
              <div className="absolute top-4 right-4 bg-yellow-400 rounded-full p-3 animate-bounce">
                <ShoppingCart className="w-6 h-6 text-black" />
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                  3
                </div>
              </div>

              {/* Main Shopping Cart */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <ShoppingCart className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              </div>

              {/* Floating Medicine Icons */}
              <div className="absolute bottom-8 left-8 bg-blue-400 rounded-full p-3 animate-pulse">
                <Pill className="w-5 h-5 text-white" />
              </div>

              <div className="absolute top-1/2 left-4 bg-green-400 rounded-full p-3 animate-bounce delay-300">
                <Heart className="w-5 h-5 text-white" />
              </div>

              <div className="absolute bottom-4 right-8 bg-orange-400 rounded-full p-3 animate-pulse delay-500">
                <Pill className="w-5 h-5 text-white" />
              </div>

              {/* Bottom Cart Icon */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-pink-400 rounded-full p-2 animate-bounce delay-700">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-yellow-400 scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroBanner
