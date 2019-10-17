import React from "react";

import Loading from "../Additional/Loading";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isOwner: false
    };
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    return <h1>Settings page</h1>;
  }
}

export default Settings;
