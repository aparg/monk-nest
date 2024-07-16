"use client";
import { taxRates } from "@/constant/taxes";
import React, { useState, useEffect } from "react";

const PropertyTax = () => {
  const [calculatordata, setcalculatordata] = useState({
    propertyValue: "",
    propertyType: "residential",
    taxes: {
      cityTax: "",
      educationTax: "",
      cityBuildingFund: "",
      totalTax: "",
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setcalculatordata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  function calcTax() {
    let calculatedTax = {};
    Object.keys(calculatordata.taxes).forEach((key) => {
      calculatedTax[key] = (
        (parseFloat(calculatordata.propertyValue) *
          taxRates[calculatordata.propertyType][key].rate) /
        100
      ).toFixed(2);
    });
    return calculatedTax;
  }

  useEffect(() => {
    setcalculatordata({ ...calculatordata, taxes: calcTax() });
  }, [calculatordata.propertyValue, calculatordata.propertyType]);

  return (
    <div id="propertyTax">
      <h2 className="font-extrabold pb-3 text-2xl mt-24 sm:text-4xl">
        Property Tax Calculator
      </h2>
      <div className="row row-cols-1 rounded-mine px-2 shadow-lg mx-0 my-6">
        <form className="col-md-9 col-lg-9 my-2 my-sm-5">
          <div className="row row-cols-1 row-cols-sm-2 my-2 ">
            <div className="col-sm-4 d-flex align-items-center">
              <label className="mortlabel" htmlFor="propertyValue">
                Property Value
              </label>
            </div>
            <div className="col-sm-8">
              <div className="input-group">
                <span className="input-group-text bg-light" id="basic-addon1">
                  $
                </span>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="basic-addon1"
                  id="propertyValue"
                  value={calculatordata.propertyValue}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 my-2">
            <div className="col-sm-4 d-flex align-items-center">
              <label className="mortlabel" htmlFor="propertyType">
                Property Type
              </label>
            </div>
            <div className="col-sm-8">
              <div className="input-group">
                <select
                  name="propertyType"
                  id="propertyType"
                  className="form-select"
                  onChange={handleChange}
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 my-2">
            <div className="col-sm-4 d-flex align-items-center">
              <label className="mortlabel" htmlFor="cityTax">
                City Tax
              </label>
            </div>
            <div className="col-sm-8">
              <div className="input-group">
                <span className="input-group-text bg-light" id="basic-addon1">
                  $
                </span>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="basic-addon1"
                  id="cityTax"
                  value={calculatordata.taxes.cityTax}
                  onChange={handleChange}
                  disabled="false"
                />
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 my-2">
            <div className="col-sm-4 d-flex align-items-center">
              <label className="mortlabel" htmlFor="educationTax">
                Education Tax
              </label>
            </div>
            <div className="col-sm-8">
              <div className="input-group">
                <span className="input-group-text bg-light" id="basic-addon1">
                  $
                </span>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="basic-addon1"
                  id="educationTax"
                  value={calculatordata.taxes.educationTax}
                  onChange={handleChange}
                  disabled="false"
                />
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 my-2">
            <div className="col-sm-4 d-flex align-items-center">
              <label className="mortlabel" htmlFor="cityBuildingFund">
                City Building Fund
              </label>
            </div>
            <div className="col-sm-8">
              <div className="input-group">
                <span className="input-group-text bg-light" id="basic-addon1">
                  $
                </span>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="basic-addon1"
                  id="cityBuildingFund"
                  value={calculatordata.taxes.cityBuildingFund}
                  onChange={handleChange}
                  disabled="false"
                />
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 my-2">
            <div className="col-sm-4 d-flex align-items-center">
              <label className="mortlabel" htmlFor="totalTax">
                Total Tax
              </label>
            </div>
            <div className="col-sm-8">
              <div className="input-group">
                <span className="input-group-text bg-light" id="basic-addon1">
                  $
                </span>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="basic-addon1"
                  id="totalTax"
                  value={calculatordata.taxes.totalTax}
                  onChange={handleChange}
                  disabled="false"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyTax;
