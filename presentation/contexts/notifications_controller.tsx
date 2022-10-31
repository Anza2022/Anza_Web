import React, { PropsWithChildren, useState } from "react";
import NotificationModel from "../../models/others/notification_model";

export const NotificationsContext =
  React.createContext<NotificationsContextInterface>({
    notifications: [],
    setNotifications: () => {},
  });

const NotificationsController = (props: PropsWithChildren<{}>) => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        setNotifications,
      }}
    >
      {props.children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsController;

interface NotificationsContextInterface {
  notifications: NotificationModel[];
  setNotifications: (nots: NotificationModel[]) => void;
}
