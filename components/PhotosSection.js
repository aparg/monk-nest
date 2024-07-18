import React from "react";

const PhotosSection = () => {
  return (
    <div className="flex flex-row mx-auto justify-center container-fluid">
      <div className="">
        <img src="/image-section/1.png" className="w-[300px] mb-5"></img>
        <img
          src="/image-section/2.png"
          className="w-[300px] sm:w-[500px]"
        ></img>
      </div>
      <div className="relative">
        <img
          src="/image-section/arrow.png"
          className="absolute top-[0%] left-0 sm:w-[200px] w-[80px]"
        ></img>
        <img src="/image-section/3.png" className="w-[800px]"></img>
      </div>
    </div>
  );
};

export default PhotosSection;
