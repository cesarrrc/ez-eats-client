import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import upcomingArrow from "../../public/img/Upcoming_Events.svg";
import bookArrow from "../../public/img/Book_Now.svg";
import pastArrow from "../../public/img/Past_Events.svg";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useRouter } from "next/router";
import classes from "./eventsPageLayout.module.css";

type Props = {
  children: React.ReactNode;
};

function eventsPageLayout({ children }: Props) {
  const [firstClick, setFirstClick] = useState("");
  const winDim = useWindowDimensions();
  const router = useRouter();

  useEffect(() => {
    console.log(firstClick);
    // console.log(winDim);
    console.log(router);
  }, [firstClick, winDim, router]);

  useEffect(() => {
    let currentPath = router.pathname.split("/");
    console.log(currentPath, "path");
    if (currentPath[2]) {
      return setFirstClick(currentPath[2]);
    }
    setFirstClick("");
  }, [router]);
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
            <Image
              src={pastArrow}
              alt={""}
              fill
              quality={100}
              priority
              sizes="100%"
            />
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
            <Image
              quality={100}
              src={upcomingArrow}
              alt={""}
              fill
              priority
              sizes="100%"
            />
          </div>
        </Link>
        <Link
          href="/events/book"
          className={`${firstClick && classes.selected} ${
            classes.book_container
          } ${!firstClick && classes.no_selection}`}
        >
          <span>Book</span>
          <div
            className={`${classes.past_events_image_container} ${
              firstClick === "book" && classes.selected_container
            }`}
            onClick={(e) => {
              setFirstClick("book");
            }}
          >
            <Image
              quality={100}
              src={bookArrow}
              alt={""}
              fill
              priority
              sizes="100%"
            />
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
}

export default eventsPageLayout;
