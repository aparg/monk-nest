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
import DolphyAdvantage from "@/components/DolphyAdvantage";

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 20;
const CITY = "Toronto";
const CAMBRIDGECITY = "Cambridge";
const BRAMPTONCITY = "Brampton";

export default async function Home() {
  //get data for precon
  async function getData() {
    const res = await fetch(
      "https://api.dolphy.ca/api/preconstructions/?page_size=5",
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
      <div
        className="relative justify-center md:max-md:mt-10 items-center h-auto w-screen"
        id="hero"
      >
        <div className="relative h-[400px] w-full">
          <Image
            src="/hero-image.png"
            alt="Canadian home"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 playfair md:leading-[4rem]">
              Find your perfect home <br /> in Canada
            </h1>
            <div className="w-full max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by city, address, MLS #"
                  className="w-full py-3 px-4 pr-10 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
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
            <h4 className="mt-1">Explore our resale properties in Canada</h4>
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
      <DolphyAdvantage />
      {/* <div className="sm:mt-40 mt-24 container-fluid"></div> */}
      {/* <div className="mt-4 sm:mt-24">
            <SuggestedCity defaultCitiesData={defaultCitiesData} />
          </div> */}
      {/* <div className="container-fluid mt-10 sm:mt-24">
            <RealEstateNews />
          </div> */}

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
    </>
  );
}
