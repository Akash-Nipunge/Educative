import React from "react";
import image1 from "./works/edu.jpg";
import image2 from "./works/food.jpg";
import image3 from "./works/med.jpg";
import image4 from "./works/plt.jpg";
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
    <div className=" mb-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-14 ">
      {" "}
      <h1
        className="heading text-4xl md:text-5xl lg:text-6xl m-3 text-center text-blue-900 font-bold transition-all duration-300 max-md:text-xl"
        style={{ fontFamily: "'IBM Plex Serif', serif" }}
      >
        How do we work
      </h1>
      <div className="working-section grid grid-cols-2 gap-4 lg:gap-16e">
        {works.map((work, index) => (
          <div
            className="card md:max-w-full rounded-lg overflow-hidden shadow-lg"
            key={index}
          >
            <img
              src={work.src}
              alt={`card ${index + 1}`}
              className="w-full h-auto"
            />
            <div className="px-6 py-4">
              <h1 className="font-bold text-xl mb-2 max-sm:text-lg max-sm:font-medium">{work.title}</h1>
              <p className="text-gray-700 text-base max-sm:text-sm">{work.Desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Working;
