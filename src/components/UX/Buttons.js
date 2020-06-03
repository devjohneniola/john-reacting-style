import React from "react";
import PropTypes from "prop-types";

const UXBtn = ({
  type,
  htmlType,
  className,
  text,
  children,
  ...otherProps
}) => {
  let btnClass = "btn";
  if (Array.isArray(type))
    type.forEach(typ => (typ ? (btnClass += " btn-" + typ) : ""));
  else if (typeof type === "string") btnClass += " btn-" + type;
  if (className) btnClass += " " + className;
  return (
    <button {...otherProps} type={htmlType} className={btnClass}>
      {text ? text : children}
    </button>
  );
};

UXBtn.defaultProps = {
  htmlType: "button"
};
UXBtn.propTypes = {
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  htmlType: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string
};

const UXBtnBlue = ({
  notBlock,
  noSpace,
  htmlType,
  type,
  className,
  ...props
}) => {
  let cName = "treeprite-blue-bg auth-input";
  if (notBlock && !noSpace) cName += " px-5";
  if (className) cName += " " + className;

  let typ = [...["sm"], ...(notBlock ? [] : ["block"])];
  if (typeof type === "string" && type) typ = [...typ, [type]];
  else if (Array.isArray(type)) typ = [...typ, ...type];

  return <UXBtn {...{ ...props, htmlType, type: typ, className: cName }} />;
};

UXBtnBlue.defaultProps = {
  htmlType: "submit"
};
UXBtnBlue.propTypes = {
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  htmlType: PropTypes.string,
  className: PropTypes.string
};

export default UXBtn;

export { UXBtnBlue };
