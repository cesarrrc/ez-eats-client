import React, { useState } from "react";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import MenuItem from "../../components/menu-item/menu-item";
import client from "../../lib/apollo";
import { AllRestaurantsType, LocationDetails } from "../../lib/types";

import classes from "./menus.module.css";

type Props = {
  data: AllRestaurantsType;
};

const Menus = ({ data }: Props) => {
  return (
    <section className={`${classes.menu_item_container} menus_section`}>
      {data.map((location) => (
        <MenuItem location={location} />
      ))}
    </section>
  );
};

console.log("hello");

export default Menus;

export const getStaticProps: GetStaticProps = async () => {
  const GET_RESTAURANTS = gql`
    # Write your query or mutation here
    {
      allRestaurant {
        _id
        name
        tagline
        type
        phone_number
        description
        hidden
        pickup_link
        delivery_link
        hours {
          days
          hours
        }
        address {
          street_address
          city_state_zip
        }
        image {
          asset {
            title
            path
            url
            description
          }
        }
        menu_categories {
          name
          location
          dishes {
            name
            short_description
            price
            image {
              asset {
                url
              }
            }
            slug {
              current
            }
          }
        }
        slug {
          current
        }
        meta_data {
          meta_title
          meta_description
          meta_description
        }
      }
    }
  `;

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
