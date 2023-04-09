import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WebIcon from "@mui/icons-material/Web";
import { Location } from "../../lib/types";
import classes from "./location-item.module.css";
import useWindowDimensions from "../../hooks/useWindowDimensions";

type Props = {
  title: string;
  image_src: string;
  business_phone: string;
  slug: string;
  address: Record<string, string>;
  hoveredLocation: Location | null;
  setHoveredLocation: Dispatch<SetStateAction<Location | null>>;
  hoveringLocation: boolean;
  isLast: boolean;
};

const LocationItem = ({
  image_src,
  title,
  business_phone,
  slug,
  address,
  setHoveredLocation,
  hoveredLocation,
  hoveringLocation,
  isLast,
}: Props) => {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
    setHoveredLocation({
      image_src,
      title,
      business_phone,
      slug,
      address,
    });
  };

  const winDim = useWindowDimensions();

  const hovering = hoveredLocation?.title === title;

  if (typeof winDim.width === "number" && winDim.width <= 800) {
    return (
      <div
        className={`${classes.responsive_container} ${
          hoveringLocation && !hovering && classes.hovering_location
        }`}
        onMouseEnter={handleMouseEnter}
      >
        <Link
          href={`/${slug}`}
          className={`${classes.responsive_container_header}`}
        >
          <h1>{title.split("-")[0]} </h1>
          <div>
            {hovering && (
              <WebIcon
                style={{
                  marginRight: "10px",
                  width: 16,
                  height: 16,
                }}
              />
            )}
            <h2>{title.split("-")[1]}</h2>
          </div>
        </Link>
        {!isLast && <div className={classes.bar}></div>}
        <div
          className={`${classes.responsive_container_details}   ${
            hovering && classes.hovering_location_force
          }`}
        >
          <Link href={`/${slug}`} className={classes.img_container}>
            <Image
              className={classes.img}
              src={image_src}
              alt={title}
              width={400}
              height={400}
              layout="responsive"
            />
          </Link>
          <div className={classes.responsive_details}>
            <Link
              className={!hovering ? classes.disabled : ""}
              href={`https://www.google.com/maps/search/${title.replace(
                "-",
                "+"
              )}${address.street_address} ${address.city_state_zip}`}
              target="_blank"
            >
              <LocationOnIcon
                style={{
                  marginRight: 8,
                  width: 16,
                  height: 16,
                }}
              />
              {address.street_address}
              <br />
              {address.city_state_zip}
            </Link>
            <Link
              href={`tel:+1${business_phone}`}
              className={!hovering ? classes.disabled : ""}
            >
              <LocalPhoneIcon
                style={{
                  marginRight: 8,
                  width: 16,
                  height: 16,
                }}
              />
              {business_phone}
            </Link>
            <div className={classes.menu_container}>
              <Link
                href={`/${slug}/menu`}
                className={!hovering ? classes.disabled : ""}
                target="_blank"
              >
                <MenuBookIcon
                  style={{
                    marginRight: 8,
                    width: 16,
                    // position: "absolute",
                    height: 16,
                  }}
                />
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${classes.location_container} ${
        hoveringLocation && classes.hovering_location
      }`}
      onMouseEnter={handleMouseEnter}
      style={{ opacity: hovering ? 1 : undefined }}
      // onMouseLeave={handleMouseExit}
    >
      <Link href={`/${slug}`} className={classes.img_container}>
        <Image
          className={classes.img}
          src={image_src}
          alt={title}
          width={400}
          height={400}
          layout="responsive"
        />
      </Link>
      <div className={classes.content}>
        <Link
          href={`/${slug}`}
          className={`${!hovering ? classes.disabled : ""} ${classes.title}`}
        >
          <h1>
            {title.split("-")[0]}
            {hovering && (
              <WebIcon
                style={{
                  marginLeft: "10px",
                  width: 30,
                  height: 30,
                  position: "absolute",
                }}
              />
            )}
          </h1>
          <h2>{title.split("-")[1]}</h2>
        </Link>
        <Link
          className={!hovering ? classes.disabled : ""}
          href={`https://www.google.com/maps/search/${title.replace("-", "+")}${
            address.street_address
          } ${address.city_state_zip}`}
          target="_blank"
        >
          {address.street_address}
          <br />
          {address.city_state_zip}
          {hovering && (
            <div>
              <LocationOnIcon
                style={{
                  marginLeft: "10px",
                  width: 30,
                  height: 30,
                  position: "absolute",
                }}
              />
            </div>
          )}
        </Link>
        <Link
          href={`tel:+1${business_phone}`}
          className={!hovering ? classes.disabled : ""}
        >
          {business_phone}
          {hovering && (
            <div>
              <LocalPhoneIcon
                style={{
                  marginLeft: "10px",
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
              />
            </div>
          )}
        </Link>
        <div className={classes.menu_container}>
          <Link
            href={`/${slug}/menu`}
            className={!hovering ? classes.disabled : ""}
            target="_blank"
          >
            View Menu
            {hovering && (
              <div>
                <MenuBookIcon
                  style={{
                    marginLeft: "10px",
                    width: 20,
                    position: "absolute",
                    height: 20,
                  }}
                />
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationItem;
