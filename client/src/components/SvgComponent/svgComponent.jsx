// SvgComponent.jsx
import React from "react";

const SvgComponent = ({
  svg: Svg,
  className = "",
  height = "auto",
  width = "auto",
}) => {
  return (
    <div className={className}>
      <Svg style={{ height: height, width: width }} />
    </div>
  );
};

export default SvgComponent;
