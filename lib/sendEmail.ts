import { ContactData } from "./types";

const sendEmail = async (data: ContactData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CUSTOM_API}/send-email`, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
