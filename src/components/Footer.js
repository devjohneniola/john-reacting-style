import React from "react";

import { Container } from "../components/UX";

import styles from "../styles/footer.module.css";

import { appNameAlt } from "../app-details";

const Footer = () => (
  <footer className="bg-dark text-white">
    <Sec className="py-3">
      <div>
        <span>
          Copyright &copy; {appNameAlt} {new Date().getFullYear()}. All right
          reserved
        </span>
      </div>
    </Sec>
  </footer>
);

var Sec = ({ className, ...props }) => (
  <Container
    {...props}
    fluid
    className={styles.sections + (className ? " " + className : "")}
  />
);

export default Footer;
