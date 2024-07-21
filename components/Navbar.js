"use client";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/reso/SearchBar";
import { Image } from "react-bootstrap";
import Dropdown from "./Dropdown";
import { generateURL } from "@/helpers/generateURL";
import { houseType } from "@/constant";
import citiesWithProvinces from "@/constant/cities";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import {
//   useComparingProperties,
//   useComparisionFlag,
// } from "./context/ComparisonFlagContext";

const Navbar = (props) => {
  const [isSticky, setIsSticky] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [comparisionData, setComparisionData] = useState([]);
  const pathname = usePathname();
  // const { comparisonFlag } = useComparisionFlag();

  if (pathname.startsWith("/admin")) {
    return <></>;
  }

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      // console.log(offset);
      setIsSticky(offset > 0);
      if (offset > 0 && pathname.includes("/ontario")) {
        setShowNavbar(false);
      }
      if (offset === 0) {
        setShowNavbar(true);
      }
    };
    // Add event listener to scroll event
    window.addEventListener("scroll", handleScroll);
    if (pathname.includes("/listings")) {
      setIsSticky(false);
    }
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomePage = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  const isPropertyPage = useMemo(() => {
    return pathname.includes("/listings");
  }, [pathname]);

  const isCityPage = useMemo(() => {
    return;
  });

  const whiteLogoPath = "/logo/whitelogo.svg";
  const blackLogoPath = "/logo/blacklogo.svg";

  const cities = citiesWithProvinces.map((obj) => {
    return { name: obj.city, link: generateURL({ cityVal: obj.city }) };
  });

  const buyOptions = [
    { name: "Top 10 GTA Projects", link: "#" },
    { name: "Homes for Sales", link: "#" },
    { name: "New Homes", link: "#" },
    { name: "Mortgage Questions", link: "#" },
  ];

  const aboutUsOptions = [
    { name: "About Us", link: "#" },
    { name: "Agents", link: "#" },
    { name: "Finance", link: "#" },
    { name: "Calculators", link: "#" },
  ];

  return (
    <header
      className={`${
        isPropertyPage ? "w-screen flex justify-center" : "container-fluid"
      } lg:pb-0 relative z-[1000] bg-white ${showNavbar ? "" : "hidden"} ${
        isSticky && "bg-white sticky top-0 shadow-md"
      }`}
    >
      <div
        className={`${isSticky && "sticky"} ${
          isPropertyPage &&
          "sm:w-[90%] container-fluid flex flex-col justify-between"
        }`}
      >
        <nav className={`flex items-center justify-between h-12 lg:h-16 `}>
          <div className="flex-shrink-0">
            {/* <Link href="/" className="logo d-flex align-items-center">
              <Image
                className="w-20 hidden md:block"
                src={isSticky || !isHomePage ? blackLogoPath : whiteLogoPath}
              />
              <Image className="w-20 md:hidden" src={blackLogoPath} />
            </Link> */}

            <Link href="/" className="d-flex align-items-center">
              <Image className="w-[200px] hidden md:block" src="/logo.png" />
            </Link>
            {/* <h1 className="w-20 md:hidden" src={blackLogoPath} /> */}
          </div>

          {!isHomePage || isSticky ? (
            <div className="flex items-center input-group-search me-2 me-md-0">
              <SearchBar />
              <button
                className="input-group-text btn bg-light2 bg-lh mybtn d-block py-search"
                type="button"
                aria-label="Search Button"
              >
                <svg
                  aria-hidden="true"
                  className="svg"
                  viewBox="0 0 30 30"
                  xmlns="http://www.w3.org/2000/svg"
                  height="22"
                  width="22"
                >
                  <path
                    d="M20.756 18.876l6.155 6.154-1.88 1.881-6.155-6.155A9.269 9.269 0 0 1 13.3 22.61a9.31 9.31 0 1 1 9.31-9.31c0 2.091-.69 4.021-1.854 5.576zM13.3 19.95a6.65 6.65 0 1 0 0-13.3 6.65 6.65 0 0 0 0 13.3z"
                    fill="#000000"
                  ></path>
                </svg>
              </button>
            </div>
          ) : null}

          <button
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            onClick={() => setHidden(!hidden)}
          >
            <svg
              className="block w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8h16M4 16h16"
              />
            </svg>

            <svg
              className="hidden w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-8">
            <Dropdown name="Buy" text="black" options={buyOptions} />
            <Dropdown
              name="Cities"
              text={isSticky || !isHomePage ? "black" : "white"}
              options={cities}
            />
            <Link
              href="#"
              title=""
              className={`text-base font-normal transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-black hover:text-primary-green active:text-primary-green focus:text-primary-green"
              } ${(isSticky || !isHomePage) && "hover:text-primary-green"}
               ${!isHomePage && "text-black"}`}
            >
              Pre Construction
            </Link>
            <Link
              href="#"
              title=""
              className={`text-base font-normal transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-black hover:text-primary-green active:text-primary-green focus:text-primary-green"
              } ${(isSticky || !isHomePage) && "hover:text-primary-green"}
               ${!isHomePage && "text-black"}`}
            >
              Assignments
            </Link>
            <Link
              href="#"
              title=""
              className={`text-base font-normal transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-black hover:text-primary-green active:text-primary-green focus:text-primary-green"
              } ${(isSticky || !isHomePage) && "hover:text-primary-green"}
               ${!isHomePage && "text-black"}`}
            >
              Blogs
            </Link>
            <Dropdown options={aboutUsOptions} text="black" />
            <Link
              href="#"
              title=""
              className={`text-base font-normal transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-black hover:text-primary-green active:text-primary-green focus:text-primary-green"
              } ${(isSticky || !isHomePage) && "hover:text-primary-green"}
               ${!isHomePage && "text-black"}`}
            >
              Agents
            </Link>
            <Link
              href="#"
              title=""
              className={`text-base font-normal transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-black hover:text-primary-green active:text-primary-green focus:text-primary-green"
              } ${(isSticky || !isHomePage) && "hover:text-primary-green"}
               ${!isHomePage && "text-black"}`}
            >
              Contact
            </Link>
            <Link
              href="#"
              title=""
              className={`text-base font-normal transition-all duration-200 text-white bg-primary-green py-2 pl-2 pr-3 rounded-md hover:text-white visited:text-white focus:text-white active:text-white`}
            >
              {" "}
              <img
                src="./call-white.svg"
                className="w-4 mr-3 inline"
                alt="call"
              ></img>
              647-362-1757{" "}
            </Link>
            <SignedOut>
              {" "}
              <SignInButton />{" "}
            </SignedOut>{" "}
            <SignedIn>
              {" "}
              <UserButton />{" "}
            </SignedIn>
          </div>

          {/* <Link
            href="tel:6476745958"
            title=""
            className={`items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold transition-all duration-200 border rounded-md lg:inline-flex hover:bg-primary-green hover:text-white ${
              isSticky
                ? "text-white border-primary-green bg-primary-green"
                : "text-white border-white hover:border-primary-green"
            } ${!isHomePage && "bg-primary-green"}`}
            role="button"
          >
            {" "}
            Call : 647 527 4970{" "}
          </Link> */}
        </nav>

        {/* Mobile version */}
        <nav
          className={`py-4 bg-white border border-gray-200 rounded-md shadow-md ${
            hidden && "hidden"
          } lg:hidden`}
        >
          <div className="flow-root">
            <div className="flex flex-col px-6 -my-2 space-y-1">
              <Link
                href="/calculator"
                title=""
                className={`text-base font-normal transition-all duration-200 py-2 ${
                  isHomePage &&
                  !isSticky &&
                  "lg:text-black hover:text-primary-green active:text-primary-green focus:text-primary-green"
                } ${
                  (isSticky || !isHomePage) &&
                  "text-black hover:text-primary-green"
                }
               ${!isHomePage && "text-black"}`}
              >
                {" "}
                Mortgage Calculator
              </Link>
              <Link
                href={`/calculator`}
                title=""
                className={`text-base font-normal transition-all duration-200 py-2 ${
                  isHomePage &&
                  !isSticky &&
                  "lg:text-black hover:text-primary-green active:text-primary-green focus:text-primary-green"
                } ${
                  (isSticky || !isHomePage) &&
                  "text-black hover:text-primary-green"
                }
               ${!isHomePage && "text-black"}`}
              >
                {" "}
                Property Tax Calculator{" "}
              </Link>
              <Dropdown
                name="Cities"
                // text={isSticky || !isHomePage ? "black" : "black"}
                text={"blackg"}
                options={cities}
              />
              <Link
                href="#"
                title=""
                className={`inline-flex py-2 text-base font-normal transition-all duration-200 text-black`}
              >
                {" "}
                Contact{" "}
              </Link>
              <SignedOut>
                {" "}
                <SignInButton />{" "}
              </SignedOut>{" "}
              <SignedIn>
                {" "}
                <UserButton />{" "}
              </SignedIn>
            </div>
          </div>

          {/* <div className="px-6 mt-6">
            <Link
              href="tel:6476745958"
              title=""
              className={`inline-flex justify-center px-4 py-3 text-base text-white font-semibold transition-all duration-200 bg-primary-green border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-primary-green ${
                isSticky
                  ? "border-primary-green"
                  : "border-white hover:border-primary-green"
              }`}
              role="button"
            >
              Call : 647 527 4970
            </Link>
          </div> */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
