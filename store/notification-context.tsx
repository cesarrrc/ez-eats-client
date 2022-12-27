import { createContext, useState } from "react";
import { NotificationContextType, NotificationData } from "../lib/types";

const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  showNotification: (notificationData: NotificationData) => {},
  hideNotification: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function NotificationContextProvider({ children }: Props) {
  const [activeNotification, setActiveNotification] =
    useState<NotificationData | null>();

  const showNotificationHandler = (notificationData: NotificationData) => {
    setActiveNotification(notificationData);
  };
  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
