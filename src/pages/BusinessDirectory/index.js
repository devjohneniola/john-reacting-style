import React, { useEffect } from "react";

import { appName } from "../../app-details";
import { useGetFetch } from "../../hooks";
import { titleCase } from "../../helpers";

import BizCard from "./BizCard";
import { Page } from "../../components";

const BusinessDirectory = ({ type }) => {
  const [biz] = useGetFetch({
    url: "/accounts" + (type ? `?type=${type}` : ""),
    noneMsg: "No Business at the moment",
    errorMsg: "Error getting businesses",
    fetchErrorMsg: "Unable to load businesses",
    msgIndex: "accounts",
  });

  useEffect(() => {
    document.title = `${type ? titleCase(type) : "Home"} | ${appName}`;
  }, [type]);

  const bizList = !Array.isArray(biz) ? (
    <div className="p-3">{biz}</div>
  ) : (
    biz.map((business, ind) => (
      <BizCard key={ind} className="p-2 p-md-5" {...business} />
    ))
  );

  return <Page title={type ? titleCase(type) : "TOP SHORTLISTS"}>{bizList}</Page>;
};

export default BusinessDirectory;
