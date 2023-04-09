import React, { useState } from "react";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import MenuItem from "../../components/menu-item/menu-item";
import client from "../../lib/apollo";
import { AllRestaurantsType, LocationDetails } from "../../lib/types";

import classes from "./menus.module.css";
import Head from "next/head";
import { GET_ALL_RESTAURANTS } from "../../apollo/gql";

type Props = {
  data: AllRestaurantsType;
};

const Menus = ({ data }: Props) => {
  return (
    <section className={`${classes.menu_item_container} menus_section`}>
      <Head>
        <title>Restaurants</title>
        <meta
          name="description"
          content="EZ Eats is a restaurant brand located in San Marcos and Wimberly, TX 78666, in between Austin and San Antonio."
        />
        <meta
          name="keywords"
          content="food, san marcos, tx, texas, kolache, taco, burger, breakfast, lunch, dinner, restaurant"
        />
      </Head>
      {data.map((location) => (
        <MenuItem location={location} />
      ))}
    </section>
  );
};

console.log("hello");

export default Menus;

export const getStaticProps: GetStaticProps = async () => {
  const GET_RESTAURANTS = GET_ALL_RESTAURANTS;

  const results = await client.query({
    query: GET_RESTAURANTS,
  });
  if (!results) {
    return { notFound: true };
  }
  const newResults = results.data.allRestaurant.filter(
    (location: LocationDetails) => {
      return !location.hidden;
    }
  );
  return {
    props: {
      data: newResults,
    },
    revalidate: 600,
  };
};
