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
import AssignmentCard from "@/components/AssignmentCard";
import AssignmentPropertySlider from "@/components/AssignmentPropertySlider";
import PhotosSection from "@/components/PhotosSection";

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
    const response = await res.json();
    // console.log(response.data);
    return response.results;
  }

  async function getAssignmentData() {
    const res = await fetch("https://api.homebaba.ca/assignment-all", {
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      notFound();
    }
    const response = await res.json();
    return response.data.results;
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
  const assignmentData = await getAssignmentData();
  // console.log(preconData);
  return (
    <>
      {/* <div
        className="relative justify-center md:max-md:mt-10 items-center h-[50vh] md:h-[500px] w-full"
        id="hero"
      >
        <div className="sm:relative h-full w-full overflow-hidden">
          <Image
            src="/hero-image.png"
            alt="Canadian home"
            layout="fill"
            objectFit="cover"
            style={{ objectFit: "cover" }}
            className="absolute brightness-75 w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 md:top-[15%] top-[10%]">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 playfair md:leading-[4rem] playfair ">
              Find your perfect home <br /> in Canada
            </h1>
            <div className="pb-1 mt-4 ww d-flex justify-content-center">
              <SearchBar />
            </div>
          </div>
        </div>
      </div> */}
      {/* <div
        className="relative justify-center md:max-md:mt-10 items-center h-[50vh] md:h-[500px] w-full"
        id="hero"
      > */}
      <div
        className="container-fluid relative w-screen justify-center h-[90vh] row sm:g-2 flex items-center"
        id="hero"
      >
        <div className="pl-20 col-12 col-md-6 order-2 inline">
          {/* <span className="d-block mb-2 text-white">Find Your Next </span>{" "}
                <span className="text-white">Commercial Property </span> */}
          <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl sm-center font-family2 mt-5 inline mw order-1">
            <span className="z-10">Find your perfect </span>
            <div className="relative inline-flex sm-center">
              <span className="absolute inset-x-0 bottom-0 border-b-[80px] sm:border-b-[30px] border-[#AB0520]/40 z-1"></span>
              <span className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl z-10">
                home in Canada
              </span>
            </div>
          </h1>
          <h2 className="mt-3 text-[1rem] text-[#444444] font-thin">
            Discover your dream home with seamless browsing and personalized
            <br />
            service all at your fingertip.
          </h2>
          <img src="hero-icons.png" className="w-[30vw] mt-16"></img>
          <div className="pb-1 mt-6 ww d-flex justify-content-start">
            <SearchBar />
          </div>
        </div>
        <div className="col-12 col-md-6 md:order-1 order-2">
          <div className="pb-1 pt-3 basis-1 flex flex-col items-center">
            <Image
              src="/hero-image1.png"
              alt="residential-property"
              className="rounded-lg w-full sm:w-10/12"
            />
          </div>
        </div>
      </div>
      <div className="mt-24 container-fluid">
        <div className="flex flex-col md:flex-row justify-between items-center mb-3">
          <div>
            <h3 className="main-title mw font-extrabold text-[2rem] md:text-4xl text-black text-center md:text-start">
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
      <div className="sm:mt-40 mt-24 container-fluid">
        <div className="flex flex-col md:flex-row justify-between items-center mb-3">
          <div className="text-center md:text-start">
            <h3 className="main-title mw font-extrabold text-[2rem] md:text-4xl text-black ">
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
          <div className="text-center md:text-start">
            <h3 className="main-title mw font-extrabold text-[2rem] md:text-4xl text-black ">
              Assignment Projects
            </h3>
            <h4 className="mt-1">Explore our assignment projects </h4>
          </div>
          <Link
            href="/pre-construction-homes"
            className="bg-primary-color text-black px-5 py-3 hover:no-underline flex items-center underline hover:underline"
          >
            View More
          </Link>
        </div>
        <AssignmentPropertySlider
          data={assignmentData?.slice(0, 5)}
          numberOfCards={5}
        />
      </div>
      <div className="mt-10 sm:mt-24">
        <PhotosSection />
      </div>
      <div className="container-fluid mt-24 sm:mt-40">
        <PopularCities />
      </div>

      <div className="py-3 py-md-5 mt-10 md:mt-24">
        <div className="my-5 py-5">
          <div className="position-relative bg-lightblue container-fluid flex md:flex-row flex-col">
            <div className="side-img">
              <img
                src="/label.png"
                alt="condo in calgary"
                className="img-fluid"
              />
            </div>
            <div className="side-text flex flex-col items-center">
              <p>
                Monk Nest has one of the largest, most updated database of new
                construction homes, backed by industry-leading technology and
                partners.
              </p>
              <img src="/logo.png" className="w-24 mt-6 mb-4 sm:mt-2"></img>
            </div>
          </div>
        </div>
      </div>
      {/* <DolphyAdvantage /> */}
      {/* <div className="sm:mt-40 mt-24 container-fluid"></div> */}
      {/* <div className="mt-4 sm:mt-24">
            <SuggestedCity defaultCitiesData={defaultCitiesData} />
          </div> */}
      {/* <div className="container-fluid mt-10 sm:mt-24">
            <RealEstateNews />
          </div> */}

      <div className="mt-10 sm:mt-24">
        <div className="py-5 my-5" id="mycontact">
          <div className="container-fluid">
            {/* <div className="row justify-content-center">
              <img
                src="/contact-bottom-2.png"
                alt="dce"
                className="img-fluid w-25 w-smm-50 mb-3"
              />
            </div> */}
            <h2 className="text-center px-md-4 fs-4 text-lg mb-10 font-bold">
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
