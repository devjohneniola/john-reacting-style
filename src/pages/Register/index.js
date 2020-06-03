import React, { useState, useCallback, useEffect } from "react";

import { appName } from "../../app-details";
import { useFormReporting } from "../../hooks";
import {
  Http,
  tryAgainMsg,
  saveUserToken,
  saveUserDetails,
} from "../../helpers";

import { Page } from "../../components";
import {
  Row,
  Col,
  UXLabel,
  UXInput,
  UXSelect,
  UXInputChk,
  FormReports,
  UXBtn,
  Loader,
} from "../../components/UX";

const Register = ({ match }) => {
  const { referrer } = match.params;

  const [loading, setLoading] = useState(false);

  const [accountType, setAccountType] = useState("");
  const updateAccountType = useCallback(
    ({ target }) => setAccountType(target.value),
    []
  );

  const [name, setName] = useState("");
  const updateName = useCallback(({ target }) => setName(target.value), []);
  const [email, setEmail] = useState("");
  const updateEmail = useCallback(({ target }) => setEmail(target.value), []);
  const [phone, setPhone] = useState("");
  const updatePhone = useCallback(({ target }) => setPhone(target.value), []);

  const [username, setUsername] = useState("");
  const updateUsername = useCallback(
    ({ target }) => setUsername(target.value),
    []
  );
  const [pass, setPass] = useState("");
  const updatePass = useCallback(({ target }) => setPass(target.value), []);
  const [pass2, setPass2] = useState("");
  const updatePass2 = useCallback(({ target }) => setPass2(target.value), []);
  const [autoLogin, setAutoLogin] = useState(true);
  const updateAutoLogin = useCallback(() => setAutoLogin((x) => !x), []);

  const { info, err, suc, noFormReport, formErrorReport } = useFormReporting();

  useEffect(() => {
    document.title = `Register | ${appName}`;
  }, []);

  useEffect(() => {
    if (info || err || suc) setLoading(false);
  }, [info, err, suc]);

  const handleSubmit = (e) => {
    e.preventDefault();
    noFormReport();

    if (pass !== pass2) return formErrorReport("Passwords do not match");

    const userDetails = {
      type: accountType,
      name: name.trim(),
      email: email.trim(),
      phone: phone.replace(/[^\d+]+/g, ""),
      username: username.trim(),
      referrer,
    };

    const body = {
      ...userDetails,
      pass,
      auto_login: autoLogin,
    };

    setLoading(true);

    Http().makeReq({
      url: "/register",
      method: "POST",
      body,
      successCallback: ({ status, msg }) => {
        if (status !== true)
          return formErrorReport(msg || "Error creating your account");

        saveUserToken(msg.access_key);
        saveUserDetails(userDetails);
        setLoading(false);
        if (window) window.location.href = "/profile";
      },
      errorCallback: () =>
        formErrorReport("Unable to create your account. " + tryAgainMsg()),
    });
  };

  const nameLabel =
    (accountType === "business"
      ? "Business "
      : accountType === "profession"
      ? "Full "
      : "") + "Name";

  return (
    <Page title="Create an Account">
      <form className="p-3" onSubmit={handleSubmit}>
        <Splitter title="General Details">
          <Field id="name" text="Account Type">
            <UXSelect value={accountType} onChange={updateAccountType}>
              <option value="business">Business</option>
              <option value="profession">Profession</option>
            </UXSelect>
          </Field>
          <Field
            id="name"
            text={nameLabel}
            value={name}
            onChange={updateName}
            maxLength="50"
            title="Enter your legal/stage name"
          />
          <Field
            id="email"
            text="Email Address"
            type="email"
            value={email}
            onChange={updateEmail}
            maxLength="200"
          />
          <Field
            id="phone"
            text="Phone Number"
            type="tel"
            value={phone}
            onChange={updatePhone}
            maxLength="23"
            pattern="^(\+\d{1,3}|0)\s?-?\s?\d{3}\s?-?\s?\d{3}\s?-?\s?\d{4}$"
            title="Enter your phone number (format: 0811 774 1341 or +234 811 774 1341)"
          />
        </Splitter>
        <Splitter title="Account Details">
          <Field
            id="username"
            text="Username"
            value={username}
            onChange={updateUsername}
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
          <Field
            id="confirm-password"
            text="Confirm Password"
            type="password"
            value={pass2}
            onChange={updatePass2}
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
        </Splitter>
        <div className="mt-5 text-right">
          <FormReports {...{ info, err, suc }} />
          <UXBtn
            htmlType="submit"
            className="px-5"
            type="info"
            disabled={loading}
          >
            {loading ? <Loader /> : "Register"}
          </UXBtn>
        </div>
      </form>
    </Page>
  );
};

export default Register;

var Splitter = ({ title, children, ...props }) => (
  <fieldset className="my-5" {...props}>
    <legend>
      <h5 className="text-bold">{title}</h5>
    </legend>
    {children}
  </fieldset>
);

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
