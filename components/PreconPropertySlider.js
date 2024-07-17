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
    <div className="relative mb-8  flex flex-row">
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
        className={`w-full row row-cols-lg-${numberOfCards} row-cols-md-5 row-cols-1 py-2`}
        // id="slider"
        ref={scrollRef}
      >
        {data?.map((value, index) => {
          // console.log(value);
          return (
            <div className="px-2" key={index} ref={cardRef}>
              <CondoCard
                {...value}
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
