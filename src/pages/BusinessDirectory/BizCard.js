import React, { useContext } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPhoneAlt,
  faEnvelope,
  faGlobeAfrica,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";

import GlobalContext from "../../contexts";

import { UXBtn, Row, Col, Text } from "../../components/UX";

import defaultAvatar from "../../assets/images/default-avatar.jpg";

const BizCard = (props) => {
  const {
    type,
    username,
    name,
    about,
    id,
    photo,
    street_address,
    city,
    state,
    country,
    phone,
    email,
    website,
    is_verified,
    promoted,
    base_url,
    ...restProps
  } = props;

  const _about =
    typeof about === "string" && about.length > 300 ? about.substr(0, 300) : "";

  const href = "/business/" + id;

  return (
    <div {...restProps}>
      {promoted && (
        <div className="text-right">
          <UXBtn className="text-white" type="warning" text="Sponsored" />
        </div>
      )}
      <h3 className="text-bold">
        <NavLink to={`/${type}/${username}`}>
          {name}
          {is_verified && (
            <FAIcon className="ml-2 text-success" icon={faCheckCircle} />
          )}
        </NavLink>
      </h3>
      <span>
        {street_address}, {city}, {state}. {country}
      </span>
      <Row>
        <Col>
          <div>
            <Text className="my-3">
              {_about || about} {_about && <span>&hellip;</span>}
            </Text>
          </div>
          <div>
            {phone && (
              <Contact
                icon={faPhoneAlt}
                name="Phone"
                href={phone ? "tel:" + phone.replace(/[^\d+]+/g, "") : ""}
              />
            )}
            {email && (
              <Contact
                icon={faEnvelope}
                name="Email"
                href={email ? "mailto:" + email : ""}
              />
            )}
            {website && (
              <Contact icon={faGlobeAfrica} name="Website" href={website} />
            )}
            <Contact icon={faMapMarker} name="Map" href={href} />
          </div>
        </Col>
        <Col size="auto">
          <img
            style={{ width: "100px", height: "100px" }}
            src={photo ? base_url + photo : defaultAvatar}
            alt={name}
          />
        </Col>
      </Row>
    </div>
  );
};

BizCard.propTypes = { about: PropTypes.string };
BizCard.defaultProps = { about: "" };

export default BizCard;

var Contact = ({ icon, name, href }) => {
  const { winWidth } = useContext(GlobalContext);

  const content = (
    <React.Fragment>
      <FAIcon icon={icon} /> {winWidth >= 768 ? name : ""}
    </React.Fragment>
  );

  if (!href) return content;

  return (
    <a className="mr-2" target="_blank" rel="noopener noreferrer" href={href}>
      {content}
    </a>
  );
};
