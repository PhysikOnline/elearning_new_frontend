import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./CourseRouter.css";
import AllCourses from "./AllCourses";

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
          <AllCourses />
        </Route>
      </Switch>
    </div>
  );
}

export default CourseRouter;
