import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./CourseRouter.css";

import Course from "./Course";

/**
 * Create routing to the Course, if the url ends with a cours e.g.
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 * @see react-router-dom [Nested Routing](https://reacttraining.com/react-router/web/guides/quick-start/2nd-example-nested-routing)
 *
 *
 * ```
 * /course/SoSe 19/Experimentalphysik 1
 * ```
 *
 * if it is just
 *
 * ```
 * /course
 * ```
 *
 * it sould display all courses
 */
function CourseRouter(props) {
  // this defines the default path
  let match = useRouteMatch();
  return (
    <div className="CourseRouter">
      <Switch>
        {/* Route to the Course Page */}
        <Route
          path={`${match.path}/:courseSemester/:courseName`}
          render={path => <Course {...path} login={props.login} />}
        />
        {/* Route to all Courses Page */}
        <Route path={match.path}>
          <h3>Here should be a overview over all courses</h3>
        </Route>
      </Switch>
    </div>
  );
}
CourseRouter.propTypes = {
  /**
   * define the login stste
   */
  login: PropTypes.bool.isRequired
};

export default CourseRouter;
