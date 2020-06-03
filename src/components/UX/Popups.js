import React from "react";
import PropTypes from "prop-types";

import { UXCard, UXBtn, Row, Col } from "./";

const ConfirmDialog = ({
  info,
  yesType,
  yesHtmlType,
  yesText,
  yesClass,
  yesClick,
  noType,
  noHtmlType,
  noText,
  noClass,
  noClick,
  afterClick,
  ...props
}) => (
  <div
    style={{ overflowY: "auto" }}
    className="confirm-dialog dialog fixed-pos vh-center vh-center-real"
  >
    <UXCard {...props} hasBody>
      {info && (
        <div className="card-text py-3">
          {typeof info === "function" ? info(afterClick) : info}
        </div>
      )}
      <Row noGutters>
        <Col
          {...(yesType.indexOf("block") < 0 ? { size: "auto" } : {})}
          className="ml-auto"
        >
          <UXBtn
            {...{ ...(yesClass ? { className: yesClass } : {}) }}
            type={[
              ...["sm"],
              ...(typeof yesType === "string" ? [yesType] : yesType)
            ]}
            htmlType={yesHtmlType}
            onClick={() => {
              yesClick();
              afterClick();
            }}
          >
            {yesText}
          </UXBtn>
        </Col>
        <Col
          className="pl-2"
          {...(noType.indexOf("block") < 0 ? { size: "auto" } : {})}
        >
          <UXBtn
            {...{ ...(noClass ? { className: noClass } : {}) }}
            type={[
              ...["sm"],
              ...(typeof noType === "string" ? [noType] : noType)
            ]}
            htmlType={noHtmlType}
            onClick={() => {
              noClick();
              afterClick();
            }}
          >
            {noText}
          </UXBtn>
        </Col>
      </Row>
    </UXCard>
  </div>
);

ConfirmDialog.defaultProps = {
  title: "Are you really sure about this?",
  titleTag: "h4",
  yesType: "",
  yesHtmlType: "button",
  yesText: "Yes",
  yesClick: () => {},
  noType: "",
  noText: "No",
  noHtmlType: "button",
  noClick: () => {},
  afterClick: () => {}
};

ConfirmDialog.propTypes = {
  yesType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  yesHtmlType: PropTypes.string,
  yesText: PropTypes.string,
  yesClass: PropTypes.string,
  yesClick: PropTypes.func,
  noType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  noHtmlType: PropTypes.string,
  noText: PropTypes.string,
  noClass: PropTypes.string,
  noClick: PropTypes.func,
  afterClick: PropTypes.func
};

const PopupModal = ({
  content,
  noOk,
  okText,
  okType,
  okHtmlType,
  okClass,
  okClick,
  afterClick,
  ...props
}) => (
  <div
    style={{ overflowY: "auto" }}
    className="popup-modal dialog fixed-pos vh-center vh-center-real"
  >
    <UXCard {...props} hasBody>
      {content && (
        <div className="card-text py-3">
          {typeof content === "function" ? content(afterClick) : content}
        </div>
      )}
      {!noOk && (
        <div className="text-right">
          <UXBtn
            {...{ ...(okClass ? { className: okClass } : {}) }}
            type={[
              ...["sm"],
              ...(typeof okType === "string" ? [okType] : okType)
            ]}
            htmlType={okHtmlType}
            onClick={() => {
              okClick();
              afterClick();
            }}
          >
            {okText}
          </UXBtn>
        </div>
      )}
    </UXCard>
  </div>
);

PopupModal.defaultProps = {
  title: "Alert",
  titleTag: "h4",
  noOk: false,
  okText: "OK",
  okType: "",
  okHtmlType: "button",
  okClick: () => {},
  afterClick: () => {}
};

PopupModal.propTypes = {
  noOk: PropTypes.bool,
  okText: PropTypes.string,
  okType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  okHtmlType: PropTypes.string,
  okClass: PropTypes.string,
  okClick: PropTypes.func,
  afterClick: PropTypes.func
};

export { ConfirmDialog, PopupModal };
