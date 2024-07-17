"use client";
import React, { useEffect, useRef } from "react";

import CityResoCard from "@/components/reso/CityResoCard";

//ICONS
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { plural } from "@/constant/plural";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { saleLease } from "@/constant";
import { generateURL } from "@/helpers/generateURL";

const AdditionalListing = ({
  numberOfCards = 5,
  city,
  newSalesData,
  houseType = null,
  saleLeaseValue = null,
  title,
}) => {
  const scrollRef = useRef(null); //used to hold scroll value
  const cardRef = useRef(null); //used to hold card width value
  const formattedCity = city?.toLowerCase();
  // const slideLeft = () => {
  //   const dynamicWidthOfCard = cardRef.current.offsetWidth;
  //   // @ts-ignore
  //   scrollRef.current.scrollLeft = slider.scrollLeft - dynamicWidthOfCard;
  // };
  // const slideRight = () => {
  //   const dynamicWidthOfCard = cardRef.current.offsetWidth;
  //   // @ts-ignore
  //   scrollRef.current.scrollLeft = slider.scrollLeft + dynamicWidthOfCard;
  // };

  //business is returned as Sale of business so we need to modify it to Business
  const modifyType = (type) => {
    if (type == "Sale Of Business") return "business";
    if (type == "Commercial/Retail") return "retail";
    return type;
  };

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
    <div className="position-relative">
      <div className="d-flex justify-content-between pt-5 explore-container my-0 sm:my-4 align-center">
        <div className="w-full flex flex-row justify-between items-center">
          {!title ? (
            !houseType ? (
              <h3 className="main-title mw fs-3 fs-sm-2">
                Explore New {houseType ? `${houseType}` : ``} Listings in {city}
              </h3>
            ) : (
              <h3 className="main-title mw fs-3 fs-sm-2 ">
                Continue searching{" "}
                {capitalizeFirstLetter(modifyType(houseType))}
                {`${
                  plural[capitalizeFirstLetter(modifyType(houseType))] || ""
                }`}{" "}
                {saleLeaseValue &&
                  `${
                    Object.values(saleLease).find((data) => {
                      return data.value == saleLeaseValue;
                    })?.name
                  } `}
                in {(city && decodeURIComponent(city)) || "Ontario"}
              </h3>
            )
          ) : (
            <h3 className="main-title mw fs-3 fs-sm-2 ">{title}</h3>
          )}
          <a
            // href={`/ontario${formattedCity ? `/${formattedCity}` : ""}${
            //   houseType && formattedCity
            //     ? `/${houseType.toLowerCase()}`
            //     : ""
            // }${!formattedCity && houseType ? `/filter/${houseType}` : ""}
            // ${
            //   saleLeaseValue
            //     ? `/${Object.keys(saleLease).find(
            //         (key) => saleLease[key].value == saleLeaseValue
            //       )}`
            //     : ``
            // }`}
            href={generateURL({
              cityVal: city,
            })}
            className="btn btn-outline-primary float-end btn-explore px-2 sm:px-2 py-0 sm:py-2 h-6 sm:h-11"
          >
            <span className="hidden sm:inline">Explore </span>All
          </a>
        </div>
      </div>
      <div className="btns d-flex justify-space-between">
        <button
          className="scroll-left position-absolute start-0"
          title="scroll left"
          onClick={slideLeft}
        >
          <SlArrowLeft size={16} />
        </button>
        <button
          className="scroll-right position-absolute end-0"
          title="scroll right"
          onClick={slideRight}
        >
          <SlArrowRight size={16} />
        </button>
      </div>
      <div
        className={`row row-cols-lg-${numberOfCards} row-cols-md-3 row-cols-1 gx-4 py-2`}
        id="slider"
        ref={scrollRef}
      >
        {newSalesData?.map((curElem, index) => {
          // if (curElem.PhotoCount > 0) {
          return (
            <CityResoCard
              city={formattedCity}
              key={index}
              curElem={curElem}
              ref={cardRef}
            />
          );
          // }
          // return null
        })}
      </div>
    </div>
  );
};

export default AdditionalListing;
