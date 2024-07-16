import Link from "next/link";
import React from "react";
import { resenditial } from "@/api/routes";
import { saleLease } from "@/constant";
import { Image } from "react-bootstrap";
import { generateURL } from "@/helpers/generateURL";
// import { Image } from "react-bootstrap";

const PropertyCard = React.forwardRef(({ curElem, small = false }, ref) => {
  const mapObj = {
    MLS: curElem.MLS,
    index: 1,
  };
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };
  const imgSrc = resenditial.photos.replace(/MLS|index/gi, function (matched) {
    return mapObj[matched];
  });

  const price = Number(curElem.ListPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

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

  return (
    <section className="text-black rounded-md shadow-lg" ref={ref}>
      <Link
        href={generateURL({
          cityVal: curElem.Municipality,
          listingIDVal: streetAndMLS,
        })}
        className="text-black hover:no-underline"
      >
        <div className="lg:px-0 h-full rounded-md">
          <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white group p-0 hover:-translate-y-1 relative rounded-md">
            <div
              className={`${small ? "h-44" : "h-80"} overflow-hidden relative`}
            >
              <div className="h-80 relative">
                <img
                  className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-t-md"
                  src={imgSrc}
                  alt="property image"
                  onError={handleImageError}
                />
              </div>
            </div>
            <div className="flex-1 px-3 sm:px-5 py-3 bg-white">
              {/* {showDecreasedPrice && (
                <span className="text-gray-600">
                  <s>${curElem.MaxListPrice}</s>
                </span>
              )} */}

              <h2 className="text-black d-flex align-items-center justify-content-between">
                <span className="flex flex-row items-center font-extrabold text-3xl">
                  {price}
                  {curElem.SaleLease === saleLease.lease.value && (
                    <span> /mo</span>
                  )}
                </span>
              </h2>
              <span className={`text-black text-xs ${small && "hidden"}`}>
                <div className="flex flex-row justify-start card-feature bg-white text-black mt-3 md:mt-1">
                  {curElem.Bedrooms && (
                    <div className="flex items-center mr-2 text-nowrap text-black">
                      {/* <Image
                        src="/bedrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="bedrooms"
                      /> */}
                      <span>{Math.floor(curElem.Bedrooms)} Bedroom</span>
                    </div>
                  )}
                  {curElem.Washrooms && (
                    <div className="flex items-center mr-2 text-nowrap card-feature bg-white text-black">
                      {/* <Image
                        src="/bathrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      /> */}
                      <span>{Math.floor(curElem.Washrooms)} Bath</span>
                    </div>
                  )}
                  {curElem.GarageSpaces && (
                    <div className="flex items-center mr-2 text-nowrap text-black card-feature">
                      {/* <Image
                        src="/garage.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      /> */}
                      <span>{Math.floor(curElem.GarageSpaces)} Garage</span>
                    </div>
                  )}
                  {curElem.ApproxSquareFootage && (
                    <div className="flex items-center mr-2 text-nowrap card-feature text-black">
                      {/* <Image
                        src="/ruler.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      /> */}
                      <span>{curElem.ApproxSquareFootage} Sq.Ft.</span>
                    </div>
                  )}
                </div>
              </span>
              <div className="flex flex-row justify-between bg-white text-black">
                <div className=" truncate text-ellipsis bg-white text-medium-black">
                  <span className=" font-normal bva">
                    {curElem.StreetName ? (
                      `${curElem.Street || ""} ${curElem.StreetName || ""}${" "}
                    ${curElem.StreetAbbreviation || ""} ${
                        curElem.Municipality || ""
                      }, Ontario`
                    ) : (
                      <span className="p-4"></span>
                    )}
                  </span>
                  <span>, Unit {curElem.Unit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
});

export default PropertyCard;
