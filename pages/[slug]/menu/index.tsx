import { margin } from "@mui/system";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { GET_ALL_RESTAURANTS } from "../../../apollo/gql";
import MenuItem from "../../../components/menu-item/menu-item";
import OrderOnlineButton from "../../../components/order-online-button/order-online-button";
import PageHeading from "../../../components/page-heading/page-heading";
import client from "../../../lib/apollo";
import { LocationDetails } from "../../../lib/types";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import classes from "./menu.module.css";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

type Props = {
  data: LocationDetails;
};

const Menu = ({ data }: Props) => {
  const params = useRouter();
  const winDim = useWindowDimensions();
  console.log(data, "data");
  return (
    <div className={classes.body_container}>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content={data.meta_data.meta_description} />
        <meta name="keywords" content={data.meta_data.keywords} />
      </Head>
      <PageHeading
        title={data.name.split("-")[0]}
        description={
          data.address.street_address + "\n" + data.address.city_state_zip
        }
        address={{
          street_address: data.address.street_address,
          city_state_zip: data.address.city_state_zip,
        }}
      />
      <div>
        <OrderOnlineButton
          href={data.menu_pdf.file.asset.url}
          title="View Menu PDF"
          muiIcon={<MenuBookIcon />}
        />
      </div>
      {/* <PageHeading title={data.name.split("-")[0]} description={data.tagline} /> */}
      {!!data.menu_categories &&
        data.menu_categories.map((category) => (
          <section className={classes.menu_category} key={category.name}>
            <h2 className={classes.menu_category_title}>{category.name}</h2>
            <div className={classes.bottom_border_bar}></div>
            <ul
              className={classes.menu_category_list}
              style={{
                display: winDim.width && winDim.width <= 800 ? "block" : "grid",
              }}
            >
              {!!category.sub_categories &&
                category.sub_categories.map((sub_category, i, arr) => (
                  <li
                    key={sub_category.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gridColumn:
                        i % 2 === 0 && arr.length - 1 === i
                          ? "span 2"
                          : "span 1",
                    }}
                  >
                    <h3
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignSelf: "center",
                        padding: "4px 6px",
                        borderRadius: 10,
                        backgroundColor: "whitesmoke",
                        color: "black",
                        fontSize: 24,
                      }}
                    >
                      {sub_category.name}
                    </h3>
                    {sub_category.info && sub_category.info.startsWith("$") && (
                      <div
                        style={{
                          border: "solid 3px green",
                          borderRadius: 10,
                          margin: "auto",
                          padding: "8px 30px",
                          fontWeight: "bold",
                          fontSize: 22,
                          letterSpacing: 3,
                        }}
                      >
                        {sub_category.info}
                      </div>
                    )}
                    {sub_category.includes && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "center",
                          maxWidth: 350,
                          margin: "0 auto 10px auto",
                        }}
                      >
                        <span
                          style={{
                            textDecoration: "underline",
                            fontWeight: "bold",
                          }}
                        >
                          All {sub_category.name} include:
                        </span>
                        <span>{sub_category.includes}</span>
                      </div>
                    )}
                    <ul
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          i % 2 === 0 &&
                          arr.length - 1 === i &&
                          sub_category.info &&
                          sub_category.info.startsWith("$") &&
                          winDim.width &&
                          winDim.width >= 800
                            ? "1fr 1fr"
                            : "1fr",
                      }}
                    >
                      {sub_category.types.map((type, index, array) =>
                        type.name &&
                        type.name.toLowerCase().startsWith("choose") ? (
                          <li
                            key={type.name}
                            style={{
                              marginBottom: 14,
                            }}
                          >
                            <h4 style={{ textAlign: "center", marginTop: 14 }}>
                              {type.name}
                            </h4>
                            <ul
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                              }}
                            >
                              {type.dishes.map((item) => (
                                <li
                                  className={classes.menu_category_list_item}
                                  key={item.name}
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <h5
                                    style={{
                                      fontWeight: !type.name
                                        ? "bold"
                                        : "lighter",
                                      fontSize: 14,
                                    }}
                                  >
                                    {item.name}
                                    {item.price && (
                                      <span>
                                        {" "}
                                        +{Number(item.price).toFixed(2)}
                                      </span>
                                    )}
                                  </h5>
                                  <div
                                    className={
                                      classes.menu_category_list_item_description_container
                                    }
                                  >
                                    <p>{item.short_description}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ) : (
                          <li key={type.name} style={{ marginBottom: 14 }}>
                            <h4>{type.name}</h4>
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginRight: 10,
                              }}
                            >
                              {type.dishes[0].prices &&
                                type.dishes[0].prices.map((price, i, arr) => {
                                  return arr.length - 1 === i
                                    ? price.size[0]
                                    : price.size[0] + " / ";
                                })}
                            </span>
                            <ul>
                              {type.dishes.map((item) => (
                                <li
                                  className={classes.menu_category_list_item}
                                  key={item.name}
                                >
                                  <div
                                    className={
                                      classes.menu_category_list_item_title_container
                                    }
                                  >
                                    <h5
                                      style={{
                                        fontWeight: !type.name
                                          ? "bold"
                                          : "lighter",
                                      }}
                                    >
                                      {item.name}
                                    </h5>
                                    {item.price ? (
                                      <h5>${Number(item.price).toFixed(2)}</h5>
                                    ) : item.prices ? (
                                      <h5>
                                        ${" "}
                                        {item.prices.map((price, i) => (
                                          <span>
                                            {price.amount.toFixed(2)}{" "}
                                            {item.prices.length - 1 == i
                                              ? ""
                                              : "/ "}
                                          </span>
                                        ))}
                                      </h5>
                                    ) : (
                                      <h5>${Number(item.price).toFixed(2)}</h5>
                                    )}
                                  </div>
                                  <div
                                    className={
                                      classes.menu_category_list_item_description_container
                                    }
                                  >
                                    <p>
                                      {item.short_description
                                        ?.split("\\n ")
                                        .join("\n")}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      <MenuItem location={data} noBorder />
    </div>
  );
};

export default Menu;

const GET_RESTAURANTS = GET_ALL_RESTAURANTS;

export const getStaticPaths = async () => {
  const results = await client.query({
    query: GET_RESTAURANTS,
  });
  if (!results) {
    return { notFound: true };
  }
  const paths: { params: { slug: string } }[] = [];
  results.data.allRestaurant.forEach((location: LocationDetails) => {
    if (location.hidden) {
      return;
    }
    return paths.push({ params: { slug: location.slug.current } });
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const results = await client.query({
    query: GET_RESTAURANTS,
  });
  if (!results) {
    return { notFound: true };
  }
  const foundLocation = results.data.allRestaurant.find(
    (location: LocationDetails) => {
      return location.slug.current === params?.slug;
    }
  );

  console.log(foundLocation, 'found location');

  // foundLocation.menu_categories.forEach((element: { dishes: {}[] }) => {
  //   element.dishes.forEach((el: object) => {});
  // });

  return {
    props: {
      data: foundLocation,
    },
    revalidate: 600,
  };
};
