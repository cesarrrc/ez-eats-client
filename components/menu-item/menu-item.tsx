import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LocationDetails } from "../../lib/types";
import OrderOnlineButton from "../order-online-button/order-online-button";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WebIcon from "@mui/icons-material/Web";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import classes from "./menu-item.module.css";

type Props = {
  location: LocationDetails;
  noImage?: boolean;
  noBorder?: boolean;
  pickup_link: string;
  delivery_link: string;
};

const MenuItem = ({
  location,
  noImage,
  noBorder,
  pickup_link,
  delivery_link,
}: Props) => {
  const [hover, setHover] = React.useState<boolean>(false);
  const winDim = useWindowDimensions();

  useEffect(() => {
    if (!!winDim.width && winDim.width < 800) {
      setHover(true);
      noBorder = true;
    }
  }, [winDim]);

  if (!!winDim.width && winDim.width < 800) {
    noBorder = true;
  }

  const smallScreen = !!winDim.width && winDim.width < 800;

  return (
    <nav
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() =>
        setHover(() => {
          if (!!winDim.width && winDim.width < 800) return true;
          return false;
        })
      }
    >
      <ul
        className={`${classes.menu_item_container} ${
          hover && !noBorder && classes.menu_item_container_hover
        }`}
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
            <span style={{ textAlign: "center" }}>
              {hover && (
                <div style={{ position: "relative" }}>
                  <WebIcon
                    style={{
                      position: "absolute",
                      left: -30,
                      top: 12,
                      fontSize: 20,
                    }}
                  />
                </div>
              )}
              <h1>{location.name.split("-")[0]}</h1>
              <h4>{location.name.split("-")[1]}</h4>
            </span>
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
            <span style={{ textAlign: "center" }}>
              {hover && (
                <div style={{ position: "relative" }}>
                  <LocationOnIcon
                    style={{
                      left: -30,
                      position: "absolute",
                      right: -30,
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
                      left: -30,
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
                      left: -30,
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
          <OrderOnlineButton href={location.pickup_link} />
          <OrderOnlineButton
            title="order delivery"
            href={location.delivery_link}
          />
        </li>
        <li className={classes.name_container}>
          <h4>Hours:</h4>
          <ul className={classes.hours_container}>
            {location.hours.map((location) => (
              <li key={location.days}>
                <span className={classes.days}>{location.days}</span>
                <span className={classes.hours}>{location.hours}</span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

MenuItem.defaultProps = {
  noBorder: null,
};

export default MenuItem;
