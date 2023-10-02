import Head from "next/head";
import React, { useEffect, useState } from "react";
import LottieControl from "../../components/lottie/lottie";
import construction from "../../lib/lottie/construction.json";
import type { AppProps } from "next/app";
import EventsPageLayout from "../../components/layout/eventsPageLayout";
import useWindowDimensions from "../../hooks/useWindowDimensions";
useWindowDimensions;

type Props = {};

const Events = (props: Props) => {
  const [firstClick, setFirstClick] = useState(false);

  const ws = useWindowDimensions();

  useEffect(() => {
    console.log(ws.width, 'yooo');
  }, []);

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
    </div>
  );
};

Events.PageLayout = EventsPageLayout;

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
