import React from "react";
import EventsPageLayout from "../../../components/layout/eventsPageLayout";
import LottieControl from "../../../components/lottie/lottie";
import noEvent from "../../../lib/lottie/no_event_calender.json";
import Link from "next/link";
import { EventDetails } from "../../../lib/types";
type Props = {
  event: EventDetails;
};

const UpcomingEvents = ({ event }: Props) => {
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
};

UpcomingEvents.PageLayout = EventsPageLayout;

export default UpcomingEvents;
