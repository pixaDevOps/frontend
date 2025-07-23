import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/carousel/c1.png";
import img2 from "../../assets/images/carousel/c2.png";
import img3 from "../../assets/images/carousel/c1.png"; 

const SuccessCarousel = () => {
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-full p-4 bg-basewhite rounded-3xl shadow-md">
      {/* Image Carousel Container */}
      <div className="relative w-full h-[590px] rounded-xl overflow-hidden">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Carousel Image ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ${
              i === current ? "opacity-100 scale-100 z-20" : "opacity-0 scale-90"
            }`}
          />
        ))}

        {/* Dot Navigation Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30 bg-basewhite border border-bordergray px-3 py-1 rounded-full shadow-sm">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-4 h-2 rounded-full transition-all duration-300 ${
                current === i ? "bg-secondary" : "bg-bordergray"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessCarousel;
