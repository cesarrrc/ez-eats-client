import { ContactData, EventData } from "./types";

const sendEmail = async (data: ContactData | EventData) => {
  try {
    const response = await fetch(`/api/send-email`, {
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
    console.log(error, "errorrrrrrrr send email");
  }
};

export default sendEmail;
