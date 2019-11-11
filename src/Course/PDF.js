import React from "react";
// import "./Course.css";
// import PropTypes from "prop-types";

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
    this.state = {};
    this.handlePDFDownload = this.handlePDFDownload.bind(this);
  }
  handlePDFDownload() {
    fetch("/course/download", {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf"
      }
    })
      .then(res => res.blob())
      .then(response => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response], {
          type: "application/pdf"
        });
        //Build a URL from the file
        // const fileURL = URL.createObjectURL(file);
        // //Open the URL on new Window
        // // let newWindow =
        let fileURL = URL.createObjectURL(file);
        // window.open(fileURL, "your filename.extension");

        // create <a> tag dinamically
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;

        // it forces the name of the downloaded file
        fileLink.target = "_blank";
        fileLink.download = "pdf_name";

        // triggers the click event
        fileLink.click();

        // let win = window.open("", "height=300, width=300");
        // let iframe = document.createElement("iframe");
        // let title = document.createElement("title");

        // title.appendChild(document.createTextNode("Nice title :)"));

        // iframe.src = fileURL;
        // iframe.width = "100%";
        // iframe.height = "100%";
        // iframe.style.border = "none";

        // win.document.head.appendChild(title);
        // win.document.body.appendChild(iframe);
        // win.document.body.style.margin = 0;
        // console.log("hello");
        // setTimeout(() => (newWindow.document.title = "New Title"), 2000);
        // newWindow.addEventListener("load", function() {
        // });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    // display a loading page, if isLoading is true
    // if (this.state.isLoading) {
    //   return <Loading />;
    // }
    /* display an error if there is an error stored in this.state.course.
    the error object is usually created in the backend and this.getCourseContent
    stores the error in the this.state instead of the course. */
    // if (this.state.course.error) {
    //   return <Error error={this.state.course.error} />;
    // }
    return (
      <div className="PDF">
        <input value="hello" type="button" onClick={this.handlePDFDownload} />
      </div>
    );
  }
}
// Course.propTypes = {};
export default Course;
