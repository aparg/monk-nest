import { resenditial } from "@/api/routes";

export const generateImageURLs = (id, photoCount) => {
  const images = [];
  if (!photoCount) photoCount = 10;
  for (let i = 1; i <= photoCount; i++) {
    const mapObj = {
      MLS: id,
      index: i,
    };
    const imgSrc = resenditial.photos.replace(
      /MLS|index/gi,
      function (matched) {
        return mapObj[matched];
      }
    );

    images.push(imgSrc);
  }

  return images;
};
