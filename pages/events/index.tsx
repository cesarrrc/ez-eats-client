import Head from "next/head";
import React from "react";
import LottieControl from "../../components/lottie/lottie";
import construction from "../../lib/lottie/construction.json";

type Props = {};

const Events = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Head>
        <title>Events</title>
        <meta
          name="description"
          content="EZ Eats is a restaurant brand located in San Marcos and Wimberly, TX 78666, in between Austin and San Antonio."
        />
        <meta
          name="keywords"
          content="food, san marcos, tx, texas, kolache, taco, burger, breakfast, lunch, dinner, restaurant"
        />
      </Head>
      <h1 style={{ textAlign: "center" }}>Currently Under Construction</h1>
      <div
        style={{
          width: 350,
          height: 350,
        }}
      >
        <LottieControl lottie={construction} />
      </div>
      <p style={{ textAlign: "center" }}>Please check back later.</p>
    </div>
  );
};

export default Events;
