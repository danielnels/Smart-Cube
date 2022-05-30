import React, { useState } from "react";

import BasicTimePicker from "../BasicTimePicker";

function Manual(props) {
  let [displayStyle, setDisplayStyle] = useState("none");
  const manual = () => {
    displayStyle === "none"
      ? setDisplayStyle("block")
      : setDisplayStyle("none");

    console.log("Manual clicked");
  };

  return (
    <div className="">
      <button onClick={manual}>Manual</button>
      <div className="manual-valva-1" style={{ display: displayStyle }}>
        <form>
          <section>
            <label>
              Duration:
              <div>
                <BasicTimePicker />
              </div>
            </label>
          </section>
          <button>Start</button>
          <button>Stop</button>
        </form>
      </div>
    </div>
  );
}

export default Manual;
