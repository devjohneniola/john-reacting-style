import React, { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import UXBtn from "./Buttons";

const FormReports = ({ info, err, suc, ...props }) => (
  <div id="info-err-suc" {...props}>
    {info && <span className="text-info">{info}</span>}
    {err && <span className="text-danger">{err}</span>}
    {suc && <span className="text-success">{suc}</span>}
  </div>
);

const FormGroup = ({ className, children }) => (
  <div className={"form-group " + className}>{children}</div>
);

const UXLabel = ({ partner, text, ...props }) => (
  <label htmlFor={partner} {...props}>
    {text}
  </label>
);

const UXInput = ({
  grouped,
  groupClass,
  groupAttrs,
  groupPrepend,
  children,
  type,
  className,
  noForce,
  plaintext,
  fromDict,
  dictionary,
  ...otherProps
}) => {
  className =
    "form-control text-field" +
    (plaintext ? " form-control-plaintext" : "") +
    (className ? " " + className : "");

  let dict = "",
    dictID;
  if (
    (typeof otherProps.value === "undefined" || otherProps.value || fromDict) &&
    dictionary.length
  ) {
    dictID = (otherProps.id || "") + "_dictionary";
    dict = (
      <datalist id={dictID}>
        {dictionary.map((word, ind) => (
          <option key={ind} value={word} />
        ))}
      </datalist>
    );
  }

  const _UXInput = (
    <React.Fragment>
      <input
        {...otherProps}
        {...{
          type,
          className,
          required: !noForce,
          ...(dictID ? { list: dictID } : {})
        }}
      />
      {dict}
    </React.Fragment>
  );

  if (!grouped) return _UXInput;

  let prepend = "",
    append = "";

  if (groupPrepend)
    prepend = <div className="input-group-append">{children}</div>;
  else append = <div className="input-group-append">{children}</div>;

  return (
    <div className={"input-group " + groupClass} {...groupAttrs}>
      {prepend}
      {_UXInput}
      {append}
    </div>
  );
};

const UXInputPass = ({ className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <UXInput
      {...props}
      className={"can-show-pass" + (className ? " " + className : "")}
      type={!showPassword ? "password" : "text"}
      grouped
    >
      <UXBtn
        className="show-password"
        onClick={() => setShowPassword(!showPassword)}
      >
        <FAIcon icon={faEye} />
      </UXBtn>
    </UXInput>
  );
};

const UXInputChk = ({
  radio,
  inline,
  invalid,
  noForce,
  inputClass,
  labelClass,
  groupClass,
  groupAttrs,
  ...otherProps
}) => {
  let _UXInput,
    className = "form-check-input";
  if (inline) className += " form-check-inline";
  if (invalid) className += " is-invalid";
  if (inputClass) className += " " + inputClass;
  let inputProps = {
    type: radio ? "radio" : "checkbox",
    className,
    required: !noForce
  };
  _UXInput = <input {...otherProps} {...inputProps} />;
  var labelAttrs = { className: "form-check-label " + labelClass };
  const { id, text } = otherProps;
  if (id) labelAttrs.partner = id;
  if (text) labelAttrs.text = text;
  return (
    <div
      className={
        "form-check" +
        (inline ? " form-check-inline" : "") +
        (groupClass ? " " + groupClass : "")
      }
      {...groupAttrs}
    >
      {_UXInput}
      <UXLabel {...labelAttrs} />
    </div>
  );
};

const UXSelect = ({
  noForce,
  noEmptyOption,
  chooseLabel,
  className,
  children,
  ...props
}) => (
  <select
    {...{ ...props, ...(props.required ? {} : { required: !noForce }) }}
    className={"form-control" + (className ? " " + className : "")}
  >
    {!noEmptyOption && <option value="">{chooseLabel || "Choose"}</option>}
    {children}
  </select>
);

FormReports.defaultProps = {
  info: "",
  err: "",
  suc: ""
};

FormGroup.defaultProps = {
  className: "",
  children: ""
};
FormGroup.propTypes = {
  className: PropTypes.string
};

UXLabel.propTypes = {
  partner: PropTypes.string
};

UXInput.defaultProps = {
  groupClass: "",
  groupAttrs: {},
  type: "text",
  className: "",
  fromDict: false,
  dictionary: []
};
UXInput.propTypes = {
  groupClass: PropTypes.string,
  groupAttrs: PropTypes.object,
  type: PropTypes.string,
  className: PropTypes.string,
  fromDict: PropTypes.bool,
  dictionary: PropTypes.arrayOf(PropTypes.string)
};

UXInputPass.defaultProps = {
  autoComplete: "off"
};
UXInputPass.propTypes = {
  className: PropTypes.string
};

UXInputChk.defaultProps = {
  inputClass: "",
  labelClass: ""
};
UXInput.propTypes = {
  inputClass: PropTypes.string,
  labelClass: PropTypes.string
};

UXSelect.propTypes = {
  noForce: PropTypes.bool,
  noEmptyOption: PropTypes.bool,
  chooseLabel: PropTypes.string
};
UXSelect.defaultProps = {
  noForce: false
};

export {
  FormReports,
  FormGroup,
  UXLabel,
  UXInput,
  UXInputPass,
  UXInputChk,
  UXSelect
};
