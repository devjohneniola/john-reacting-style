import React, { useState, useCallback, useEffect } from "react";

import { appName } from "../../app-details";
import { useFormReporting } from "../../hooks";
import {
  Http,
  tryAgainMsg,
  saveUserToken,
  updateUserDetails,
} from "../../helpers";

import { Page } from "../../components";
import {
  Row,
  Col,
  UXLabel,
  UXInput,
  UXInputChk,
  FormReports,
  UXBtn,
  Loader,
} from "../../components/UX";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [userID, setUserID] = useState("");
  const updateUserID = useCallback(({ target }) => setUserID(target.value), []);
  const [pass, setPass] = useState("");
  const updatePass = useCallback(({ target }) => setPass(target.value), []);
  const [autoLogin, setAutoLogin] = useState(true);
  const updateAutoLogin = useCallback(() => setAutoLogin((x) => !x), []);

  const { info, err, suc, noFormReport, formErrorReport } = useFormReporting();

  useEffect(() => {
    document.title = `Login | ${appName}`;
  }, []);

  useEffect(() => {
    if (info || err || suc) setLoading(false);
  }, [info, err, suc]);

  const handleSubmit = (e) => {
    e.preventDefault();
    noFormReport();

    const body = {
      user_id: userID.trim(),
      pass,
      auto_login: autoLogin,
    };

    setLoading(true);

    Http().makeReq({
      url: "/login",
      method: "POST",
      body,
      successCallback: ({ status, msg: { auth, ...msg } }) => {
        if (status !== true)
          return formErrorReport(msg || "Error logging you in");

        saveUserToken(auth.access_key);
        updateUserDetails(msg);
        setLoading(false);
        if (window) window.location.href = "/profile";
      },
      errorCallback: () =>
        formErrorReport("Unable to log you in. " + tryAgainMsg()),
    });
  };

  return (
    <Page title="Sign In">
      <form className="p-3" onSubmit={handleSubmit}>
        <Field
          id="username"
          text="Username"
          value={userID}
          onChange={updateUserID}
          maxLength="24"
          pattern="^\w{4,24}$"
          title="Enter a unique username, 4 - 24 characters"
        />
        <Field
          id="password"
          text="Password"
          type="password"
          value={pass}
          onChange={updatePass}
          pattern="^\w{4,}$"
          title="Enter a strong password, atleast 4 characters long"
        />
        <UXInputChk
          id="auto-login"
          text="Remember Me"
          title="Check if you want your login details to be remembered"
          checked={autoLogin}
          onChange={updateAutoLogin}
        />
        <div className="mt-5 text-right">
          <FormReports {...{ info, err, suc }} />
          <UXBtn
            htmlType="submit"
            className="px-5"
            type="info"
            disabled={loading}
          >
            {loading ? <Loader /> : "Login"}
          </UXBtn>
        </div>
      </form>
    </Page>
  );
};

export default Login;

var Field = ({ id, text, title, children, ...props }) => (
  <Row className="my-3">
    <Col size="12" sm="6" md="3" lg="2">
      <UXLabel {...{ partner: id, text, title }} />
    </Col>
    <Col size="12" sm="6" md="9" lg="10">
      {children || <UXInput {...{ id, title, ...props }} />}
    </Col>
  </Row>
);
