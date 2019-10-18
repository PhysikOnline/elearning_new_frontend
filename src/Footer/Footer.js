import React from "react";
import "./Footer.css";

import IconFavorite from "../static/IconFavorite";

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
      <div>Impressum Datenschutz</div>
    </footer>
  );
}

export default Footer;
