import { everLoggedInStore, tokenKey, userKey } from "../config";

export const everLoggedIn = !!(
  window &&
  window.localStorage &&
  window.localStorage.getItem(everLoggedInStore)
);

export const hasLocalStorage = () => window && "localStorage" in window;
export const getLocalStore = (key) =>
  hasLocalStorage() ? window.localStorage.getItem(key) : false;

export const getUserToken = () => getLocalStore(tokenKey);

export const getUserDetails = () => {
  try {
    return JSON.parse(getLocalStore(userKey));
  } catch (err) {
    return false;
  }
};

export const saveUserToken = (token) => {
  if (!hasLocalStorage() || typeof token === "undefined") return false;
  window.localStorage.setItem(tokenKey, token);
};

export const saveUserDetails = (data) => {
  if (!hasLocalStorage() || !data || typeof data !== "object") return false;
  window.localStorage.setItem(userKey, JSON.stringify(data));
};

export const updateUserDetails = (data) => {
  if (!hasLocalStorage() || !data || typeof data !== "object") return false;
  const userDetails = { ...(getUserDetails() || {}), ...data };
  saveUserDetails(userDetails);
};

export const isSignedIn = () => {
  const userToken = getUserToken();
  const userDetails = getUserDetails();

  return (
    typeof userToken === "string" &&
    userToken &&
    userDetails &&
    typeof userDetails === "object" &&
    Object.keys(userDetails).length > 0
  );
};

export const signOut = (loginPath = "/login") => {
  if (!hasLocalStorage()) return;

  window.localStorage.setItem(tokenKey, "");
  window.localStorage.setItem(userKey, "");

  if (window.location.pathname !== loginPath) window.location.href = loginPath;
};

let userID, userType;
export const userDetails = getUserDetails();
if (userDetails) {
  userID = userDetails.username;
  userType = userDetails.type;
}

export const mustBeSignedIn = () => {
  if (!isSignedIn() || !userID) signOut();
};

export const isBusiness = userType === "business";
export const isProfession = userType === "profession";

export { userID, userType };
