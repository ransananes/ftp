import React from "react";
import logo from "./assets/logo.png";
import "./Main.css";
import LocalFileBrowser from "./components/LocalFileBrowser";

function Main() {
  return (
    <div className="__pcs_cs">
      <img src={logo} alt="CloudStorage" width="150px" />
      <div className="__pcs_cs_search_engine">
        <div className="__pcs_cs_search_results">
          <LocalFileBrowser />
        </div>
      </div>
    </div>
  );
}

export default Main;
