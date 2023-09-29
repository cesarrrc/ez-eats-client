import LottieControl from "../../components/lottie/lottie";
import construction from "../../lib/lottie/construction.json";
import client from "../../lib/apollo";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import Image from "next/image";
import BlockContent from "@sanity/block-content-to-react";
import classes from "./about.module.css";
import PageHeading from "../../components/page-heading/page-heading";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Head from "next/head";

type Props = {
  data: any;
};

const About = ({ data }: Props) => {
  const winDim = useWindowDimensions();

  if (!!winDim.width && winDim.width <= 800) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Head>
          <title>Our Story</title>
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Head>
        <PageHeading title="About Us" description="" />
        <section style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              // width: 400,
              // height: 400,
              display: "flex",
              minHeight: "140px",
              position: "relative",
              flex: 1,
              margin: " 0px 30px",
            }}
          >
            <Image
              src={data.allAboutPageDocument[0].detail_image.asset.url}
              // width={200}
              // height={200}
              fill
              alt={"about us"}
              style={{
                objectFit: "contain",
                overflow: "hidden",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              margin: " 0px 30px",
            }}
            className={classes.main_block_content}
          >
            <BlockContent
              blocks={data.allAboutPageDocument[0].detail_bodyRaw}
            />
          </div>
        </section>
        {data.allAboutPageDocument.map((content: any, i: any) => {
          return (
            content.detail_number != 1 && (
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={i}
              >
                <h3 style={{ margin: "20px 0", fontSize: 30 }}>
                  {content.detail_header}
                </h3>
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      // width: 400,
                      // height: 400,
                      display: "flex",
                      minHeight: "200px",
                      position: "relative",
                      flex: 1,
                      margin: "0 0",
                    }}
                  >
                    <Image
                      src={content.detail_image.asset.url}
                      // width={200}
                      // height={200}
                      fill
                      alt={"about us"}
                      style={{
                        objectFit: "contain",
                        overflow: "hidden",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      margin: "0 10px",
                    }}
                    className={classes.block_content}
                  >
                    <BlockContent blocks={content.detail_bodyRaw} />
                  </div>
                </div>
                <div
                  className={
                    data.allAboutPageDocument.length === i + 1
                      ? undefined
                      : classes.bar
                  }
                />
              </section>
            )
          );
        })}
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Our Story</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Head>
      <PageHeading title="About Us" description="" />
      <section
        style={{
          maxWidth: 1150,
          margin: "auto",
          textAlign: "center",
          padding: 60,
        }}
        className={classes.main_block_content}
      >
        <div
          style={{
            width: "40vw",
            height: "10vw",
            float: "left",
            margin: "20px 20px 10px 0",
            position: "relative",
            // border: "solid #f1f1f1 10px",
          }}
        >
          <Image
            src={data.allAboutPageDocument[0].detail_image.asset.url}
            // width={500}
            // height={200}
            fill
            alt={"about us"}
            style={{ objectFit: "contain" }}
          />
        </div>

        <BlockContent
          className={classes.main_block_content}
          blocks={data.allAboutPageDocument[0].detail_bodyRaw}
        />
      </section>
      {data.allAboutPageDocument.map((content: any, i: any) => {
        return (
          content.detail_number != 1 && (
            <section
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 1200,
                margin: "20px",
              }}
            >
              <h3 style={{ margin: "20px 0", fontSize: 30 }}>
                {content.detail_header}
              </h3>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: i % 2 ? "row-reverse" : undefined,
                }}
              >
                <div
                  style={{
                    // width: 400,
                    // height: 400,
                    display: "flex",
                    minHeight: "400px",
                    position: "relative",
                    flex: 1,
                    margin: "20px 20px",
                  }}
                >
                  <Image
                    src={content.detail_image.asset.url}
                    // width={200}
                    // height={200}
                    fill
                    alt={"about us"}
                    style={{
                      objectFit: "contain",
                      overflow: "hidden",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    margin: "20px 0",
                  }}
                  className={classes.block_content}
                >
                  <BlockContent blocks={content.detail_bodyRaw} />
                </div>
              </div>
              <div
                className={
                  data.allAboutPageDocument.length === i + 1
                    ? undefined
                    : classes.bar
                }
              />
            </section>
          )
        );
      })}
    </div>
  );
};

export default About;

const GET_ABOUT = gql`
  # Write your query or mutation here
  {
    allAboutPageDocument(sort: { detail_number: ASC }) {
      _id
      detail_number
      detail_header
      detail_image {
        asset {
          title
          path
          url
          description
        }
      }
      detail_bodyRaw
    }
  }
`;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const results = await client.query({
    query: GET_ABOUT,
  });
  if (!results) {
    return { notFound: true };
  }
  return {
    props: {
      data: results.data,
    },
    revalidate: 600,
  };
};

/*
{
  allAboutPageDocument (sort: {detail_number:ASC} ){
    _id
    detail_number
    detail_header
    detail_image {
      asset {
        title
        path
        url
        description
      }
    }
    detail_bodyRaw
  }
}
 */
