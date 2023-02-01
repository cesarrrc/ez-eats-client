import React, { useRef } from "react";
import Head from "next/head";
import ButtonNavigation from "../components/button-navigation/button-navigation";

import { GET_HOME } from "../apollo/gql";

import styles from "../styles/Home.module.css";
import classes from "./home.module.css";
import OrderOnlineButton from "../components/order-online-button/order-online-button";
import { GetStaticProps } from "next";
import client from "../lib/apollo";

type Props = {
  data: any;
};

const HomePage = ({ data }: Props) => {
  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>EZ Eats</title>
        <meta
          name="description"
          content="EZ Eats is a restaurant brand located in San Marcos and Wimberly, TX 78666, in between Austin and San Antonio."
        />
        <meta
          name="keywords"
          content="food, san marcos, tx, texas, kolache, taco, burger, breakfast, lunch, dinner, restaurant"
        />
      </Head>
      <OrderOnlineButton />
      <div className={classes.grid_container}>
        {data &&
          data.allHomePage.map((content: any) => {
            return (
              <ButtonNavigation
                content={content.tile_name.replace("-", "\n")}
                img={content.tile_icon.asset.url}
                img2={content.tile_image.asset.url}
                path={content.slug.current}
              />
            );
          })}
      </div>
      <OrderOnlineButton />
    </div>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const results = await client.query({
    query: GET_HOME,
  });
  if (!results) {
    return { notFound: true };
  }

  return {
    props: {
      data: results.data,
    },
    revalidate: 600,
  };
};
