import React from "react";
import PropTypes from "prop-types";

const UXBanner = ({
  type,
  src,
  noOverlay,
  title,
  wordings,
  maxWidth,
  infoWidth,
  children
}) => {
  let style = {};
  if (src) {
    style = {
      ...style,
      backgroundImage: `url(${src})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
    if (maxWidth) style = { ...style, maxWidth };
    if (!noOverlay)
      style = {
        ...style,
        backgroundColor: "rgba(0,0,0,0.75)",
        backgroundBlendMode: "overlay"
      };
  }

  let infoStyle = {};
  if (infoWidth) infoStyle = { ...infoStyle, width: infoWidth };

  return (
    <section style={style} className={type + "-banner ux-banner rel-pos"}>
      <div
        style={infoStyle}
        className="info abs-pos vh-center-real vh-center text-white text-center"
      >
        {children ? (
          children
        ) : (
          <React.Fragment>
            {title && <h3>{title}</h3>}
            {wordings && <p className="mt-5">{wordings}</p>}
          </React.Fragment>
        )}
      </div>
    </section>
  );
};

UXBanner.defaultProps = {
  type: "bnr",
  title: "",
  wordings: ""
};

UXBanner.propTypes = {
  type: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  wordings: PropTypes.string,
  infoWidth: PropTypes.string,
  maxWidth: PropTypes.string
};

export default UXBanner;
