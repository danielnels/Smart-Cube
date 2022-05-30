import React, { useState } from "react";
import "./valve-style.css";

import CyclesWraper from "../Cycles/CyclesWraper";
import Manual from "../Manual/Manual";
import Off from "../Off/Off";
import Schedule from "../schedule/Schedule";

function ValveItem(props) {
  let [displayStyleControls, setDisplayStyleControls] = useState("block");

  const displayControls = () => {
    console.log("displayControls clicked");
    displayStyleControls === "none"
      ? setDisplayStyleControls("block")
      : setDisplayStyleControls("none");
  };

  return (
    <div className="valveItem-wraper">
      <button className="valve-options-button" onClick={displayControls}>
        Valve {props.number}
      </button>
      <section
        className="valve-controls"
        style={{ display: displayStyleControls }}
      >
        <Schedule />
        <CyclesWraper />
        <Manual />
        <Off />

        <h4>next irrigation: (nextIrrigation)</h4>
      </section>
    </div>
  );
}

export default ValveItem;
