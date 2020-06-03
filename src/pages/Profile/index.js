import React, {
  Fragment as Frag,
  memo,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPhoneAlt,
  faEnvelope,
  faGlobeAfrica,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";

import { appName } from "../../app-details";
import {
  scrollUp,
  Http,
  tryAgainMsg,
  userType as origUserType,
  userID,
  updateUserDetails,
  titleCase,
} from "../../helpers";

import Page from "../../components/Page";
import {
  UXCard,
  Row,
  Col,
  Loader,
  EditableText,
  Text,
  UXBtn,
} from "../../components/UX";
import { VSpace } from "../../components/Tailored";
import ProfilePhoto from "./ProfilePhoto";
import Contact from "./Contact";
import PromoteBtn from "./PromoteBtn";

import cats from "./categories";

const MemProfilePhoto = memo(
  ProfilePhoto,
  (prevProps, nextProps) => prevProps.src === nextProps.src
);

const MemContact = memo(
  Contact,
  (prevProps, nextProps) =>
    prevProps.canEdit === nextProps.canEdit && prevProps.href === nextProps.href
);

const updateURL = "/edit-profile.php";

const Profile = ({ match: { params } }) => {
  const userType = params.type || origUserType;
  const user = params.user || userID;
  const liveMode = !!(params.type && params.user);

  const [gotten, setGotten] = useState(false);
  const [canEdit, setCanEdit] = useState(!liveMode);
  const toggleCanEdit = useCallback(() => setCanEdit((x) => !x), []);

  const [profileDetails, setProfileDetails] = useState({});
  const [profileDetailsOld, setProfileDetailsOld] = useState({});

  const updateProfileDetails = useCallback((data) => {
    let _data;
    if ("target" in data) _data = { [data.target.name]: data.target.value };
    setProfileDetails((x) => ({ ...x, ...(_data || data) }));
  }, []);

  const updateProfileDetailsOld = useCallback((data) => {
    let _data;
    if ("target" in data) _data = { [data.target.name]: data.target.value };
    setProfileDetailsOld((x) => ({ ...x, ...(_data || data) }));
  }, []);

  const name = profileDetails.name;

  useEffect(() => {
    scrollUp();

    if (document)
      document.title = `${name || user || userID || "Profile"} | ${appName}`;

    if (gotten && typeof gotten === "object") return () => {};

    const http = Http();
    const req = {
      method: "GET",
      url: "/accounts?" + (canEdit ? "mine" : `id=${user}`),
      successCallback: ({ status, msg }) => {
        setGotten(
          status !== true
            ? "Error getting user details from server. " + tryAgainMsg()
            : msg
        );
      },
      errorCallback: () =>
        setGotten("Unable to load this profile. " + tryAgainMsg()),
    };
    http[canEdit ? "secureRequest" : "makeReq"](req);

    // clean up
    return () => {
      http.abort();
    };
  }, [user, userType, canEdit, name, gotten]);

  useEffect(() => {
    if (gotten && typeof gotten === "object") {
      let details = gotten || {};

      let { legal_practices = [] } = details;

      if (typeof legal_practices === "string") {
        legal_practices = legal_practices.split("|||").map((pract) => {
          const [key, value] = pract.split("=>");
          return { id: key, name: value };
        });
        details = { ...details, legal_practices };
      }

      setProfileDetailsOld(details);
      setProfileDetails(details);

      updateUserDetails({ ...details, justLogin: false });
    }
  }, [gotten]);

  const editableTextProps = (name, defaultText) => {
    const text = profileDetails[name];
    return {
      defaultText: defaultText || titleCase(name.replace("_", " ")),
      text,
      "data-value": text,
      noEdit: !canEdit,
      name,
      onChange: updateProfileDetails,
      onBlur: ({ target: { name, value } }, setIsEditing, setHasEditError) => {
        if (value === profileDetailsOld[name]) return;

        const payload = { [name]: value };

        setIsEditing(true);
        Http().secureRequest({
          url: updateURL,
          method: "PATCH",
          body: JSON.stringify(payload),
          successCallback: ({ status }) => {
            setIsEditing(false);
            if (status !== true) return setHasEditError(true);

            setHasEditError(false);
            updateProfileDetailsOld(payload);
            updateUserDetails(payload);
          },
          errorCallback: () => {
            setIsEditing(false);
            setHasEditError(true);
          },
        });
      },
    };
  };

  const contactProps = { canEdit, profileDetails, editableTextProps };

  const {
    base_url,
    photo,
    username,
    phone,
    email,
    website,
    is_verified,
    type,
    category,
    street_address,
    city,
    country,
    promoted,
  } = profileDetails;

  const memCats = useMemo(() => cats(type), [type]);

  const nameSuffix = name && is_verified && (
    <FAIcon className="ml-2 text-success" icon={faCheckCircle} />
  );

  const profileCont =
    typeof gotten === "string" ? (
      gotten
    ) : gotten ? (
      <Frag>
        <Col
          size="12"
          sm="auto"
          className="mx-auto"
          style={{ maxWidth: "200px" }}
        >
          <VSpace>
            <MemProfilePhoto
              noEdit={!canEdit}
              updateURL={updateURL}
              disptach={updateProfileDetails}
              src={photo ? base_url + photo : ""}
              alt={profileDetails.name}
            />
          </VSpace>
        </Col>
        <Col className="pl-sm-3">
          <VSpace withShade>
            <UXCard hasBody>
              <h1 className="card-title logo">
                <EditableText
                  {...editableTextProps("name", "Name")}
                  maxLength="50"
                />
                {nameSuffix}
              </h1>
              <small>
                <FAIcon icon={faMapMarker} className="mr-2" />
                <EditableText
                  {...editableTextProps("street_address")}
                  maxLength="100"
                />
                {", "}
                <EditableText
                  {...editableTextProps("city", "Town/City")}
                  maxLength="40"
                />
                {", "}
                <EditableText {...editableTextProps("state")} maxLength="40" />
                {", "}
                <EditableText
                  {...editableTextProps("country")}
                  maxLength="40"
                />{" "}
              </small>
              <div className="mt-4">
                <MemContact
                  {...contactProps}
                  icon={faPhoneAlt}
                  index="phone"
                  type="tel"
                  href={phone ? "tel:" + phone.replace(/[^\d+]+/g, "") : ""}
                  maxLength="23"
                />
                <MemContact
                  {...contactProps}
                  icon={faEnvelope}
                  index="email"
                  type="email"
                  href={email ? "mailto:" + email : ""}
                  maxLength="200"
                />
                <MemContact
                  {...contactProps}
                  icon={faGlobeAfrica}
                  index="website"
                  type="url"
                  href={website}
                  maxLength="100"
                />
              </div>
            </UXCard>
          </VSpace>
        </Col>
      </Frag>
    ) : (
      <Col className="fs-32 mx-auto text-center">
        <Loader />
      </Col>
    );

  const complete = category && street_address && city && country;

  let status;
  if (!complete) status = <small>(Complete your profile to have it shortlisted)</small>
  else if (promoted) status = <UXBtn className="text-white" type={["sm","success"]} text="Boosted" />
  else status = <PromoteBtn />

  return (
    <Page
      title="Profile"
      afterTitle={
        liveMode && (
          <div className="mb-5 text-right">
            <UXBtn
              type="info"
              text={canEdit ? "Preview" : "Edit"}
              onClick={toggleCanEdit}
            />
          </div>
        )
      }
    >
      <div className="p-2">
        {canEdit && gotten && (
          <div className="my-3 text-right">
            <div className="mb-2">Your Referral link: <b>{window && window.location.origin}/r/{username}</b></div>
            {status}
          </div>
        )}
        <Row noGutters className="mb-3 mb-md-5">
          {profileCont}
        </Row>
        {gotten && <UXCard hasBody>
            <div className="my-2 fs-24">
              <EditableText
                {...editableTextProps("category", "Pick a category")}
                maxLength="100"
                dictionary={memCats}
              />
            </div>
            <Text>
              <EditableText
                {...editableTextProps("about", "Tell us about you")}
                textarea
              />
            </Text>
          </UXCard>}
      </div>
    </Page>
  );
};

export default Profile;
