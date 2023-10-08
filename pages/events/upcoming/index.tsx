import React from "react";
import EventsPageLayout from "../../../components/layout/eventsPageLayout";
import LottieControl from "../../../components/lottie/lottie";
import noEvent from "../../../lib/lottie/no_event_calender.json";
import Link from "next/link";
type Props = {};

const UpcomingEvents = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginTop: 30,
      }}
    >
      <h3 style={{ textAlign: "center" }}>No events planned at this time. </h3>
      <p>
        Please check back later or visit our{" "}
        <Link href="/events" style={{ color: "#0DC0C6" }}>
          Events Page
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
      <div
        style={{
          width: "80%",
          maxWidth: 300,
          maxHeight: 600,
          padding: "60px 20px",
        }}
      >
        <LottieControl lottie={noEvent} speed={0.5} />
      </div>
    </div>
  );
};

UpcomingEvents.PageLayout = EventsPageLayout;

export default UpcomingEvents;
