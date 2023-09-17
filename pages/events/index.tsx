import Head from "next/head";
import React, { useState } from "react";
import LottieControl from "../../components/lottie/lottie";
import construction from "../../lib/lottie/construction.json";

type Props = {};

const Events = (props: Props) => {
  const [firstClick, setFirstClick] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
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
          content="catering, food, san marcos, tx, texas, kolache, taco, burger, breakfast, lunch, dinner, restaurant"
        />
      </Head>
      {/* <div
        style={{
          display: "grid",
          gridTemplateColumns: firstClick ? "1fr 1fr 1fr" : "1fr 1fr",
          backgroundColor: "red",
          width: "100%",
          maxWidth: "500px",
          gridColumnGap: "20px",
          transition: "2s ease-in-out",
        }}
        onClick={() => setFirstClick(true)}
      >
        <div style={{}}>hello</div>
        <div style={{}}>hello</div>
        <div style={{}}>hello</div>
      </div> */}
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

const style = {
  ["button-container"]: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    backgroundColor: "red",
    width: "100%",
    maxWidth: "500px",
    gridColumnGap: "20px",
  },
  ["button"]: {},
};
