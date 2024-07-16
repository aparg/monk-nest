import MortgageCalculator from "@/components/MortgageCalculator";
import PropertyTax from "@/components/PropertyTax";
import React from "react";

const page = () => {
  return (
    <div className="container-fluid mt-2">
      <MortgageCalculator price="" />
      <PropertyTax />
    </div>
  );
};

export default page;
