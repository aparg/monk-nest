"use client";
import React, { useEffect, useRef } from "react";
//ICONS
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import CondoCard from "./PreconPropertyCard";
import useDeviceView from "@/helpers/useDeviceView";

const PreconPropertySlider = ({ numberOfCards = 5, data }) => {
  const scrollRef = useRef(null); //used to hold scroll value
  const cardRef = useRef(null); //used to hold card width value
  const { isMobileView } = useDeviceView();

  //business is returned as Sale of business so we need to modify it to Business

  const slideLeft = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = cardWidth * 3; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft -= scrollAmount;
  };

  const slideRight = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = cardWidth * 3; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft += scrollAmount;
  };

  return (
    <div className="relative mb-8 flex justify-center">
      {/* <div className="btns flex justify-between">
        <button
          className="scroll-left absolute start-0"
          title="scroll left"
          onClick={slideLeft}
        >
          <SlArrowLeft size={16} color="black" />
        </button>
        <button
          className="scroll-right absolute end-0"
          title="scroll right"
          onClick={slideRight}
        >
          <SlArrowRight size={16} color="black" />
        </button>
      </div> */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:max-h-[900px] `}
        // id="slider"
        ref={scrollRef}
      >
        {data?.slice(0, 4).map((value, index) => {
          // console.log(value);
          return (
            <div
              className={`pl-0 pr-6 my-2 sm:my-0 ${
                index === 0 ? "md:col-span-2 lg:col-span-2 sm:row-span-2" : ""
              }${
                index === 1
                  ? "md:col-span-2 lg:col-span-2 row-span-1 sm:h-[20rem]"
                  : ""
              }`}
              key={index}
              ref={cardRef}
            >
              <CondoCard
                {...value}
                index
                // link={`/${value.name.replace(" ", "-")}`}
              ></CondoCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreconPropertySlider;
