import React, {
  Fragment as Frag,
  useState,
  useCallback,
  useContext,
} from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import GlobalContext from "../contexts";
import { userID } from "../helpers";

import { Row, Col, UXBtn } from "../components/UX";
import SearchBar from "./SearchBar";

import styles from "../styles/header.module.css";

import { appName } from "../app-details";

const Header = () => {
  const { isMobile } = useContext(GlobalContext);

  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const openMobileSidebar = useCallback(() => setShowMobileSidebar(true), []);
  const closeMobileSidebar = useCallback(() => setShowMobileSidebar(false), []);

  const sidebarProps = (style, className) => ({
    className: styles[style] + (className ? " " + className : ""),
    onClick: closeMobileSidebar,
  });

  const LinkCol = (props) => (
    <Col {...props} size="auto" className={isMobile ? "py-3 px-2" : "p-1"} />
  );

  const LinkItem = ({ to, className, text, ...props }) => {
    const linkProps = {
      ...props,
      to,
      className:
        styles.header__link +
        " text-white fs-13 no-underline" +
        (className ? " " + className : ""),
      children: text,
    };
    return (
      <LinkCol>
        <NavLink {...linkProps} />
      </LinkCol>
    );
  };

  const navs = (
    <div className={(!isMobile ? "if-scroll-x no-scroll-y" : "") + " py-2"}>
      <Row
        {...(isMobile ? { vert: true } : { className: "max-content mx-auto" })}
        noGutters
      >
        <LinkItem to="/" text="Home" />
        <LinkItem to="/businesses" text="Businesses" />
        <LinkItem to="/professions" text="Professions" />
        {isMobile && <LinkItem to="/search" text="Search" />}
        {userID ? (
          <Frag>
            <LinkItem to="/profile" text="Profile" />
            <LinkItem to="/sign-out" text="Sign Out" />
          </Frag>
        ) : (
          <Frag>
            <LinkItem to="/login" text="Login" />
            <LinkItem to="/register" text="Register" />
          </Frag>
        )}
      </Row>
    </div>
  );

  return (
    <Frag>
      <header className={styles.header + " bg-primary"}>
        <Row noGutters vAlign="center">
          {isMobile && (
            <Col size="auto">
              <UXBtn
                type="link"
                className="no-underline text-white"
                onClick={openMobileSidebar}
              >
                <FAIcon icon={faBars} />
              </UXBtn>
            </Col>
          )}
          <Col
            {...(!isMobile ? { size: "auto" } : {})}
            className="px-2 px-md-5"
          >
            <h3 className="text-center py-2">
              <NavLink
                className={
                  styles.header__logo + " logo no-underline text-white"
                }
                to="/"
              >
                {appName}
              </NavLink>
            </h3>
          </Col>
          {!isMobile && (
            <Frag>
              <Col className="px-2 px-md-5">
                <SearchBar />
              </Col>
              <Col size="auto" className="px-2 px-md-5">
                {navs}
              </Col>
            </Frag>
          )}
        </Row>
      </header>
      {isMobile && showMobileSidebar && (
        <Frag>
          <aside
            {...sidebarProps("sidebar", "bg-dark if-scroll-y no-scroll-x")}
          >
            {navs}
          </aside>
          <div {...sidebarProps("mobile_sidebar_overlay")}></div>
        </Frag>
      )}
    </Frag>
  );
};

export default Header;
