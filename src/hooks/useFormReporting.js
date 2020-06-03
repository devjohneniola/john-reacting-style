import { isValidElement, useState } from "react";

const useFormReporting = () => {
  const [info, setInfo] = useState("");
  const [err, setErr] = useState("");
  const [suc, setSuc] = useState("");

  const setMsg = ({ info = "", err = "", suc = "" }) => {
    const invalidTypes = ["undefined", "object"];
    setInfo(
      isValidElement(info) || !invalidTypes.includes(typeof info) ? info : ""
    );
    setErr(
      isValidElement(err) || !invalidTypes.includes(typeof err) ? err : ""
    );
    setSuc(
      isValidElement(suc) || !invalidTypes.includes(typeof suc) ? suc : ""
    );
  };

  // const errClass = "invalid-input";

  const noFormReport = () => {
    setInfo("");
    setErr("");
    setSuc("");

    // if (!document) return;

    // const form =
    //   typeof formID === "string" ? document.getElementById(formID) : form;
    // if (!form || !form.getElementsTagName) return;

    // const inputs = form.getElementsTagName("input");
    // const selects = form.getElementsTagName("select");
    // const textareas = form.getElementsTagName("textarea");

    // const removeErrClass = elem => {
    //   const count = elem.length;
    //   for (let i = 0; i < count; i++)
    //     try {
    //       elem[i].classList.remove(errClass);
    //     } catch (err) {}
    // };

    // removeErrClass(inputs);
    // removeErrClass(selects);
    // removeErrClass(textareas);
  };

  const focus = id => {
    if (!id || !document) return;
    const elem = document.getElementById(id);
    if (!elem) return;
    // elem.classList.add(errClass);
    elem.focus();
  };

  const formInfoReport = msg =>
    setMsg({
      info: msg,
      err: "",
      suc: ""
    });

  const formErrorReport = (msg, id) => {
    setMsg({
      info: "",
      err: msg,
      suc: ""
    });
    if (id) focus(id);
  };

  const formSuccessReport = msg =>
    setMsg({
      info: "",
      err: "",
      suc: msg
    });

  return {
    info,
    err,
    suc,
    focus,
    formInfoReport,
    formErrorReport,
    formSuccessReport,
    noFormReport,
    setMsg
  };
};

export { FormReports } from "../components/UX";

export default useFormReporting;
