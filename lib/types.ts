export type ContactData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export enum ContactDataInitial {
  name = "",
  email = "",
  phone = "",
  subject = "",
  message = "",
}

export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionsResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;

export type NotificationData = {
  title: string;
  message: string;
  status: string;
  lottie?: any | null;
};

export type NotificationContextType = {
  notification: null | NotificationData | undefined;
  showNotification: (notificationData: NotificationData) => void;
  hideNotification: () => void;
};

export type Slug = {};

export type AllRestaurantsType = [
  {
    _typename: string;
    _id: string;
    name: string;
    address: string;
    type: string;
    slug: {
      current: string;
      _typename: string;
    };
  }
];
