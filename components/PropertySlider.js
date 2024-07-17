"use client";
import React, { useEffect, useRef } from "react";
//ICONS
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import PropertyCard from "./PropertyCard";
import useDeviceView from "@/helpers/useDeviceView";

const PropertySlider = ({ numberOfCards = 4, data }) => {
  const scrollRef = useRef(null); //used to hold scroll value
  const cardRef = useRef(null); //used to hold card width value
  const { isMobileView } = useDeviceView();
  //business is returned as Sale of business so we need to modify it to Business

  const slideLeft = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    let scrollAmount; // Adjust the scroll amount as needed
    if (!isMobileView) {
      scrollAmount = cardWidth * 3;
    } else {
      scrollAmount = cardWidth * 1;
    }
    scrollContainer.scrollLeft -= scrollAmount;
  };

  const slideRight = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    let scrollAmount; // Adjust the scroll amount as needed
    if (!isMobileView) {
      scrollAmount = cardWidth * 3;
    } else {
      scrollAmount = cardWidth * 1;
    } // Adjust the scroll amount as needed
    scrollContainer.scrollLeft += scrollAmount;
  };

  return (
    <div className="relative">
      <div className="btns flex justify-between">
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
      </div>
      <div
        className={`w-full row row-cols-lg-${numberOfCards} row-cols-md-3 row-cols-1 py-2`}
        id="slider"
        ref={scrollRef}
      >
        {data?.map((curElem, index) => {
          if (curElem.MLS !== "C8446018" && curElem.MLS !== "C8450446") {
            //manual removal, to be removed later
            return (
              <div className="px-2 pb-3" ref={cardRef}>
                <PropertyCard curElem={curElem} key={index}></PropertyCard>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default PropertySlider;
