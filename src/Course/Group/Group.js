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
    this.state = {
      newGroup: this.props.Group,
      validity: {
        GroupName: false,
        Tutor: false
      }
    };
    this.handleChnage = this.handleChnage.bind(this);
    this.handleTimeChnage = this.handleTimeChnage.bind(this);
    this.TimeInJavaScriptDate = this.TimeInJavaScriptDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChnage(event) {
    let EVENT = event.target;
    let EventNumber;
    if (EVENT.validity.patternMismatch) {
      switch (EVENT.name) {
        case "GroupName":
          EVENT.setCustomValidity(
            "Gruppenname kann nur aus ÄÖÜäöüß (leer) A-Z a-z 0-9 bestehen und muss 3 bis 20 Zeichen beinhalten. Gruppenname muessen in einem Kurs einmalig sein."
          );
          break;
        case "Tutor":
          EVENT.setCustomValidity(
            "Tutor kann nur aus a-z 0-9 bestehen und kann maximal 8 Zeichen beinhalten"
          );
          break;
        default:
          break;
      }
    } else {
      EVENT.setCustomValidity("");
      if (EVENT.name === "Maxuser") {
        EventNumber = Number(EVENT.value);
      }
    }
    this.setState(prevState => ({
      newGroup: {
        // object that we want to update
        ...prevState.newGroup, // keep all other key-value pairs
        [EVENT.name]: EventNumber ? EventNumber : EVENT.value
      },
      validity: {
        ...prevState.validity,
        [EVENT.name]: EVENT.validity.patternMismatch
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
  handleSubmit() {
    if (!this.state.validity.GroupName && !this.state.validity.Tutor) {
      fetch(
        "/course/group/insertorupdategroup?Semester=" +
          this.props.courseSemester +
          "&CourseName=" +
          this.props.courseName +
          "&GroupName=" +
          this.state.newGroup.GroupName +
          "&Tutor=" +
          this.state.newGroup.Tutor +
          "&Starttime=" +
          this.state.newGroup.Starttime +
          "&Endtime=" +
          this.state.newGroup.Endtime +
          "&Weekday=" +
          this.state.newGroup.Weekday +
          "&MaxUser=" +
          this.state.newGroup.Maxuser +
          "&OldGroupName=" +
          this.props.Group.GroupName +
          "&Room=" +
          this.state.newGroup.Room,
        { method: "POST" }
      )
        .then(response => response.json())
        .then(responseJSON => {
          if (responseJSON.error) {
            alert(JSON.stringify(responseJSON.error));
          } else if (responseJSON.succsessfull) {
            this.props.setOpenGroup(this.state.newGroup.GroupName);
          } else {
            alert("i don't now what, but something went wrong :-|");
          }
        })
        .then(this.props.reloadContent);
    } else {
      alert("Felder sind nicht korrekt ausgefuellt");
    }
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
    let submitButton;
    /* render a submit button, if the server description is diffrend from the
    editor description */
    console.log(JSON.stringify(this.state.newGroup));
    console.log(JSON.stringify(this.props.Group));
    console.log(
      JSON.stringify(this.state.newGroup) !== JSON.stringify(this.props.Group)
    );
    if (
      JSON.stringify(this.state.newGroup) !== JSON.stringify(this.props.Group)
    ) {
      submitButton = (
        /* definig the submit button which appears on text change */
        <button
          className={
            !this.state.validity.GroupName && !this.state.validity.Tutor
              ? "valid submit"
              : "notvalid submit"
          }
          onClick={this.handleSubmit}
        >
          Speichern
        </button>
      );
    }
    return (
      <div className="Group">
        {/* display showGroupAdmin, if it is defined */}
        <div className="container">
          <input
            className="optInput"
            name="GroupName"
            placeholder="Gruppenname"
            value={this.state.newGroup.GroupName}
            onChange={this.handleChnage}
            disabled={isUser}
            type="text"
            required
            pattern={
              this.props.otherGroups
                .map(group => "(?!^" + group + "$)")
                .join("") + "(^[ÄÖÜäöüßA-Za-z0-9 ]{3,20}$)"
            }
          />
          <input
            className="optInput"
            name="Tutor"
            placeholder="Tutor"
            value={this.state.newGroup.Tutor}
            onChange={this.handleChnage}
            disabled={isUser}
            type="text"
            maxLength="8"
            pattern="^[a-z0-9]{1,8}$"
          />
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
            <input
              className="optInput"
              name="Room"
              placeholder="Raum"
              value={this.state.newGroup.Room}
              onChange={this.handleChnage}
              disabled={isUser}
              type="text"
              maxLength="15"
            />
          </div>
        </div>
        <div className="buttonContainer">
          <label>
            {this.state.newGroup.AssignedUser}/
            {isUser ? (
              this.state.newGroup.Maxuser
            ) : (
              <input
                value={this.state.newGroup.Maxuser}
                onChange={this.handleChnage}
                type="number"
                name="Maxuser"
                min={this.state.newGroup.AssignedUser}
              />
            )}
          </label>
          {!isUser ? <input type="button" value="Löschen" /> : undefined}
          {submitButton}
        </div>
      </div>
    );
  }
}
Group.propTypes = {};
export default Group;
