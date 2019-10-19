import React from "react";

import PropTypes from "prop-types";
import "./Backdrop.css";

/**
 * A Backdrop for darken up the Background for the Login or a Modal. It has a 
  z-index of 100, if you want to add this to you component: you want to choose 
  a higher z-index.
 *
 * It executes everything what is passed into the `click` prop. You want to use 
 * it for closing the SideDrawer and Modals, when clicking on the Backdrop.
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 */
function Backdrop(props) {
  return <div className="Backdrop" onClick={props.click} />;
}
Backdrop.propTypes = {
  /**
   * Function wich closes the backdrop by using setState
   */
  click: PropTypes.func.isRequired
};

export default Backdrop;
