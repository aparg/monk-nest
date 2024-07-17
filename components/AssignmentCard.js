"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

const AssignmentCard = React.forwardRef(({ curElem, small = false }, ref) => {
  // const [address, setAddress] = useState("");

  const price = Number(curElem.ListPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const mapObj = {
    MLS: curElem.MLS,
    index: 1,
  };
  const imgSrc = curElem.mainimage;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };

  function formatCurrency(value) {
    // Check if the value is not null or undefined
    if (value != null) {
      return Number(value).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    } else {
      // Handle the case where the value is null or undefined
      return "N/A"; // or any default value or message you prefer
    }
  }
  // const streetAndMLS = curElem.StreetName
  //   ? `${curElem.Street}-${curElem.StreetName?.replace(" ", "-")}-${
  //       curElem.StreetAbbreviation
  //     }-${curElem.MLS}`
  //   : curElem.MLS;

  return (
    <section className="" ref={ref}>
      <Link href={curElem.slug} className="text-black">
        <div className="lg:px-0 h-full w-full">
          <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl p-0 hover:shadow-lg hover:-translate-y-1 relative">
            <div
              className={`${small ? "h-44" : "h-80"} overflow-hidden relative`}
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
                <span className="mmmmm bg-white p-1 px-2">
                  {curElem.project_type}
                </span>
              </div>
            </div>
            <div className="flex-1 sm:px-3 py-2 px-2">
              <h2 className="price text-black fw-bold mb-1 fs-3 fw-bold d-flex align-items-center justify-content-between">
                <div className="flex flex-row items-center">
                  {formatCurrency(curElem.price)}
                </div>
              </h2>
              {/* <p className="mb-0 fs-mine text-limit fw-normall pb-0">
                  {" "}
                  MLS® #{curElem.MLS}
                </p> */}
              <span className={`text-black text-xs ${small && "hidden"}`}>
                <div className="">
                  {curElem.bedrooms && (
                    <span className="me-2">{curElem.bedrooms}</span>
                  )}
                  |
                  {curElem.bathrooms && (
                    <span className="mx-2">
                      {Math.floor(curElem.bathrooms)} bath
                    </span>
                  )}
                  |
                  {curElem.areasqft && (
                    <span className="mx-2">{curElem.areasqft} Sq.Ft.</span>
                  )}
                </div>
              </span>
              <div className="flex flex-row justify-between">
                <div className="text-black truncate text-ellipsis">
                  <div className="text-dark bva">{curElem.project_address}</div>
                </div>
              </div>
              {/* <div className="text-black font-medium truncate text-ellipsis text-xs">
                  Listed by {curElem.ListBrokerage}
                </div> */}
              {/* <div className="inline-flex justify-center items-center mt-2">
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
                </div> */}
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
        {/* </div> */}
      </Link>
    </section>
  );
});

export default AssignmentCard;
