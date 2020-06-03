import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { UXInput, UXBtn } from "./";

const Text = ({
  tag,
  fontFamily,
  align,
  lineHeight,
  children,
  style,
  className: cN,
  ...props
}) => {
  const className = (align ? " text-" + align : "") + (cN ? " " + cN : "");
  return React.createElement(tag, {
    ...props,
    ...{ style: { fontFamily, lineHeight, ...style }, className },
    children,
  });
};

Text.propTypes = {
  align: PropTypes.oneOf(["left", "center", "right", "justify"]),
  style: PropTypes.object,
  className: PropTypes.string,
};
Text.defaultProps = {
  tag: "p",
  fontFamily: "open sans condensed",
  style: {},
};

const TruncateTextIf = ({
  text,
  maxChars,
  noEllipsis,
  viewTimeout,
  raw,
  className,
  ...props
}) => {
  const [viewAll, setViewAll] = useState(false);

  if (!viewTimeout) viewTimeout = (text.trim().split(" ").length + 1) * 1.15;

  useEffect(() => {
    (() => {
      if (!viewAll) return;
      setTimeout(() => setViewAll(false), viewTimeout * 1000);
    })();
  }, [viewAll, viewTimeout]);

  let tText = text;
  const textLen = tText.length;
  if (textLen > maxChars)
    tText = tText.substr(0, maxChars - 2) + (!noEllipsis ? "..." : "");

  if (raw) return tText;

  if (!viewAll)
    className = "text-truncate" + (className ? " " + className : "");

  let attrs = { ...props };
  if (className) attrs = { ...attrs, className };
  if (tText.length < textLen) {
    if (!viewAll) attrs = { ...attrs, title: text };
    attrs = { ...attrs, onClick: () => setViewAll(!viewAll) };
  }
  if (!viewAll) return <span {...attrs}>{tText}</span>;
  return (
    <pre style={{ margin: "0" }} {...attrs}>
      {text}
    </pre>
  );
};

TruncateTextIf.propTypes = {
  text: PropTypes.string.isRequired,
  maxChars: PropTypes.number.isRequired,
  noEllipsis: PropTypes.bool,
  viewTimeout: PropTypes.number,
  className: PropTypes.string,
};

const EditableText = ({
  defaultText,
  textPrefix,
  text,
  textSuffix,
  noEdit,
  editBtnClass,
  textClass,
  textAttrs,
  onChange,
  onBlur,
  name,
  textarea,
  maxLength,
  inputClass,
  fromDict,
  dictionary,
  ...props
}) => {
  const [editMode, setEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasEditError, setHasEditError] = useState(false);

  if (!text && !defaultText) return "";

  let spanAttrs = { ...textAttrs };
  const spanTitle =
    (props.title ? props.title + " " : "") + (!noEdit ? "Click to edit" : "");
  if (spanTitle) spanAttrs.title = spanTitle;
  let spanClass =
    (textClass ? textClass + " " : "") +
    (spanAttrs.className ? spanAttrs.className + " " : "") +
    (hasEditError ? "text-danger " : "") +
    (!text || isEditing ? "faded-40 " : "") +
    (isEditing ? "busy " : "");
  if (spanClass) spanAttrs.className = spanClass;

  const spanText = noEdit ? text : text || defaultText;

  if (noEdit || !editMode) {
    const spText = spanText
      ? `${textPrefix ? textPrefix : ""} ${spanText} ${
          textSuffix ? textSuffix : ""
        }`
      : "";
    return (
      <React.Fragment>
        <span {...spanAttrs} onClick={() => setEditMode(true)}>
          {maxLength && (
            <TruncateTextIf
              text={spText}
              maxChars={Number(maxLength)}
              noEllipsis
              raw
            />
          )}
          {!maxLength && spText}
        </span>
        {!noEdit && (
          <UXBtn
            type="sm"
            className={"fs-9" + (editBtnClass ? " " + editBtnClass : "")}
            style={{ padding: "1.5px" }}
            onClick={() => setEditMode(true)}
          >
            <FontAwesomeIcon icon={faPen} />
          </UXBtn>
        )}
      </React.Fragment>
    );
  }

  let inputAttrs = {
    ...props,
    className: inputClass || "",
    onChange,
    name,
    placeholder: defaultText,
    value: text || "",
    onBlur: (e) => {
      setEditMode(false);
      onBlur(e, setIsEditing, setHasEditError);
    },
  };
  if (maxLength) inputAttrs = { ...inputAttrs, maxLength };
  if (!textarea) inputAttrs = { ...inputAttrs, ...{ fromDict, dictionary } };

  if (textarea)
    return (
      <textarea
        {...inputAttrs}
        className={
          "form-control" + (props.className ? " " + props.className : "")
        }
      ></textarea>
    );

  return <UXInput {...inputAttrs} />;
};

EditableText.propTypes = {
  textarea: PropTypes.bool,
  noEdit: PropTypes.bool,
  editBtnClass: PropTypes.string,
  text: PropTypes.string,
  defaultText: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  fromDict: PropTypes.bool,
  dictionary: PropTypes.arrayOf(PropTypes.string),
};

EditableText.defaultProps = {
  text: "",
  defaultText: "",
  noEdit: false,
  textarea: false,
  onChange: () => {},
  onBlur: () => {},
  fromDict: false,
  dictionary: [],
};

export { Text, TruncateTextIf, EditableText };
