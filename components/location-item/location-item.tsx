import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";

import { Location } from "../../lib/data";
import classes from "./location-item.module.css";

type Props = {
  title: string;
  image_src: string;
  address_url: string;
  business_phone: string;
  slug: string;
  address: string;
  hoveredLocation: Location | null;
  setHoveredLocation: Dispatch<SetStateAction<Location | null>>;
  hoveringLocation: boolean;
};

const LocationItem = ({
  image_src,
  title,
  address_url,
  business_phone,
  slug,
  address,
  hoveredLocation,
  setHoveredLocation,
  hoveringLocation,
}: Props) => {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
    setHoveredLocation({
      image_src,
      title,
      address_url,
      business_phone,
      slug,
      address,
    });
    console.log("hover over");
  };
  const handleMouseExit = () => {
    setHover(false);
    setHoveredLocation(null);
    console.log("hover off");
  };

  useEffect(() => {
    console.log(hover);

    return () => {
      // setHover(false);
    };
  }, [hover]);

  return (
    <div
      className={`${classes.location_container} ${
        hoveringLocation && classes.hovering_location
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseExit}
    >
      <div className={classes.img_container}>
        <Image
          className={classes.img}
          src={image_src}
          alt={title}
          width={400}
          height={400}
          layout="responsive"
        />
      </div>
      <div className={classes.content}>
        <h1>{title}</h1>
        <a href={address_url} target="_blank">
          {address}
        </a>
        <Link href={`tel:+${business_phone}`}>{business_phone}</Link>
        <Link href={`/menu/${slug}`} target="_blank">
          View Menu
        </Link>
      </div>
    </div>
  );
};

export default LocationItem;
