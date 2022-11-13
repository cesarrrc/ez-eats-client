import React, { useContext } from "react";
import NotificationContext from "../../store/notification-context";

import classes from "./overlay.module.css";
type Props = {
  children: React.ReactNode;
  closeModal: () => any;
};

const Overlay = ({ children, closeModal }: Props) => {
  const notificationCtx = useContext(NotificationContext);

  if (notificationCtx.notification) {
    return (
      <div
        id="overlay"
        className={classes.overlay}
        onClick={(e) => {
          // e.stopPropagation();
          // e.nativeEvent.stopImmediatePropagation();
          console.log(e.target.id);
          if (e.target.id !== "overlay") {
            console.log("overlay1");
            return;
          }
          console.log("overlay2");

          closeModal();
        }}
      >
        {children}
      </div>
    );
  }
  return null;
};

export default Overlay;
