import React, { BaseSyntheticEvent, useState } from "react";
import PageHeading from "../../components/page-heading/page-heading";
import { IconButton, Button, Drawer } from "@mui/material";

import classes from "./contact.module.css";
import formatPhoneNumber from "../../lib/formatPhoneNumber";
import sendEmail from "../../lib/sendEmail";
import { ContactDataInitial } from "../../lib/types";

type Props = {};

const Contact = (props: Props) => {
  const [contactBody, setContactBody] = useState(ContactDataInitial);

  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    let formattedPhoneNumber;
    if (name === "phone") {
      console.log(value);

      formattedPhoneNumber = formatPhoneNumber(e.target.value);
    }
    setContactBody({
      ...contactBody,
      [name]: formattedPhoneNumber || value,
    });
  };

  console.log(contactBody);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const response = await sendEmail(contactBody);

    console.log(response, "response");
  };

  const reset = () => {
    setContactBody(ContactDataInitial);
  };

  return (
    <div className={classes.contact_container}>
      <PageHeading
        title="Contact Us"
        description="If you would like to plan ask us a question, plan an event, or would like to give us feedback, please fill this form out below ."
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
              required
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
            <Button type="submit" className={classes.submit}>
              Submit
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
