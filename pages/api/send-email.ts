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
  res: NextApiResponse<{ result: string; message: string; error?: string }>
) {
  const { name, email, phone, subject, event_type, message } = req.body;
  try {
    const results = await mailClient.sendMail({
      to: "cesarcisneros9@gmail.com",
      subject,
      text: `
          Name: ${name}
          Email: ${email || "not provided"}
          Phone: ${phone || "not provided"}
          Event type: ${event_type || "not provided"}
          Message: ${message}
        `,
    });

    await mailClient.sendMail({
      to: "chefjacob@ezeatstx.com",
      subject,
      text: `
          Name: ${name}
          Email: ${email || "not provided"}
          Phone: ${phone || "not provided"}
          Event type: ${event_type || "not provided"}
          Message: ${message}
        `,
    });
    res
      .status(200)
      .json({ result: "success", message: "You're message has been sent." });
  } catch (error) {
    res.status(400).json({
      result: "failure",
      message: "There was an error processing your request.",
      error: "error",
    });
  }
}
