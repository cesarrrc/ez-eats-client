import React, { useEffect, useState } from "react";
import EventsPageLayout from "../../../components/layout/eventsPageLayout";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import client from "../../../lib/apollo";
import Image from "next/image";
import BlockContent from "@sanity/block-content-to-react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { AllEventsType, EventDetails } from "../../../lib/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

type Props = {
  data: AllEventsType;
};

const PastEvents = ({ data }: Props) => {
  const [carousel, setCarousel] = useState<any>({});
  const winDim = useWindowDimensions();

  useEffect(() => {
    console.log(data);
  }, [data]);

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
        rowGap: 20,
        columnGap: 20,
        margin: 10,
        gridAutoRows: "auto",
      }}
    >
      {data.allEvents.map((event: EventDetails) => (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            outline: "#f1f1f1 solid 2px",
          }}
        >
          <div
            style={{
              flex: 1.5,
              alignSelf: "center",
            }}
          >
            <Carousel
              showThumbs={false}
              axis="vertical"
              onClickItem={() => {
                setCarousel(event);
              }}
            >
              {event.flyer?.map((flyer) => (
                <div>
                  <img src={flyer.asset.url} />
                </div>
              ))}
            </Carousel>
          </div>
          <div style={{ flex: 2 }}>
            <h3>{event.name}</h3>
            <h4>{event.event_date}</h4>
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
            zIndex: 1000,
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
  query ($currentTime: DateTime!) {
    allEvents(
      where: { event_date: { lte: $currentTime } }
      sort: { event_date: DESC }
    ) {
      _id
      event_date
      name
      event_descriptionRaw
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
    variables: { currentTime: currentTime },
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
