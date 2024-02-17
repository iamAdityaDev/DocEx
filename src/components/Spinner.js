import "../css_files/spinner.css";
import React from "react";
import { HashLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="spin_back">
      <p className="loading_spinner">
        <HashLoader className="img_spin" size={100} color="#54B435" />
      </p>
    </div>
  );
};
export default Spinner;
