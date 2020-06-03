import React from "react";

const Pos = ({ tag, type, className, vhCentered, children, ...props }) =>
  React.createElement(
    tag,
    {
      className:
        `${type}-pos` +
        (vhCentered ? " vh-center vh-center-real" : "") +
        (className ? " " + className : ""),
      ...props
    },
    children
  );

Pos.defaultProps = {
  tag: "div",
  type: "static"
};

const AbsPos = props => <Pos type="abs" {...props} />;
AbsPos.defaultProps = {
  tag: "div"
};

const FixedPos = props => <Pos type="fixed" {...props} />;
FixedPos.defaultProps = {
  tag: "div"
};

const StickyPos = props => <Pos type="sticky" {...props} />;
StickyPos.defaultProps = {
  tag: "div"
};

const RelPos = ({ tag, className, topRightCorner, children, ...props }) =>
  React.createElement(
    tag,
    {
      className: "rel-pos" + (className ? " " + className : ""),
      ...props
    },
    <React.Fragment>
      {topRightCorner && (
        <AbsPos style={{ top: "5px", right: "5px" }}>{topRightCorner}</AbsPos>
      )}
      {children}
    </React.Fragment>
  );
RelPos.defaultProps = {
  tag: "div"
};

export { AbsPos, FixedPos, RelPos, StickyPos };
