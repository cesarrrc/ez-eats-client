import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import LottieControl from "../../../components/lottie/lottie";
import MenuItem from "../../../components/menu-item/menu-item";
import PageHeading from "../../../components/page-heading/page-heading";
import construction from "../../../lib/lottie/construction.json";
import client from "../../../lib/apollo";
import { AllRestaurantsType, LocationDetails } from "../../../lib/types";

type Props = {
  data: LocationDetails;
};

const Menu = ({ data }: Props) => {
  const params = useRouter();
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Currently Under Construction</h1>
        <div
          style={{
            width: 350,
            height: 350,
          }}
        >
          <LottieControl lottie={construction} />
        </div>
        <p style={{ textAlign: "center" }}>Please check back later.</p>
      </div>
      {/* <PageHeading
        title={data.name.split("-")[0]}
        description={data.description}
      />
      {data.menu_categories.map((category) => (
        <>
          <h2>{category.name}</h2>
          {category.dishes.map((item) => (
            <div>{item.name}</div>
          ))}
        </>
      ))}
      <MenuItem location={data} /> */}
    </div>
  );
};

export default Menu;

const GET_RESTAURANTS = gql`
  # Write your query or mutation here
  {
    allRestaurant {
      _id
      name
      type
      phone_number
      description
      hidden
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
      menu_categories {
        name
        location
        dishes {
          name
          short_description
          price
          image {
            asset {
              url
            }
          }
          slug {
            current
          }
        }
      }
      slug {
        current
      }
      meta_data {
        meta_title
        meta_description
        meta_description
      }
    }
  }
`;

export const getStaticPaths = async () => {
  const results = await client.query({
    query: GET_RESTAURANTS,
  });
  console.log(results, "RSULTSSSSSSSS");
  if (!results) {
    return { notFound: true };
  }
  const paths: { params: { slug: string } }[] = [];
  results.data.allRestaurant.forEach((location: LocationDetails) => {
    if (location.hidden) {
      console.log("hiddden");
      return;
    }
    return paths.push({ params: { slug: location.slug.current } });
  });
  console.log(paths);
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const results = await client.query({
    query: GET_RESTAURANTS,
  });
  console.log(results)
  if (!results) {
    return { notFound: true };
  }
  const foundLocation = results.data.allRestaurant.find(
    (location: LocationDetails) => {
      return location.slug.current === params?.slug;
    }
  );
  console.log(foundLocation)
  return {
    props: {
      data: foundLocation,
    },
  };
};
