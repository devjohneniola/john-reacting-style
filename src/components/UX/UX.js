import React from "react";
import PropTypes from "prop-types";

export const Container = ({ fluid, className, ...props }) => (
  <div
    {...props}
    className={
      "container" + (fluid ? "-fluid" : "") + (className ? " " + className : "")
    }
  />
);

export const Row = ({
  className,
  noGutters,
  vert,
  vAlign,
  children,
  ...otherProps
}) => {
  let verAlignClass = "";
  if (vAlign) {
    if (/^(start|top|up|above)$/.test(vAlign)) verAlignClass = "start";
    else if (/^(middle|center)$/.test(vAlign)) verAlignClass = "center";
    else if (/^(end|bottom|down|below|beneath)$/.test(vAlign))
      verAlignClass = "end";
  }

  return (
    <div
      {...otherProps}
      style={vert ? { flexFlow: "column" } : {}}
      className={
        "row" +
        (noGutters ? " no-gutters" : "") +
        (verAlignClass ? " flexes-v-" + verAlignClass : "") +
        (className ? " " + className : "")
      }
    >
      {children}
    </div>
  );
};

export const Col = ({
  size,
  className,
  id,
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  ...otherProps
}) => {
  let cName = "col";
  if (size && /^(\d+|auto)$/.test(size)) cName += "-" + size;

  const prps = ["xs", "sm", "md", "lg", "xl"];
  cName += [xs, sm, md, lg, xl]
    .map((prp, ind) =>
      prp && /^(\d+|auto)$/.test(prp) ? ` col-${prps[ind]}-${prp}` : ""
    )
    .join("");

  if (className) cName += " " + className;

  return (
    <div {...otherProps} className={cName}>
      {children}
    </div>
  );
};

let _1to12 = new Array(12).fill(0);
_1to12 = [
  ..._1to12.map((el, ind) => ind + 1),
  ..._1to12.map((el, ind) => String(ind + 1))
];
const xs = PropTypes.oneOf(["auto", ..._1to12]);

Row.defaultProps = {
  className: "",
  children: ""
};
Row.propTypes = {
  className: PropTypes.string,
  vAlign: PropTypes.string,
  vert: PropTypes.bool
};

Col.defaultProps = {
  className: "",
  children: ""
};
Col.propTypes = {
  size: xs,
  xs,
  sm: xs,
  md: xs,
  lg: xs,
  xl: xs,
  className: PropTypes.string
};
