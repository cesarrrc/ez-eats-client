import React from "react";
import classes from "../../pages/events/past/past.module.css";
import { Carousel } from "react-responsive-carousel";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

type Props = {
  setCarousel: React.Dispatch<any>;
  carousel: any;
};

const EventCarouselModal = ({ setCarousel, carousel }: Props) => {
  const winDim = useWindowDimensions();

  return (
    <div
      className={classes.modal}
      onClick={(e) => {
        e.stopPropagation();
        setCarousel({});
      }}
    >
      {/* Modify and Add later. Needs to look better */}
      {/* <div
            className={classes.close_modal_button}
            onClick={() => setCarousel({})}
          >
            <label htmlFor="closeCarousel">close</label>
            <button id="closeCarousel">X</button>
          </div> */}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={classes.crsl_container}
      >
        <Carousel
          showThumbs={winDim.height && winDim.height < 600 ? false : true}
          autoPlay
          dynamicHeight
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
  );
};

export default EventCarouselModal;
