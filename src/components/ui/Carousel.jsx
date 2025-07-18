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
    <div className="w-full h-full p-2 bg-white rounded-3xl">
  
      {/* Image container with dots inside */}
      <div className="relative w-full h-[590px] rounded-xl ">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Book ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ${
              i === current ? "opacity-100 scale-100 z-20" : "opacity-0 scale-90"
            }`}
          />
        ))}

        {/* Dots now inside the image, at bottom center */}
        <div className="absolute bottom-4 left-14 transform -translate-x-1/2 flex space-x-2 z-30 bg-white border-2 rounded-md">      
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-1 rounded-full  transition-all duration-300 ${
                current === i ? "bg-blue-600 scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessCarousel;
