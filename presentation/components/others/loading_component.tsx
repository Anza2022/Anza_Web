import React, { PropsWithChildren } from "react";

const LoadingComponent = (
  props: PropsWithChildren<{ loading: boolean; color: string }>
) => {
  return (
    <div
      style={{ borderTopColor: "transparent" }}
      className={`w-5 h-5 border-4 border-${
        props.color
      } dark:border-red border-double rounded-full animate-spin mr-2 ${
        props.loading ? "" : "hidden"
      }`}
    ></div>
  );
};

export default LoadingComponent;
