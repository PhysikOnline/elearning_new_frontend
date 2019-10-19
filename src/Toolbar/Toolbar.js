import React from "react";
import "./Toolbar.css";
import PropTypes from "prop-types";
import IconMenu from "../static/IconMenu.js";

/**
 * It is a basic toolbar. Exept of showing the user wich application they are
 * currently using, it enables to expand the SideDrawer. It executes a function on
 * click, wich toggels the state of the SideDrawer defined in `App.js`.
 *
 *  ```js
 * <div
 *   // Define the color --poblue, it sould be defined in the index.css
 *   style={{
 *     "--poblue": "#005eaa"
 *   }}
 * >
 *   <Toolbar drawerClickHandler={() => alert("SideDrawer close clicked")} />
 * </div>
 * ```
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 */
function Toolbar(props) {
  return (
    <div className="Toolbar">
      {/* execute the SideDrawer open Function */}
      <div onClick={props.drawerClickHandler}>
        <IconMenu />
      </div>
      {/* write in our app name :)  */}
      <h1>E-Learning</h1>
    </div>
  );
}
Toolbar.propTypes = {
  /**
   * Function that opens then sideDrawer by changeing the isSideDrawerOpen state
   * in the parent Component
   */
  drawerClickHandler: PropTypes.func.isRequired
};
export default Toolbar;
