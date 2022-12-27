import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LocationDetails } from "../../lib/types";
import OrderOnlineButton from "../order-online-button/order-online-button";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WebIcon from "@mui/icons-material/Web";

import classes from "./menu-item.module.css";

type Props = {
  location: LocationDetails;
  noImage?: boolean;
};

const MenuItem = ({ location, noImage }: Props) => {
  const [hover, setHover] = React.useState<boolean>(false);
  return (
    <nav
      className={classes.menu_item_container}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {!noImage && (
        <li className={classes.image_container}>
          <Link href={`/${location.slug.current}`}>
            <Image
              src={location.image.asset.url}
              alt={location.name}
              fill={true}
            />
          </Link>
        </li>
      )}
      <li>
        <Link
          href={`/${location.slug.current}`}
          className={classes.name_container}
        >
          <h1>{location.name.split("-")[0]}</h1>
          <h4>
            {hover && (
              <div style={{ position: "relative" }}>
                <WebIcon
                  style={{
                    position: "absolute",
                    left: -24,
                    fontSize: 20,
                  }}
                />
              </div>
            )}
            {location.name.split("-")[1]}
          </h4>
        </Link>
      </li>
      <li className={classes.a_tag}>
        <Link
          href={`https://www.google.com/maps/search/${location.name.replace(
            "-",
            "+"
          )}${location.address.street_address} ${
            location.address.city_state_zip
          }`}
          target="_blank"
          className={classes.name_container}
        >
          <span>
            {hover && (
              <div style={{ position: "relative" }}>
                <LocationOnIcon
                  style={{
                    position: "absolute",
                    left: -24,
                    top: 12,
                    fontSize: 20,
                  }}
                />
              </div>
            )}
            {location.address.street_address}
            <br />
            {location.address.city_state_zip}
          </span>
        </Link>
      </li>
      <li className={classes.a_tag}>
        <Link
          href={`tel:+${location.phone_number}`}
          className={classes.name_container}
        >
          <span>
            {hover && (
              <div style={{ position: "relative" }}>
                <LocalPhoneIcon
                  style={{
                    position: "absolute",
                    left: -24,
                    fontSize: 20,
                  }}
                />
              </div>
            )}
            {location.phone_number}
          </span>
        </Link>
      </li>
      <li className={classes.a_tag}>
        <Link
          href={`/${location.slug.current}/menu`}
          className={classes.name_container}
        >
          <span>
            {hover && (
              <div style={{ position: "relative" }}>
                <WebIcon
                  style={{
                    position: "absolute",
                    left: -24,
                    fontSize: 20,
                  }}
                />
              </div>
            )}
            View Menu
          </span>
        </Link>
      </li>
      <li>
        <OrderOnlineButton />
      </li>
      <li className={classes.name_container}>
        <h4>Hours:</h4>
        <ul className={classes.hours_container}>
          {location.hours.map((location) => (
            <li>
              <span className={classes.days}>{location.days}</span>
              <span className={classes.hours}>{location.hours}</span>
            </li>
          ))}
        </ul>
      </li>
    </nav>
  );
};

export default MenuItem;
