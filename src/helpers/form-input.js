export const countryCode = "+234";

export const getPhoneNumber = phone => {
  phone = phone
    .trim()
    .replace(/^0/, "")
    .replace(/[^\d+]+/g, "");
  if (phone.indexOf(countryCode) !== 0 && phone.charAt(0) !== "+")
    phone = countryCode + phone;
  if (phone.length > 14) return phone.substring(0, 14);
  return phone;
};

export const telAttrs = {
  type: "tel",
  placeholder: `e.g. ${countryCode} - 801 - 234 - 5678`,
  maxLength: "23",
  pattern:
    "^\\+?\\d{1,3}\\s?-?\\s?\\d{3,4}\\s?-?\\s?\\d{3,4}\\s?-?\\s?\\d{3,4}\\s*$"
};

const shortenFileName = text => {
  const extenion = text.split(".")[1];
  if (text.length > 25) {
    return `${text.slice(0, 10)}... (.${extenion})`;
  }
  return `${text} `;
};

export const handleFileChange = ({
  file,
  acceptedFileTypes,
  acceptedExts = "",
  fileMaxSize,
  fileMaxSizeNice,
  errorMessage,
  successCallback
}) => {
  const {
    name: currentFileName,
    type: currentFileType,
    size: currentFileSize
  } = file;

  const verifyFile = files => {
    if (!files) return;

    if (
      acceptedFileTypes &&
      acceptedFileTypes.length &&
      !acceptedFileTypes.includes(currentFileType)
    ) {
      errorMessage(
        "Invalid mime type" +
          (acceptedExts ? `. Only ${acceptedExts} are accepted` : ""),
        "fileUpload"
      );
      return false;
    }

    if (
      typeof fileMaxSize === "number" &&
      fileMaxSize > 0 &&
      currentFileSize > fileMaxSize
    ) {
      errorMessage(
        fileMaxSizeNice
          ? `File was more than ${fileMaxSizeNice} in size`
          : "File was too large"
      );
      return false;
    }
    return true;
  };

  if (!file) return;
  const isVerified = verifyFile(file);
  // console.log(isVerified)
  if (!isVerified) return;
  let reader = new window.FileReader();
  reader.onloadend = () =>
    successCallback({
      src: reader.result,
      file,
      fileName: shortenFileName(currentFileName)
    });
  reader.readAsDataURL(file);
};
