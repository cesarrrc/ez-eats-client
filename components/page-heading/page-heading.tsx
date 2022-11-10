import React from "react";

import classes from "./page-heading.module.css";

type Props = {
  title: string;
  description?: string;
};

const PageHeading = ({ title, description }: Props) => {
  return (
    <section className={classes.heading_container}>
      <div>
        <h1>{title}</h1>
      </div>
      <p>{description}</p>
    </section>
  );
};

export default PageHeading;

export type PageHeadingProps = {
  description: "";
};
