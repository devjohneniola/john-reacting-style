import Http, { Https, tryAgainMsg } from "./http";
export { Http, Https, tryAgainMsg };

export {
  userID,
  userType,
  isBusiness,
  isProfession,
  userDetails,
  getUserToken,
  getUserDetails,
  saveUserToken,
  saveUserDetails,
  updateUserDetails,
  isSignedIn,
  mustBeSignedIn,
  signOut,
} from "./auth";

export { convertDataSize } from "./conversions";

export { scrollTo, scrollUp, scrollDown, scrollToFormReport } from "./dom";

export {
  countryCode,
  getPhoneNumber,
  telAttrs,
  handleFileChange,
} from "./form-input";

export { titleCase } from "./strings";
