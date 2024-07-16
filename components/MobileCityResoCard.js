import React from "react";
import Link from "next/link";
import { generateURL } from "@/helpers/generateURL";
import { usePathname } from "next/navigation";
import TimeAgo from "./TimeAgo";
import { saleLease } from "@/constant";
const MobileCityResoCard = React.forwardRef(
  (
    {
      curElem,
      streetAndMLS,
      small,
      handleImageError,
      imgSrc,
      price,
      showDecreasedPrice = false,
    },
    ref
  ) => {
    const pathname = usePathname();
    return (
      <section className="mb-2" ref={ref}>
        <Link
          href={generateURL({
            cityVal: curElem.Municipality,
            listingIDVal: streetAndMLS,
            embeddedSite: pathname.includes("embedded-site"),
          })}
          className="text-black"
        >
          <div className="lg:px-0 h-full w-full">
            <div
              className={`flex items-center sm:flex-col flex-row overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl py-1 hover:shadow-lg hover:-translate-y-1 relative`}
            >
              <div
                className={`flex flex-col items-center h-30 min-w-24 max-w-24 mx-1 overflow-hidden relative`}
              >
                <div className="relative h-24 w-full">
                  <img
                    className="object-cover rounded-md w-full h-full transition-all duration-200 transform group-hover:scale-110 "
                    src={imgSrc}
                    alt="property image"
                    onError={handleImageError}
                  />
                </div>
              </div>
              <div className="mx-2 w-full mx-2 text-ellipsis overflow-hidden">
                <div className="flex flex-col w-full justify-between items-start">
                  <div className="flex flex-rowx">
                    {showDecreasedPrice && (
                      <span className="text-gray-600 mr-1">
                        <s>${curElem.MaxListPrice}</s>
                      </span>
                    )}
                    <h2 className="price fw-bold mb-1 fs-5 fw-bold d-flex justify-content-start">
                      {price}
                      {""}
                      {curElem.SaleLease === saleLease.lease.value && (
                        <span> /mo</span>
                      )}
                    </h2>
                  </div>
                  <div className="flex">
                    {curElem.Bedrooms && (
                      <span className="flex mr-3">
                        <img src="/bedrooms.svg" className="w-3 mr-1"></img>
                        <span className="text-xs">{curElem.Bedrooms}</span>
                      </span>
                    )}
                    {curElem.Washrooms && (
                      <span className="flex mr-3">
                        <img src="/bathrooms.svg" className="w-3 mr-1"></img>
                        <span className="text-xs">{curElem.Washrooms}</span>
                      </span>
                    )}
                    {curElem.GarageSpaces && (
                      <span className="flex mr-3">
                        <img src="/garage.svg" className="w-3 mr-1"></img>
                        <span className="text-xs">
                          {Math.trunc(curElem.GarageSpaces)}
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="text-xs">
                    <TimeAgo modificationTimestamp={curElem.TimestampSql} />
                  </div>
                  {/* <div className="text-xs">{`For ${
                    curElem.saleLease || "Sale"
                  }`}</div> */}
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-black truncate text-ellipsis">
                    <div className="text-dark bva text-ellipsis">
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
                <div className="flex justify-between">
                  <div className="text-black text-xs rounded-md">
                    {curElem.TypeOwn1Out}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>
    );
  }
);

export default MobileCityResoCard;
