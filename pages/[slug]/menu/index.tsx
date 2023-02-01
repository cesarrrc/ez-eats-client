import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { GET_ALL_RESTAURANTS } from "../../../apollo/gql";
import MenuItem from "../../../components/menu-item/menu-item";
import PageHeading from "../../../components/page-heading/page-heading";
import client from "../../../lib/apollo";
import { LocationDetails } from "../../../lib/types";

import classes from "./menu.module.css";

type Props = {
  data: LocationDetails;
};

const Menu = ({ data }: Props) => {
  const params = useRouter();
  console.log(data, "data");
  return (
    <div className={classes.body_container}>
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
      {/* <PageHeading title={data.name.split("-")[0]} description={data.tagline} /> */}
      {!!data.menu_categories &&
        data.menu_categories.map((category) => (
          <section className={classes.menu_category} key={category.name}>
            <h2 className={classes.menu_category_title}>{category.name}</h2>
            <div className={classes.bottom_border_bar}></div>
            <ul className={classes.menu_category_list}>
              {!!category.dishes &&
                category.dishes.map((item) => (
                  <li
                    className={classes.menu_category_list_item}
                    key={item.name}
                  >
                    <div
                      className={
                        classes.menu_category_list_item_title_container
                      }
                    >
                      <h4>{item.name}</h4>
                      <h4>{Number(item.price).toFixed(2)}</h4>
                    </div>
                    <div
                      className={
                        classes.menu_category_list_item_description_container
                      }
                    >
                      <p>{item.short_description}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      <MenuItem location={data} noBorder />
    </div>
  );
};

export default Menu;

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

  foundLocation.menu_categories.forEach((element: { dishes: {}[] }) => {
    element.dishes.forEach((el: object) => {});
  });

  return {
    props: {
      data: foundLocation,
    },
    revalidate: 600,
  };
};
