import Head from "next/head";
import React, { useEffect, useState } from "react";
import EventsPageLayout from "../../components/layout/eventsPageLayout";
import { GET_EVENTS_PAGE, GET_HOME } from "../../apollo/gql";
import client from "../../lib/apollo";
import { GetStaticProps } from "next";
// import useWindowDimensions from "../../hooks/useWindowDimensions";

type Props = {
  data: any;
};

const Events = ({ data }: Props) => {
  return (
    <div>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const results = await client.query({
    query: GET_EVENTS_PAGE,
  });
  if (!results) {
    return { notFound: true };
  }

  return {
    props: {
      eventsPageTiles: results.data.allEventsPage,
    },
    revalidate: 600,
  };
};
