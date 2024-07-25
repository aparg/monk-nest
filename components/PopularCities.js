import React from "react";
import TextOverImageCard from "./TextOverImageCard";
import ImageText from "./ImageText";
const cardsData = [
  {
    id: 3,
    imageSrc: "/cities/cambridge.jpg",
    title: "Mississauga",
    link: "/ontario/mississauga",
  },
  {
    id: 1,
    imageSrc: "/cities/toronto1.jpg",
    title: "Toronto",
    link: "/ontario/toronto",
  },
  {
    id: 2,
    imageSrc: "/cities/brampton.jpg",
    title: "Brampton",
    link: "/ontario/brampton",
  },
  {
    id: 4,
    imageSrc: "/cities/edmonton.jpeg",
    title: "Burlington",
    link: "/ontario/burlington",
  },
  {
    id: 5,
    imageSrc: "/cities/winnipeg.jpeg",
    title: "Whitby",
    link: "/ontario/whitby",
  },
  {
    id: 6,
    imageSrc: "/cities/halifax.jpeg",
    title: "Ajax",
    link: "/ontario/ajax",
  },
  {
    id: 7,
    imageSrc: "/cities/calgary.jpeg",
    title: "Scarborough",
    link: "/ontario/scarborough",
  },
  {
    id: 8,
    imageSrc: "/cities/grimsby.jpg",
    title: "Oakville",
    link: "/ontario/oakville",
  },
  {
    id: 8,
    imageSrc: "/cities/pickering.png",
    title: "Pickering",
    link: "/ontario/pickering",
  },

  // Add more cards as needed
];
const PopularCities = () => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="main-title mw font-extrabold text-[2rem] md:text-4xl text-black text-center md:text-start">
        Featured Areas
      </h3>
      <h4 className="mt-1 mb-3">Explore our 9 featured areas in Canada</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center w-full justify-center md:justify-start items-center flex-wrap lg:mt-2">
        {cardsData.map((card) => (
          <ImageText {...card} key={card.id} />
        ))}
      </div>
    </div>
  );
};

export default PopularCities;
