import React, { Fragment as Frag, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

import UXBtn from "./Buttons";
import Loader from "./Loader";

import Overlay from "./Overlays";
import { RelPos, AbsPos } from "./Positions";

const EditableImage = ({
  camClass,
  camAttrs,
  className,
  style,
  width,
  height,
  defaultImg,
  src,
  alt,
  imgClass,
  imgAttrs,
  noEdit,
  name,
  inputAttrs,
  onChange,
  maxSize,
  showAdder,
  clickerText,
  clickerAttrs,
  onClick,
  noClicker,
  children,
  ...props
}) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setEditMode(showAdder);
  }, [showAdder]);

  const Image = ({ hasOverlay, ...props }) => (
    <img
      {...imgAttrs}
      {...props}
      className={
        (hasOverlay ? "overlay" : "") + (imgClass ? " " + imgClass : "")
      }
      src={src || defaultImg}
      alt={alt}
    />
  );

  let rawImgStyle = {};
  if (typeof width !== "undefined") rawImgStyle = { ...rawImgStyle, width };
  if (typeof height !== "undefined") rawImgStyle = { ...rawImgStyle, height };

  if (noEdit && !children) return <Image style={rawImgStyle} />;

  return (
    <RelPos
      {...props}
      style={{
        ...style,
        width: typeof width !== "undefined" ? width : "100%",
        height: typeof height !== "undefined" ? height : "200px"
      }}
    >
      <Image hasOverlay />
      {!noEdit && (
        <UXBtn
          type={["sm", "dark"]}
          {...camAttrs}
          style={{ top: "0", right: "0", zIndex: "95" }}
          className={"abs-pos" + (camClass ? " " + camClass : "")}
          onClick={() => setEditMode(!editMode)}
        >
          <FontAwesomeIcon icon={faCamera} />
        </UXBtn>
      )}
      {!editMode && children ? children : ""}
      {editMode && (
        <Frag>
          <Overlay />
          <AbsPos
            vhCentered
            className={
              "p-3 bg-white text-center" + (reading ? " busy faded-40" : "")
            }
            style={{ width: "97%", zIndex: "92" }}
          >
            {error && <span className="text-danger">{error}</span>}
            <div>
              <label>
                <FontAwesomeIcon icon={faCloudUploadAlt} />
                <input
                  accept={
                    inputAttrs.accept || "image/jpeg, image/jpg, image/png"
                  }
                  {...{ ...inputAttrs, ...(name ? { name } : {}) }}
                  type="file"
                  className="d-none"
                  onChange={e => onChange(e, setReading, setError)}
                />
              </label>
            </div>
            {!noClicker && (
              <div>
                <UXBtn
                  type={["sm", "dark"]}
                  {...{ ...clickerAttrs, ...(name ? { name } : {}) }}
                  onClick={e => onClick(e, setLoading, setError, setEditMode)}
                  disabled={loading}
                >
                  {loading ? <Loader /> : clickerText}
                </UXBtn>
              </div>
            )}
          </AbsPos>
        </Frag>
      )}
    </RelPos>
  );
};

EditableImage.defaultProps = {
  camAttrs: {},
  imgAttrs: {},
  noEdit: false,
  inputAttrs: {},
  onChange: () => {},
  clickerText: "GO",
  clickerAttrs: {},
  onClick: () => {},
  noClicker: false
};

EditableImage.propTypes = {
  camClass: PropTypes.string,
  camAttrs: PropTypes.object,
  imgClass: PropTypes.string,
  imgAttrs: PropTypes.object,
  noEdit: PropTypes.bool,
  inputAttrs: PropTypes.object,
  onChange: PropTypes.func,
  maxSize: PropTypes.number,
  showAdder: PropTypes.bool,
  clickerText: PropTypes.string,
  clickerAttrs: PropTypes.object,
  onClick: PropTypes.func,
  noClicker: PropTypes.bool
};

export { EditableImage };
