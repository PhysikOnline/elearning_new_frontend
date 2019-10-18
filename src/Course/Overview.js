import React from "react";
import "./Overview.css";
import CKEditor from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";

import Error from "../Additional/Error";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldEditorText: null,
      newEditorText: this.props.description,
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }
  handleSubmit() {
    fetch(
      "/course/insertdescription?Semester=" +
        this.props.courseSemester +
        "&Name=" +
        this.props.courseName +
        "&Description=" +
        this.state.newEditorText,
      {
        method: "POST"
      }
    )
      .then(response => response.text())
      .then(responseText => {
        switch (responseText) {
          case "Sucsessfull":
            this.props.reloadContent();
            break;
          default:
            this.setState({ error: responseText });
            break;
        }
      });
  }
  componentDidUpdate() {
    if (this.state.oldEditorText !== this.props.description) {
      this.setState({ oldEditorText: this.props.description });
    }
  }
  render() {
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    let submitButton;
    if (
      this.state.oldEditorText !== this.state.newEditorText &&
      this.state.oldEditorText
    ) {
      submitButton = (
        <button className="submit" onClick={this.handleSubmit}>
          Speichern
        </button>
      );
    }
    return (
      <div className="Overview">
        <CKEditor
          editor={BalloonEditor}
          data={this.state.newEditorText}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            this.setState({ oldEditorText: editor.getData() });
          }}
          disabled={false}
          config={{
            placeholder:
              "Hier zum editieren klicken. Text makieren für weitere formatierungs Optionen.",
            toolbar: [
              "heading",
              "bold",
              "italic",
              "bulletedList",
              "numberedList",
              "link"
            ]
          }}
          onChange={(event, editor) => {
            this.setState({ newEditorText: editor.getData() });
          }}
        />
        {submitButton}
      </div>
    );
  }
}

export default Overview;
