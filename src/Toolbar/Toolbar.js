import React from "react";
import "./Toolbar.css";
import IconMenu from "../static/IconMenu.js";

function Toolbar(props) {
  return (
    <div className="Toolbar">
      <div onClick={props.drawerClickHandler}>
        <IconMenu />
      </div>
      <h1>E-Learning</h1>
    </div>
  );
}

export default Toolbar;
