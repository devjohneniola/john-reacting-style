import React from "react";
import PropTypes from "prop-types";

import { Row, Col } from "./UX";

const Page = ({
  beforeTitle,
  title,
  titleClass,
  titleTag,
  afterTitle,
  children,
  className,
  ...props
}) => (
  <div style={{ backgroundColor: "#eee" }} className="body-main p-2 p-md-5">
    <div style={{ maxWidth: "960px" }} className="mx-auto">
      {(title || beforeTitle || afterTitle) && (
        <Row>
          {beforeTitle && <Col>{beforeTitle}</Col>}
          {title && (
            <Col>
              {React.createElement(
                titleTag,
                {
                  className:
                    "text-bold p-3" + (titleClass ? " " + titleClass : "")
                },
                title
              )}
            </Col>
          )}
          {afterTitle && <Col>{afterTitle}</Col>}
        </Row>
      )}
      <div {...{ ...props, className }}>{children}</div>
    </div>
  </div>
);

Page.propTypes = {
  titleTag: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"])
};

Page.defaultProps = {
  titleTag: "h2",
  className: "bg-white"
};

export default Page;
