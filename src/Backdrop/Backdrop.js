import React from "react";
import "./Backdrop.css";

function Backdrop(props) {
  return <div className="Backdrop" onClick={props.click} />;
}

export default Backdrop;
