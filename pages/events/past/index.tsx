import React, { useEffect, useState } from "react";
import EventsPageLayout from "../../../components/layout/eventsPageLayout";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import client from "../../../lib/apollo";
import Image from "next/image";
import BlockContent from "@sanity/block-content-to-react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import classes from "./past.module.css";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { useRouter } from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AllEventsType, EventDetails } from "../../../lib/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

type Props = {
  data: AllEventsType;
};

const PastEvents = ({ data }: Props) => {
  const [carousel, setCarousel] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const winDim = useWindowDimensions();
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
    <div className={classes.past_events_grid_container} style={{}}>
      {data.allEvents.map((event: EventDetails) => (
        <div className={classes.past_events_container}>
          <div className={classes.past_events_card}>
            <Carousel
              className={classes.crsl}
              showThumbs={false}
              axis="vertical"
              onClickItem={() => {
                setCarousel(event);
              }}
              autoPlay
              infiniteLoop
              interval={6000}
            >
              {event.flyer?.map((flyer) => (
                <img src={flyer.asset.url} />
              ))}
            </Carousel>
            <div className={classes.past_event_content}>
              <h3>
                <span>{event.name}</span>
              </h3>
              <h4>
                <span>
                  {new Date(event.event_date).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                {event.show_time && (
                  <span>
                    @{" "}
                    {new Date(event.event_date).toLocaleTimeString("en-US", {
                      timeZone: "America/Chicago",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>
                )}
              </h4>
              <div className={classes.block_content}>
                <BlockContent blocks={event.event_descriptionRaw} />
              </div>
            </div>
          </div>
          <div className={classes.button_container}>
            <AddToCalendarButton
              name={event.name}
              startDate={new Date(event.event_date).toISOString().split("T")[0]}
              options={["Apple", "Google", "Yahoo", "iCal"]}
              listStyle="overlay"
              trigger="click"
              styleLight="--btn-background: #f1f1f1; --btn-text: #1b1b1b; --font: Fauna One, Serif"
            ></AddToCalendarButton>
          </div>
        </div>
      ))}
      {carousel.name ? (
        <div
          className={classes.modal}
          onClick={(e) => {
            e.stopPropagation();
            setCarousel({});
          }}
        >
          <div
            className={classes.close_modal_button}
            onClick={() => setCarousel({})}
          >
            <label htmlFor="closeCarousel">close</label>
            <button id="closeCarousel">X</button>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Carousel
              showThumbs={winDim.height && winDim.height < 600 ? false : true}
              axis="vertical"
              autoPlay
              infiniteLoop
              interval={6000}
              className={`${classes.modal_crsl} modal_crsl`}
            >
              {carousel.flyer?.map((flyer: any) => (
                <div>
                  <img src={flyer.asset.url} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
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
