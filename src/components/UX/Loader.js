import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loader = ({ spinning }) => (
  <FontAwesomeIcon icon={faSpinner} spin={spinning} pulse={spinning} />
);

Loader.defaultProps = { spinning: true };
Loader.propTypes = { spinning: PropTypes.bool };

export default Loader;
