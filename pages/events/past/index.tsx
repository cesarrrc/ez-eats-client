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

import { AllEventsType, EventDetails } from "../../../lib/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

type Props = {
  data: AllEventsType;
};

const PastEvents = ({ data }: Props) => {
  const [carousel, setCarousel] = useState<any>({});
  const winDim = useWindowDimensions();
  const router = useRouter();

  useEffect(() => {
    console.log(data);
    console.log(router);
  }, [data, router]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          winDim.width && winDim.width <= 650
            ? "1fr"
            : winDim.width && winDim.width <= 1200
            ? "1fr 1fr"
            : "1fr 1fr 1fr",
        rowGap: 24,
        columnGap: 24,
        margin: "10px 20px",
        gridAutoRows: "minmax(300px, auto)",
        maxWidth: 1800,
      }}
    >
      {data.allEvents.map((event: EventDetails) => (
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              border: "#f1f1f1 solid 3px",
              overflow: "hidden",
              zIndex: 1000,
              borderRadius: 12,
            }}
          >
            <div
              style={{
                minWidth: 100,
                maxWidth: 250,
                width: "100%",
                alignSelf: "center",
                cursor: "zoom-in",
                overflow: "hidden",
              }}
            >
              <Carousel
                showThumbs={false}
                axis="vertical"
                onClickItem={() => {
                  setCarousel(event);
                }}
                dynamicHeight={false}
              >
                {event.flyer?.map((flyer) => (
                  <div
                    style={{
                      height: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <img style={{}} src={flyer.asset.url} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <h3
                style={{
                  margin: "10px",
                }}
              >
                <span
                  style={{
                    fontSize:
                      winDim.width && winDim.width <= 650 ? "14px" : "20px",
                    margin: 0,
                  }}
                >
                  {event.name}
                </span>
              </h3>
              <h4
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 0 12px 0",
                  fontFamily: "Fauna One, Serif",
                  fontWeight: "lighter",
                  fontSize: 14,
                  backgroundColor: "#f1f1f1",
                  color: "#1b1b1b",
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "Fauna One, Serif",
                    fontWeight: "lighter",
                  }}
                >
                  {new Date(event.event_date).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                {event.show_time && (
                  <span style={{ fontFamily: "Fauna One, Serif" }}>
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AddToCalendarButton
              name={event.name}
              startDate={event.event_date}
              options={["Apple", "Google", "Yahoo", "iCal"]}
              listStyle="overlay"
              trigger="click"
              styleLight="--btn-background: #f1f1f1; --btn-text: #1b1b1b; --font: Fauna One, Serif"

              // buttonStyle="custom"
              // customCss="../../styles/globals.css"
            ></AddToCalendarButton>
          </div>
        </div>
      ))}
      {carousel.name ? (
        <div
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "#000000c4",
            position: "fixed",
            zIndex: 300000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setCarousel({});
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              width: winDim.width && winDim.width < 400 ? "70%" : "50%",

              margin: 40,
              gap: 10,
            }}
            onClick={() => setCarousel({})}
          >
            <label htmlFor="closeCarousel">close</label>
            <button id="closeCarousel">X</button>
          </div>
          <div
            style={{
              width: winDim.width && winDim.width < 400 ? "70%" : "50%",
              maxWidth: 600,
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Carousel axis="vertical">
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
