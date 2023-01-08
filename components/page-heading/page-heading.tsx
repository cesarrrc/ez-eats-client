import Link from "next/link";
import React from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import classes from "./page-heading.module.css";

type Props = {
  title: string;
  description?: string;
  address?: Record<string, string>;
};

const PageHeading = ({ title, description, address }: Props) => {
  const winDim = useWindowDimensions();
  return (
    <section className={`${classes.heading_container} ${'heading_container'}`}>
      <h1>{title}</h1>
      <div className={classes.bar} />
      {address ? (
        <Link
          href={`https://www.google.com/maps/search/${title.replace("-", "+")}${
            address.street_address
          } ${address.city_state_zip}`}
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <LocationOnIcon
            style={{
              fontSize: 20,
            }}
          />
          <div>
            <h3 style={{ margin: "0 20px" }} className={classes.sub}>
              {!!winDim.width && winDim.width <= 800 ? (
                <>
                  {description?.split("\n")[0]}
                  <br />
                  {description?.split("\n")[1]}
                </>
              ) : (
                description
              )}
            </h3>
          </div>
        </Link>
      ) : (
        <h3
          style={{
            margin: "0 20px",
          }}
          className={classes.sub}
        >
          {!!winDim.width && winDim.width <= 800 ? (
            <>
              {description?.split("\n")[0]}
              <br />
              {description?.split("\n")[1]}
            </>
          ) : (
            description
          )}
        </h3>
      )}
    </section>
  );
};

export default PageHeading;

export type PageHeadingProps = {
  description: "";
};
