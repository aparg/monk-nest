"use client";
import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import Navbar from "../../../components/Navbar";
// import Footer from "../../../components/Footer";
// import Breadcrumbs from "../../../components/Breadcrumbs";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Nformatter from "@/components/Nformatter";
import swal from "sweetalert";
import ContactFormB from "../../../../components/ContactFormB";
import ContactFormD from "@/components/ContactFormD";
import MortCalc from "../../../../components/MortCalc";
import { Tooltip } from "react-tooltip";

// import { setDate } from "date-fns";

// const Map = dynamic(() => import("../../../components/MapSingle"), {
//   ssr: false,
// });
// const ListingCard = dynamic(
//   () => import("../../../components/ListingCard"),
//   {}
// );
/* let baseUrl = "https://api.homebaba.ca"; */

export default function MyListings({ params }) {
  const getData = async () => {
    console.log(
      `https://api.homebaba.ca/assignment-single/${params.listing_id}/`
    );
    const posts = await axios.get(
      `https://api.homebaba.ca/assignment-single/${params.listing_id}/`
    );

    return posts.data;
  };
  useEffect(() => {
    const dataSetter = async () => {
      const data = await getData();
      console.log(data);
      // setData(data);
      setMyimages(data.images);
    };
    dataSetter();
  }, []);
  const [data, setData] = useState({});
  const [modalstat, setModalstat] = useState(false);
  const [myemailval, setMyemailval] = useState("");
  const [myimages, setMyimages] = useState([]);
  // const route = useRouter();

  function ifexists(item, choice) {
    if (item.type_of_plan.choice == choice.choice) {
      return true;
    }
    return false;
  }

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function handleEmailChange(e) {
    setMyemailval(e.target.value);
  }
  function showModal() {
    setModalstat(true);
  }
  function hideModal() {
    setModalstat(false);
  }

  const doTOcheck = (noo) => {
    if (parseInt(noo) != 0) {
      return "- High $ " + Nformatter(data?.house_detail.price, 2);
    }
  };

  const doTOcheck2 = (noo) => {
    if (parseInt(noo) != 0) {
      return "Low $ " + Nformatter(data?.house_detail.price, 2);
    } else {
      return "Price coming soon";
    }
  };

  function hellochange() {
    if (
      params.city_name == "ontario-pre-construction-sales-and-assignment-sale"
    ) {
      return (
        <h1 className="main-title mb-0 mt-2 mb-md-0">
          See similar upcoming preconstruction projects and Assignment sales in
          Ontario
        </h1>
      );
    } else {
      return (
        <h2 className="text-start homet ps-2">
          <Link href={`/${params.city_name}`}>
            <Link className="bg-white text-decoration-mine">
              See similar preconstruction homes in {params.city_name}
            </Link>
          </Link>
        </h2>
      );
    }
  }

  const convDash = (add) => {
    var result = add.split(" ").join("-");
    var newresult = result.split(",").join("-");
    return newresult;
  };

  const download = (e) => {
    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let neImgs = myimages;
    for (let i = myimages.length; i < 7; i++) {
      neImgs.push({
        id: 0,
        images: "https://api.homebaba.ca/media/noimage.webp",
        imagealt: "no image available",
        preconst: 1,
      });
    }
    setMyimages(neImgs);
    console.log(neImgs);
  }, []);

  function retF(arr) {
    arr.pop();
    let jjj = arr.join(" ");
    return jjj;
  }
  function retL(arr) {
    let jjj = arr[arr.length - 1];
    return jjj;
  }
  function retImg() {
    if (data?.images[0]) {
      return data?.images[0].images;
    } else {
      return "https://images.unsplash.com/photo-1627507055227-dd9c87118eb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80";
    }
  }

  const capture = (e) => {
    e.target.innerHTML = "Sharing...";
    axios({
      method: "post",
      url: "https://api.homebaba.ca/api/send-mail/",
      /* url: "http://127.0.0.1:8000/api/send-mail/", */
      data: {
        email: myemailval,
        img_url1: retImg(),
        name: data?.house_detail.project_name,
        address: data?.house_detail?.project_address,
        from: Nformatter(data?.house_detail?.price_starting_from, 2),
        to: Nformatter(data?.house_detail?.price_to || 0, 2),
        developer: data?.house_detail?.developer.name,
        slug: data?.house_detail?.slug,
        cityname: params?.city_name,
        deposite: data?.house_detail?.deposit_structure,
        movein: data?.house_detail?.occupancy,
        act: data?.house_detail?.assignment_closure_type,
      },
    })
      .then(function (response) {
        console.log(response);
        setModalstat(false);
        swal({
          text: "Sucessfully sent",
          timer: 1000,
          button: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        setModalstat(false);
      });
  };
  const options = {
    caption: {
      showCaption: false,
    },
    buttons: {
      showNextButton: true,
      showPrevButton: true,
    },
  };
  return (
    <>
      <Head>
        <meta name="Author" content="Homebaba"></meta>
        <meta name="Email" content="info@homebaba.ca"></meta>
        <title>
          {"Assignment sale - " + data?.house_detail?.project_address}
        </title>
        <meta
          name="Description"
          content={data?.house_detail?.project_address}
        ></meta>
        <link
          rel="canonical"
          href={
            "https://homebaba.ca/" + params.city_name + "/" + params.listing_id
          }
        />
        <meta name="robots" content="index, follow"></meta>
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={"Assignment sale - " + data?.house_detail?.project_address}
        />
        <meta
          property="og:description"
          content={data?.house_detail?.project_address}
        />
        {data?.images?.length > 0 && (
          <meta
            property="og:image"
            content={`${data?.house_detail?.mainimage}`}
          />
        )}
        {!data?.images?.length > 0 && (
          <meta
            property="og:image"
            content="https://homebaba.ca/noimage.webp/"
          />
        )}
        <meta
          property="og:url"
          content={`https://homebaba.ca/${params.city_name}/${params.listing_id}`}
        />
        <meta property="og:site_name" content="Homebaba" />
      </Head>
      {/* <Navbar defval={params.city_name} borderrr="sticky-top"></Navbar> */}
      <div className="floating fixxcont">
        <Link
          href="#mycontact"
          className="btn bgggggggg text-light rounded-0 w-100 py-3 shadow"
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
        </Link>
      </div>
      <div className="container px-sm-0 px-md-mine">
        <div className="row row-cols-1 row-cols-sm-2 px-0 px-sm-3 d-flex justify-content-center">
          <div className="col-sm-12 col-md-12 col-lg-10 mt-1">
            <div className="d-flex flex-column flex-sm-row align-items-start justify-content-sm-start align-items-sm-center mt-3">
              <span className="d-none d-md-flex">
                <Link href={`/`}>
                  <div className="btn btn-sm p-0 fw-mine">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left-short"
                      viewBox="0 0 18 18"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                      />
                    </svg>
                    Back to Search
                  </div>
                </Link>
              </span>
              <span className="mx-2"></span>
              {/* <Breadcrumbs /> */}
            </div>
          </div>
        </div>
        <div className="container px-0 px-sm-3">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4">
            <div className="col col-lg-1"></div>
            <div className="col col-md-8 col-lg-6">
              <div className="position-relative ohid rounded-mine">
                {/* <div className="position-absolute myps2">
                  <button
                    className="btn bg-white shadow-mine btn-sm"
                    onClick={() => openLightbox()}
                  >
                    View all Photos
                  </button>
                </div> */}
                <div className="position-absolute myps8 bg-white p-1 px-2">
                  Area : {data?.house_detail?.areasqft} sqft
                </div>
                <div className="my-3 grid-cont2">
                  <div>
                    <div
                      className={"position-relative g-item grid-itemm" + 0}
                      key={0}
                    >
                      {myimages[0] && (
                        <img
                          src={`${myimages[0].images}`}
                          alt={`${
                            data?.house_detail?.project_address
                          } located at ${
                            data?.house_detail?.project_address
                          } image ${0 + 1}`}
                          className="img-fluid w-100 h-100 rounded-mine"
                        />
                      )}
                    </div>
                    <div
                      className={"position-relative g-item grid-itemm" + 1}
                      key={1}
                    >
                      {data?.house_detail?.mainimage && (
                        <img
                          src={`${data?.house_detail?.mainimage}`}
                          alt={`${
                            data?.house_detail?.project_address
                          } located at ${
                            data?.house_detail?.project_address
                          } image ${1 + 1}`}
                          className="img-fluid w-100 h-100 rounded-mine"
                        />
                      )}
                      {!data?.house_detail?.mainimage && (
                        <img
                          src="/noimage.webp"
                          alt={`${
                            data?.house_detail?.project_address
                          } located at ${
                            data?.house_detail?.project_address
                          } image ${1 + 1}`}
                          className="img-fluid w-100 h-100 rounded-mine"
                        />
                      )}
                    </div>
                    {myimages?.slice(2, 12).map((image, no) => (
                      <div
                        className={
                          "position-relative g-item grid-itemm" +
                          parseInt(no + 2)
                        }
                        key={no}
                      >
                        <img
                          src={`${image.images}`}
                          alt={`${
                            data?.house_detail?.project_address
                          } located at ${
                            data?.house_detail?.project_address
                          } image ${no + 1}`}
                          className="img-fluid w-100 h-100 rounded-mine"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="screenshot">
                <div className="row row-cols-1 row-cols-sm-2">
                  <div className="col-sm-12">
                    <h1 className="main-titleee mb-0 fw-bold mt-4 mt-md-2">
                      ${numberWithCommas(data?.house_detail?.price)}
                      <p className="shadow-lg d-inline bva text-dark px-2 rounded-mine p-1 ms-1">
                        Assignment
                      </p>
                    </h1>
                    <div className="d-flex align-items-center mb-0">
                      <span>{data?.house_detail?.bedrooms}</span>
                      <h3 className="fw-bold mx-2">.</h3>
                      <span>{data?.house_detail?.bathrooms} Baths</span>
                      <h3 className="fw-bold mx-2">.</h3>
                      <span className="shadow-none bg-none">
                        {data?.house_detail?.project_type}
                      </span>
                      <h3 className="fw-bold mx-2">.</h3>
                      <span className="text-limit fw-bold">
                        <Link href={"/assignment-sale/" + params.city_name}>
                          <Link href=""> {data?.house_detail?.city?.name}</Link>
                        </Link>
                      </span>
                    </div>
                    <p className="card-subtitle mb-0 fw-mine text-limit">
                      Occupancy - {data?.house_detail?.occupancy}
                    </p>
                    <p className="d-flex align-items-center my-0">
                      <span className="text-dark">
                        {data?.house_detail?.project_address}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="my-2 py-2 py-md-5"></div>
                <div className="py-3 py-md-3">
                  <div className="border-bottom"></div>
                </div>
                <div className="pb-3 pb-md-5">
                  <h2 className="homet2">
                    <span className="aff2">Listing Description</span>
                  </h2>
                  <div className="text-start my-3 text-inside">
                    <div
                      className="iframe-container"
                      dangerouslySetInnerHTML={{
                        __html: data?.house_detail?.description,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="pb-3 pb-md-5 mb-5">
                <div className="roundddd">
                  <h4 className="fw-bold">What is an Assignment for Sale?</h4>
                  <p className="mb-1">
                    An assignment is a sales transaction where the original
                    buyer of a property (the “assignor”) allows another buyer
                    (the “assignee”) to take over the buyer’s rights and
                    obligations of the Agreement of Purchase and Sale, before
                    the original buyer closes on the property (that is, where
                    they take possession of the property). The assignee is the
                    one who ultimately completes the deal with the seller.
                  </p>
                  <div className="d-flex justify-content-end opp">
                    <div className="d-inline fs-5 fw-bold">
                      <span>
                        <img src="/logo.png" className="w-20" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3 py-md-5 my-5">
                <h2 className="fs-2 fw-bold">
                  <span className="aff2">Mortgage Calculator</span>
                </h2>
                <p>Quickly See What Your Mortgage Payments Might Look Like</p>
                <div>
                  <MortCalc price={data?.house_detail?.price}></MortCalc>
                </div>
              </div>
            </div>
            <div
              className="col col-md-4 col-lg-4 ps-md-2 pe-lg-5 pt-5 pt-md-0"
              id="mycontact"
            >
              <div className="py-4 py-md-0"></div>
              <div className="myps3 pe-0">
                <div className="d-flex justify-content-center  mt-3 mb-3">
                  <img
                    loading="lazy"
                    alt="Register Now Text Design"
                    src="/aa.png"
                    className="img-fluid mb-1 shadow-lg"
                  />
                </div>
                <div className="m-1 p-4 py-3 shadow-lg rounded-mine bordt">
                  <div className="row row-cols-2 gx-0 mx-0 align-items-center">
                    <div className="col-6">
                      {data?.house_detail?.realtor?.image && (
                        <img
                          loading="lazy"
                          src={data?.house_detail?.realtor?.image}
                          layout="responsive"
                          className="img-fluid image3"
                          alt="dfvdf"
                        />
                      )}
                      {!data?.house_detail?.realtor?.image && (
                        <img
                          loading="lazy"
                          src="/noimage.png"
                          className="img-fluid image3"
                          alt="dfvfd"
                        />
                      )}
                    </div>
                    <div className="col-6 ps-1">
                      <p className="mb-0 f-a bva">Listing Advertised By</p>
                      <h5 className="fw-bold linem fs-5 f-a mb-0">
                        {data?.house_detail?.realtor.user?.first_name}{" "}
                        {data?.house_detail?.realtor.user?.last_name}
                      </h5>
                      <p
                        className="mb-0 bva2  f-a"
                        data-tip
                        data-for="registerTip"
                      >
                        Homebaba Verified Agent
                        <span>
                          <sup>
                            <img
                              src="/cc.png"
                              alt="verfied"
                              className="img-fluid small-i ms-1"
                            />
                          </sup>
                        </span>
                      </p>
                      <Tooltip
                        type="light"
                        id="registerTip"
                        place="bottom"
                        effect="solid"
                        className="maxwm shadow-lg"
                      >
                        <p className="fw-bold">
                          .Empathy <span className="ms-1"></span> .Responsive
                          <br />
                          .Knowledge<span className="ms-1"></span> .Helpful
                          <br />
                          .Education
                          <span className="ms-1"></span> .Experience
                        </p>
                        <p>
                          Homebaba Verified Agent
                          <span>
                            <sup>
                              <img
                                src="/cc.png"
                                alt="verfied"
                                className="img-fluid small-i ms-1"
                              />
                            </sup>
                          </span>{" "}
                          are verified by our team based on above qualities.
                        </p>
                        <p>
                          These real estate professionals are friendly &
                          experienced, empathatic & have extensive market
                          knowledge.
                        </p>
                        <p>You deserve no less than a 5 star service!</p>
                      </Tooltip>
                      <p className="fw-normal text-decoration-underline bva  f-a mb-0">
                        {data?.house_detail?.realtor?.realtor_association}
                      </p>
                    </div>
                  </div>
                  <div className="my-4"></div>
                  <ContactFormD
                    projects_name={data?.house_detail?.project_address}
                    defaultmessage={
                      "Hi " +
                      (data?.house_detail?.realtor.user?.first_name || "") +
                      ",\nPlease send me more information about this listing" +
                      ".Thank you"
                    }
                    listing_id={params.listing_id}
                    city_name={params.city_name}
                    imglink={data?.house_detail?.realtor?.image}
                  ></ContactFormD>
                </div>
              </div>
            </div>
            <div className="col col-lg-1"></div>
          </div>
        </div>
      </div>
      <div className="py-5"></div>
      <div className="d-none d-md-block container">
        <div className="contact_part py-5 my-5">
          <div className="row justify-content-center">
            {data?.house_detail?.realtor?.image && (
              <img
                loading="lazy"
                src={data?.house_detail?.realtor?.image}
                layout="responsive"
                className="img-fluid w-25 w-smm-50 mb-3 rounded-c"
                alt="cvfv"
              />
            )}
            {!data?.house_detail?.realtor?.image && (
              <img
                loading="lazy"
                src="/contact-bottom-2.png"
                className="img-fluid w-25 w-smm-50 mb-3  rounded-c"
                alt="dfvf"
              />
            )}
            <h4 className="text-center fs-5 fs-md-4 fw-bold">
              Have any questions about this listing?
            </h4>
            <p className="mb-0 text-center fs-mine2">
              My name is {data?.house_detail?.realtor.user?.first_name}{" "}
              {data?.house_detail?.realtor?.user?.last_name}, I would love to
              help you{" "}
              {/* |{" "}
              <Link href="tel:647-527-4970" className="link-mine fs-mine2">
                647-527-4970
              </Link> */}
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-3 mt-5">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <ContactFormB
                project={data?.house_detail?.project_address}
              ></ContactFormB>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
      <div className="py-3 py-md-4"></div>
      <div className="container-fluid px-md-4 pt-md-5 mt-4">
        <div className="py-4"></div>
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

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// }
