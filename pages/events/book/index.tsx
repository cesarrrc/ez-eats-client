import React, { BaseSyntheticEvent, useContext, useState } from "react";
import EventsPageLayout from "../../../components/layout/eventsPageLayout";
import PageHeading from "../../../components/page-heading/page-heading";
import classes from "./book.module.css";
import sendEmail from "../../../lib/sendEmail";
import NotificationContext from "../../../store/notification-context";
import { EventDataInitial } from "../../../lib/types";
import formatPhoneNumber from "../../../lib/formatPhoneNumber";
import * as thumbsUp from "../../../lib/lottie/thumbs-up.json";
import * as spinner from "../../../lib/lottie/spinner.json";
import * as errorLottie from "../../../lib/lottie/error.json";
import Head from "next/head";
import LottieControl from "../../../components/lottie/lottie";
import { Button } from "@mui/material";

type Props = {};

const BookAnEvent = (props: Props) => {
  const notificationCtx = useContext(NotificationContext);
  const [eventBody, setEventBody] = useState(EventDataInitial);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    let formattedPhoneNumber;
    if (name === "phone") {
      formattedPhoneNumber = formatPhoneNumber(e.target.value);
    }
    setEventBody({
      ...eventBody,
      [name]: formattedPhoneNumber || value,
    });
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const response = await sendEmail(eventBody);
      console.log(response);
      const data = await response?.json();
      notificationCtx.showNotification({
        title: "Your message was sent!",
        message: "Thanks for reaching out, we will get back to you soon!",
        status: "success",
        lottie: thumbsUp,
      });
      if (!response) {
        throw new Error("Something went wrong");
      }
      if (!response.ok) {
        throw new Error(
          "Unable to send a message at this time, please try again later. Call or message us here:"
        );
      }
      setIsSubmit(false);
    } catch (error: any) {
      console.log(error, "error");
      setIsSubmit(false);
      notificationCtx.showNotification({
        title: "There was an error sending your message...",
        message: error.message,
        status: "error",
        lottie: errorLottie,
      });
    }
  };

  const reset = () => {
    setEventBody(EventDataInitial);
  };
  return (
    <div className={classes.event_container}>
      <PageHeading
        title="Book an Event"
        description="Use the form below to book an event."
      />
      <section className={classes.form_container}>
        <form className={classes.contact_form} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={eventBody.name}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              // required
              onChange={handleChange}
              value={eventBody.email}
            />
          </div>
          <div>
            <label htmlFor="eventType">Event Type:</label>
            <select
              name="eventType"
              id="eventType"
              onChange={handleChange}
              value={eventBody.eventType}
            >
              <option>Wine Party</option>
              <option>Beer Party</option>
              <option>Private Party</option>
            </select>
          </div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={eventBody.phone}
            />
          </div>
          <div>
            <label htmlFor="numberOfGuests">Number of Guests:</label>
            <input
              type="number"
              inputMode="numeric"
              name="numberOfGuests"
              id="numberOfGuests"
              onChange={handleChange}
              value={eventBody.numberOfGuests}
            />
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={handleChange}
              value={eventBody.date}
            />
          </div>
          <div className={classes.description}>
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              rows={5}
              onChange={handleChange}
              value={eventBody.message}
            />
          </div>
          <div>
            <Button
              type="submit"
              className={classes.submit}
              disabled={isSubmit}
            >
              {isSubmit ? (
                <LottieControl
                  lottie={spinner}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
          <div>
            <Button type="button" className={classes.submit} onClick={reset}>
              Reset
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

BookAnEvent.PageLayout = EventsPageLayout;

export default BookAnEvent;
