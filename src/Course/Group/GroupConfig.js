import React from "react";
import "./GroupConfig.css";
import PropTypes from "prop-types";

// import datepicker (See README.md)
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Component to manage the overall group settings
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 *
 */
class GroupConfig extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    // };
    this.handleGroupVisibility = this.handleGroupVisibility.bind(this);
    this.handleGroupTimerActive = this.handleGroupTimerActive.bind(this);
    this.setGroupTimer = this.setGroupTimer.bind(this);
  }
  /**
   * POST the group timer to the api
   */
  setGroupTimer(event) {
    // convert date to mysql time
    let date = event
      .toLocaleString("de-DE")
      .replace(",", "")
      .split(" ");
    date[0] = date[0]
      .split(".")
      .reverse()
      .join("-");
    date = date.join(" ");
    // post data to backend
    fetch(
      "/api/course/group/grouptimer?Semester=" +
        this.props.courseSemester +
        "&Name=" +
        this.props.courseName +
        "&Time=" +
        date,
      { method: "POST" }
    )
      // get the response text
      .then(response => response.text())
      .then(console.log)
      // reload content after response
      .then(this.props.reloadContent);
  }
  /**
   * POST the group visibility toggle to the api
   */
  handleGroupVisibility() {
    // POST data
    fetch(
      "/api/course/group/togglegroupvisibility?Semester=" +
        this.props.courseSemester +
        "&Name=" +
        this.props.courseName,
      { method: "POST" }
    )
      // get response text
      .then(response => response.text())
      .then(console.log)
      // reload content after response
      .then(this.props.reloadContent);
  }
  /**
   * POST the group timer active toggle to the api
   */
  handleGroupTimerActive() {
    fetch(
      "/api/course/group/togglegrouptimeractive?Semester=" +
        this.props.courseSemester +
        "&Name=" +
        this.props.courseName,
      { method: "POST" }
    )
      // get response text
      .then(response => response.text())
      .then(console.log)
      // reload page content
      .then(this.props.reloadContent);
  }
  render() {
    // if (this.state.isLoading) {
    //   return <Loading />;
    // }
    // if (this.state.course.error) {
    //   return <Error error={this.state.course.error} />;
    // }
    return (
      <div className="GroupConfig">
        <div className="checkboxes">
          {/* half opacity if GroupTimerActive is selected */}
          <label className={this.props.GroupTimerActive ? "hideinput" : ""}>
            <input
              type="checkbox"
              name="GroupVisible"
              /* checked groupVisibility if it is selected in the course 
              (this is kind of a state with the api) */
              checked={this.props.GroupVisible}
              // execute onChange function which makes the api request
              onChange={this.handleGroupVisibility}
              // disabe, if the other checkbox is checked
              disabled={this.props.GroupTimerActive}
            />
            Gruppen für alle sichtbar
          </label>
          {/* half opacity if GroupTimerActive is selected */}
          <label className={this.props.GroupVisible ? "hideinput" : ""}>
            <input
              type="checkbox"
              name="GroupTimer"
              /* checked groupTimerActive if it is selected in the course 
              (this is kind of a state with the api) */
              checked={this.props.GroupTimerActive}
              // execute onChange function which makes the api request
              onChange={this.handleGroupTimerActive}
              // disabe, if the other checkbox is checked
              disabled={this.props.GroupVisible}
            />
            Gruppenanmeldung starten um (die Gruppen werden vor der anmeldung
            sichtbar sein):
          </label>
          <DatePicker
            // pare the default selected (this is also a state for with the api)

            selected={new Date(Date.parse(this.props.GroupTimer))}
            // set the on change function to set the group timer
            onChange={this.setGroupTimer}
            // some datpicker configs
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
      </div>
    );
  }
}
GroupConfig.propTypes = {
  /**
   * set the group assignment time
   */
  GroupTimer: PropTypes.string.isRequired,
  /**
   * sets, if the group assignment timer is active
   */
  GroupTimerActive: PropTypes.number.isRequired,
  /**
   * sets the Group assignment visibility
   */
  GroupVisible: PropTypes.number.isRequired,
  /**
   * sets the course Semester
   */
  courseSemester: PropTypes.string.isRequired,
  /**
   * sets the course Name
   */
  courseName: PropTypes.string.isRequired,
  /**
   * function to rerender the course
   */
  reloadContent: PropTypes.func.isRequired
};
export default GroupConfig;
