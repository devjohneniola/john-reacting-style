import React, { useState, useCallback, useContext } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import GlobalContext from "../contexts";

import { UXInput, UXBtn } from "../components/UX";

const Search = ({ location, history, ...props }) => {
  const [localSearch, setLocalSearch] = useState("");
  const updateLocalSearch = useCallback(
    ({ target }) => setLocalSearch(target.value),
    []
  );

  const { setSearchKeyword } = useContext(GlobalContext);

  const search = (e) => {
    e.preventDefault();
    setSearchKeyword(localSearch);
    if (location.pathname !== "/search") history.push("/search");
  };

  return (
    <form {...props} onSubmit={search}>
      <UXInput
        type="search"
        placeholder="Name, category, city, state"
        value={localSearch}
        onChange={updateLocalSearch}
        grouped
      >
        <UXBtn htmlType="submit" type={["sm", "primary"]}>
          <FAIcon icon={faSearch} />
        </UXBtn>
      </UXInput>
    </form>
  );
};

export default withRouter(Search);
