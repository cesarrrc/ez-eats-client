import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useRouter } from "next/router";
import classes from "./eventsPageLayout.module.css";
import { GetStaticProps } from "next";
import client from "../../lib/apollo";
import { GET_EVENTS_PAGE } from "../../apollo/gql";

type Props = {
  children: any;
  data: any;
};

function eventsPageLayout(props: Props) {
  const [firstClick, setFirstClick] = useState("");
  const winDim = useWindowDimensions();
  const router = useRouter();
  const [tileData, setTileData] = useState<any>(null);

  console.log(props, "helloooooooo");

  useEffect(() => {
    if (router.pathname === "/events") {
      setTileData({
        upcomingTileData: props?.children.props.data.allEventsPage.filter(
          (tile: any) => tile.tile_name === "Upcoming"
        )[0],
        bookTileData: props?.children.props.data.allEventsPage.filter(
          (tile: any) => tile.tile_name === "Book"
        )[0],
        pastTileData: props?.children.props.data.allEventsPage.filter(
          (tile: any) => tile.tile_name === "Past"
        )[0],
      });
    }
  }, []);

  useEffect(() => {
    let currentPath = router.pathname.split("/");
    if (currentPath[2]) {
      return setFirstClick(currentPath[2]);
    }
    setFirstClick("");
  }, [router]);

  if (!tileData) return;
  return (
    <div className={classes.events_layout_container}>
      <div
        className={`${classes.events_layout_grid_container} ${
          firstClick && classes.event_clicked_grid_container
        }`}
      >
        <Link href="/events/past" className={firstClick && classes.selected}>
          <span>Past</span>
          <div
            className={`${classes.past_events_image_container} ${
              firstClick === "past" && classes.selected_container
            }`}
            onClick={(e) => {
              setFirstClick("past");
            }}
          >
            <div className={classes.image_container}>
              <Image
                className={classes.img1}
                src={tileData?.pastTileData?.tile_icon.asset.url}
                alt={""}
                fill
                quality={100}
                priority
                sizes="100%"
              />
              <Image
                className={classes.img2}
                src={tileData?.pastTileData?.tile_image.asset.url}
                alt={""}
                fill
                quality={100}
                priority
                sizes="100%"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </Link>
        <Link
          href="/events/upcoming"
          className={firstClick && classes.selected}
        >
          <span>Upcoming</span>
          <div
            className={`${classes.past_events_image_container} ${
              firstClick === "upcoming" && classes.selected_container
            }`}
            onClick={(e) => {
              setFirstClick("upcoming");
            }}
          >
            <div className={classes.image_container}>
              <Image
                quality={100}
                src={tileData.upcomingTileData?.tile_icon.asset.url}
                alt={""}
                fill
                priority
                sizes="100%"
              />
              <Image
                className={classes.img2}
                src={tileData.upcomingTileData?.tile_image.asset.url}
                alt={""}
                fill
                quality={100}
                priority
                sizes="100%"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </Link>
        <Link
          href="/events/book"
          className={`${firstClick && classes.selected} ${
            classes.book_container
          } ${!firstClick && classes.no_selection}`}
        >
          <span>Book Now</span>
          <div
            className={`${classes.past_events_image_container} ${
              firstClick === "book" && classes.selected_container
            }`}
            onClick={(e) => {
              setFirstClick("book");
            }}
          >
            <div className={classes.image_container}>
              <Image
                quality={100}
                src={tileData.bookTileData?.tile_icon.asset.url}
                alt={""}
                fill
                priority
                sizes="100%"
              />
              <Image
                className={classes.img2}
                src={tileData.bookTileData?.tile_image.asset.url}
                alt={""}
                fill
                quality={100}
                priority
                sizes="100%"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </Link>
      </div>
      {props.children}
    </div>
  );
}

export default eventsPageLayout;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const results = await client.query({
    query: GET_EVENTS_PAGE,
  });
  if (!results) {
    return { notFound: true };
  }

  return {
    props: {
      data: results.data,
    },
    revalidate: 600,
  };
};
