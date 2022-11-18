import React from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import classes from "./page-heading.module.css";

type Props = {
  title: string;
  description?: string;
};

const PageHeading = ({ title, description }: Props) => {
  const winDim = useWindowDimensions();
  return (
    <section className={classes.heading_container}>
      <div>
        <h1>{title}</h1>
      </div>
      <h3
        style={{
          position: "relative",
          bottom: 20,
          fontSize: !!winDim.width && winDim.width <= 550 ? 16 : 20,
          margin: "0 30px",
          maxWidth: 800,
          textAlign: "center",
        }}
      >
        {!!winDim.width && winDim.width <= 550 ? (
          <>
            {description?.split("\n")[0]}
            <br />
            {description?.split("\n")[1]}
          </>
        ) : (
          description
        )}
      </h3>
    </section>
  );
};

export default PageHeading;

export type PageHeadingProps = {
  description: "";
};
