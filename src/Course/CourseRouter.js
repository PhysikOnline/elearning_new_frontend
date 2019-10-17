import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./CourseRouter.css";

import Course from "./Course";

function CourseRouter(props) {
  let match = useRouteMatch();
  return (
    <div className="CourseRouter">
      <Switch>
        <Route
          path={`${match.path}/:courseSemester/:courseName`}
          render={path => <Course {...path} login={props.login} />}
        />
        <Route path={match.path}>
          <h3>Here should be a overview over all courses</h3>
        </Route>
      </Switch>
    </div>
  );
}

export default CourseRouter;
