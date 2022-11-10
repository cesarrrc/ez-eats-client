export type Location = {
  title: string;
  image_src: string;
  address_url: string;
  business_phone: string;
  slug: string;
  address: string;
};

export const LOCATION_LIST: Location[] = [
  {
    title: "Ez-Eats Kitchen",
    image_src: "/img/mill-street.jpeg",
    address_url:
      "https://www.google.com/maps/place/EZ+Eats+Kitchen/@29.8985114,-97.9180403,17z/data=!3m1!4b1!4m5!3m4!1s0x865ca905df8a9ad7:0xff1c56d8738120af!8m2!3d29.8985068!4d-97.9154654",
    business_phone: "956-465-9343",
    address: "641 Mill St Suite 100,\nSan Marcos, TX 78666",
    slug: "ez-eats-mill-street",
  },
  {
    title: "Middleton Trailer",
    image_src: "/img/middleton.jfif",
    address_url:
      "https://www.google.com/maps/place/Middleton+Brewing+LLC+(MBTX)/@29.9308541,-98.0715756,17z/data=!3m1!4b1!4m5!3m4!1s0x865b5da7dd090f6d:0xe762ce3d1359aeb0!8m2!3d29.9308223!4d-98.0715385",
    business_phone: "956-465-9343",
    address: "101 Oakwood Loop,\nSan Marcos, TX 78666",
    slug: "ez-eats-mill-street",
  },
  {
    title: "Shady Llama Tent",
    image_src: "/img/shady-llama.jfif",
    address_url:
      "https://www.google.com/maps/place/The+Shady+Llama/@30.0613873,-98.0957981,17z/data=!3m1!4b1!4m5!3m4!1s0x865b5d1d19bc35c3:0x6aca9f55dd7cabb6!8m2!3d30.0613827!4d-98.0932232",
    business_phone: "956-465-9343",
    address: "18325 Ranch Rd 12,\nWimberley, TX 78676",
    slug: "ez-eats-mill-street",
  },
];
