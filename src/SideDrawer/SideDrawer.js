import React from "react";
import "./SideDrawer.css";

function SideDrawer(props) {
  return (
    <div className={props.show ? "SideDrawer open" : "SideDrawer"}>
      <div>hello</div>
    </div>
  );
}

export default SideDrawer;
