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
import OrderOnlineButton from "../../components/order-online-button/order-online-button";
import Head from "next/head";
import { GET_ALL_RESTAURANTS } from "../../apollo/gql";

type Props = {
  data: LocationDetails;
};
const Location = ({ data }: Props) => {
  const winDim = useWindowDimensions();

  if (!!winDim.width && winDim?.width <= 800) {
    return (
      <div className={classes.resp_location_container}>
        <Head>
          <title>{data.name}</title>
          <meta name="description" content={data.meta_data.meta_description} />
          <meta name="keywords" content={data.meta_data.keywords} />
        </Head>
        <PageHeading
          title={data.name.split("-")[0]}
          description={
            data.address.street_address + "\n" + data.address.city_state_zip
          }
          address={{
            streetAddress: data.address.street_address,
            city_state_zip: data.address.city_state_zip,
          }}
        />
        <OrderOnlineButton href={data.pickup_link} />
        <OrderOnlineButton href={data.delivery_link} title="Order Delivery" />
        <div className={classes.resp_tagline_grid_container}>
          <h4>{data.tagline}</h4>
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
              marker_locations={[data].map((location) => {
                console.log(location.address.street_address.split("Suite")[0]);
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
          <div className={classes.resp_details}>
            <MenuItem noBorder={true} location={data} noImage />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.location_container}>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content={data.meta_data.meta_description} />
        <meta name="keywords" content={data.meta_data.keywords} />
      </Head>
      <PageHeading
        title={data.name.split("-")[0]}
        description={
          data.address.street_address + " " + data.address.city_state_zip
        }
        address={{
          streetAddress: data.address.street_address,
          city_state_zip: data.address.city_state_zip,
        }}
      />
      <div className={classes.grid_container}>
        <div className={classes.description_grid_container}>
          <p>{data.description}</p>
        </div>

        <div className={classes.image_grid_container}>
          <Image
            src={data.image.asset.url}
            alt={data.name}
            fill
            quality={100}
          />
        </div>
      </div>
      <div className={classes.tagline_grid_container}>
        <h4>{data.tagline}</h4>
      </div>
      <div className={classes.grid_container_two}>
        <div className={classes.map_grid_container}>
          <Map
            marker_locations={[data].map((location) => {
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
        <div className={classes.details}>
          <MenuItem location={data} noImage noBorder />
        </div>
      </div>
    </div>
  );
};

export default Location;

const GET_RESTAURANTS = GET_ALL_RESTAURANTS;

export const getStaticPaths = async () => {
  const results = await client.query({
    query: GET_RESTAURANTS,
  });
  if (!results) {
    return { notFound: true };
  }
  const paths: { params: { slug: string } }[] = [];
  results.data.allRestaurant.forEach((location: LocationDetails) => {
    if (location.hidden) {
      return;
    }
    return paths.push({ params: { slug: location.slug.current } });
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const results = await client.query({
    query: GET_RESTAURANTS,
  });
  if (!results) {
    return { notFound: true };
  }
  const foundLocation = results.data.allRestaurant.find(
    (location: LocationDetails) => {
      return location.slug.current === params?.slug;
    }
  );
  return {
    props: {
      data: foundLocation,
    },
    revalidate: 600,
  };
};
