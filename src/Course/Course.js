import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Course.css";

import Loading from "../Additional/Loading";
import Error from "../Additional/Error";
import Settings from "./Settings";

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: undefined,
      isLoding: true
    };
  }
  componentDidMount() {
    fetch(
      "/course/coursecontent?Semester=" +
        decodeURIComponent(this.props.match.params.courseSemester) +
        "&Name=" +
        decodeURIComponent(this.props.match.params.courseName),
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(courseResponse => {
        this.setState(previousState => {
          if (previousState.course !== courseResponse) {
            return { course: courseResponse, isLoding: false };
          }
        });
      });
  }
  render() {
    if (this.state.isLoding) {
      return <Loading />;
    }
    if (this.state.course.error) {
      return <Error error={this.state.course.error} />;
    }
    return (
      <div className="Course">
        <div className="header">
          <p>{this.state.course.Semester}</p>
          <h1>{this.state.course.Name}</h1>
        </div>
        <Tabs>
          <TabList>
            <Tab>Übersicht</Tab>
            <Tab>Einstellungen</Tab>
          </TabList>

          <TabPanel>
            <p>Hier sollen grundlegende Infomationen über den Kurs stehen.</p>
          </TabPanel>
          <TabPanel>
            <Settings />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default Course;
