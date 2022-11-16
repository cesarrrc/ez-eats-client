import { ContactData } from "./types";

const sendEmail = async (data: ContactData) => {
  console.log(data, "data");
  try {
    const response = await fetch(
      `/api/send-email`,
      {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        referrerPolicy: "no-referrer",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
