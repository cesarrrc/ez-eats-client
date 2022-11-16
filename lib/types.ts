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

export type Location = {
  image_src: string;
  title: string;
  business_phone: string;
  slug: string;
  address: Record<string, string>;
};

export type AllRestaurantsType = [
  {
    _typename?: string;
    _id: string;
    name: string;
    address: {
      street_address: string;
      city_state_zip: string;
    };
    phone_number: string;
    type: string;
    description: string;
    menu_categories: {
      name: string;
      dishes: {
        price: string;
        slug: {
          current: string;
        };
      };
    };
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
  }
];
