"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";

//LIB
import Link from "next/link";
import SearchSuggest from "./SerachSuggest";

const Navbar = ({ cities, dropdown_cities }) => {
  const [cityname, setCityname] = useState("");

  const filteredprojects = (value) => {
    return dropdown_cities.filter((city) => {
      return value.includes(city.name);
    });
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white py-3 py-md-2 shadow-navbar mb-3 sticky-top">
      <div className="container-fluid justify-content-start">
        <Link href="/" className="logo">
          <img src="/logo2.svg" alt="Dolphy logo" className="img-fluid" />
        </Link>
        <div className="input-group input-group-search me-2 me-md-0">
          {/* <SearchBar changeCity={setCityname} cities={cities} /> */}
          {/* <SearchSuggest cities={cities} /> */}
          {/* <Link
            href={"/pre-construction-homes/" + cityname.toLowerCase()}
            className="d-none d-md-inline"
          >
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
                height="25"
                width="25"
              >
                <path
                  d="M20.756 18.876l6.155 6.154-1.88 1.881-6.155-6.155A9.269 9.269 0 0 1 13.3 22.61a9.31 9.31 0 1 1 9.31-9.31c0 2.091-.69 4.021-1.854 5.576zM13.3 19.95a6.65 6.65 0 1 0 0-13.3 6.65 6.65 0 0 0 0 13.3z"
                  fill="#000000"
                ></path>
              </svg>
            </button>
          </Link> */}
        </div>
        <button
          className="navbar-toggler d-lg-none ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img
            loading="lazy"
            src="https://img.icons8.com/material-two-tone/24/000000/menu.png"
            width="24px"
            height="24px"
            alt="Navbar toggler icon"
          />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0 align-items-center align-items-md-center">
            <li className="nav-item dropdown dropdown-fullwidth">
              {/* <button
                className="nav-link dropdown-toggle align-items-center d-flex shadow-lg fw-500 text-dark me-3 px-2"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Cities
                <img
                  src="/dropdown.svg"
                  alt="dropdown icon"
                  className="img-fluid dropdown-nav-icon ms-1"
                />
              </button> */}
              <div
                className="dropdown-menu dropdown-menu-end border-0 show"
                data-bs-popper="static"
              >
                <div className="row p-3 pt-2 dopp">
                  {dropdown_cities &&
                    filteredprojects([
                      "Toronto",
                      "Calgary",
                      "Mississauga",
                      "Brampton",
                      "Ajax",
                      "Burlington",
                      "Kitchener",
                      "Hamilton",
                      "Oakville",
                      "Milton",
                      "Niagara",
                      "Vaughan",
                    ]).map((city, no) => (
                      <div className="col-12 col-sm-6 col-md-3 mb-4" key={no}>
                        <Link
                          className="link-black"
                          href={`/pre-construction-homes/${city.slug}/`}
                        >
                          <h5 className="mb-1 fw-mine fs-smaller fs-4">
                            {city.name}
                          </h5>
                        </Link>
                        <ul className="list-unstyled ll">
                          {city.preconstructions &&
                            city.preconstructions.length > 0 &&
                            city.preconstructions
                              .slice(0, 5)
                              .map((project, no) => (
                                <li key={no}>
                                  <Link
                                    className="dropdown-item link-black text-limit"
                                    href={`/pre-construction-homes/${city.slug}/${project.slug}`}
                                  >
                                    {project.project_name}
                                  </Link>
                                </li>
                              ))}
                        </ul>
                      </div>
                    ))}
                  <hr />
                  <div className="col-12">
                    <Link
                      className="btn btn-white link-black fw-bold p-0"
                      href={"/pre-construction-homes/"}
                    >
                      List of all cities and pre construction homes in Canada
                      <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <Link
                href={"/pre-construction-homes/calgary/"}
                className="nav-link"
              >
                Calgary's Top Preconstruction
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href={"/pre-construction-homes/builders/"}
                className="nav-link"
              >
                Builders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/blogs">
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#mycontact" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item d-flex flex-column">
              <Link
                href="tel:5878872572"
                className="btn my-2 my-sm-0 ms-md-3 d-flex text-dark gap-1"
              >
                <img
                  src="/COA-agent-pic.jpg"
                  alt="agent pic"
                  className="img-fluid img-call-height"
                />
                <span
                  className="d-flex flex-column justify-content-start utility__phone-msg"
                  id="utility__phone-msg"
                >
                  <b id="utility__phone-number text-dark">(587) 887-2572</b>
                  <span className="d-block travel__expert fs-vsmall">
                    Speak to a home expert
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
