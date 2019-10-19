import React from "react";
import "./Footer.css";

import IconFavorite from "../static/IconFavorite";

/**
 * The Footer should always be visible to the user and conatin Legal information such as an Impressum, Privacy Policy.

Technically what we use here is a Sticky Footer (If you want to look it up).
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 */
function Footer() {
  return (
    <footer className="Footer">
      <div>
        Made with{" "}
        <div className="AnnimationSourround">
          <IconFavorite />
        </div>{" "}
        by PhysikOnline
      </div>
      <div>
        <a href="/impressum">Impressum</a>
        <a href="/datenschutz">Datenschutz</a>
      </div>
    </footer>
  );
}

export default Footer;
