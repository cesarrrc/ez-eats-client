import React, {
  useState,
  useRef,
  useEffect,
  LegacyRef,
  MutableRefObject,
  RefObject,
} from "react";
import Lottie, { LottieRef, LottieRefCurrentProps } from "lottie-react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import * as animationData from "../../lib/lottie/thumbs-up.json";

import classes from "./lottie-control.module.css";

type Props = {
  lottie: any | null;
  style: any;
  speed: number | null;
};

const LottieControl = ({ lottie, style, speed }: Props) => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  // const winDim = useWindowDimensions();

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={lottie}
      loop={true}
      className={classes.lottie}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
      style={style}
      // onDataReady={() => {
      //   console.info("DATA READY!");
      // }}
      // onConfigReady={() => {
      //   console.info("CONFIG READY!");
      // }}
      // onSegmentStart={(x) => {
      //   console.info("SEGMENT START!", x);
      // }}
      onDOMLoaded={() => {
        speed && lottieRef?.current?.setSpeed(speed);
      }}
      // onLoadedImages={() => {
      //   console.info("IMAGES LOADED!");
      // }}
      // onLoopComplete={() => {
      //   console.info("LOOP COMPLETE!");
      // }}
    />
  );
};
LottieControl.defaultProps = {
  style: {},
  speed: null,
};

export default LottieControl;
