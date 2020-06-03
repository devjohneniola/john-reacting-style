import React, { useState, useEffect, useContext } from "react";

import GlobalContext from "../../contexts";
import { Http, tryAgainMsg } from "../../helpers";
import { useGetFetch } from "../../hooks";

import { UXBtn, Loader } from "../../components/UX";

const PromoteBtn = (props) => {
  const { setPopupModal } = useContext(GlobalContext);

  const showPromoteModal = () =>
    setPopupModal({
      title: "Boost Profile",
      content: <PromoteModal />,
      okType: "success",
      okText: "cancel",
    });

  return (
    <UXBtn
      className="text-white"
      type={["sm","warning"]}
      text="Boost Profile"
      {...props}
      onClick={showPromoteModal}
    />
  );
};

export default PromoteBtn;

const PromoteModal = () => {
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [packageID, setPackageID] = useState(0);

  const [packages] = useGetFetch({
    url: "/packages",
    sessionCache: true,
    noneMsg: "No packages right now",
    errorMsg: "Error getting packages",
    fetchErrorMsg: "Unable to load packages",
  });

  const isRightPackages = Array.isArray(packages);

  useEffect(() => {
    if (isRightPackages) setLoading(false);
  }, [isRightPackages]);

  if (!isRightPackages) return <div>{packages}</div>;

  const makePayment = () => {
    setLoading(true);

    Http().secureRequest({
      url: "/promote",
      method: "POST",
      body: {
        package_id: packageID,
        gateway: "paystack",
        callback_url:
          (window ? window.location.origin : "") + "/promote-verify",
      },
      successCallback: ({ status, msg }) => {
        if (!status)
          return setLoading("Unusuall error while trying to make payment");

        setLoading(false);
        if (window) window.location.href = msg.data.authorization_url;
      },
      errorCallback: () =>
        setLoading(
          "Unable to proceed to the payment gateway. " + tryAgainMsg()
        ),
    });
  };

  return (
    <div style={{ width: "640px" }}>
      <h4 className="text-bold text-center">Select a package</h4>
      <ul style={{ listStyleType: "upper-roman" }}>
        {packages.map(({ id, name, duration, price: prc }, ind) => {
          const isSelected = prc === price;

          return (
            <li
              key={ind}
              className={"py-2" + (isSelected ? " bg-dark text-white" : "")}
            >
              <UXBtn
                type="link"
                className={
                  "d-block no-underline" + (isSelected ? " text-white" : "")
                }
                onClick={() => {
                  setPrice(prc);
                  setPackageID(id);
                }}
              >
                <span className="fs-24">{name}</span>
                <br />
                <span>
                  {duration} at #{prc}
                </span>
              </UXBtn>
            </li>
          );
        })}
      </ul>
      <div className="my-5 text-right">
        {typeof loading === "string" && loading}
        <UXBtn
          onClick={makePayment}
          type="danger"
          disabled={!price || !packageID || loading === true}
        >
          {loading === true && <Loader />} Pay #{price}
        </UXBtn>
      </div>
    </div>
  );
};
