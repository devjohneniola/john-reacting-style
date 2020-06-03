import React, { lazy, Suspense, useState, useCallback, useEffect } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import GlobalContext from "./contexts";
import { userID } from "./helpers";

import { Header, Footer } from "./components";
import { Loader, ConfirmDialog, PopupModal } from "./components/UX";

// fonts
import "./styles/fonts/open-sans.css";
import "./styles/fonts/open-sans-condensed.css";
import "./styles/fonts/raleway.css";
import "./styles/fonts/roboto.css";

// styles
import "./styles/bootstrap/bootstrap.min.css";
import "./styles/index.css";
import "./styles/app.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import SignOut from "./pages/SignOut";
import BizDir from "./pages/BusinessDirectory";
const Search = lazy(() => import("./pages/Search"));
const Profile = lazy(() => import("./pages/Profile"));
const PromoteVerify = lazy(() => import("./pages/Profile/PromoteVerify"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const windowWidth = (window && window.innerWidth) || 0;

  const [winWidth, setWinWidth] = useState(windowWidth);
  const [screenSize, setScreenSize] = useState("");
  const [isMobile, setIsMobile] = useState(windowWidth <= 768);

  const [confirmDialog, setConfirmDialog] = useState(false);
  const updateConfirmDialog = useCallback((cD) => setConfirmDialog(cD), []);
  const closeConfirmDialog = useCallback(() => setConfirmDialog(false), []);

  const [popupModal, setPopupModal] = useState(false);
  const updatePopupModal = useCallback((pM) => setPopupModal(pM), []);
  const closePopupModal = useCallback(() => setPopupModal(false), []);

  const [searchKeyword, setSearchKeyword] = useState("");
  const updateSearchKeyword = useCallback((q) => setSearchKeyword(q), []);

  const showDialog = confirmDialog && typeof confirmDialog === "object";
  const showPopup = popupModal && typeof popupModal === "object";

  const showOverlay = showDialog || showPopup;

  useEffect(() => {
    if (!window) return () => {};

    const updateMobileState = () => {
      const winWidth = window.innerWidth;

      let scrnSize;
      switch (true) {
        case winWidth <= 575:
          scrnSize = "sm";
          break;
        case winWidth <= 768:
          scrnSize = "md";
          break;
        default:
          scrnSize = "xl";
      }

      setWinWidth(winWidth);
      setScreenSize(scrnSize);
      setIsMobile(winWidth <= 768);
    };

    if (window.addEventListener)
      window.addEventListener("resize", updateMobileState);
    else if (window.attachEvent)
      window.attachEvent("onresize", updateMobileState);

    // cleanup in case
    return () => {
      if (window.removeEventListener)
        window.removeEventListener("resize", updateMobileState);
      else if (window.detachEvent)
        window.detachEvent("onresize", updateMobileState);
    };
  }, []);

  return (
    <BrowserRouter>
      <span id="attic"></span>
      <GlobalContext.Provider
        value={{
          winWidth,
          screenSize,
          isMobile,
          setConfirmDialog: updateConfirmDialog,
          closeConfirmDialog,
          setPopupModal: updatePopupModal,
          closePopupModal,
          searchKeyword,
          setSearchKeyword: updateSearchKeyword,
        }}
      >
        <Header />
        <Suspense
          fallback={
            <div className="body-main fs-32 p-5 text-center">
              <Loader />
            </div>
          }
        >
          <Switch>
            <Route exact path="/" component={BizDir} />
            <Route exact path="/search" component={Search} />
            <Route
              path="/businesses"
              component={() => <BizDir type="businesses" />}
            />
            <Route
              path="/professions"
              component={() => <BizDir type="professions" />}
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/r/:referrer" component={Register} />
            <RouteWithAuth path="/profile" component={Profile} />
            <RouteWithAuth
              path="/promote-verify/:ref/:gateway"
              component={PromoteVerify}
            />
            <Route path="/sign-out" component={SignOut} />
            <Route path="/:type/:user" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
        <Footer />
      </GlobalContext.Provider>
      <span id="basement"></span>

      {showDialog && (
        <ConfirmDialog {...confirmDialog} afterClick={closeConfirmDialog} />
      )}
      {showPopup && <PopupModal {...popupModal} afterClick={closePopupModal} />}
      {showOverlay && (
        <div
          className="overlay popup"
          onClick={() => {
            setConfirmDialog(false);
            setPopupModal(false);
          }}
        />
      )}
    </BrowserRouter>
  );
};

export default App;

var RouteWithAuth = (props) => {
  if (userID) return <Route {...props} />;
  return <Redirect to="/login" />;
};
