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
      Desc: "Our organization prioritizes education as a cornerstone of empowerment and progress. Through various programs, initiatives, and partnerships, we strive to provide accessible and quality education to individuals of all ages and backgrounds.",
    },
    {
      src: image2,
      title: "Unity",
      Desc: "Unity lies at the heart of our organization's ethos. We are dedicated to fostering a sense of belonging and cohesion among our members, stakeholders, and the communities we serve.",
    },
    {
      src: image3,
      title: "Culture",
      Desc: "Our organization values and celebrates diverse cultural expressions, traditions, and heritage. We recognize the importance of preserving and promoting cultural identity as a source of pride and resilience within communities.",
    },
    {
      src: image4,
      title: "Social Engagement",
      Desc: "Social engagement is integral to our mission of creating positive impact and driving meaningful change.",
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
