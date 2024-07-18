import Link from "next/link";
import Nformatter from "./Nformatter";

export default function ListingCard2(props) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function daysCount(x) {
    let date_1 = new Date(x);
    let date_2 = new Date();
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    if (TotalDays == 0) {
      return "Today";
    } else {
      return Math.abs(TotalDays) + " day ago ";
    }
  }

  return (
    <>
      <div className="card border-0 shadow-sm rounded-mine my-3 my-md-0">
        {/* <button
        className="fav-btn btn mmm"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Add to Favourites"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none">
            <path
              d="M26.95 11.863a5.193 5.193 0 0 1-1.53 3.69l-1.913 1.912-7.373 7.373-7.371-7.373-1.912-1.912a5.214 5.214 0 1 1 7.377-7.366l1.906 1.907 1.908-1.908a5.214 5.214 0 0 1 8.908 3.677z"
              fillOpacity=".4"
              fill="#000"
            ></path>
            <path
              d="M26.95 11.863a5.214 5.214 0 0 0-8.908-3.677l-1.908 1.908-1.906-1.908a5.214 5.214 0 1 0-7.377 7.366l1.912 1.913 7.371 7.373 7.373-7.373 1.912-1.912a5.193 5.193 0 0 0 1.53-3.69zM16.157 6.31A7.874 7.874 0 1 1 27.3 17.433l-1.913 1.913-9.254 9.254-1.88-1.88-7.373-7.374-1.91-1.91a7.874 7.874 0 1 1 11.137-11.13l.027.025.022-.022z"
              fill="#FFF"
            ></path>
          </g>
        </svg>
      </button> */}
        <div className="position-relative is-loading">
          <Link
            href={`/assignment-sale/${props.city_name.toLowerCase()}/${
              props.url_slug
            }`}
            className="mylinkk"
            target="_blank"
          >
            {props.img_url1 && (
              <img
                loading="lazy"
                src={props.img_url1.split(",")[0]}
                layout="responsive"
                className="img-fluid rounded-minet image"
                alt={`${props.name} located at ${props.street} image`}
              />
            )}
            {!props.img_url1 && (
              <img
                loading="lazy"
                src="/noimage.webp"
                className="img-fluid rounded-minet image"
                alt={"no image available for " + props.name}
              />
            )}
          </Link>
          <span className="mmmmm p-1 px-2">{daysCount(props.datee)}</span>
        </div>
        <Link
          href={`/assignment-sale/${props.city_name.toLowerCase()}/${
            props.url_slug
          }`}
          className="card-body text-decoration-none pbbb bg-white shadow-lgg rounded-mineb"
          target="_blank"
        >
          <div className="thumb_content th2">
            <h2 className="mb-1 fs-3 fw-bold d-flex align-items-center justify-content-start">
              ${numberWithCommas(props.price)}
              <span className="shadow-lg p-1 ms-1">{props.area} Sqft</span>
            </h2>
            <div className="d-flex align-items-center">
              <span>{props.beds}</span>
              <h3 className="fw-bold mx-2 mb-0 lh-0">.</h3>
              <span>{props.baths} Baths</span>
              <h3 className="fw-bold mx-2 mb-0 lh-0">.</h3>
              <span className="shadow-none bg-none">{props.house_type}</span>
            </div>
            <p className="mb-0 fs-mine text-limit fw-normall pb-0">
              Occupancy - {props.ready_date}
            </p>
            <p className="text-dark bva mb-4">{props.street}</p>
            <h4 className="fs-5 mt-1 text-dark d-flex align-items-center">
              <p className="fw-bold mb-0 lh-0">
                {" "}
                <span className="fs-2 bg-none">.</span> {props.city_name}
              </p>
            </h4>
            <hr className="mb-0" />
            <div className="d-flex align-items-center">
              <div>
                {props.rimage && (
                  <img
                    loading="lazy"
                    src={props.rimage}
                    layout="responsive"
                    className="img-fluid vsi"
                    alt="dfvdf"
                  />
                )}
                {!props.rimage && (
                  <img
                    loading="lazy"
                    src="/noimage.webp"
                    className="img-fluid vsi"
                    alt="dfvfd"
                  />
                )}
              </div>
              <div className="ms-2">
                <h5 className="fw-bold linem bva mb-0">
                  {props.rfname} {props.rlname}
                </h5>
                <p className="fw-normal bva mb-0">{props.rass}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
