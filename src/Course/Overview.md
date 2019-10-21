```js
initialState = {
  course: {
    Description: "<p>a test description</p>",
    courseSemester: "WiSe 19/20",
    courseName: "A beautiful Course Name",
    auth: ["user", "admin"]
  }
};

// Function for fake "getting" (resetting) the course content
function getCourseContent() {
  setState({
    course: {
      Description: "<p>a test description</p>",
      courseSemester: "WiSe 19/20",
      courseName: "A beautiful Course Name",
      auth: ["user", "admin"]
    }
  });
}

<Overview
  description={state.course.Description}
  reloadContent={getCourseContent}
  courseName={state.courseName}
  courseSemester={state.courseSemester}
  UserPermissions={state.course.auth}
/>;
```
