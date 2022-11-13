import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
  useContext,
} from "react";
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
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          if (e.currentTarget.id !== "overlay") {
            console.log("overlay1");
            return;
          }

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
