import React from "react";
import PropTypes from "prop-types";

/**
 * For loading an Error page instead of the normal page.
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 */
function Error(props) {
  // Display the error message
  return <h1>{props.error}</h1>;
}
Error.propTypes = {
  /**
   * The error messege to display
   */
  error: PropTypes.string.isRequired
};
export default Error;
