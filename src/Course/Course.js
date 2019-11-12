import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Course.css";
import PropTypes from "prop-types";

import Loading from "../Additional/Loading";
import Error from "../Additional/Error";
import Settings from "./Settings";
import Overview from "./Overview";
import GroupRouter from "./Group/GroupRouter";
import PDF from "./PDF";

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
      courseSemester: decodeURIComponent(
        this.props.match.params.courseSemester
      ),
      pdfFilenames: [],
      isLoadingPDF: true
    };
    this.getCourseContent = this.getCourseContent.bind(this);
    this.handleCoureLeave = this.handleCoureLeave.bind(this);
    this.handleCoureJoin = this.handleCoureJoin.bind(this);
    this.getPdfFilenames = this.getPdfFilenames.bind(this);
  }
  handleCoureJoin() {
    fetch(
      "/course/joincourse?Semester=" +
        this.state.courseSemester +
        "&CourseName=" +
        this.state.courseName,
      {
        method: "POST"
      }
    )
      // parse the course content to json
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.error) {
          alert(JSON.stringify(responseJSON.error));
        } else if (responseJSON.succsessfull) {
          this.getCourseContent();
        }
      });
  }
  handleCoureLeave() {
    fetch(
      "/course/leavecourse?Semester=" +
        this.state.courseSemester +
        "&CourseName=" +
        this.state.courseName,
      {
        method: "POST"
      }
    )
      // parse the course content to json
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.error) {
          alert(JSON.stringify(responseJSON.error));
        } else if (responseJSON.succsessfull) {
          this.getCourseContent();
        }
      });
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
  getPdfFilenames() {
    if (!this.state.isLoading) {
      if (this.state.course.auth.includes("user")) {
        fetch(
          "/course/filenames?Semester=" +
            this.state.courseSemester +
            "&Name=" +
            this.state.courseName,
          {
            method: "GET"
          }
        )
          .then(res => res.json())
          .then(responseJSON => {
            this.setState(previousState => {
              if (
                JSON.stringify(previousState.pdfFilenames) !==
                JSON.stringify(responseJSON)
              ) {
                return { pdfFilenames: responseJSON, isLoadingPDF: false };
              }
            });
          });
      } else {
        this.setState(previousState => {
          if (previousState.isLoadingPDF === true) {
            return { isLoadingPDF: false };
          }
        });
      }
    }
  }
  /**
   * function for getting the course content on mount
   */
  componentDidMount() {
    this.getCourseContent();
    this.getPdfFilenames();
  }
  /**
   * funnction for refreshing the course content on update
   */
  componentDidUpdate() {
    this.getCourseContent();
    this.getPdfFilenames();
  }
  render() {
    // display a loading page, if isLoading is true
    if (this.state.isLoading || this.state.isLoadingPDF) {
      return <Loading />;
    }
    /* display an error if there is an error stored in this.state.course.
    the error object is usually created in the backend and this.getCourseContent
    stores the error in the this.state instead of the course. */
    if (this.state.course.error) {
      return <Error error={this.state.course.error} />;
    }

    // initialize values for the course tab pdf
    let tabListPDF;
    let tabPanelPDF;
    // display PDF tab, if user is user of group
    // console.log(this.state.pdfFilenames);
    if (
      (this.state.course.auth.includes("user") &&
        (this.state.pdfFilenames.exercise.length !== 0 ||
          this.state.pdfFilenames.script.length !== 0)) ||
      this.state.course.auth.includes("admin")
    ) {
      tabListPDF = <Tab>PDF</Tab>;
      tabPanelPDF = (
        <TabPanel>
          <PDF
            courseSemester={this.state.courseSemester}
            courseName={this.state.courseName}
            auth={this.state.course.auth}
            pdfFilenames={this.state.pdfFilenames}
            // isLoading={this.state.isLoadingPDF}
            getPdfFilenames={this.getPdfFilenames}
          />
        </TabPanel>
      );
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

    // initialize values for the course tab group
    let tabListGroup;
    let tabPanelGroup;
    /* display the group tabs, if the user is an admin or the course is visible
    or the group assignment activation timer is set */
    if (
      this.state.course.auth.includes("admin") ||
      this.state.course.auth.includes("tutor") ||
      ((this.state.course.GroupVisible || this.state.course.GroupTimerActive) &&
        this.state.course.auth.includes("user"))
    ) {
      tabListGroup = <Tab>Gruppen</Tab>;
      tabPanelGroup = (
        <TabPanel>
          <GroupRouter
            GroupVisible={this.state.course.GroupVisible}
            GroupTimerActive={this.state.course.GroupTimerActive}
            GroupTimer={this.state.course.GroupTimer}
            courseSemester={this.state.courseSemester}
            courseName={this.state.courseName}
            reloadContent={this.getCourseContent}
            auth={this.state.course.auth}
          />
        </TabPanel>
      );
    }

    // course join text
    let courseJoin;
    if (this.state.course.auth.length === 0 && this.props.login) {
      courseJoin = (
        <p className="join" onClick={this.handleCoureJoin}>
          beitreten
        </p>
      );
    } else if (
      !this.state.course.auth.includes("admin") &&
      !this.state.course.auth.includes("tutor") &&
      this.state.course.auth.includes("user") &&
      this.props.login
    ) {
      courseJoin = (
        <p className="join" onClick={this.handleCoureLeave}>
          verlassen
        </p>
      );
    }
    return (
      <div className="Course">
        {/* create a header for the course */}
        <div className="header">
          <div className="container">
            <p>{this.state.course.Semester}</p>
            {courseJoin}
          </div>
          <h1>{this.state.course.Name}</h1>
        </div>
        <Tabs>
          {/* define the tabs of the course */}
          <TabList>
            <Tab>Übersicht</Tab>
            {/* display groups if tabListGroup is defined */}
            {tabListGroup}
            {/* display the settings if tabListSetting is defined */}
            {tabListPDF}
            {tabListSetting}
          </TabList>

          <TabPanel>
            {/* render the overview page */}
            <Overview
              description={this.state.course.Description}
              reloadContent={this.getCourseContent}
              courseName={this.state.courseName}
              courseSemester={this.state.courseSemester}
              UserPermissions={this.state.course.auth}
            />
          </TabPanel>
          {/* display a Group panel, if tabPanelGroup is defined */}
          {tabPanelGroup}
          {/* display a Setting panel, if tabPanelSetting is defined */}
          {tabPanelPDF}
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
  login: PropTypes.bool.isRequired,
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
