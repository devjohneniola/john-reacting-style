import React, { useState, useEffect } from "react";

import { appName } from "../../app-details";
import { Http, tryAgainMsg } from "../../helpers";

import { Page } from "../../components";
import { Loader } from "../../components/UX";

const PromoteVerify = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);

  const [packageDetails, setPackageDetails] = useState({});

  const title =
    loading === true ? "Verifying Payment" : paid ? "Paid" : "Payment Error";

  const { ref, gateway } = match.params;

  useEffect(() => {
    document.title = `${title} | ${appName}`;
  }, [title]);

  useEffect(() => {
    Http().secureRequest({
      url: `/promote-verify?ref=${ref}&gateway=${gateway}`,
      successCallback: ({ status, msg }) => {
        setLoading(false);
        setPaid(status);
        setPackageDetails(msg);
      },
      errorCallback: () => {
        setLoading(
          "Unable to proceed to the payment gateway. " + tryAgainMsg()
        );
      },
    });
  }, [ref, gateway]);

  const { name, duration, price } = packageDetails;

  return (
    <Page {...{ title }}>
      {loading && (
        <PayStatus title="Verifying Payment Status" content={<Loader />} />
      )}
      {paid && (
        <PayStatus
          title={`${name} boost package now active`}
          content={`A payment of #${price} has been applied to your profile and your account has been boosted for ${duration}`}
        />
      )}
      {!loading && !paid && (
        <PayStatus
          title="Transaction failed"
          content="Your payment was not successful"
        />
      )}
    </Page>
  );
};

export default PromoteVerify;

var PayStatus = ({ title, type, content }) => (
  <div className="p-3 p-md-5">
    <h3 className="text-center">{title}</h3>
    <div className={`text-${type} mt-3 text-center fs-16`}>{content}</div>
  </div>
);
