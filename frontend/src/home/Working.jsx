import React from "react";
import image1 from "./New folder/1.jpg";
import image2 from "./New folder/photo-63.jpeg";
import image3 from "./New folder/photo-94.jpeg";
import image4 from "./New folder/5.jpg";
const Working = () => {
  const works = [
    {
      src: image1,
      title: "Education",
      Desc: "Education is the key to unlock a world of opportunities, empowering individuals to shape their future and contribute meaningfully to society.  ",
    },
    {
      src: image2,
      title: "Food",
      Desc: "Food nourishes both body and soul, uniting cultures and sparking joy through its diverse flavors and aromas.",
    },
    {
      src: image3,
      title: "Medical",
      Desc: "Supporting medical NGOs saves lives and brings hope to those in need, providing vital healthcare services and resources to underserved communities worldwide. ",
    },
    {
      src: image4,
      title: "Tree Plant",
      Desc: "Planting trees is a simple yet powerful act that revitalizes our planet, mitigating climate change and preserving biodiversity for future generations. ",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-14 py-4 bg-opacity-50 font-sans" id = "work">
      {" "}
      <h1
        className="text-4xl md:text-5xl lg:text-6xl text-center font-bold transition-all duration-300 max-md:text-xl text-blue-900"
        style={
          {
            WebkitTextStroke : "1px black",
          }
        }
      >
        How do we work
      </h1>
      <div className="working-section grid grid-cols-2 gap-4 lg:gap-16e mt-8">
        {works.map((work, index) => (
          <div
            className="card md:max-w-full rounded-lg overflow-hidden shadow-lg"
            key={index}
          >
            <img
              src={work.src}
              alt={`card ${index + 1}`}
              className="w-full h-96 max-sm:h-28"
            />
            <div className="px-6 py-4 max-sm:px-4">
              <h1 className="font-bold text-xl mb-2 max-sm:text-lg max-sm:font-medium max-sm:mb-1">{work.title}</h1>
              <p className="text-gray-700 text-base max-sm:text-sm">{work.Desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Working;
