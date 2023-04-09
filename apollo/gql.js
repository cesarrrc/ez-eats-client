import { gql } from "@apollo/client";

export const GET_HOME = gql`
  {
    allHomePage(sort: { tile_number: ASC }) {
      _id
      tile_number
      tile_name
      tile_image {
        asset {
          url
        }
      }
      tile_icon {
        asset {
          url
        }
      }
      slug {
        current
      }
    }
  }
`;

export const GET_ALL_RESTAURANTS = gql`
  {
    allRestaurant {
      _id
      name
      tagline
      type
      phone_number
      description
      hidden
      pickup_link
      delivery_link
      hours {
        days
        hours
      }
      address {
        street_address
        city_state_zip
      }
      image {
        asset {
          title
          path
          url
          description
        }
      }
      menu_pdf {
        file {
          asset {
            url
          }
        }
      }
      menu_categories {
        name
        location
        sub_categories {
          name
          includes
          info
          types {
            name
            dishes {
              _id
              name
              short_description
              price
              price_by_size
              prices {
                size
                amount
              }
              slug {
                current
              }
            }
          }
        }
      }
      slug {
        current
      }
      meta_data {
        meta_title
        meta_description
        keywords
      }
    }
  }
`;
