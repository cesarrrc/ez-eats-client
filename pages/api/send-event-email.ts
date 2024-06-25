import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const mailClient = nodemailer.createTransport({
  service: "Gmail.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ result: string; message: string; error?: any }>
) {
  const { name, email, phone, eventType, date, numberOfGuests, message } =
    req.body;
  try {
    await mailClient.sendMail({
      to: "cesarcisneros9@gmail.com",
      subject: `New ${eventType} Event | ${name} | ${numberOfGuests} guests`,
      text: `
          Name: ${name}
          Email: ${email || "not provided"}
          Phone: ${phone || "not provided"}
          Event Type: ${eventType || "not provided"}
          Date: ${date}
          Number of Guests: ${numberOfGuests}
          Message: ${message}
        `,
    });

    await mailClient.sendMail({
      to: "chefjacob@ezeatstx.com",
      subject: `${
        eventType != "Other" ? eventType + " Request" : "New Event Request"
      } - ${name} - ${numberOfGuests} guests`,
      text: `
          Name: ${name}
          Email: ${email || "not provided"}
          Phone: ${phone || "not provided"}
          Event Type: ${eventType || "not provided"}
          Date: ${date}
          Number of Guests: ${numberOfGuests}
          Message: ${message}
        `,
    });
    res
      .status(200)
      .json({ result: "success", message: "You're message has been sent." });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      result: "failure",
      message: "There was an error processing your request.",
      error,
    });
  }
}
