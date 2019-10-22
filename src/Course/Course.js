import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Course.css";
import PropTypes from "prop-types";

import Loading from "../Additional/Loading";
import Error from "../Additional/Error";
import Settings from "./Settings";
import Overview from "./Overview";

/**
 * Main Course displayin Component, we fetch the cours information here and pass
 * it to the other course components
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 *
 */
class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // this will contain the course data
      course: null,
      // varriable for showing a loadin page in render()
      isLoading: true,
      // decode the url course name to normal readable string
      courseName: decodeURIComponent(this.props.match.params.courseName),
      // decoude the course semester to normal readable string
      courseSemester: decodeURIComponent(this.props.match.params.courseSemester)
    };
    this.getCourseContent = this.getCourseContent.bind(this);
  }
  /**
   * fetch the course content, and store it into the state, this will trigger
   * an atomatic rearender
   */
  getCourseContent() {
    // fetching course content
    fetch(
      "/course/coursecontent?Semester=" +
        this.state.courseSemester +
        "&Name=" +
        this.state.courseName,
      {
        method: "GET"
      }
    )
      // parse the course content to json
      .then(response => response.json())
      .then(courseResponse => {
        // save the fetched course content into the state
        this.setState(previousState => {
          /* for an object comparison, we need to use JSON.stringify, otherwise
          it will be always false */
          if (
            JSON.stringify(previousState.course) !==
            JSON.stringify(courseResponse)
          ) {
            /* save the content and set isLoading to false to remove the 
            loading page */
            return { course: courseResponse, isLoading: false };
          }
        });
      });
  }
  /**
   * function for getting the course content on mount
   */
  componentDidMount() {
    this.getCourseContent();
  }
  /**
   * funnction for refreshing the course content on update
   */
  componentDidUpdate() {
    this.getCourseContent();
  }
  render() {
    // display a loading page, if isLoading is true
    if (this.state.isLoading) {
      return <Loading />;
    }
    /* display an error if there is an error stored in this.state.course.
    the error object is usually created in the backend and this.getCourseContent
    stores the error in the this.state instead of the course. */
    if (this.state.course.error) {
      return <Error error={this.state.course.error} />;
    }

    // initialize values for the course tab settings
    let tabListSetting;
    let tabPanelSetting;
    // display settings tab, if the user is an admin
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
        {/* create a header for the course */}
        <div className="header">
          <p>{this.state.course.Semester}</p>
          <h1>{this.state.course.Name}</h1>
        </div>
        <Tabs>
          {/* define the tabs of the course */}
          <TabList>
            <Tab>Übersicht</Tab>
            {/* display the settings if tabListSetting is defined */}
            {tabListSetting}
          </TabList>

          <TabPanel>
            {/* render the overview page */}
            <Overview
              description={this.state.course.Description}
              reloadContent={this.getCourseContent}
              courseName={this.state.courseName}
              courseSemester={this.state.courseSemester}
            />
          </TabPanel>
          {/* display a Setting panel, if tabPanelSetting is defined */}
          {tabPanelSetting}
        </Tabs>
      </div>
    );
  }
}
Course.propTypes = {
  /**
   * define the login state
   */
  login: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      /**
       * define the cours Name URI encoded
       */
      courseName: PropTypes.string.isRequired,
      /**
       * define the cours Semester URI encoded
       */
      courseSemester: PropTypes.string.isRequired
    })
  })
};
export default Course;
