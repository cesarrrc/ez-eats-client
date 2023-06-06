import React, { useState } from "react";
import { useLoadScript, LoadScriptProps } from "@react-google-maps/api";
import Map from "../../components/map/map";
import PageHeading from "../../components/page-heading/page-heading";

import classes from "./locations.module.css";
import { Location, LocationDetails } from "../../lib/types";
import LocationItem from "../../components/location-item/location-item";
import { gql } from "@apollo/client";
import client from "../../lib/apollo";
import { AllRestaurantsType } from "../../lib/types";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

type Props = {
  data: AllRestaurantsType;
};

const Locations = ({ data }: Props) => {
  const [hoveringLocation, setHoveringLocation] = useState<boolean>(false);
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);

  return (
    <div className={classes.locations_page}>
      <Head>
        <title>Locations</title>
        <meta
          name="description"
          content="EZ Eats is a restaurant brand located in San Marcos and Wimberly, TX 78666, in between Austin and San Antonio."
        />
        <meta
          name="keywords"
          content="food, san marcos, tx, texas, kolache, taco, burger, breakfast, lunch, dinner, restaurant"
        />
      </Head>
      <PageHeading title="Locations" />
      <div
        className={classes.map_container}
        onMouseLeave={() => {
          setHoveredLocation(null);
          setHoveringLocation(false);
        }}
      >
        <section
          className={classes.locations_container}
          onMouseEnter={() => setHoveringLocation(true)}
        >
          {data.map((location, i, arr) => {
            return (
              <LocationItem
                title={location.name}
                image_src={location.image.asset.url}
                business_phone={location.phone_number}
                slug={location.slug.current}
                address={location.address}
                hoveredLocation={hoveredLocation}
                setHoveredLocation={setHoveredLocation}
                hoveringLocation={hoveringLocation}
                isLast={i === arr.length - 1}
              />
            );
          })}
        </section>
        <div className={classes.map_outer}>
          <div className={classes.map}>
            <Map
              hoveredLocation={hoveredLocation}
              setHoveredLocation={setHoveredLocation}
              hoveringLocation={hoveringLocation}
              marker_locations={data.map((location) => {
                return {
                  address: location.address.street_address.includes("Suite")
                    ? location.address.street_address.split("Suite")[0] +
                      " " +
                      location.address.city_state_zip
                    : location.address.street_address +
                      " " +
                      location.address.city_state_zip,
                  name: location.name,
                };
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;

export const getStaticProps: GetStaticProps = async () => {
  const GET_RESTAURANTS = gql`
    # Write your query or mutation here
    {
      allRestaurant {
        _id
        name
        type
        phone_number
        description
        hidden
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
