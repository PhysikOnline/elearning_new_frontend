import React from "react";
import "./Group.css";

// import { parseISO } from "date-fns";
// import PropTypes from "prop-types";

// import datepicker (See README.md)
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Component to manage all course components, it is also used to fetch the course data
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 *
 */
class Group extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      newGroup: this.props.Group
    };
    this.handleChnage = this.handleChnage.bind(this);
    this.handleTimeChnage = this.handleTimeChnage.bind(this);
    this.TimeInJavaScriptDate = this.TimeInJavaScriptDate.bind(this);
  }
  handleChnage(event) {
    // console.log(event.target);
    // event.target.style.width = (event.target.value.length + 1) * 8 + "px";
    let EVENT = event.target;
    this.setState(prevState => ({
      newGroup: {
        // object that we want to update
        ...prevState.newGroup, // keep all other key-value pairs
        [EVENT.name]: EVENT.value
      }
    }));
  }
  handleTimeChnage(event, time) {
    this.setState(prevState => ({
      newGroup: {
        // object that we want to update
        ...prevState.newGroup, // keep all other key-value pairs
        [time]:
          ("0" + event.getHours()).slice(-2) +
          ":" +
          ("0" + event.getMinutes()).slice(-2) +
          ":" +
          ("0" + event.getSeconds()).slice(-2) // update the value of specific key
      }
    }));
  }
  TimeInJavaScriptDate(timeToChoose) {
    let date = new Date();
    let time = this.state.newGroup[timeToChoose].split(":");
    date.setHours(time[0]);
    date.setMinutes(time[1]);
    date.setSeconds(time[2]);
    return date;
  }
  render() {
    let isUser = !this.props.auth.includes("admin");
    return (
      <div className="Group">
        {/* display showGroupAdmin, if it is defined */}
        <div className="container">
          <div className="GroupNameTutor">
            <input
              style={{
                width: (this.state.newGroup.GroupName.length + 1) * 0.52 + "em"
              }}
              name="GroupName"
              placeholder="Gruppenname"
              value={this.state.newGroup.GroupName}
              onChange={this.handleChnage}
              disabled={isUser}
              type="text"
            />
            <input
              style={{
                width: (this.state.newGroup.Tutor.length + 1) * 0.52 + "em"
              }}
              name="Tutor"
              placeholder="Tutor"
              value={this.state.newGroup.Tutor}
              onChange={this.handleChnage}
              disabled={isUser}
              type="text"
            />
          </div>
          <div className="datePicker">
            <div>
              <select
                name="Weekday"
                value={this.state.newGroup.Weekday}
                onChange={this.handleChnage}
                disabled={isUser}
              >
                <option value="Mo">Mo</option>
                <option value="Di">Di</option>
                <option value="Mi">Mi</option>
                <option value="Do">Do</option>
                <option value="Fr">Fr</option>
              </select>
            </div>
            <DatePicker
              customInput={
                <label>{this.state.newGroup.Starttime.substring(0, 5)}</label>
              }
              selected={this.TimeInJavaScriptDate("Starttime")}
              // selected={"12:12"}
              // onChange={this.handleTimeChnage}
              onChange={event => {
                this.handleTimeChnage(event, "Starttime");
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              disabled={isUser}
            />
            <div>bis</div>
            <DatePicker
              customInput={
                <label>{this.state.newGroup.Endtime.substring(0, 5)}</label>
              }
              className="DatePicker"
              selected={this.TimeInJavaScriptDate("Endtime")}
              // selected={"12:12"}
              // onChange={this.handleTimeChnage}
              onChange={event => {
                this.handleTimeChnage(event, "Endtime");
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              disabled={isUser}
            />
          </div>
        </div>
        <div className="buttonContainer">
          <label>
            1/
            {isUser ? (
              this.state.newGroup.Maxuser
            ) : (
              <input
                value={this.state.newGroup.Maxuser}
                onChange={this.handleChnage}
                type="number"
                name="Maxuser"
                min="10"
                max="100"
              />
            )}
          </label>
          <input type="button" value={isUser ? "Beitreten" : "Löschen"} />
        </div>
      </div>
    );
  }
}
Group.propTypes = {};
export default Group;
