import React from "react";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";

const List = ({ inline, ordered, className, children, ...otherProps }) =>
   React.createElement(
      ordered ? "ol" : "ul",
      {
         ...otherProps,
         ...{ className: (inline ? "list-inline " : "") + className }
      },
      children
   );

const ListImgItem = ({
   inline,
   className,
   childClass,
   src,
   alt,
   imgProps,
   ...otherProps
}) => (
   <li
      {...otherProps}
      className={(inline ? "list-inline-item " : "") + className}
   >
      <img {...imgProps} src={src} alt={alt} />
   </li>
);

const ListLinkItem = ({
   inline,
   className,
   childClass,
   to,
   name,
   children,
   linkProps,
   ...otherProps
}) => (
   <li
      {...otherProps}
      className={(inline ? "list-inline-item " : "") + className}
   >
      <NavLink {...linkProps} className={childClass} to={to}>
         {children ? children : name}
      </NavLink>
   </li>
);

const ListGroup = ({ noAction, className, children, ...otherProps }) =>
   React.createElement(
      noAction ? "ul" : "div",
      {
         ...otherProps,
         className: "list-group " + className
      },
      children
   );

const ListGroupItem = ({ to, click, className, name, ...otherProps }) => {
   let tagName = "li",
      props = {
         ...otherProps,
         className: "list-group-item"
      };
   if (typeof click === "function") {
      tagName = "button";
      props.onClick = click;
   } else if (typeof to === "string" && to) {
      tagName = "NavLink";
      props.to = to;
   }
   if (tagName !== "li") props.className += " list-group-item-action";
   if (className) props.className += " " + className;
   if (tagName === "NavLink") return <NavLink {...props}>{name}</NavLink>;
   return React.createElement(tagName, props, name);
};

ListGroup.propTypes = {
   items: PropTypes.arrayOf(PropTypes.object),
   noAction: PropTypes.bool,
   className: PropTypes.string,
   children: PropTypes.node
};
ListGroup.defaultProps = {
   items: [{}],
   noAction: false,
   className: "",
   children: ""
};

ListGroupItem.propTypes = {
   to: PropTypes.string,
   click: PropTypes.func,
   className: PropTypes.string,
   name: PropTypes.string
};
ListGroup.defaultProps = {
   className: "",
   name: ""
};

export { List, ListLinkItem, ListImgItem, ListGroup, ListGroupItem };
