"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "../TimeAgo";

import { resenditial } from "@/api/routes";
import { Image } from "react-bootstrap";
import { houseType, saleLease } from "@/constant";
import { generateURL } from "@/helpers/generateURL";
import useDeviceView from "@/helpers/useDeviceView";
import MobileCityResoCard from "../MobileCityResoCard";
import { priceFormatter } from "@/helpers/priceFormatter";

const CityResoCard = React.forwardRef(
  ({ curElem, small = false, city, showDecreasedPrice = false }, ref) => {
    // const [address, setAddress] = useState("");
    const { isMobileView, isTabletView } = useDeviceView();

    const price = Number(curElem.ListPrice).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    const mapObj = {
      MLS: curElem.MLS,
      index: 1,
    };
    const imgSrc = resenditial.photos.replace(
      /MLS|index/gi,
      function (matched) {
        return mapObj[matched];
      }
    );

    const handleImageError = (e) => {
      e.target.onerror = null;
      e.target.src = `/noimage.webp`;
    };

    // const streetAndMLS = curElem.StreetName
    //   ? `${curElem.Street}-${curElem.StreetName?.replace(" ", "-")}-${
    //       curElem.StreetAbbreviation
    //     }-${curElem.MLS}`
    //   : curElem.MLS;

    const streetAndMLS = (() => {
      const parts = [];

      if (curElem.Street) {
        parts.push(curElem.Street);
      }

      if (curElem.StreetName) {
        const streetName = curElem.StreetName.trim().replace(/ /g, "-");
        parts.push(streetName);
      }

      if (curElem.StreetAbbreviation) {
        parts.push(curElem.StreetAbbreviation);
      }

      if (curElem.MLS) {
        parts.push(curElem.MLS);
      }

      return parts.filter(Boolean).join("-");
    })();
    return isMobileView || isTabletView ? (
      <MobileCityResoCard
        ref={ref}
        streetAndMLS={streetAndMLS}
        small={small}
        handleImageError={handleImageError}
        imgSrc={imgSrc}
        curElem={curElem}
        price={price}
        showDecreasedPrice={showDecreasedPrice}
      />
    ) : (
      <section className="" ref={ref}>
        <Link
          href={generateURL({
            cityVal: curElem.Municipality,
            listingIDVal: streetAndMLS,
          })}
          className="text-black"
        >
          <div className="lg:px-0 h-full w-full">
            <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl p-0 hover:shadow-lg hover:-translate-y-1 relative">
              <div
                className={`${
                  small ? "h-44" : "h-80"
                } overflow-hidden relative`}
              >
                <div className="h-80 relative">
                  <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                    src={imgSrc}
                    alt="property image"
                    onError={handleImageError}
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div> */}
                </div>

                <div className="absolute bottom-3 left-2 flex flex-row">
                  <div className="text-black text-[0.8rem] p-[2px] px-1 rounded-md mx-1 bg-white flex items-center">
                    {curElem.TypeOwn1Out}{" "}
                  </div>
                  <div className="text-black text-xs p-[2px] px-1 rounded-md mx-1 bg-white flex items-center">
                    <TimeAgo modificationTimestamp={curElem.TimestampSql} />
                  </div>
                </div>
              </div>
              <div className="flex-1 sm:px-3 py-2 px-2">
                {showDecreasedPrice && (
                  <span className="text-gray-600">
                    <s>${curElem.MaxListPrice}</s>
                  </span>
                )}
                <h2 className="price text-black fw-bold mb-1 fs-3 fw-bold d-flex align-items-center justify-content-between">
                  <div className="flex flex-row items-center">
                    {price}
                    {curElem.SaleLease === saleLease.lease.value && (
                      <span> /mo</span>
                    )}
                    {showDecreasedPrice && (
                      <div className="ml-2 flex items-center">
                        <span className="text-green-700 text-sm font-medium">
                          {showDecreasedPrice &&
                            "$" +
                              priceFormatter(
                                parseFloat(curElem.MaxListPrice) -
                                  parseFloat(curElem.ListPrice)
                              )}
                          {curElem.SaleLease === saleLease.lease.value && (
                            <span>/mo</span>
                          )}
                        </span>
                        <Image
                          className="w-4 h-4"
                          src="/price-reduced.png"
                          alt="reduced"
                        ></Image>
                      </div>
                    )}
                  </div>
                </h2>
                {/* <p className="mb-0 fs-mine text-limit fw-normall pb-0">
                  {" "}
                  MLS® #{curElem.MLS}
                </p> */}
                <span className={`text-black text-xs ${small && "hidden"}`}>
                  <div className="flex flex-row justify-start">
                    {curElem.Bedrooms && (
                      <div className="flex items-center mr-2">
                        <Image
                          src="/bedrooms.svg"
                          className="w-3 mr-[2px] inline"
                          alt="bedrooms"
                        />
                        <span>{Math.floor(curElem.Bedrooms)}</span>
                      </div>
                    )}
                    {curElem.Washrooms && (
                      <div className="flex items-center mr-2">
                        <Image
                          src="/bathrooms.svg"
                          className="w-3 mr-[2px] inline"
                          alt="washrooms"
                        />
                        <span>{Math.floor(curElem.Washrooms)}</span>
                      </div>
                    )}
                    {curElem.GarageSpaces && (
                      <div className="flex items-center mr-2">
                        <Image
                          src="/garage.svg"
                          className="w-3 mr-[2px] inline"
                          alt="washrooms"
                        />
                        <span>{Math.floor(curElem.GarageSpaces)}</span>
                      </div>
                    )}
                    {curElem.ApproxSquareFootage && (
                      <div className="flex items-center mr-2">
                        <Image
                          src="/ruler.svg"
                          className="w-3 mr-[2px] inline"
                          alt="washrooms"
                        />
                        <span>{curElem.ApproxSquareFootage} Sq.Ft.</span>
                      </div>
                    )}
                  </div>
                </span>
                <div className="flex flex-row justify-between">
                  <div className="text-black truncate text-ellipsis">
                    <div className="text-dark bva">
                      {curElem.StreetName ? (
                        `${curElem.Street} ${curElem.StreetName}${" "}
                    ${curElem.StreetAbbreviation} ${
                          curElem.Municipality
                        }, Ontario`
                      ) : (
                        <span className="p-4"></span>
                      )}
                    </div>
                  </div>
                </div>
                {/* <div className="text-black font-medium truncate text-ellipsis text-xs">
                  Listed by {curElem.ListBrokerage}
                </div> */}
                <div className="inline-flex justify-center items-center mt-2">
                  <div
                    className={`min-w-[50px] inline-flex item-center justify-center bg-[#3a88ef]/[0.08] hover:bg-[#3a88ef]/[0.2] rounded-md leading-7 py-[4px] px-[8px] text-xs mx-1`}
                  >
                    <Image
                      className="pr-1 w-5"
                      src="/mailOutline.svg"
                      alt="Email"
                    />
                    Email
                  </div>
                  <div
                    className={`min-w-[70px] inline-flex item-center justify-center bg-[#ffedea]/[0.5] hover:bg-[#ffdad4]/[0.8] rounded-md leading-7 py-[4px] px-[8px] text-xs mx-1`}
                  >
                    <Image className="pr-1 w-5" src="/phone.svg" alt="Phone" />
                    Phone
                  </div>
                  <div
                    className={`min-w-[70px] inline-flex item-center justify-center bg-[#43bb3f]/[0.1] hover:bg-[#43bb3f]/[0.2] rounded-md leading-7 py-[4px] px-[8px] text-xs mx-1`}
                  >
                    <Image
                      className="pr-1 w-5"
                      src="/whatsapp.svg"
                      alt="whatsapp"
                    />
                    Whatsapp
                  </div>
                  {/* <ColoredBadge
                    icon="./phone.svg"
                    text="Phone"
                    // color="rgba(255, 237, 234, 0.5)"
                    color="#ffedea"
                    opacity="0.5"
                    hoverColor="#ffdad4"
                    hoverOpacity="0.8"
                    // hoverColor="rgba(255, 218, 212, 0.8)"
                  />
                  <ColoredBadge
                    icon="./whatsapp.svg"
                    text="Whatsapp"
                    // color="rgba(67, 187, 63, 0.1)"
                    color="#43bb3f"
                    opacity="0.1"
                    // hoverColor="rgba(67, 187, 63, 0.2)"
                    hoverColor="#43bb3f"
                    hoverOpacity="0.2"
                  /> */}
                </div>
                {/* <div className="text-black text-xs px-0 py-1 rounded-md mx-0 font-bold">
                <TimeAgo modificationTimestamp={curElem.TimestampSql} />
              </div> */}
              </div>

              {/* <div className="absolute w-1/6 h-2/6 top-2 left-2">
              {highlight[0]}
            </div>
            <div className="absolute w-1/6 h-2/6 top-2 left-2">
              {highlight[1]} */}
              {/* </div> */}
            </div>
            {/* <h4 className="fs-5 mt-1 text-dark d-flex align-items-center">
            <p className="fw-bold mb-0 lh-0">
              {" "}
              <span className="fs-2 bg-none">.</span>
              {curElem.Municipality}
            </p>
          </h4> */}
            {/* </div> */}
          </div>
        </Link>
      </section>
    );
  }
);

export default CityResoCard;
