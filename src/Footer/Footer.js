import React from "react";
import "./Footer.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

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
      <div>
        <a href="/impressum">Impressum</a>
        <a href="/datenschutz">Datenschutz</a>
      </div>
    </footer>
  );
}

export default Footer;
