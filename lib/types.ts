import React from "react";
import type { AppProps } from "next/app";

export type ContactData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type EventData = {
  name: string;
  email: string;
  eventType: string;
  phone: string;
  numberOfGuests: string;
  date: string;
  message: string;
};

export enum ContactDataInitial {
  name = "",
  email = "",
  phone = "",
  event_type = "",
  subject = "",
  message = "",
}

export enum EventDataInitial {
  name = "",
  email = "",
  eventType = "",
  phone = "",
  numberOfGuests = "",
  date = "",
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

export type Location = {
  image_src: string;
  title: string;
  business_phone: string;
  slug: string;
  address: Record<string, string>;
};

export type LocationDetails = {
  _typename?: string;
  _id: string;
  name: string;
  tagline?: string;
  address: {
    street_address: string;
    city_state_zip: string;
  };
  pickup_link: string;
  delivery_link: string;
  phone_number: string;
  type: string;
  description: string;
  hidden: boolean;
  hours: [
    {
      days: string;
      hours: string;
    }
  ];
  menu_pdf: {
    file: {
      asset: {
        url: string;
      };
    };
  };
  menu_categories: [
    {
      name: string;
      location: string;
      sub_categories: {
        name: string;
        includes: string;
        info: string;
        types: {
          name: string;
          dishes: {
            _id: string;
            name: string;
            short_description: string;
            price: string;
            prices: {
              size: string;
              amount: number;
            }[];
            image: {
              asset: {
                url: string;
              };
            };
          }[];
        }[];
        slug: {
          current: string;
        };
        meta_data: {
          meta_title: string;
          meta_description: string;
          keywords: string;
        };
      }[];
    }
  ];
  slug: {
    current: string;
    _typename: string;
  };
  image: {
    asset: {
      title: string;
      path: string;
      url: string;
      description: string;
    };
  };
  meta_data: {
    meta_title: string;
    meta_description: string;
    keywords: string;
  };
};

export type AllRestaurantsType = [LocationDetails];

export type EventDetails = {
  __typename: string;
  _id: string;
  name: string;
  event_date: string;
  event_descriptionRaw: any;
  event_address: {
    street_address: string;
    city_state_zip: string;
  };
  flyer: [
    {
      asset: {
        url: string;
      };
    }
  ];
  website: string;
};

export type AllEventsType = [EventDetails];

export type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: any;
  };
};
