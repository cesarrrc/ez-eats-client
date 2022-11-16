import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import NotificationContext from "../../store/notification-context";
import LottieControl from "../lottie/lottie";
import Overlay from "../overlay/overlay";
import Button from "@mui/material/Button";

import classes from "./notifications.module.css";

type Props = {
  title: string | null;
  message: string | null;
  status: string | null;
  lottie: any;
};

const Notifications = ({ title, message, status, lottie }: Props) => {
  const notificationCtx = useContext(NotificationContext);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, [isBrowser]);

  if (isBrowser) {
    return ReactDOM.createPortal(
      <Overlay closeModal={notificationCtx.hideNotification}>
        <div
          className={classes.notifications}
          onMouseDown={() => console.log("hello")}
        >
          <div className={classes.lottie_container}>
            <LottieControl
              lottie={lottie}
              style={{ width: 300, height: 300 }}
            />
          </div>
          <>
            <h2>{title}</h2>
            <p>{message}</p>
          </>
          <Button
            className={classes.button}
            onClick={notificationCtx.hideNotification}
          >
            OK!
          </Button>
        </div>
      </Overlay>,
      document.getElementById("notifications")!
    );
  }
  return null;
};

Notifications.defaultProps = {
  title: null,
  message: null,
  status: null,
};

export default Notifications;
