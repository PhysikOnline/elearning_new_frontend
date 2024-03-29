import React from "react";

/**
 * This Component will display a Loading information in the Component you want to use. The best practice to use this Component
 * is, to initialize a state in the component with
 *
 * ```js
 * this.state = { isloadig: true };
 * ```
 *
 * when your data is scucsessfully mounted into your ComponentDidMount() function, you set isLoading to false. your Render
 * component should include something like
 * ```js
 * render() {
 *     if (this.state.isLoding) {
 *       return <Loading />;
 *     }
 *
 *     ...
 *
 *   }
 * }
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 */
function Loading() {
  return <h1>Loading...</h1>;
}

export default Loading;
