import React from "react";
import Img from "react-image";
import { imgImport } from "jxUtils/common";

function JxImg({ src, className = "", theme }) {
  let imgSrc;
  switch (theme) {
    case "homeBanner":
      imgSrc = imgImport(`common/default/home_banner.png`);
      break;
    case "homeBottom":
      imgSrc = imgImport(`common/default/home_bottom.png`);
      break;
    case "promotions":
      imgSrc = imgImport(`common/default/promotions_banner.png`);
      break;
    case "brand":
      imgSrc = imgImport(`common/default/img-brand.png`);
      break;
    default:
      imgSrc = imgImport(`common/default/brandlogo.png`);
  }
  return (
    <Img
      src={[src, imgSrc]}
      className={className}
      loader={
        <div
          className={className}
          style={{ backgroundImage: `url(${imgSrc})` }}
        />
      }
    />
  );
}

export default JxImg;
