import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./CourseRouter.css";

import Course from "./Course";

function CourseRouter() {
  let match = useRouteMatch();
  return (
    <div className="CourseRouter">
      <Switch>
        <Route
          path={`${match.path}/:courseSemester/:courseName`}
          component={Course}
        />
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

// function Topic() {
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }

export default CourseRouter;
