import React, { Fragment as Frag, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

import { handleFileChange, convertDataSize } from "../../helpers";

import { TruncateTextIf } from "../../components/UX";

const FileUploader = props => {
  const {
    label,
    chooseLabel,
    fileNameMaxChars,
    acceptedFileTypes,
    acceptedExts,
    fileMaxSize,
    fileMaxSizeNice,
    onChange,
    setHasError,
    setError,
    setFiles,
    className,
    accept,
    ...otherProps
  } = props;

  const [uploadedFiles, setUploadedFiles] = useState([{}]);

  const handleChange = e => {
    const files = Object.values(e.target.files);
    setUploadedFiles(files);
    setFiles(files);
    const filesLen = files.length;
    for (let i = 0; i < filesLen; i++)
      handleFileChange({
        file: files[i],
        acceptedFileTypes,
        acceptedExts,
        fileMaxSize,
        fileMaxSizeNice,
        errorMessage: error => {
          setHasError(true);
          setError(error);
          const updFiles = [...files];
          updFiles[i].error = error;
          setUploadedFiles(updFiles);
          setFiles(updFiles);
        },
        successCallback: ({ file, src }) => onChange(e, { index: i, file, src })
      });
  };

  var FancyName = ({ name, size, error }) => {
    if (!name) return chooseLabel;
    if (typeof name !== "string") name = String(name);
    if (typeof name !== "string") return chooseLabel;

    const extReg = /\.[a-zA-Z0-9]{3,4}$/;
    let ext = "";
    const matches = name.match(extReg);
    if (matches && matches[0]) ext = matches[0];

    return (
      <span {...(error ? { className: "text-danger" } : {})}>
        {" "}
        <TruncateTextIf
          text={name.replace(extReg, "")}
          maxChars={fileNameMaxChars}
        />
        {" " + ext} &nbsp;&nbsp; {size && convertDataSize(size)}
      </span>
    );
  };

  return (
    <Frag>
      <input
        type="hidden"
        name="MAX_FILE_SIZE"
        value={fileMaxSize.toString()}
      />
      <label>
        {label}
        {uploadedFiles.map(({ name, size, error }, ind) => (
          <div key={ind}>
            <FontAwesomeIcon icon={faCloudUploadAlt} />
            <span>&nbsp;&nbsp;&nbsp;</span>
            <small>
              <FancyName {...{ name, size, error }} />
            </small>
          </div>
        ))}
        <input
          {...otherProps}
          type="file"
          className={"d-none" + (className ? " " + className : "")}
          accept={acceptedFileTypes.join(",") || accept}
          onChange={handleChange}
        />
      </label>
    </Frag>
  );
};

FileUploader.propTypes = {
  fileNameMaxChars: PropTypes.number,
  fileMaxSize: PropTypes.number,
  fileMaxSizeNice: PropTypes.string,
  acceptedFileTypes: PropTypes.array,
  acceptedExts: PropTypes.string,
  onChange: PropTypes.func,
  setHasError: PropTypes.func,
  setError: PropTypes.func,
  setFiles: PropTypes.func
};

FileUploader.defaultProps = {
  label: "Upload Files",
  chooseLabel: "Choose",
  fileNameMaxChars: 30,
  acceptedFileTypes: [],
  acceptedExts: "",
  onChange: () => {},
  setHasError: () => {},
  setError: () => {},
  setFiles: () => {}
};

export default FileUploader;
