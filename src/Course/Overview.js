import React from "react";
import "./Overview.css";
import CKEditor from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";

import PropTypes from "prop-types";

import Error from "../Additional/Error";

/**
 * The overview is the first component, that every user sees when visiting the
 * Course page.
 *
 * @see [CKEditor](https://ckeditor.com/docs/ckeditor5/latest/builds/)
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 */
class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* The old and new editor text will compare the server version with the
      client version. If they don't match, a save button will be displayed */
      oldEditorText: null,
      newEditorText: this.props.description,
      // display an error, if an error occurs
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }
  /**
   * sMaking an API request which saves the description on the server.
   */
  handleSubmit() {
    fetch(
      "/api/course/insertdescription?Semester=" +
        this.props.courseSemester +
        "&Name=" +
        this.props.courseName +
        "&Description=" +
        encodeURIComponent(this.state.newEditorText),
      {
        method: "POST",
        headers: {
          "Content-Type": "text/html"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: { Description: this.state.newEditorText }
      }
    )
      // get text from the response
      .then(response => response.text())
      // process response text
      .then(responseText => {
        switch (responseText) {
          case "successfull":
            // on successful response reloade page contet.
            this.props.reloadContent();
            break;
          default:
            /* Set error Status if the response returns an error. This will
            render the error page */
            this.setState({ error: responseText });
            break;
        }
      });
  }
  componentDidUpdate() {
    /* set the state of oldEditorText if the component updates, this is usually 
    the case, if the save button is pressed. */
    if (this.state.oldEditorText !== this.props.description) {
      this.setState({ oldEditorText: this.props.description });
    }
  }
  render() {
    // render an error page, if an error is defined
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    let submitButton;
    /* render a submit button, if the server description is diffrend from the
    editor description */
    if (this.state.oldEditorText !== this.state.newEditorText) {
      submitButton = (
        /* definig the submit button which appears on text change */
        <button className="submit" onClick={this.handleSubmit}>
          Speichern
        </button>
      );
    }
    return (
      <div className="Overview">
        {/* define the editor, which is the CKEditor */}
        <CKEditor
          /* set the editor style to Ballon editor, this is an editor, which 
        enables the editor tool on a selected text */
          editor={BalloonEditor}
          /* sets the data of the text editor, which will be defined by the 
          state. so the state has to be changed, to change the editor text */
          data={this.state.newEditorText}
          onInit={editor => {
            // store the editor Text and use when it is needed.
            this.setState({ oldEditorText: editor.getData() });
          }}
          // enable the editable if user is admin
          disabled={!this.props.UserPermissions.includes("admin")}
          //configure the editor
          config={{
            // set a placeholde if the data is an empty string
            placeholder:
              "Hier zum editieren klicken. Text makieren für weitere formatierungs Optionen.",
            // select the editor options
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
            // set the state to the typed text, which changes the editor text
            this.setState(previousState => {
              if (previousState.newEditorText !== editor.getData()) {
                return { newEditorText: editor.getData() };
              }
            });
          }}
        />
        {/* render a submit button on an editor change */}
        {submitButton}
      </div>
    );
  }
}
Overview.propTypes = {
  /**
   * Description of the course
   */
  description: PropTypes.string.isRequired,
  /**
   * function for reload the coure content
   */
  reloadContent: PropTypes.func.isRequired,
  /**
   * Array to search for user permissions
   */
  UserPermissions: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default Overview;
