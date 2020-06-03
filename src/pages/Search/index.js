import React, { useEffect, useContext } from "react";

import { appName } from "../../app-details";
import GlobalContext from "../../contexts";
import { useGetFetch } from "../../hooks";

import { Page, SearchBar } from "../../components";
import BizCard from "../BusinessDirectory/BizCard";

const Search = () => {
  const { searchKeyword, isMobile } = useContext(GlobalContext);

  const [biz, , { setLoading }] = useGetFetch(
    {
      url: `/accounts?q=${searchKeyword}`,
      noneMsg: "No results",
      errorMsg: "Search error",
      fetchErrorMsg: "Unable to load search results",
      msgIndex: "accounts",
    },
    !!searchKeyword
  );

  useEffect(() => {
    document.title = `${searchKeyword || "Search"} | ${appName}`;
    setLoading();
  }, [searchKeyword, setLoading]);

  const bizList = !Array.isArray(biz) ? (
    <div className="p-3">
      {!searchKeyword ? "Search by name, category, city, state" : biz}
    </div>
  ) : (
    biz.map((business, ind) => (
      <BizCard key={ind} className="p-2 p-md-5" {...business} />
    ))
  );

  return (
    <Page
      title={
        searchKeyword
          ? `Looking for ${searchKeyword}`
          : "Lookup businesses and professions"
      }
    >
      {isMobile && <SearchBar className="my-3" />}
      {bizList}
    </Page>
  );
};

export default Search;
