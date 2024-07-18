"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import ContactFormB from "./ContactFormB";
import { assCityList } from "@/datas/assCityList";
import Image from "next/image";
export default function CityHomePage(props) {
  const ListingCard2 = dynamic(() => import("./ListingCard2"), {
    loading: () => <p>Loading...</p>,
  });

  const Map = dynamic(() => import("./Mapp"), { ssr: false });

  const [showLeftScroll, setshowLeftScroll] = useState(false);

  function rightScrollClick() {
    let scrollDiv = document.querySelector(".main-cont");
    scrollDiv.scroll({
      left: (scrollDiv.scrollLeft += 150),
      top: 0,
      behavior: "smooth",
    });
    if (scrollDiv.scrollLeft != 0) {
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

  return (
    <>
      <Head>
        <meta name="Author" content="Homebaba"></meta>
        <meta name="Email" content="info@homebaba.ca"></meta>
        <title>Ontario Assignment Sale - Homebaba</title>
        <meta
          name="Description"
          content={
            "Ontario Assignment Sale available on Homebaba. Find affordable Detached houses, Townhomes, Condos Assignment sales in " +
            " Ontario" +
            ". Plans, pricing is available."
          }
        ></meta>
        <link rel="canonical" href="https://homebaba.ca/" />
        <meta name="robots" content="index, follow"></meta>
        <meta property="og:type" content="og:website" />
        <meta
          property="og:title"
          content="Ontario Assignment Sale - Homebaba"
        />
        <meta
          property="og:description"
          content={
            "Ontario Assignment Sale available on Homebaba. Find affordable Detached houses, Townhomes, Condos Assignment sales in " +
            " Ontario" +
            ". Plans, pricing is available."
          }
        />
        <meta property="og:image" content="/aeee.jpg" />
        <meta property="og:url" content="https://homebaba.ca/" />
        <meta property="og:site_name" content="Homebaba" />
      </Head>
      {/* <Navbar></Navbar> */}
      <div className="py-3"></div>
      <div className="main pt-3 pt-md-5">
        <div className="container-fluid px-md-4 px-md-mine2">
          <div className="d-flex justify-content-center align-items-center py-4">
            <div>
              <h1 className="text-center homet2">
                <span className="aff2">
                  List of Assignments for Sale in Ontario (2024)
                </span>
              </h1>
              <h2 className="main-subtitle d-flex justify-content-center hhh mt-2 mt-md-1">
                Leading Online Marketplace For Condos, Townhomes & Detached Home
                Assignment Sales In Ontario
              </h2>
            </div>
          </div>
          <div className="d-flex justify-content-center pb-2 pt-4">
            <div className="main-cont pb-3 d-flex overflow-scroll w-75">
              <Link href="/assignment-sale/" className="car-item2 pb-1 mx-2">
                All
              </Link>
              {assCityList &&
                assCityList.map((assconcity) => (
                  <Link
                    href={"/assignment-sale/" + assconcity.city_name}
                    key={assconcity.city_name}
                    className="car-item2 pb-1 mx-2"
                  >
                    {assconcity.city_name_cap}
                  </Link>
                ))}
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xxl-4 gx-2 gx-md-4 gy-md-5 mx-0">
            {props.posts2 &&
              props.posts2.map((post) => (
                <div className="col" key={post.slug}>
                  <ListingCard2
                    price={post.price}
                    beds={post.bedrooms}
                    baths={post.bathrooms}
                    area={post.areasqft}
                    datee={post.date_of_upload}
                    street={post.project_address}
                    city_name={post.city.name}
                    house_type={post.project_type}
                    img_url1={post.mainimage}
                    rimage={post.realtor.image}
                    rfname={post.realtor.user.first_name}
                    rlname={post.realtor.user.last_name}
                    rass={post.realtor.realtor_association}
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
        </div>
        <div className="py-4"></div>
      </div>
      <div className="py-5 my-5" id="mycontact">
        <div className="container">
          <div className="row justify-content-center">
            <img
              src="/contact-bottom-2.png"
              alt="dce"
              className="img-fluid w-25 w-smm-50 mb-3"
            />
          </div>
          <h2 className="fw-bolder fw-boldie text-center px-md-4 fs-3">
            Need help with Assignment Sale?
          </h2>
          <h2 className="fw-mine text-center px-md-4 fs-4">
            Don't know where to start? Contact us today
          </h2>
          <div className="row row-cols-1 row-cols-md-3 mt-5">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <ContactFormB></ContactFormB>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
      <div className="py-3"></div>
      <div className="container" id="make-img-responsive">
        <div className="row row-cols-1 g-0">
          <div className="lll">
            <h3 className="fs-3 fw-bbbb pb-2">
              <span className="text-decoration-underline">
                Ontario Assignment Sale
              </span>{" "}
              - Check out Pre construction Condos, Townhomes & Detached home
              assignment for sale in Ontario, Canada.
            </h3>
            <ol>
              <li className="fw-bold">
                <h5 className="fw-bold">Is an Assignment legal in Ontario?</h5>
                <p className="fw-normal">
                  An assignment is a sales transaction where the original buyer
                  of a property (the “assignor”) allows another buyer (the
                  “assignee”) to take over the buyer’s rights and obligations of
                  the Agreement of Purchase and Sale, before the original buyer
                  closes on the property (that is, where they take possession of
                  the property). The assignee is the one who ultimately
                  completes the deal with the seller.
                </p>
              </li>
              <li className="fw-bold">
                <h5 className="fw-bold">
                  What is a preconstruction assignment sale?
                </h5>
                <p className="fw-normal">
                  Unless otherwise prohibited or restricted in writing in the
                  original agreement of purchase and sale, It is mostly legally
                  permitted. In some cases, the developer may charge the
                  assignor a fee for this kind of sale. The best thing to do is
                  to contact the builder directly to confirm if you are allowed
                  to assign your purchase contract because assignment
                  restriction and fees vary from builder to builder.
                </p>
              </li>
            </ol>
            <br />
            <p>
              <i>
                Homebaba is one of the leading online marketplace for
                pre-construction and assignment sales in Ontario. Check out
                hundreds of Ontario Assignment Sales advertised by Liscenced
                Real Estate Agents in Ontario. Toronto Assignment Sale -
                <a href="/">Homebaba</a> . The listings such as assignment
                listings, resale listings or preconstruction project listings &
                description of the related pages are uploaded by Real estate
                agents. Homebaba does not verify the correctness of the data
                uploaded on its platform. Please contact the listing agent to
                verify the information. E&OE expected.
              </i>
            </p>
          </div>
        </div>
      </div>
      <div className="py-3"></div>
      <Image
        src="/line.png"
        alt="Line image"
        height="4"
        width="100"
        layout="responsive"
        className="img-fluid foot-up-img"
      />
      {/* <Footer /> */}
    </>
  );
}
