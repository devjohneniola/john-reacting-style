import React from "react";
import PropTypes from "prop-types";

import { Row, Col } from "./UX";

const UXCard = ({
   src,
   alt,
   beforeTitle,
   title,
   titleBold,
   afterTitle,
   titleTag,
   beforeText,
   afterText,
   hasBody,
   children,
   body,
   width
}) => {
   var cardImg = "",
      cardBody = "",
      cardTitle = "",
      cardText = "";

   if (title) {
      let className = "card-title";
      if (titleBold) className += " text-bold";
      cardTitle = React.createElement(titleTag, { className }, title);
   }

   if (src && alt)
      cardImg = <img className="card-img-top" src={src} alt={alt} />;

   if (hasBody) {
      let body = "";
      if (children) body = <div className="card-text">{children}</div>;
      cardBody = (
         <div className="card-body">
            {beforeTitle}
            {cardTitle}
            {afterTitle}
            {beforeText}
            {body}
            {afterText}
         </div>
      );
   } else if (body)
      cardText = (
         <div className="card-body">
            {cardTitle}
            <p className="card-text">{body}</p>
         </div>
      );

   if (typeof width) width = { style: { width: width } };

   return (
      <div className="card" {...width}>
         {cardImg}
         {cardText}
         {cardBody}
      </div>
   );
};

const UXCardHor = ({
   type,
   cardClass,
   colClasses,
   colSizes,
   colSmSizes,
   colMdSizes,
   src,
   alt,
   imgClass,
   imgReplace,
   noSpace,
   children,
   beforeTitle,
   title,
   titleTag,
   titleClass,
   titleProps,
   afterTitle,
   beforeText,
   text,
   textProps,
   textClass,
   afterText
}) => {
   let rowProps = noSpace ? { noGutters: true } : {};
   let cardTitle = title
      ? React.createElement(
           titleTag,
           { ...titleProps, ...{ className: titleClass } },
           title
        )
      : "";

   const isLeft = type === "left";
   let firstInd = isLeft ? 0 : 1;
   let secondInd = isLeft ? 1 : 0;

   colSizes = colSizes.split("x");
   colSmSizes = colSmSizes.split("x");
   colMdSizes = colMdSizes.split("x");
   colClasses = colClasses.split("[x]");
   const col1Size = colSizes[firstInd];
   const col2Size = colSizes[secondInd];
   const col1SmSize = colSmSizes[firstInd];
   const col2SmSize = colSmSizes[secondInd];
   const col1MdSize = colMdSizes[firstInd];
   const col2MdSize = colMdSizes[secondInd];
   const col1Class = colClasses[firstInd];
   const col2Class = colClasses[secondInd];
   colSizes = colMdSizes = colClasses = firstInd = secondInd = null;

   const imgCol = (
      <Col
         size={col1Size}
         sm={col1SmSize}
         md={col1MdSize}
         className={col1Class}
      >
         {src && (
            <img
               src={src}
               alt={alt}
               className={
                  "card-img img-fluid" + (imgClass ? " " + imgClass : "")
               }
            />
         )}
         {imgReplace}
      </Col>
   );

   if (children) children = <div className="card-body">{children}</div>;

   return (
      <div className={"card" + (cardClass ? " " + cardClass : "")}>
         <Row {...rowProps}>
            {isLeft && imgCol}
            <Col
               size={col2Size}
               sm={col2SmSize}
               md={col2MdSize}
               className={col2Class}
            >
               {children ? (
                  children
               ) : (
                  <div className="card-body">
                     {beforeTitle}
                     {cardTitle}
                     {afterTitle}
                     {beforeText}
                     <p
                        {...textProps}
                        className={
                           "card-text" + (textClass ? " " + textClass : "")
                        }
                     >
                        {text}
                     </p>
                     {afterText}
                  </div>
               )}
            </Col>
            {!isLeft && imgCol}
         </Row>
      </div>
   );
};

const UXCardLeft = props => <UXCardHor {...props} />;
const UXCardRight = props => <UXCardHor {...props} type="right" />;

UXCard.defaultProps = {
   beforeTitle: "",
   titleTag: "h6",
   width: ""
};

UXCard.propTypes = {
   titleTag: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
   width: PropTypes.string
};

UXCardHor.defaultProps = {
   type: "left",
   colSizes: "2x10",
   colSmSizes: "x",
   colMdSizes: "x",
   colClasses: "[x]",
   alt: "",
   imgReplace: "",
   beforeTitle: "",
   titleTag: "h6",
   titleProps: {},
   afterTitle: "",
   beforeText: "",
   textProps: {},
   afterText: ""
};
UXCardHor.propTypes = {
   type: PropTypes.string,
   cardClass: PropTypes.string,
   colSizes: PropTypes.string,
   colClasses: PropTypes.string,
   alt: PropTypes.string,
   imgClass: PropTypes.string,
   titleTag: PropTypes.string,
   titleClass: PropTypes.string,
   titleProps: PropTypes.object,
   textProps: PropTypes.object,
   textClass: PropTypes.string
};

export default UXCard;
export { UXCardLeft, UXCardRight };
