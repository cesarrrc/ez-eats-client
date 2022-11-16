import React, { useState } from "react";
import { useLoadScript, LoadScriptProps } from "@react-google-maps/api";
import Map from "../../components/map/map";
import PageHeading from "../../components/page-heading/page-heading";

import classes from "./locations.module.css";
import { Location } from "../../lib/types";
import LocationItem from "../../components/location-item/location-item";
import { gql } from "@apollo/client";
import client from "../../lib/apollo";
import { AllRestaurantsType } from "../../lib/types";
import { GetStaticProps, NextPage } from "next";

const googleMapsLibraries: LoadScriptProps["libraries"] = ["places"];

type Props = {
  data: {
    allRestaurant: AllRestaurantsType;
  };
};

const Locations = ({ data: { allRestaurant } }: Props) => {
  const [hoveringLocation, setHoveringLocation] = useState<boolean>(false);
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: googleMapsLibraries,
  });

  return (
    <div className={classes.locations_page}>
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
          {allRestaurant.map((location, i, arr) => {
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
            {isLoaded ? (
              <>
                <Map
                  hoveredLocation={hoveredLocation}
                  setHoveredLocation={setHoveredLocation}
                  hoveringLocation={hoveringLocation}
                  marker_locations={allRestaurant.map(
                    (location) =>
                      location.address.street_address +
                      " " +
                      location.address.city_state_zip
                  )}
                />
              </>
            ) : (
              "Loading..."
            )}
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
    query {
      allRestaurant {
        _id
        name
        address {
          street_address
          city_state_zip
        }
        type
        description
        image {
          asset {
            title
            path
            url
            description
          }
        }
        phone_number
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
  console.log(results);
  if (!results) {
    return { notFound: true };
  }
  console.log(results, "data2");
  return {
    props: {
      data: results.data,
    },
  };
};
