import React from "react";
import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  image: StaticImageData;
}

export default ({ title, description, image }: FeatureCardProps) => {
  return (
    <div className="container-fluid d-flex justify-content-evenly align-items-center mt-5 flex-wrap">
      <div className="col-12 col-lg-4 pb-4 pb-lg-0">
        <h2 className="mt-2  fw-bold cl-darktext ">{title}</h2>
        <h3 className="fw-light cl-mid-gray fs-5 ">{description}</h3>
      </div>
      <div
        className="pb-0 ps-0 pe-0 feature-card-img"
        style={{ width: "fit-content", height: "fit-content" }}
      >
        <Image src={image} />
      </div>
    </div>
  );
};
