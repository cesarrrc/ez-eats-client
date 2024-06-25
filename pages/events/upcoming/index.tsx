import React, { useEffect, useState } from "react";
import EventsPageLayout from "../../../components/layout/eventsPageLayout";
import LottieControl from "../../../components/lottie/lottie";
import noEvent from "../../../lib/lottie/no_event_calender.json";
import Link from "next/link";
import { AllEventsType, EventDetails } from "../../../lib/types";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import client from "../../../lib/apollo";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import EventCard from "../../../event-card/event-card";
import EventCarouselModal from "../../../components/carousel/event-carousel-modal";
import classes from "../past/past.module.css";

type Props = {
  data: AllEventsType;
};

const UpcomingEvents = ({ data }: Props) => {
  useEffect(() => {
    console.log(data.allEvents);
  }, []);
  const [carousel, setCarousel] = useState<any>({});
  if (!data.allEvents.length) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "550px",
          marginTop: 0,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        <h3 style={{ textAlign: "center", fontSize: 22 }}>
          No events planned at this time.{" "}
        </h3>
        <div
          style={{
            maxWidth: 200,
            margin: "10px 20px 20px 20px",
          }}
        >
          <LottieControl lottie={noEvent} speed={0.5} />
        </div>
        <p style={{ fontSize: 16, textAlign: "justify", lineHeight: 1.5 }}>
          Please check back later or visit our{" "}
          <Link href="/events" style={{ color: "#0DC0C6" }}>
            Events Page{" "}
          </Link>
          to look at our{" "}
          <Link href="/events/past" style={{ color: "#0DC0C6" }}>
            Past Events
          </Link>{" "}
          or to{" "}
          <Link href="/events/book" style={{ color: "#0DC0C6" }}>
            Book an Event
          </Link>{" "}
          with us.
        </p>
      </div>
    );
  } else {
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
  }
};

UpcomingEvents.PageLayout = EventsPageLayout;

const GET_EVENTS = gql`
  # Write your query or mutation here
  query allEvents($currentTime: DateTime!) {
    allEvents(
      where: { event_date: { gte: $currentTime } }
      sort: { event_date: ASC }
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
    query: GET_EVENTS,
    variables: { currentTime },
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

export default UpcomingEvents;
