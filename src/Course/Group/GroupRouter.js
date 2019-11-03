import React from "react";
import "./GroupRouter.css";

import PropTypes from "prop-types";
import { parseISO } from "date-fns";

import GroupConfig from "./GroupConfig";
import Loading from "../../Additional/Loading";
import Group from "./Group";

/**
 * Component to manage all course components, it is also used to fetch the course data
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 *
 */
class GroupRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      assignedGroups: [],
      openGroup: null,
      firstRender: true,
      isLoadingGroups: true,
      isLoadingAssignedGroups: true,
      isLoadingGroupChange: false,
      mountTime: new Date(),
      currentTimer: new Date().toISOString()
    };
    this.returnGroupBlock = this.returnGroupBlock.bind(this);
    this.unsetOpenGroup = this.unsetOpenGroup.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.setOpenGroup = this.setOpenGroup.bind(this);
    this.getGroups = this.getGroups.bind(this);
  }
  setOpenGroup(groupName) {
    this.setState({ openGroup: groupName });
  }
  unsetOpenGroup() {
    this.setState({ openGroup: null });
  }
  /**
   * function to fetch all groups
   */
  getGroups() {
    fetch(
      "/course/group/groupcontent?Semester=" +
        this.props.courseSemester +
        "&Name=" +
        this.props.courseName,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(responseJSON => {
        this.setState(previousState => {
          if (
            JSON.stringify(responseJSON) !==
            JSON.stringify(previousState.groups)
          ) {
            return { groups: responseJSON, isLoadingGroups: false };
          }
        });
      });
    fetch(
      "/course/group/assignedgroup?Semester=" +
        this.props.courseSemester +
        "&CourseName=" +
        this.props.courseName,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(responseJSON => {
        this.setState(previousState => {
          if (
            JSON.stringify(responseJSON) !==
            JSON.stringify(previousState.assignedGroups)
          ) {
            return { assignedGroups: responseJSON };
          }
        });
      })
      .then(
        this.setState(previousState => {
          if (
            !previousState.openGroup &&
            previousState.assignedGroups.length === 1 &&
            previousState.firstRender
          ) {
            return {
              openGroup: previousState.assignedGroups[0],
              firstRender: false
            };
          }
        })
      )
      .then(
        this.setState(previousState => {
          if (previousState.isLoadingAssignedGroups)
            return { isLoadingAssignedGroups: false };
        })
      );
  }
  handleLeave(event) {
    this.setState({ isLoadingGroupChange: true });
    fetch(
      "/course/group/leavegroup?Semester=" +
        this.props.courseSemester +
        "&CourseName=" +
        this.props.courseName +
        "&GroupName=" +
        event.target.name,
      {
        method: "POST"
      }
    )
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.error) {
          alert(JSON.stringify(responseJSON.error));
        } else if (responseJSON.succsessfull) {
          this.getGroups();
        }
      })
      .then(this.setState({ isLoadingGroupChange: false }));
  }
  handleJoin(event) {
    this.setState({ isLoadingGroupChange: true });
    fetch(
      "/course/group/joingroup?Semester=" +
        this.props.courseSemester +
        "&CourseName=" +
        this.props.courseName +
        "&GroupName=" +
        event.target.name,
      {
        method: "POST"
      }
    )
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.error) {
          alert(JSON.stringify(responseJSON.error));
        } else if (responseJSON.succsessfull) {
          this.getGroups();
        }
      })
      .then(this.setState({ isLoadingGroupChange: false }));
  }
  componentDidMount() {
    this.getGroups();
    setInterval(() => {
      this.setState({
        currentTimer: new Date().toISOString()
      });
    }, 500);
  }
  componentDidUpdate(prevProps, prevState) {
    // remove currentTimer from state, otherwise it will always reload the page
    let old = this.state;
    let newstate = prevState;
    delete old.currentTimer;
    delete old.newstate;

    if (
      JSON.stringify(old) !== JSON.stringify(newstate) ||
      JSON.stringify(prevProps) !== JSON.stringify(this.props)
    ) {
      this.getGroups();
    }
  }
  returnGroupBlock(group) {
    let joinButton;
    if (
      !this.props.auth.includes("admin") &&
      !this.props.auth.includes("tutor") &&
      this.state.assignedGroups.length === 0 &&
      group.Maxuser > group.AssignedUser
    ) {
      joinButton = (
        <input
          name={group.GroupName}
          type="button"
          value="Beitreten"
          onClick={this.handleJoin}
          disabled={
            this.state.isLoadingGroupChange ||
            new Date(Date.parse(this.state.currentTimer)) <
              new Date(Date.parse(this.props.GroupTimer))
          }
        />
      );
    } else if (
      !this.props.auth.includes("admin") &&
      !this.props.auth.includes("tutor") &&
      this.state.assignedGroups.length === 1 &&
      this.state.assignedGroups[0] === group.GroupName
    ) {
      joinButton = (
        <input
          name={group.GroupName}
          type="button"
          value="Verlassen"
          onClick={this.handleLeave}
          disabled={this.state.isLoadingGroupChange}
        />
      );
    }
    return (
      <div className="GroupBlock" onClick={this.handleGroupClick}>
        <div className="container">
          <div className="GroupNameTutor">
            {this.state.assignedGroups.includes(group.GroupName) ||
            this.props.auth.includes("admin") ? (
              <label
                className="GroupName linkHover"
                onClick={() => this.setState({ openGroup: group.GroupName })}
              >
                {group.GroupName}
              </label>
            ) : (
              <label className="GroupName">{group.GroupName}</label>
            )}
            <label className="Tutor">{group.Tutor}</label>
          </div>
          <div className="datePicker">
            <label>{group.Weekday}</label>
            <label>{group.Starttime.substring(0, 5)}</label>
            <div>bis</div>
            <label>{group.Endtime.substring(0, 5)}</label>
            <label>{group.Room}</label>
          </div>
        </div>
        <div className="buttonContainer">
          <label>
            {group.AssignedUser}/{group.Maxuser}
          </label>
          {joinButton}
        </div>
      </div>
    );
  }

  render() {
    // console.log(this.props.GroupTimer);
    // console.log(new Date());
    if (this.state.isLoadingAssignedGroups || this.state.isLoadingGroups) {
      return <Loading />;
    }
    // if (this.state.course.error) {
    //   return <Error error={this.state.course.error} />;
    // }

    if (this.state.openGroup) {
      return (
        <div className="GroupRouter">
          <label className="linkHover" onClick={this.unsetOpenGroup}>
            Zur Gruppenuebersicht
          </label>

          <Group
            Group={this.state.groups.find(
              group => group.GroupName === this.state.openGroup
            )}
            auth={this.props.auth}
            courseSemester={this.props.courseSemester}
            courseName={this.props.courseName}
            reloadContent={this.getGroups}
            setOpenGroup={this.setOpenGroup}
            otherGroups={this.state.groups
              .map(group => group.GroupName)
              .filter(groupName => groupName !== this.state.openGroup)}
          />
        </div>
      );
    }

    // define group settings varriable
    let showGroupAdmin;
    // show group settings, if the user is an admin
    if (this.props.auth.includes("admin")) {
      showGroupAdmin = (
        <GroupConfig
          GroupTimer={this.props.GroupTimer}
          GroupTimerActive={this.props.GroupTimerActive}
          courseSemester={this.props.courseSemester}
          courseName={this.props.courseName}
          reloadContent={this.props.reloadContent}
          GroupVisible={this.props.GroupVisible}
        />
      );
    }

    // display group timer, if it is set
    let displayGroupTimer;
    if (
      !this.props.auth.includes("admin") &&
      parseISO(this.props.GroupTimer) > this.state.mountTime
    ) {
      displayGroupTimer = (
        <div>
          Gruppenanmeldung startet um:{" "}
          {parseISO(this.props.GroupTimer).toLocaleString()}
        </div>
      );
    }

    return (
      <div className="GroupRouter">
        {/* display showGroupAdmin, if it is defined */}
        {showGroupAdmin}
        {/* display displayGroupTimer, if it is defined */}
        {displayGroupTimer}
        {this.state.groups.map(x => (
          <div key={x.GroupName}>{this.returnGroupBlock(x)}</div>
          // <Group Group={x} auth={this.props.auth} key={x.GroupName} />
        ))}
      </div>
    );
  }
}
GroupRouter.propTypes = {
  /**
   * define the user permissions
   */
  auth: PropTypes.arrayOf(PropTypes.string).isRequired,
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
export default GroupRouter;
