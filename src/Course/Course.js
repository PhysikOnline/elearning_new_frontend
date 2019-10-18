import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
import "./Course.css";

import Loading from "../Additional/Loading";
import Error from "../Additional/Error";
import Settings from "./Settings";
import Overview from "./Overview";

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: null,
      isLoading: true,
      courseName: decodeURIComponent(this.props.match.params.courseName),
      courseSemester: decodeURIComponent(this.props.match.params.courseSemester)
    };
    this.getCourseContent = this.getCourseContent.bind(this);
  }
  getCourseContent() {
    fetch(
      "/course/coursecontent?Semester=" +
        this.state.courseSemester +
        "&Name=" +
        this.state.courseName,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(courseResponse => {
        this.setState(previousState => {
          if (previousState.course !== courseResponse) {
            return { course: courseResponse, isLoading: false };
          }
        });
      });
  }
  componentDidMount() {
    this.getCourseContent();
  }
  componentDidUpdate() {
    this.getCourseContent();
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.course.error) {
      return <Error error={this.state.course.error} />;
    }
    let tabListSetting;
    let tabPanelSetting;
    if (this.state.course.auth.includes("admin")) {
      tabListSetting = <Tab>Einstellungen</Tab>;
      tabPanelSetting = (
        <TabPanel>
          <Settings
            courseSemester={this.state.courseSemester}
            courseName={this.state.courseName}
          />
        </TabPanel>
      );
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
            {tabListSetting}
          </TabList>

          <TabPanel>
            <Overview
              description={this.state.course.Description}
              reloadContent={this.getCourseContent}
              courseName={this.state.courseName}
              courseSemester={this.state.courseSemester}
            />
          </TabPanel>
          {tabPanelSetting}
        </Tabs>
      </div>
    );
  }
}

export default Course;
