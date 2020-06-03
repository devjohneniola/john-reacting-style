import React, { Fragment as Frag } from "react";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";

import { EditableText } from "../../components/UX";

const Contact = ({
  canEdit,
  icon,
  index,
  href,
  type,
  maxLength,
  profileDetails,
  editableTextProps,
}) => {
  const contact = (
    <Frag>
      {profileDetails[index] && <FAIcon icon={icon} />}
      <EditableText {...{ ...editableTextProps(index), maxLength, type }} />
    </Frag>
  );

  if (!href || canEdit) return <span className="mr-2">{contact}</span>;

  return (
    <a className="mr-2" target="_blank" rel="noopener noreferrer" href={href}>
      {contact}
    </a>
  );
};

export default Contact;
