import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import upcomingArrow from "../../public/img/Upcoming_Events.svg";
import bookArrow from "../../public/img/Book_Now.svg";
import pastArrow from "../../public/img/Past_Events.svg";
import useWindowDimensions from "../../hooks/useWindowDimensions";

type Props = {
  children: React.ReactNode;
};

function eventsPageLayout({ children }: Props) {
  const [firstClick, setFirstClick] = useState("");
  const winDim = useWindowDimensions();

  useEffect(() => {
    console.log(firstClick);
    // console.log(winDim);
  }, [firstClick, winDim]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            firstClick && winDim.width && winDim.width >= 375
              ? "1fr 1fr 1fr"
              : "1fr 1fr",
          width: "80%",
          maxWidth: firstClick ? 400 : 500,
          margin: "0 40px 20px 40px",
          gridAutoRows:
            winDim.width && winDim.width <= 400 && firstClick
              ? 100
              : firstClick
              ? 140
              : winDim.width && winDim.width < 375
              ? 100
              : 180,
          textAlign: "center",
          rowGap: 10,
          columnGap: 20,
        }}
      >
        <Link
          href="/events/past"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            fontSize: firstClick ? 16 : 20,
            fontWeight: "lighter",
            minWidth: 80,
          }}
        >
          <span style={{ margin: "10px auto" }}>Past</span>
          <div
            style={{
              backgroundColor: "#1b1b1b",
              outline: firstClick === "past" ? "6px #f1f1f1 solid" : "none",
              borderRadius: 10,
              overflow: "hidden",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
            onClick={(e) => {
              setFirstClick("past");
            }}
          >
            <Image
              src={pastArrow}
              alt={""}
              fill
              style={{
                backgroundColor: "#1b1b1b",
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
              quality={100}
              priority
              sizes="100%"
            />
          </div>
        </Link>
        <Link
          href="/events/upcoming"
          style={{
            width: "100%",
            fontSize: firstClick ? 16 : 20,
            fontWeight: "lighter",
            display: "flex",
            flexDirection: "column",
            minWidth: 80,
          }}
        >
          <span style={{ margin: "10px auto" }}>Upcoming</span>
          <div
            style={{
              backgroundColor: "#1b1b1b",
              outline: firstClick === "upcoming" ? "6px #f1f1f1 solid" : "none",
              borderRadius: 10,
              overflow: "hidden",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
            onClick={(e) => {
              setFirstClick("upcoming");
            }}
          >
            <Image
              quality={100}
              src={upcomingArrow}
              alt={""}
              fill
              style={{
                backgroundColor: "#1b1b1b",
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
              priority
              sizes="100%"
            />
          </div>
        </Link>
        <Link
          href="/events/book"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gridColumn:
              firstClick && winDim.width && winDim.width >= 375
                ? "span 1"
                : "span 2",
            gridRow:
              firstClick && winDim.width && winDim.width >= 375 ? "none" : "2",
            gridArea:
              firstClick && winDim.width && winDim.width >= 375 ? "1/2" : "0",
            fontSize: firstClick ? 16 : 20,
            fontWeight: "lighter",
            minWidth: 80,
          }}
        >
          <span style={{ margin: "10px auto" }}>Book</span>
          <div
            style={{
              width: "100%",
              position: "relative",

              backgroundColor: "#1b1b1b",
              borderRadius: 10,
              overflow: "hidden",
              outline: firstClick === "book" ? "6px #f1f1f1 solid" : "none",
              height: "100%",
            }}
            onClick={(e) => {
              setFirstClick("book");
            }}
          >
            <Image
              quality={100}
              src={bookArrow}
              alt={""}
              fill
              style={{
                backgroundColor: "#1b1b1b",
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
              priority
              sizes="100%"
            />
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
}

export default eventsPageLayout;
