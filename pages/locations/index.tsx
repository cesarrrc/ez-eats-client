import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLoadScript, LoadScriptProps } from "@react-google-maps/api";
import Map from "../../components/map/map";
import PageHeading from "../../components/page-heading/page-heading";

import classes from "./locations.module.css";
import { Location, LOCATION_LIST } from "../../lib/data";
import LocationItem from "../../components/location-item/location-item";
import { gql } from "@apollo/client";
import client from "../../lib/apollo";
import { AllRestaurantsType } from "../../lib/types";

const googleMapsLibraries: LoadScriptProps["libraries"] = ["places"];

const GET_RESTAURANTS = gql`
  query {
    allRestaurant {
      _id
      name
      address
      type
      slug {
        current
      }
    }
  }
`;

type Props = {
  data: AllRestaurantsType;
};

const Locations = ({ data }: Props) => {
  console.log(data);
  const [hoveringLocation, setHoveringLocation] = useState<boolean>(false);
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: googleMapsLibraries,
  });

  return (
    <div className={classes.locations_page}>
      <PageHeading title="Locations" />
      <div className={classes.map_container}>
        <section
          className={classes.locations_container}
          onMouseEnter={() => setHoveringLocation(true)}
          onMouseLeave={() => setHoveringLocation(false)}
        >
          {LOCATION_LIST.map((location) => (
            <LocationItem
              title={location.title}
              image_src={location.image_src}
              address_url={location.address_url}
              business_phone={location.business_phone}
              slug={location.slug}
              address={location.address}
              hoveredLocation={hoveredLocation}
              setHoveredLocation={setHoveredLocation}
              hoveringLocation={hoveringLocation}
            />
          ))}
        </section>
        <div className={classes.map_outer}>
          <div className={classes.map}>
            {isLoaded ? (
              <>
                {/* <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: 200,
                    backgroundColor: "red",
                    position: "absolute",
                    zIndex: 5,
                  }}
                ></div> */}
                <Map
                  hoveredLocation={hoveredLocation}
                  setHoveredLocation={setHoveredLocation}
                  hoveringLocation={hoveringLocation}
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

export async function getStaticProps() {
  try {
    const { data } = await client.query({
      query: GET_RESTAURANTS,
    });
    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
