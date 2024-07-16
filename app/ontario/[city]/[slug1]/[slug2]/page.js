import React from "react";
import { houseType, saleLease } from "@/constant/filters";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FiltersWithSalesList from "@/components/reso/FiltersWithSalesList";
import { plural } from "@/constant/plural";

const page = async ({ params }) => {
  let saleLeaseValue;
  let type;
  if (Object.keys(saleLease).includes(params.slug1)) {
    saleLeaseValue = params.slug1;
  } else if (Object.keys(saleLease).includes(params.slug2)) {
    saleLeaseValue = params.slug2;
  }
  if (Object.keys(houseType).includes(params.slug1)) {
    type = houseType[params.slug1].name;
  } else if (Object.keys(houseType).includes(params.slug2)) {
    type = houseType[params.slug2].name;
  }
  const isValidSlug = saleLeaseValue || type;
  const city = params.city;
  const INITIAL_LIMIT = 30;
  if (isValidSlug)
    return (
      <div className="container-fluid">
        <FiltersWithSalesList
          {...{
            city,
            INITIAL_LIMIT,
            saleLeaseVal: saleLeaseValue,
            requiredType: type,
          }}
        />
      </div>
    );
  return <></>;
};

export default page;

const metadata = {
  title: "Monkey Nest",
  description: "Real Estate",
  icons: {
    icon: "/logo.png",
    // apple: '/path/to/apple-icon.png',
  },
};

export async function generateMetadata() {
  return metadata;
}
