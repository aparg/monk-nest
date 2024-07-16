"use client";
import React, { useEffect, useState } from "react";
import AdditionalListing from "./reso/AdditionalListing";
import { getFilteredRetsData } from "@/actions/getSalesData";
import { houseType, saleLease } from "@/constant";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 20;
const SuggestedCity = ({ defaultCitiesData }) => {
  const [citiesData, setCitiesData] = useState([]);
  const [defaultData, setDefaultData] = useState(defaultCitiesData);

  useEffect(() => {
    // Retrieve values from local storage on component mount
    let storedSelectedCity = localStorage.getItem("selectedCity");
    let storedCityValues = [
      {
        city: storedSelectedCity,
        ...JSON.parse(localStorage.getItem("filterState")),
      },
    ];

    if (!storedCityValues) {
      setCitiesData(defaultCitiesData);
      return;
    }
    // Check if the size is smaller than 3
    if (storedCityValues.length < 3) {
      // Add other elements to the array
      storedCityValues = [
        ...storedCityValues,
        ...defaultData.slice(0, 3 - storedCityValues.length),
      ];
    }
    //Make sure only three values remain in array
    storedCityValues.length > 3 && storedCityValues.slice(0, 3);
    // Retrieve object with city and data
    const fetchCitiesData = async () => {
      // fetchDataForCity is a function that fetches data for a given city
      const dataPromises = storedCityValues.map((cityData, idx) => {
        if (!cityData?.data) {
          const data = fetchDataForCity(
            cityData.city,
            cityData.searchType,
            cityData.saleLeaseSearch
          );
          if (data) return data;
          else return defaultData[3 - storedCityValues.length];
        }
        return cityData;
      });

      const citiesData = await Promise.all(dataPromises);

      //check if there is no property listings for given city and populate with other city data
      const populatedData = await citiesData.map((cityData, idx) => {
        if (cityData.data.length < 1) {
          // return defaultData[4 - storedCityValues.length];
          //return an element from defaultData whose city property doesnt match any of the element's city property in citiesData array
          const alreadyStored = [];
          const found = defaultData.find((element) => {
            for (cityData of citiesData) {
              if (element.city == cityData.city) return false;
            }
            if (!alreadyStored.includes(element)) {
              alreadyStored.push(element);
              return true;
            }
            return false;
          });
          return found;
        }

        return cityData;
      });
      setCitiesData(populatedData);
    };

    fetchCitiesData();
  }, []);

  const fetchDataForCity = async (city, searchType, saleLeaseSearch) => {
    // Perform API request for city data
    const queryParams = {
      city: city ? capitalizeFirstLetter(city) : "Toronto",
      limit: INITIAL_LIMIT,
      houseType:
        Object.values(houseType).find((type) => type.name === searchType)
          ?.value || undefined,
      offset: 0,
      bed: 0,
      hasBasement: undefined,
      maxListPrice: 0,
      minListPrice: 0,
      sepEntrance: undefined,
      washroom: 0,
      saleLease: saleLeaseSearch,
      minTimestampSql: undefined,
    };
    // const data = await getCommercialData(INITIAL_OFFSET, INITIAL_LIMIT, city);
    const data = await getFilteredRetsData(queryParams);
    return { city, data, type: searchType, saleLease: saleLeaseSearch };
  };

  return (
    <>
      {citiesData.map((cityData, index) => {
        return (
          <div
            className="container-fluid mt-4 sm:mt-24"
            key={cityData.city + index}
          >
            <section className="additonal__listing">
              {cityData.data && (
                <AdditionalListing
                  city={cityData.city && capitalizeFirstLetter(cityData.city)}
                  newSalesData={cityData.data}
                  houseType={cityData.type}
                  saleLeaseValue={cityData.saleLease}
                />
              )}
            </section>
          </div>
        );
      })}
    </>
  );
};

export default SuggestedCity;
