"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// import Navbar from "../../../components/Navbar";
// import Footer from "../../../components/Footer";
import Link from "./ActiveLink";
import Head from "next/head";
import axios from "axios";
import Router from "next/router";
import ContactFormC from "./ContactFormC";
import Image from "next/image";
import { useRouter } from "next/router";

export default function MyListings(props) {
  const [isLoading, setLoading] = useState(false); //State for the loading indicator
  const [showMap, setShowMap] = useState(false);
  const [data, setData] = useState({
    totalCount: 0,
    pageCount: 0,
    perPage: 0,
    posts: [],
  });
  const [showMapClass, setShowMapClass] = useState({
    class1: "col-md-12",
    class2:
      "row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xxl-4 gx-2 gx-md-4 gy-md-5 mx-0",
  });
  const [showLeftScroll, setshowLeftScroll] = useState(false);
  const routee = useRouter();

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  function mapbtnclick() {
    setShowMap(true);
    setShowMapClass({
      class1: "col-md-7",
      class2:
        "row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xxl-3 gx-2 gx-md-4 gy-md-5 mx-0",
    });
  }
  function mapbtnclick2() {
    setShowMap(false);
    setShowMapClass({
      class1: "col-md-12",
      class2:
        "row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 gx-2 gx-md-4 gy-md-5 mx-0",
    });
  }
  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  else {
    <div>Loading...</div>;
  }

  function pagination(currentPage, nrOfPages) {
    var delta = 2,
      range = [],
      rangeWithDots = [],
      l;

    range.push(1);

    if (nrOfPages <= 1) {
      return range;
    }

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i < nrOfPages && i > 1) {
        range.push(i);
      }
    }
    range.push(nrOfPages);

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

  function rightScrollClick() {
    let scrollDiv = document.querySelector(".main-cont");
    scrollDiv.scroll({
      left: (scrollDiv.scrollLeft += 150),
      top: 0,
      behavior: "smooth",
    });
    if (scrollDiv.scrollLeft >= 0) {
      setshowLeftScroll(true);
    } else {
      setshowLeftScroll(false);
    }
  }

  function leftScrollClick() {
    let scrollDiv = document.querySelector(".main-cont");
    scrollDiv.scroll({
      left: (scrollDiv.scrollLeft -= 150),
      top: 0,
      behavior: "smooth",
    });
    if (scrollDiv.scrollLeft != 0) {
      setshowLeftScroll(true);
    } else {
      setshowLeftScroll(false);
    }
  }
  // convert first letter of a string to uppercase
  function capitalizeFirstLetter(str) {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }

  function hellochange(vall) {
    if (
      routee.query.city_name ==
      "ontario-pre-construction-sales-and-assignment-sale"
    ) {
      return (
        <h1 className="main-title mb-0 mt-2 mb-md-0">
          Upcoming Pre-Construction homes for sale in Ontario & Assignment sales
          ( <i className="text-danger">VIP Access*</i> )
        </h1>
      );
    } else if (
      routee.query.city_name == "vancouver" ||
      routee.query.city_name == "burnaby" ||
      routee.query.city_name == "richmond" ||
      routee.query.city_name == "surrey"
    ) {
      return (
        <h1 className="main-title text-center ttt mb-0 mt-2 mb-md-0">
          {vall} {capitalizeFirstLetter(routee.query.city_name)} Assignments for
          sale Homes, Condos & Townhomes
        </h1>
      );
    } else {
      return (
        <h1 className="main-title homet2 text-center mb-0 mt-2 mb-md-0">
          <span className="aff2">
            Assignments for sale in{" "}
            {capitalizeFirstLetter(routee.query.city_name)} (2024)
          </span>
        </h1>
      );
    }
  }
  function hellochange2(vall) {
    if (
      routee.query.city_name ==
      "ontario-pre-construction-sales-and-assignment-sale"
    ) {
      return (
        <h2 className="main-subtitle d-flex justify-content-center mt-3 mt-md-2">
          Check out all upcoming preconstruction projects and Assignment sales
          in Ontario. Projects Selliing quickly, Call us today!
        </h2>
      );
    } else {
      return (
        <h2 className="main-subtitle d-flex justify-content-center mt-3 mt-md-2 hhh text-center">
          {vall} {capitalizeFirstLetter(routee.query.city_name)} Detached,
          Townhomes or Condos assignment for sale on Homebaba
        </h2>
      );
    }
  }

  return (
    <>
      <Head>
        <meta name="Author" content="Homebaba"></meta>
        <meta name="Email" content="info@homebaba.ca"></meta>
        {props.citydetail && (
          <>
            <title>
              {props.citydetail.name + " Assignment Sale - Homebaba"}
            </title>
            <meta
              name="Description"
              content={
                props.totalCount +
                "+ " +
                props.citydetail.name +
                " Assignment Sale available on Homebaba. Find affordable Detached houses, Townhomes, Condos Assignment sales in " +
                props.citydetail.name +
                " . Plans, pricing is available."
              }
            ></meta>
            <link
              rel="canonical"
              href={"https://homebaba.ca/" + routee.query.city_name}
            />
            <meta name="robots" content="index, follow"></meta>
            <meta property="og:type" content="og:website" />
            <meta
              property="og:title"
              content={props.citydetail.name + " Assignment Sale - Homebaba"}
            />
            <meta
              property="og:description"
              content={
                props.totalCount +
                "+ " +
                props.citydetail.name +
                "Assignment Sale available on Homebaba. Find affordable Detached houses, Townhomes, Condos Assignment sales in " +
                props.citydetail.name +
                " . Plans, pricing is available."
              }
            />
            {props.posts[0] && props.posts[0].images[0] && (
              <meta
                property="og:image"
                content={props.posts[0].images[0].split(",")[0]}
              />
            )}
            {!props.posts[0] ||
              (!props.posts[0].images[0] && (
                <meta property="og:image" content="/noimage.webp" />
              ))}
            <meta
              property="og:url"
              content={"https://homebaba.ca/" + routee.query.city_name}
            />
          </>
        )}
        <meta property="og:site_name" content="Homebaba" />
      </Head>
      {/* <Navbar defval={routee.query.city_name}></Navbar> */}
      <div className="py-1 py-md-3"></div>
      <div>
        <div className="row row-cols-1 row-cols-md-1 g-0">
          <div className={showMapClass.class1}>
            <div className="container-fluid px-md-4 px-md-mine2">
              <div className="row py-md-2 mt-md-2 mx-0">
                <div className="d-flex flex-column justify-content-center align-items-md-center align-items-center pt-5">
                  {hellochange(props.totalCount)}
                  {hellochange2(props.totalCount)}
                </div>
              </div>
              <div className="py-md-1">
                <div className="d-flex justify-content-center pb-2 pt-4">
                  <div className="main-cont pb-3 d-flex overflow-scroll w-75">
                    <Link href="/assignment-sale/">
                      <a className="car-item2 pb-1 mx-2">All</a>
                    </Link>
                    {assCityList &&
                      assCityList.map((asscity) => (
                        <Link
                          href={"/assignment-sale/" + asscity.city_name}
                          key={asscity.city_name}
                        >
                          <a className="car-item2 pb-1 mx-2">
                            {asscity.city_name_cap}
                          </a>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
              <div className={showMapClass.class2}>
                {props.posts.map((post, index) => (
                  <div className="col" key={post.slug}>
                    <ListingCard2
                      num={index + 1}
                      datee={post.date_of_upload}
                      price={post.price}
                      beds={post.bedrooms}
                      baths={post.bathrooms}
                      area={post.areasqft}
                      rimage={post.realtor.image}
                      rfname={post.realtor.user.first_name}
                      rlname={post.realtor.user.last_name}
                      rass={post.realtor.realtor_association}
                      street={post.project_address}
                      city_name={post.city.name}
                      house_type={post.project_type}
                      img_url1={post.mainimage}
                      url_slug={post.slug}
                      ready_date={post.occupancy}
                      storeys={post.storeys}
                      main_feature={post.bedrooms}
                      status={post.bathrooms}
                      name={post.project_address}
                    />
                  </div>
                ))}
              </div>
              <div className="my-4 py-4"></div>
              {parseInt(props.totalCount) + 1 != 1 && (
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    {props.currentPage - 1 != 0 && (
                      <li className="page-item">
                        <Link
                          href={
                            props.currentPage == 2
                              ? `/${routee.query.city_name}`
                              : `/${routee.query.city_name}?page=${
                                  parseInt(routee.query.page) - 1
                                }`
                          }
                        >
                          <a
                            className="page-link no-border"
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </Link>
                      </li>
                    )}
                    {pagination(props.currentPage, props.pageCount).map(
                      (no) => (
                        <li className="page-item" key={no}>
                          <Link
                            href={
                              no == 1
                                ? `/${routee.query.city_name}`
                                : `/${routee.query.city_name}?page=${no}`
                            }
                          >
                            <a
                              className={
                                props.currentPage == no
                                  ? "page-link no-border page-item-active shadow-ha"
                                  : "page-link no-border"
                              }
                            >
                              {no}
                            </a>
                          </Link>
                        </li>
                      )
                    )}
                    {props.pageCount != props.currentPage && (
                      <li className="page-item">
                        <Link
                          href={`/${routee.query.city_name}?page=${
                            (parseInt(routee.query.page) || 1) + 1
                          }`}
                        >
                          <a
                            className="page-link no-border"
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
              <p className="main-subtitle text-center">
                Page 1 of {props.totalCount} Results
              </p>
              <div className="my-5"></div>
            </div>
            <div>
              <div className="py-5 my-5">
                <div>
                  <div className="d-flex justify-content-center">
                    <div>
                      <div className="container">
                        <h2 className="text-center main-1 mt-5">
                          <span className="text-myred">Be</span> Smart.{" "}
                          <span className="text-myred">Be</span> Quick
                        </h2>
                        <h4 className="text-center main-2">
                          Get in the line before someone else does
                        </h4>
                        <div id="mycontact"></div>
                      </div>
                    </div>
                  </div>
                  <div className="row row-cols-1 row-cols-md-3 mt-5 g-1 g-md-0">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <div className="text-center">
                        <img
                          loading="lazy"
                          alt="Register Now Text Design"
                          src="/reg.webp"
                          className="img-fluid mb-3 imgmm"
                        />
                      </div>
                      <div className="m-1 p-4 py-3 shadow-lg rounded-mine bordt">
                        <div className="row row-cols-2 align-items-center">
                          <div className="col-4">
                            <img
                              src="/milan-2.png"
                              alt="dce"
                              className="agent-img"
                            />
                          </div>
                          <div className="col-8">
                            <h5 className="fw-bold text-center linem fs-4  mb-0">
                              Receive a Call
                            </h5>
                            <p className="text-center fw-normal mb-0">
                              Speak to an expert agent
                            </p>
                          </div>
                        </div>
                        <div className="my-4"></div>
                        <ContactFormC defaultmessage={" "}></ContactFormC>
                      </div>
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </div>
              </div>
              <div className="py-3"></div>
              {props.citydetail && (
                <div className="container" id="make-img-responsive">
                  <div className="row row-cols-1 g-0">
                    <div
                      className="col-12 mt-mine px-3"
                      dangerouslySetInnerHTML={{
                        __html: props.citydetail.city_details,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="floating fixxcont2">
        <a
          href="#mycontact"
          className="btn bgggggggg br-m text-light w-100 shadow-lg"
        >
          Send a message{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chat-left-dots"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </a>
      </div>
      <div className="py-5"></div>
      <img
        loading="lazy"
        src="/line.png"
        alt="Line image for character"
        className="img-fluid foot-up-img"
      />
      {/* <Footer /> */}
    </>
  );
}
