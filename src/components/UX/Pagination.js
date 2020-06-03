import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

import UXBtn from "./Buttons";

const NavBtn = ({ type, className, icon, children, ...props }) => (
  <UXBtn
    type={[...["sm"], ...type]}
    className={className ? " " + className : ""}
    {...props}
  >
    {icon ? <FontAwesomeIcon icon={icon} /> : children}
  </UXBtn>
);

const Pagination = ({
  label,
  align,
  curPage,
  maxPages,
  prevClick,
  nextClick
}) => {
  let ulClass = "pagination";
  if (align) ulClass += " justify-content-" + align;
  return (
    <nav aria-label={label}>
      <ul className={ulClass}>
        <li className="page-item">
          <NavBtn
            onClick={prevClick}
            disabled={curPage === 1}
            icon={faChevronLeft}
          />
        </li>
        <li className="page-item">
          <NavBtn
            onClick={nextClick}
            disabled={curPage === maxPages}
            icon={faChevronRight}
          />
        </li>
      </ul>
    </nav>
  );
};

NavBtn.defaultProps = { type: [] };

NavBtn.propTypes = {
  type: PropTypes.array,
  className: PropTypes.string
};

Pagination.defaultProps = {
  label: "",
  curPage: 1,
  maxPages: 1,
  prevClick: () => {},
  nextClick: () => {}
};

Pagination.propTypes = {
  label: PropTypes.string,
  curPage: PropTypes.number,
  maxPages: PropTypes.number,
  prevClick: PropTypes.func,
  nextClick: PropTypes.func
};

export default Pagination;
