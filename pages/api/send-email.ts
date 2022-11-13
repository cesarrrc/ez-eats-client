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
  res: NextApiResponse<{ result: string; message: string }>
) {
  const { name, email, phone, subject, message } = req.body;
  console.log(req.body);
  try {
    const results = await mailClient.sendMail({
      to: "cesarcisneros9@gmail.com",
      subject,
      text: `
          name: ${name},
          email: ${email || "not provided"},
          phone: ${phone || "not provided"}
  
          message: ${message}
        `,
    });
    res
      .status(200)
      .json({ result: "success", message: "You're message has been sent." });
  } catch (error) {
    console.log(error, "error!!!");
    res.status(400).json({
      result: "failure",
      message: "There was an error processing your request.",
    });
  }
}
