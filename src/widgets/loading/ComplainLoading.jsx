import React from "react";
import Lottie from "react-lottie";
// import animationData from "./loading-lottie.json";
import animationData from "./searching.json";

const ComplainLoading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={400} width={1000} />;
};

export default ComplainLoading;
