import React from "react";
import LottieControl from "../../components/lottie/lottie";
import construction from "../../lib/lottie/construction.json";

type Props = {};

const MealPrep = (props: Props) => {
  return (
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
  );
};

export default MealPrep;
