import React, { useContext } from "react";
import classes from "./layout.module.css";
import NavBar from "../navbar/navbar";
import Footer from "../footer/footer";
import Notifications from "../notifications/notifications";
import NotificationContext from "../../store/notification-context";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;
  return (
    <div className={classes.layout_container}>
      <NavBar />
      <main
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </main>
      <Notifications
        title={activeNotification?.title}
        message={activeNotification?.message}
        status={activeNotification?.status}
        lottie={activeNotification?.lottie}
      />
      <Footer />
    </div>
  );
};

export default Layout;
