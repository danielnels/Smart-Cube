import React, { useState } from "react";

function Off() {
  let [displayStyle, setDisplayStyle] = useState("none");
  const changeStyle = () => {
    console.log("Off clicked");
  };

  return (
    <div>
      <button onClick={changeStyle}>Pause irrgation</button>
      <form>
        <button style={{ display: displayStyle }}>Pause</button>
        <button>resume</button>
      </form>
    </div>
  );
}

export default Off;
