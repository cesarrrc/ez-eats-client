import React from "react";
import classes from "../../pages/events/past/past.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { EventDetails } from "../../lib/types";

type Props = {
  event: EventDetails;
  setCarousel: any;
};

const EventCarousel = ({ event, setCarousel }: Props) => {
  return (
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
        <img src={flyer.asset.url}  />
      ))}
    </Carousel>
  );
};

export default EventCarousel;
