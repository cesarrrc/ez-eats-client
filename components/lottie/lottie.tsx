import React, {
  useState,
  useRef,
  useEffect,
  LegacyRef,
  MutableRefObject,
  RefObject,
} from "react";
import Lottie from "lottie-react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import * as animationData from "../../lib/lottie/thumbs-up.json";

import classes from "./lottie-control.module.css";

type Props = {
  lottie: any | null;
  wh: { w: number; h: number };
  style: any;
};

const LottieControl = ({ lottie, wh, style }: Props) => {
  const lottieRef = useRef();

  // const winDim = useWindowDimensions();

  useEffect(() => {
    lottieRef?.current?.setSpeed(0.5);
  }, []);

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
    />
  );
};
LottieControl.defaultProps = {
  style: {},
};

export default LottieControl;
