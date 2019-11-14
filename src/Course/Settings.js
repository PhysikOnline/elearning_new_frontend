import React from "react";
import "./Settings.css";

import Loading from "../Additional/Loading";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.handleCSVdownload = this.handleCSVdownload.bind(this);
  }
  handleCSVdownload() {
    fetch(
      "/api/course/coursecsv?Semester=" +
        this.props.courseSemester +
        "&CourseName=" +
        this.props.courseName,
      {
        method: "GET"
      }
    )
      .then(res => res.blob())
      .then(response => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response], {
          // type: "application/pdf"
        });
        //Build a URL from the file
        let fileURL = URL.createObjectURL(file);

        // create <a> tag dinamically
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;

        // it forces the name of the downloaded file
        fileLink.target = "_blank";
        fileLink.download =
          this.props.courseSemester + "-" + this.props.courseName + ".csv";

        // triggers the click event
        fileLink.click();
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    return (
      <div className="Settings">
        <h1>Admin Features</h1>
        <input
          type="button"
          onClick={this.handleCSVdownload}
          value="Nutzer CSV"
        />
      </div>
    );
  }
}

export default Settings;
