import React from "react";
import { useRouter } from "next/router";
import MenuItem from "../../components/menu-item/menu-item";
import PageHeading from "../../components/page-heading/page-heading";
import { AllRestaurantsType, LocationDetails } from "../../lib/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { gql } from "@apollo/client";
import client from "../../lib/apollo";
import Image from "next/image";

import classes from "./location.module.css";
import Map from "../../components/map/map";
import useWindowDimensions from "../../hooks/useWindowDimensions";

type Props = {
  data: LocationDetails;
};
const Location = ({ data }: Props) => {
  const winDim = useWindowDimensions();

  if (!!winDim.width && winDim?.width <= 800) {
    return (
      <div>
        <div className={classes.resp_location_container}>
          <div>
            <PageHeading
              title={data.name.split("-")[0]}
              description={
                data.address.street_address + "\n" + data.address.city_state_zip
              }
            />
          </div>
          <div className={classes.resp_tagline_grid_container}>
            <h4>{data.description}</h4>
          </div>
          <div className={classes.resp_grid_container}>
            <div className={classes.resp_image_grid_container}>
              <Image src={data.image.asset.url} alt={data.name} fill />
            </div>
            <div className={classes.resp_description_grid_container}>
              <p>{data.description}</p>
            </div>

            <div className={classes.resp_map_grid_container}>
              <Map
                marker_locations={[data].map(
                  (location) =>
                    location.address.street_address +
                    " " +
                    location.address.city_state_zip
                )}
              />
            </div>
            <div className={classes.resp_details}>
              <MenuItem location={data} noImage />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.location_container}>
      <div>
        <PageHeading
          title={data.name.split("-")[0]}
          description={
            data.address.street_address + " " + data.address.city_state_zip
          }
        />
      </div>
      <div className={classes.grid_container}>
        <div className={classes.description_grid_container}>
          <p>{data.description}</p>
        </div>

        <div className={classes.image_grid_container}>
          <Image src={data.image.asset.url} alt={data.name} fill />
        </div>
      </div>
      <div className={classes.tagline_grid_container}>
        <h4>{data.description}</h4>
      </div>
      <div className={classes.grid_container_two}>
        <div className={classes.map_grid_container}>
          <Map
            marker_locations={[data].map(
              (location) =>
                location.address.street_address +
                " " +
                location.address.city_state_zip
            )}
          />
        </div>
        <div className={classes.details}>
          <MenuItem location={data} noImage />
        </div>
      </div>
    </div>
  );
};

export default Location;

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

export const getStaticPaths = async () => {
  const results = await client.query({
    query: GET_RESTAURANTS,
  });
  console.log(results, "RSULTSSSSSSSS");
  if (!results) {
    return { notFound: true };
  }
  const paths: { params: { slug: string } }[] = [];
  results.data.allRestaurant.forEach((location: LocationDetails) => {
    if (location.hidden) {
      console.log("hiddden");
      return;
    }
    return paths.push({ params: { slug: location.slug.current } });
  });
  console.log(paths);
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const results = await client.query({
    query: GET_RESTAURANTS,
  });
  console.log(results)
  if (!results) {
    return { notFound: true };
  }
  const foundLocation = results.data.allRestaurant.find(
    (location: LocationDetails) => {
      return location.slug.current === params?.slug;
    }
  );
  console.log(foundLocation)
  return {
    props: {
      data: foundLocation,
    },
  };
};
