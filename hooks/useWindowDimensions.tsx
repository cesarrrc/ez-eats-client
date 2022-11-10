import React, { useState, useEffect } from "react";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

const useWindowDimensions = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    console.log('effect')
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowSize;
};

export default useWindowDimensions;
