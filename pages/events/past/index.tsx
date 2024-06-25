import React, { useEffect, useState } from "react";
import EventsPageLayout from "../../../components/layout/eventsPageLayout";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import client from "../../../lib/apollo";
import classes from "./past.module.css";
import { useRouter } from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AllEventsType, EventDetails } from "../../../lib/types";
import EventCard from "../../../event-card/event-card";
import EventCarouselModal from "../../../components/carousel/event-carousel-modal";

type Props = {
  data: AllEventsType;
};

const PastEvents = ({ data }: Props) => {
  const [carousel, setCarousel] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const router = useRouter();

  useEffect(() => {
    console.log(data);
    console.log(router);
  }, [data, router]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  return (
    <div className={classes.past_events_grid_container}>
      {data.allEvents.map((event: EventDetails) => (
        <EventCard event={event} setCarousel={setCarousel} />
      ))}
      {carousel.name ? (
        <EventCarouselModal setCarousel={setCarousel} carousel={carousel} />
      ) : null}
    </div>
  );
};

PastEvents.PageLayout = EventsPageLayout;

const GET_PAST_EVENTS = gql`
  # Write your query or mutation here
  query allEvents($currentTime: DateTime!) {
    allEvents(
      where: { event_date: { lte: $currentTime } }
      sort: { event_date: DESC }
    ) {
      _id
      event_date
      name
      event_descriptionRaw
      show_time
      event_address {
        street_address
        city_state_zip
      }
      website
      flyer {
        asset {
          url
        }
      }
    }
  }
`;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentTime = await new Date().toISOString();
  const results = await client.query({
    query: GET_PAST_EVENTS,
    variables: { currentTime: new Date().toISOString() },
  });
  if (!results) {
    return { notFound: true };
  }
  console.log(results);
  return {
    props: {
      data: results.data,
    },
    revalidate: 600,
  };
};

export default PastEvents;
