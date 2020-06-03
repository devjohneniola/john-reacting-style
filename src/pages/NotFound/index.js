import React from "react";
import { NavLink } from "react-router-dom";

import { Page } from "../../components";

const NotFound = () => (
  <Page title="Page not found">
    <div>
      The page you are looking for is not found. Go{" "}
      <NavLink to="/">back home</NavLink>
    </div>
  </Page>
);

export default NotFound;
