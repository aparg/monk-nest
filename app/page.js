import React from "react";

import BottomContactForm from "@/components/BottomContactForm";

import SearchBar from "@/components/reso/SearchBar";

import AdditionalListing from "@/components/reso/AdditionalListing";
import { getFilteredRetsData, getSalesData } from "@/actions/getSalesData";
// import FilterCard from "@/components/FilterCard";
// import TextOverImageCard from "@/components/TextOverImageCard";
import PopularCities from "@/components/PopularCities";
import RealEstateNews from "@/components/RealEstateNews";
import SuggestedCity from "@/components/SuggestedCity";
import { Image } from "react-bootstrap";
import Link from "next/link";
import PropertySlider from "@/components/PropertySlider";
import PreconPropertySlider from "@/components/PreconPropertySlider";

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 20;
const CITY = "Toronto";
const CAMBRIDGECITY = "Cambridge";
const BRAMPTONCITY = "Brampton";

export default async function Home() {
  //get data for precon
  async function getData() {
    const res = await fetch(
      "https://api.dolphy.ca/api/preconstructions/?page_size=10",
      {
        next: { revalidate: 10 },
      }
    );

    if (!res.ok) {
      notFound();
    }

    const resp = await res.json();
    return resp.results;
  }
  const torontoData = await getSalesData(INITIAL_OFFSET, INITIAL_LIMIT, CITY);
  const cambridgeData = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    CAMBRIDGECITY
  );
  const bramptonData = await getSalesData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    BRAMPTONCITY
  );
  const defaultCitiesData = [
    {
      city: CITY,
      data: torontoData,
      type: undefined,
      saleLeaseSearch: undefined,
    },
    {
      city: CAMBRIDGECITY,
      data: cambridgeData,
      type: undefined,
      saleLeaseSearch: undefined,
    },
    {
      city: BRAMPTONCITY,
      data: bramptonData,
      type: undefined,
      saleLeaseSearch: undefined,
    },
  ];
  const residentialData = await getFilteredRetsData({ saleLease: "Sale" });
  const preconData = await getData();
  // console.log(preconData);
  return (
    <>
      <div className="">
        <div className="">
          <div
            className="pl-[3rem] relative w-screen justify-center md:max-md:mt-10 row sm:g-4 items-center h-auto"
            id="hero"
          >
            <div className="col-12 col-md-6 md:order-1 order-2">
              {/* <span className="d-block mb-2 text-white">Find Your Next </span>{" "}
                <span className="text-white">Commercial Property </span> */}
              <h1 className="text-4xl font-bold text-black sm:text-6xl sm-center font-family2 mt-5">
                <span className="z-10">Find Your Perfect Home </span>
                <div className="relative inline-flex sm-center">
                  {/* <span className="absolute inset-x-0 bottom-0 border-b-[80px] sm:border-b-[30px] border-[#4ADE80] z-1"></span> */}
                  <span className="text-4xl font-bold text-black sm:text-6xl z-10">
                    In Canada
                  </span>
                </div>
              </h1>
              <h2 className="mt-1">
                Explore Canadian Properties & MLS Listings
              </h2>
              <div className="pb-1 mt-4 ww d-flex w-full">
                <SearchBar />
              </div>
            </div>
            {/* <p className="text-center mt-0 pt-3 text-white text-xl font-semibold text-shadow">
                Explore Endless Possibilities in Finding Your Dream Home with
                us.
              </p> */}
            <div className="col-12 col-md-6 md:order-2 order-1">
              <div className="pb-1 pt-3 basis-1 flex flex-col items-center">
                <Image
                  src="/hero-img.png"
                  alt="residential-property"
                  className="rounded-lg w-full"
                />
              </div>
            </div>

            {/* <div className="mt-5 md:mb-10 sm:mb-0 absolute bottom-[-30%] sm:bottom-[-10%] lg:bottom-[-15%] lg:w-[850px] rounded-lg w-screen shadow-md border-t-8 bg-primary-green border-primary-green w-5/6">
              <FilterCard />
            </div> */}
          </div>
          <div className="container-fluid mt-10 sm:mt-24">
            <PopularCities />
          </div>
          <div className="sm:mt-40 mt-24 container-fluid">
            <div className="flex flex-col md:flex-row justify-between items-center mb-3">
              <div>
                <h3 className="main-title font-extrabold text-[2rem] md:text-4xl text-black text-center md:text-start">
                  Featured Resale Properties
                </h3>
                <h4 className="mt-1">
                  Explore our resale properties in Canada
                </h4>
              </div>
              <Link
                href="/ontario"
                className="bg-primary-color text-black px-5 py-3 hover:no-underline flex items-center underline hover:underline"
              >
                View More
              </Link>
            </div>
            <PropertySlider data={residentialData} />
          </div>
          <div className="sm:mt-40 mt-24 container-fluid">
            <div className="flex flex-col md:flex-row justify-between items-center mb-3">
              <div>
                <h3 className="main-title font-extrabold text-[2rem] md:text-4xl text-black text-center md:text-start">
                  Featured Projects
                </h3>
                <h4 className="mt-1">Explore our pre construction projects </h4>
              </div>
              <Link
                href="/pre-construction-homes"
                className="bg-primary-color text-black px-5 py-3 hover:no-underline flex items-center underline hover:underline"
              >
                View More
              </Link>
            </div>
            <PreconPropertySlider data={preconData} numberOfCards={10} />
          </div>

          {/* <div className="sm:mt-40 mt-24 container-fluid"></div> */}
          {/* <div className="mt-4 sm:mt-24">
            <SuggestedCity defaultCitiesData={defaultCitiesData} />
          </div> */}
          {/* <div className="container-fluid mt-10 sm:mt-24">
            <RealEstateNews />
          </div> */}
        </div>
        <div className="">
          <div className="py-md-5"></div>
          <div className="py-5 my-5" id="mycontact">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className=" text-center px-md-4 fs-4 text-md mb-10 font-bold">
                Contact Monk Nest now!
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <BottomContactForm></BottomContactForm>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>
        </div>
      </div>
    </>
  );
}
