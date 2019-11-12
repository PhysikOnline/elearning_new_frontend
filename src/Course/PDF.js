import React from "react";
import "./PDF.css";
// import PropTypes from "prop-types";

// import Loading from "../Additional/Loading";
import IconClose from "../static/IconClose";
import IconAdd from "../static/IconAdd";

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
    // this.state = {
    // };
    this.handlePDFDownload = this.handlePDFDownload.bind(this);
    this.displayPDFCategory = this.displayPDFCategory.bind(this);
    this.handlePDFDeletion = this.handlePDFDeletion.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handlePDFDownload(name, subfolder) {
    fetch(
      "/course/pdf?Semester=" +
        this.props.courseSemester +
        "&Name=" +
        this.props.courseName +
        "&subfolder=" +
        subfolder +
        "&file=" +
        name,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf"
        }
      }
    )
      .then(res => res.blob())
      .then(response => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response], {
          type: "application/pdf"
        });
        //Build a URL from the file
        let fileURL = URL.createObjectURL(file);

        // create <a> tag dinamically
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;

        // it forces the name of the downloaded file
        fileLink.target = "_blank";
        fileLink.download = name;

        // triggers the click event
        fileLink.click();
      })
      .catch(error => {
        console.log(error);
      });
  }
  handlePDFDeletion(name, subfolder) {
    fetch(
      "/course/pdf?Semester=" +
        this.props.courseSemester +
        "&Name=" +
        this.props.courseName +
        "&subfolder=" +
        subfolder +
        "&file=" +
        name,
      {
        method: "DELETE"
      }
    )
      .then(res => res.json())
      .then(response => {
        if (response.error) {
          alert(response.error);
        } else if (response.succsessfull) {
          this.props.getPdfFilenames();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleFileUpload(event, sub) {
    // console.log(event.target.files[0]);
    let reader = new FormData();
    let courseSemester = this.props.courseSemester;
    let courseName = this.props.courseName;

    reader.append("file", event.target.files[0]);
    fetch(
      "/course/pdf?Semester=" +
        courseSemester +
        "&Name=" +
        courseName +
        "&subfolder=" +
        sub,
      {
        method: "POST",
        "Content-Type": "application/json; charset=utf-8",
        body: reader
      }
    )
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.error) {
          alert(JSON.stringify(responseJSON.error));
        } else if (responseJSON.succsessfull) {
          this.props.getPdfFilenames();
        }
      });
    // reader.onload = function() {
    //   console.log(reader.result);
    //   // reader.append("triangle.obj", reader.result);
    // };

    // reader.onerror = function() {
    //   console.log(reader.error);
    // };
  }
  displayPDFCategory(Title, pdfFiles) {
    const subfolder = Title === "Skript" ? "script" : "exercise";
    let addButton;
    if (this.props.auth.includes("admin")) {
      addButton = (
        <div className="pdf-upload">
          <label htmlFor={"file-input-" + subfolder}>
            <IconAdd />
          </label>
          <input
            id={"file-input-" + subfolder}
            name={subfolder}
            type="file"
            accept=".pdf"
            onChange={event => {
              this.handleFileUpload(event, subfolder);
            }}
          />
        </div>
      );
    }
    return (
      <div className="contentBlock">
        <div className="File title">
          <div>{Title}</div>
          {addButton}
        </div>
        {pdfFiles.map(x => (
          <div className="File" key={x}>
            <div
              className="pdfBlock"
              onClick={() => this.handlePDFDownload(x, subfolder)}
            >
              {x}
            </div>
            {this.props.auth.includes("admin") ? (
              <div onClick={() => this.handlePDFDeletion(x, subfolder)}>
                <IconClose />
              </div>
            ) : (
              undefined
            )}
          </div>
        ))}
      </div>
    );
  }
  componentDidMount() {
    this.props.getPdfFilenames();
  }
  render() {
    // display a loading page, if isLoading is true
    // if (this.props.isLoading) {
    //   return <Loading />;
    // }
    /* display an error if there is an error stored in this.state.course.
    the error object is usually created in the backend and this.getCourseContent
    stores the error in the this.state instead of the course. */
    // if (this.state.course.error) {
    //   return <Error error={this.state.course.error} />;
    // }

    let displayScript;
    let displayExercise;
    if (this.props.pdfFilenames.script.length !== 0) {
      displayScript = this.displayPDFCategory(
        "Skript",
        this.props.pdfFilenames.script
      );
    } else if (this.props.auth.includes("admin")) {
      displayScript = this.displayPDFCategory("Skript", []);
    }
    if (this.props.pdfFilenames.exercise.length !== 0) {
      displayExercise = this.displayPDFCategory(
        "Aufgaben",
        this.props.pdfFilenames.exercise
      );
    } else if (this.props.auth.includes("admin")) {
      displayExercise = this.displayPDFCategory("Aufgaben", []);
    }
    return (
      <div className="PDF">
        {displayScript}
        {displayExercise}
      </div>
    );
  }
}
// Course.propTypes = {};
export default Course;
