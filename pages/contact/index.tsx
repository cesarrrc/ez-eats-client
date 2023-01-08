import React, {
  BaseSyntheticEvent,
  ErrorInfo,
  useContext,
  useState,
} from "react";
import PageHeading from "../../components/page-heading/page-heading";
import { IconButton, Button, Drawer } from "@mui/material";

import classes from "./contact.module.css";
import formatPhoneNumber from "../../lib/formatPhoneNumber";
import sendEmail from "../../lib/sendEmail";
import { ContactDataInitial } from "../../lib/types";
import LottieControl from "../../components/lottie/lottie";
import NotificationContext from "../../store/notification-context";
import spinner from "../../lib/lottie/spinner.json";
import * as thumbsUp from "../../lib/lottie/thumbs-up.json";
import * as errorLottie from "../../lib/lottie/error.json";

type Props = {};

const Contact = (props: Props) => {
  const notificationCtx = useContext(NotificationContext);
  const [contactBody, setContactBody] = useState(ContactDataInitial);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    let formattedPhoneNumber;
    if (name === "phone") {

      formattedPhoneNumber = formatPhoneNumber(e.target.value);
    }
    setContactBody({
      ...contactBody,
      [name]: formattedPhoneNumber || value,
    });
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const response = await sendEmail(contactBody);

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
    setContactBody(ContactDataInitial);
  };

  return (
    <div className={classes.contact_container}>
      <PageHeading
        title="Contact Us"
        description="If you would like to plan ask us a question, plan an event, or would like to give us feedback, please fill this form out below."
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
              value={contactBody.name}
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
              value={contactBody.email}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={contactBody.phone}
            />
          </div>
          <div>
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              name="subject"
              id="subject"
              onChange={handleChange}
              value={contactBody.subject}
            />
          </div>
          <div className={classes.description}>
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              rows={5}
              onChange={handleChange}
              value={contactBody.message}
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

export default Contact;
