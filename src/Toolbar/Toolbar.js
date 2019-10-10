import React from "react";
import "./Toolbar.css";
import IconMenu from "../static/IconMenu.js";

function Toolbar(props) {
  return (
    <div onClick={props.drawerClickHandler} className="Toolbar">
      <IconMenu />
      <h1>PhysikOnline</h1>
    </div>
  );
}

export default Toolbar;
