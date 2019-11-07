import React from "react";
import Loading from "../Additional/Loading";
// import { Switch, Route, useRouteMatch } from "react-router-dom";

import "./AllCourses.css";

class AllCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: null,
      isLoading: true
    };
  }
  getAllCourses() {
    fetch("/course/allcourses", {
      method: "GET"
    })
      .then(response => response.json())
      .then(allCoursesResponse => {
        this.setState(previousState => {
          if (previousState.allCourses !== allCoursesResponse) {
            return { allCourses: allCoursesResponse, isLoading: false };
          }
        });
      });
  }
  componentDidMount() {
    this.getAllCourses();
  }

  // returning list of the names of the courses from array
  listCourses(hello) {
    return hello.map(coursearray => <div>{coursearray}</div>);
  }

  // returning list of coursenames of each semester
  listSemester() {
    return this.state.allCourses.map(coursearray => (
      <div className="AllCourses">
        <div className="courseSemester">{coursearray.Semester}</div>
        <div className="courseName">{this.listCourses(coursearray.Name)}</div>
      </div>
    ));
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    //execute function for listing names of courses for each semester
    return (
      <div>
        <React.Fragment>
          <h1>Kursübersicht</h1>
          <div> {this.listSemester()}</div>
        </React.Fragment>
      </div>
    );
  }
}

export default AllCourses;
