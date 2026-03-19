import React from "react";
import { ArrowUpRight } from "lucide-react";

const HowEarningWorks = () => {
  return (
    <section className="bg-[#FFFFFF] rounded-[32px] px-6 md:px-16 py-16 md:py-24">
      
      {/* Centered container */}
      <div className="max-w-4xl mx-64">
        
        {/* LEFT aligned content */}
        <div className="text-left">
          
          {/* Image */}
          <div className="mb-6">
            <img
              src="https://i.ibb.co.com/ycbmJzqv/tiny-deliveryman.png"
              alt="delivery"
              className="w-32 md:w-40 lg:w-48 opacity-90"
            />
          </div>

          {/* Title */}
          <h1 className="text-[40px] md:text-[64px] font-bold text-[#0F4F4F] leading-tight mb-6">
            How Earning Works
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time, every time.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            
            <button className="bg-[#B4D455] hover:bg-[#a3c944] text-black text-lg font-semibold px-10 py-4 rounded-full transition-all duration-300">
              Be a Rider
            </button>

            <button className="bg-[#1E1E1E] hover:bg-[#2a2a2a] p-4 rounded-full transition-all duration-300">
              <ArrowUpRight className="text-[#B4D455]" size={22} />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HowEarningWorks;