import React, { useEffect, useReducer, useRef, useCallback } from "react";

import { Http, tryAgainMsg } from "../helpers";

import { Loader } from "../components/UX";
import { AltListing } from "../components/Tailored";

const useGetFetch = (props, fetch = true, changes) => {
  const latestProps = useRef();
  useEffect(() => {
    latestProps.current = props;
  });

  const { errorMsg, noneMsg, fetchErrorMsg, fontSize } = latestProps;

  const [data, dispatchData] = useReducer(
    (state, { type, msg, fontSize: fs }) => {
      switch (type) {
        case "loading":
          return <AltListing content={msg || <Loader />} fs={fs || fontSize} />;
        case "none":
          return (
            <AltListing
              content={msg || noneMsg || "No content"}
              fs={fs || fontSize}
            />
          );
        case "error":
          return (
            <AltListing
              content={msg || errorMsg || "Error getting resources"}
              fs={fs || fontSize}
            />
          );
        case "fetch-error":
          return (
            <AltListing
              content={
                msg || (fetchErrorMsg || "Lookup error") + ". " + tryAgainMsg()
              }
              fs={fs || fontSize}
            />
          );
        case "success":
        default:
          return msg;
      }
    },
    <Loader />
  );
  const setData = useCallback(
    (msg, fontSize) => dispatchData({ type: "success", msg, fontSize }),
    []
  );
  const setLoading = useCallback(
    (msg, fontSize) => dispatchData({ type: "loading", msg, fontSize }),
    []
  );
  const setNoContent = useCallback(
    (msg, fontSize) => dispatchData({ type: "none", msg, fontSize }),
    []
  );
  const setError = useCallback(
    (msg, fontSize) => dispatchData({ type: "error", msg, fontSize }),
    []
  );
  const setFetchError = useCallback(
    (msg, fontSize) => dispatchData({ type: "fetch-error", msg, fontSize }),
    []
  );

  const { url } = props;
  useEffect(() => {
    const { fontSize, secure, ...xOtherProps } = latestProps.current;

    if (!fetch) return;

    let {
      successCallback = () => {},
      noContent = () => {},
      errorCallback = () => {},
      msgIndex,
      ...otherProps
    } = xOtherProps;

    const sucCbType = typeof successCallback;
    const noCntType = typeof noContent;
    const errCbType = typeof errorCallback;

    const badTypeErr = (par, type) =>
      `Expecting a function as ${par}. ${type} was passed!`;

    if (sucCbType !== "function") {
      console.error(badTypeErr("successCallback", sucCbType));
      successCallback = () => {};
    }
    if (noCntType !== "function") {
      console.error(badTypeErr("noContent", noCntType));
      noContent = () => {};
    }
    if (errCbType !== "function") {
      console.error(badTypeErr("errorCallback", errCbType));
      errorCallback = () => {};
    }

    const requestData = {
      url,
      ...otherProps,
      successCallback: (resp) => {
        const { status, msg } = resp;
        dispatchData({
          type: status === true ? "success" : "error",
          msg: status === true && msgIndex ? msg[msgIndex] : msg,
        });
        successCallback(resp);
      },
      noContent: () => {
        dispatchData({ type: "none" });
        noContent();
      },
      errorCallback: () => {
        dispatchData({ type: "fetch-error" });
        errorCallback();
      },
    };

    const { abort, ...http } = Http();

    http[secure ? "secureRequest" : "makeReq"](requestData);

    // clean up
    return abort;
  }, [url, fetch, errorMsg, noneMsg, fetchErrorMsg]);

  return [data, setData, { setLoading, setNoContent, setError, setFetchError }];
};

export default useGetFetch;
