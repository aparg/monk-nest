"use client";
import React, { useState } from "react";

const Dropdown = ({ name, options, text = "white" }) => {
  const [shown, setShown] = useState(false);
  return (
    <div className="relative ">
      <button
        className={` font-normal ${
          // shown ? `text-black` : `text-${text}`
          `text-black`
        } rounded-md focus:outline focus:text-primary-green bg-transparent hover:text-primary-green ${
          shown && "bg-white"
        } `}
        onClick={() => setShown(!shown)}
      >
        {name}
      </button>

      <div
        className={`absolute top-full mt-2 w-40 bg-white rounded-md shadow-lg z-10 text-sm h-40 overflow-y-scroll ${
          !shown && "hidden"
        }`}
      >
        {options.map((option) => (
          <a
            href={option.link}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:rounded-md"
            key={option.name}
          >
            {option.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
