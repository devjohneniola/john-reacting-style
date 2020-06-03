import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

import UXBtn from "./Buttons";

export const RatingStar = ({ className, rated, ...props }) => (
  <FontAwesomeIcon
    {...props}
    className={"text-warning" + (className ? " " + className : "")}
    icon={rated <= 0.25 ? faStarEmpty : rated <= 0.75 ? faStarHalfAlt : faStar}
  />
);

export const RatingBtn = ({
  starClassName: className,
  rated,
  type,
  className: cName,
  ...props
}) => (
  <UXBtn
    className={"p-0" + (cName ? " " + cName : "")}
    type={[...["sm"], ...(typeof type === "string" ? [type] : type)]}
    {...props}
  >
    <RatingStar {...{ className, rated }} />
  </UXBtn>
);

export const RatingsBar = ({ ratings, maxRatings, handleClick }) => {
  const [clicks, setClicks] = useState(new Array(maxRatings).fill(0));

  if (ratings > maxRatings) return "";

  const intRates = parseInt(ratings);
  let rates = [...clicks];
  for (let i = 0; i < maxRatings; i++)
    if (i < intRates) rates[i] = 1;
    else if (i === intRates) rates[i] = ratings - intRates;
    else rates[i] = 0;

  return (
    <React.Fragment>
      {rates.map((rated, ind) =>
        handleClick ? (
          <RatingBtn
            key={ind}
            rated={rated}
            onClick={() => {
              let clicksCount = clicks[ind];
              if (clicksCount === 0) clicksCount = 0.5;
              else if (clicksCount === 0.5) clicksCount = 1.0;
              else clicksCount = 0;

              let newClicks = [...clicks];
              newClicks[ind] = clicksCount;
              setClicks(newClicks);
              handleClick(ind + clicksCount);
            }}
          />
        ) : (
          <RatingStar key={ind} rated={rated} />
        )
      )}
    </React.Fragment>
  );
};

RatingBtn.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};
RatingBtn.defaultProps = {
  type: []
};

RatingsBar.propTypes = {
  ratings: PropTypes.number,
  maxRatings: PropTypes.number,
  handleClick: PropTypes.func
};
RatingsBar.defaultProps = {
  ratings: 0,
  maxRatings: 5
};

export default RatingsBar;
