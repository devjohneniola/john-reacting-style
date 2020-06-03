import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt, faSave } from "@fortawesome/free-solid-svg-icons";

import { Row, Col } from "./UX";
import UXBtn from "./Buttons";
import { EditableText } from "./Texts";

const defaultOpt = { value: "", text: "" };

const SelectMultiple = ({
  noEdit,
  defaultValues,
  options,
  selectionClass,
  btnClass,
  label,
  className,
  footer,
  willSave
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setSelectedOptions(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    if (!selectedOptions.length) setSelectedOptions([defaultOpt]);
  }, [selectedOptions]);

  const dictWords = React.useMemo(() => options.map(({ text }) => text), [
    options
  ]);

  const addSelectedOptions = () =>
    setSelectedOptions([...selectedOptions, ...[defaultOpt]]);

  const handleDelete = ind => {
    const sels = [...selectedOptions];
    sels.splice(ind, 1);
    setSelectedOptions(sels);
  };

  const handleChange = (ind, value) => {
    const sels = [...selectedOptions];
    const curSel = sels[ind];
    sels[ind] = { ...curSel, text: value };
    setSelectedOptions(sels);
  };

  const handleBlur = (ind, value) => {
    const sels = [...selectedOptions];
    const selected = options.find(x => x.text === value);
    sels[ind] = selected ? { ...selected } : defaultOpt;
    setSelectedOptions(sels);
  };

  return (
    <div
      className={
        "card" +
        (busy ? " busy faded-40" : "") +
        (className ? " " + className : "")
      }
    >
      <div className="card-header">
        <Row>
          <Col>{label}</Col>
          {!noEdit && (
            <React.Fragment>
              <Col size="auto">
                <UXBtn type="sm" onClick={addSelectedOptions}>
                  <FontAwesomeIcon icon={faPlus} />
                </UXBtn>
              </Col>
              <Col size="auto">
                <UXBtn
                  type="sm"
                  onClick={() =>
                    willSave(selectedOptions, setBusy, setErrorMsg)
                  }
                >
                  <FontAwesomeIcon icon={faSave} />
                </UXBtn>
              </Col>
            </React.Fragment>
          )}
        </Row>
        {errorMsg && <span className="text-danger">{errorMsg}</span>}
      </div>
      <Row className="card-body">
        {selectedOptions.map(({ text }, ind) => (
          <Col
            size="auto"
            key={ind}
            className={
              selectionClass ||
              (ind === 0 ? "" : "ml-2") + " p-2 bg-dark text-white"
            }
          >
            {!noEdit && (
              <div className="text-right">
                <UXBtn
                  className={btnClass}
                  type="sm"
                  onClick={() => handleDelete(ind)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </UXBtn>
              </div>
            )}
            <EditableText
              noEdit={noEdit}
              editBtnClass={btnClass}
              text={text}
              defaultText="Choose"
              onChange={({ target: { value } }) => handleChange(ind, value)}
              onBlur={({ target: { value } }) => handleBlur(ind, value)}
              fromDict
              dictionary={dictWords}
            />
          </Col>
        ))}
      </Row>
      {footer}
    </div>
  );
};

SelectMultiple.defaultProps = {
  noEdit: false,
  defaultValues: [defaultOpt],
  options: [defaultOpt],
  btnClass: "text-white",
  willSave: () => {}
};
SelectMultiple.propTypes = {
  noEdit: PropTypes.bool,
  defaultValues: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.arrayOf(PropTypes.object),
  selectionClass: PropTypes.string,
  btnClass: PropTypes.string,
  className: PropTypes.string,
  willSave: PropTypes.func
};

export { SelectMultiple };
