import React, { useState } from "react";

import {
  Http,
  tryAgainMsg,
  updateUserDetails,
  handleFileChange,
} from "../../helpers";

import { EditableImage } from "../../components/UX";

import defaultAvatar from "../../assets/images/default-avatar.jpg";

const ProfilePhoto = ({ noEdit, disptach, updateURL, src, alt }) => {
  const [newProfilePhoto, setNewProfilePhoto] = useState("");
  const [newSrc, setNewSrc] = useState("");

  const handleChange = ({ target }, setError) => {
    handleFileChange({
      file: target.files[0],
      acceptedFileTypes: ["image/jpeg", "image/jpg", "image/png"],
      fileMaxSize: 5 * 1024 * 1024,
      fileMaxSizeNice: "5MB",
      errorMessage: (error) => setError(error),
      successCallback: ({ file, src }) => {
        setNewProfilePhoto(file);
        setNewSrc(src);
      },
    });
  };

  const handleClick = (e, setLoading, setError, setEdit) => {
    setLoading(true);

    const body = new window.FormData();
    body.append("photo", newProfilePhoto);

    Http().secureRequest({
      url: updateURL,
      method: "POST",
      requestType: "multi",
      body,
      successCallback: ({ status, msg: { photo } }) => {
        setLoading(false);
        if (status === false || !photo) {
          disptach({ photo: "" });
          return setError(photo);
        }
        setEdit(false);
        updateUserDetails({ photo });
        disptach({ photo });
      },
      errorCallback: () => {
        setLoading(false);
        setError("Upload error" + tryAgainMsg());
        disptach({ photo: "" });
      },
    });
  };

  return (
    <EditableImage
      noEdit={noEdit}
      defaultImg={defaultAvatar}
      src={newSrc || src}
      alt={alt}
      width="200px"
      height="200px"
      inputAttrs={{ name: "pic" }}
      onChange={handleChange}
      clickerText="Upload"
      onClick={handleClick}
    />
  );
};

export default ProfilePhoto;
