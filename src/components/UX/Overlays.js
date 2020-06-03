import React from "react";
import PropTypes from "prop-types";

const Overlay = ({ zIndex, style, blockScroll, className, ...props }) => (
  <div
    {...props}
    style={{ ...style, ...(typeof zIndex === "number" ? { zIndex } : {}) }}
    className={
      "overlay" +
      (blockScroll ? " block-scrolling" : "") +
      (className ? " " + className : "")
    }
  ></div>
);

Overlay.defaultProps = {
  style: {}
};

Overlay.propTypes = {
  zIndex: PropTypes.number,
  style: PropTypes.object
};

export default Overlay;
