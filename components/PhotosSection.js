import React from "react";

const PhotosSection = () => {
  return (
    <div className="flex flex-row mx-auto justify-center">
      <div className="">
        <img src="/image-section/1.png" className="w-[500px] mb-5"></img>
        <img src="/image-section/2.png" className="w-[500px]"></img>
      </div>
      <div>
        <img src="/image-section/arrow.png"></img>
        <img src="/image-section/3.png" className="w-[800px]"></img>
      </div>
    </div>
  );
};

export default PhotosSection;
