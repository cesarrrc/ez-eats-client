import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import classes from "./event-card.module.css";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { AllEventsType, EventDetails } from "../lib/types";
import BlockContent from "@sanity/block-content-to-react";

type Props = {
  event: EventDetails;
  setCarousel: any;
};

const EventCard = ({ event, setCarousel }: Props) => {
  return (
    <div className={classes.past_events_container}>
      <div className={classes.past_events_card}>
        <Carousel
          className={classes.crsl}
          showThumbs={false}
          dynamicHeight
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
  );
};

export default EventCard;
