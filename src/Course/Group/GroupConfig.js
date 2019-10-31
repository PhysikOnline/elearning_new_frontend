import React from "react";
import "./GroupConfig.css";
import { parseISO } from "date-fns";
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
    this.state = {
      // set the group timer to state, for modification
      newGroupTimer: parseISO(this.props.GroupTimer)
    };
    this.handleGroupVisibility = this.handleGroupVisibility.bind(this);
    this.handleGroupTimerActive = this.handleGroupTimerActive.bind(this);
    this.setGroupTimer = this.setGroupTimer.bind(this);
  }
  /**
   * POST the group timer to the api
   */
  setGroupTimer() {
    fetch(
      "/course/group/grouptimer?Semester=" +
        this.props.courseSemester +
        "&Name=" +
        this.props.courseName +
        "&Time=" +
        this.state.newGroupTimer
          // convert the string to an mysql readable format
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
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
      "/course/group/togglegroupvisibility?Semester=" +
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
      "/course/group/togglegrouptimeractive?Semester=" +
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
            selected={parseISO(this.props.GroupTimer)}
            // set the on change function to set the group timer
            onChange={e => {
              this.setState({
                newGroupTimer: e
              });
              this.setGroupTimer();
            }}
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
