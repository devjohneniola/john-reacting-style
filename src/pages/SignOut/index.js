import React, { useEffect } from "react";

import { appName } from "../../app-details";
import { Http, signOut } from "../../helpers";

import { Page } from "../../components";
import { Loader } from "../../components/UX";

const signUserOut = () => signOut("/login");

const SignOut = () => {
  useEffect(() => {
    document.title = `Signing out | ${appName}`;

    Http().secureRequest({
      url: "/sign-out",
      successCallback: signUserOut,
      errorCallback: signUserOut,
    });
  }, []);

  return (
    <Page title="Signing you out">
      <div className="my-5 text-center fs-48">
        <Loader />
      </div>
    </Page>
  );
};

export default SignOut;
