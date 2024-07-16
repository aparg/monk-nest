"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Image } from "react-bootstrap";
import { useState, useEffect } from "react";

const Footer = () => {
  const [centered, setCentered] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <></>;
  }
  useEffect(() => {
    if (pathname.includes("/listings")) {
      setCentered(true);
    }
  }, []);

  return (
    <>
      <footer className="bg-[#F2F2F2] w-[100dvw] pb-20 flex flex-col items-center mt-24 sm:mt-40">
        <div className="row text-primary-color justify-content-around items-start w-[80%] mt-20">
          <div className="col-12  mb-6 order-1">
            <img
              src="/logo.png"
              className="w-[173px]"
              alt="condowong-logo"
            ></img>
          </div>
          <div className="col-12 col-md-4 flex flex-col items-start order-2">
            <div className="flex flex-col sm:mt-0 mt-5">
              <span className="my-1 text-primary-color">
                328 Hwy 7 E, Unit 20 Richmmond Hill, ON L4B 3P7
              </span>
              <span className="my-1 text-primary-color">
                admin@condowong.ca
              </span>
              <span className="my-1 text-primary-color">905.882.6882</span>
            </div>
          </div>
          <div className="col-12 col-md-5 flex flex-col sm:items-center items-start mt-8 sm:mt-0 order-4 sm:order-3">
            <div className="mb-1 text-primary-color">
              © 2024 Inside Real Estate
            </div>
            <div className="h-7"></div>
            <div className="my-1 text-primary-color">
              Website designed by{" "}
              <Link href="sixdesign.ca" target="_blank">
                <strong className="text-primary-color">SixDesign</strong>
              </Link>
            </div>
          </div>
          <div className="flex flex-row col-12 col-md-2 mt-8 sm:mt-1 order-3 sm:order-4">
            <Link target="_blank" href="#">
              <img
                className="w-3 mx-3"
                src="/footer-icons/facebook.svg"
                alt="facebook"
              ></img>
            </Link>

            <Link target="_blank" href="#">
              <img
                className="w-4 mx-3"
                src="/footer-icons/instagram.svg"
                alt="instagram"
              ></img>
            </Link>

            <Link target="_blank" href="#">
              <img
                className="w-4 mx-3"
                src="/footer-icons/youtube.svg"
                alt="youtube"
              ></img>
            </Link>
          </div>
        </div>
        <div>
          <h1>MLS Disclaimer</h1>
          <p>
            Toronto Real Estate Board (TRREB); All information deemed reliable
            but not guaranteed. All properties are subject to prior sale, change
            or withdrawal. Neither listing broker(s) or information provider(s)
            shall be responsible for any typographical errors, misinformation,
            misprints and shall be held totally harmless. Listing(s) information
            is provided for consumer's personal, non-commercial use and may not
            be used for any purpose other than to identify prospective
            properties consumers may be interested in purchasing. The data
            relating to real estate for sale on this website comes in part from
            the Internet Data Exchange program of the Multiple Listing Service.
            Real estate listings held by brokerage firms other than MonkNest
            Real Estate Inc. may be marked with the Internet Data Exchange logo
            and detailed information about those properties will include the
            name of the listing broker(s) when required by the MLS. Copyright
            ©2024 All rights reserved. Last Updated: July 15, 2024 5:02 AM UTC
          </p>
          <p>
            All information deemed reliable but not guaranteed. All properties
            are subject to prior sale, change or withdrawal. Neither listing
            broker(s) or information provider(s) shall be responsible for any
            typographical errors, misinformation, misprints and shall be held
            totally harmless. Listing(s) information is provided for consumer's
            personal, non-commercial use and may not be used for any purpose
            other than to identify prospective properties consumers may be
            interested in purchasing. The data relating to real estate for sale
            on this website comes in part from the Internet Data Exchange
            program of the Multiple Listing Service. Real estate listings held
            by brokerage firms other than MonkNest Real Estate Inc. may be
            marked with the Internet Data Exchange logo and detailed information
            about those properties will include the name of the listing
            broker(s) when required by the MLS. Copyright ©2024 All rights
            reserved. Last Updated: July 15, 2024 1:47 AM UTC
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
