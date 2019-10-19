import React from "react";
import "./SideDrawer.css";
import PropTypes from "prop-types";

/**
 * Is executed by changing `state` in `App.js`. Then we use basic css
 * translate to do the annimation.
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 */
function SideDrawer(props) {
  return (
    <div className={props.show ? "SideDrawer open" : "SideDrawer"}>
      <div>hello</div>
    </div>
  );
}
SideDrawer.propTypes = {
  /**
   * Define the visibility of the SideDrawer
   */
  show: PropTypes.bool.isRequired
};
export default SideDrawer;
