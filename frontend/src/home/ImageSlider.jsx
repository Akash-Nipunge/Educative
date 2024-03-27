import React, { useState } from "react";
import image1 from "./New folder/photo-110.jpeg";
import image2 from "./New folder/photo-104.jpeg";
import image3 from "./New folder/photo-109.jpeg";
import image4 from "./New folder/photo-106.jpeg";

export function ImageSlider() {
  const [imgNum, setImgNum] = useState(1);

  function setNext() {
    setImgNum((curr) => (curr >= 4 ? 4 : curr + 1));
  }

  function setPrevious() {
    setImgNum((curr) => (curr <= 1 ? 1 : curr - 1));
  }

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 flex justify-center items-center overflow-x-auto">
        <img
          src={image1}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            imgNum === 1 ? "opacity-100" : "opacity-0"
          }`}
          alt="Image 1"
        />
        <img
          src={image2}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            imgNum === 2 ? "opacity-100" : "opacity-0"
          }`}
          alt="Image 2"
        />
        <img
          src={image3}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            imgNum === 3 ? "opacity-100" : "opacity-0"
          }`}
          alt="Image 3"
        />
        <img
          src={image4}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            imgNum === 4 ? "opacity-100" : "opacity-0"
          }`}
          alt="Image 4"
        />
      </div>

      <button
        type="button"
        className="absolute top-1/2 transform -translate-y-1/2 left-3 bg-gray-500/30 rounded-full p-2 focus:outline-none"
        onClick={setPrevious}
      >
        {"<"}
      </button>
      <button
        type="button"
        className="absolute top-1/2 transform -translate-y-1/2 right-3 bg-gray-500/30 rounded-full p-2 focus:outline-none"
        onClick={setNext}
      >
        {">"}
      </button>
    </div>
  );
}
