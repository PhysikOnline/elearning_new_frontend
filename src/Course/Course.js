import React from "react";
// import { useParams } from "react-router-dom";
import "./Course.css";

class Course extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     // let { topicId } = useParams();
  //   }
  render() {
    return <div className="Course">{this.props.match.params.course}</div>;
  }
}

export default Course;
