import React from "react";

import PropTypes from "prop-types";

import GroupConfig from "./GroupConfig";
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
      groups: []
    };
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
            return { groups: responseJSON };
          }
        });
      });
  }
  componentDidMount() {
    this.getGroups();
  }
  render() {
    // if (this.state.isLoading) {
    //   return <Loading />;
    // }
    // if (this.state.course.error) {
    //   return <Error error={this.state.course.error} />;
    // }
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
    return (
      <div className="GroupRouter">
        {/* display showGroupAdmin, if it is defined */}
        {showGroupAdmin}
        {this.state.groups.map(x => (
          <Group Group={x} auth={this.props.auth} key={x.GroupName} />
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
