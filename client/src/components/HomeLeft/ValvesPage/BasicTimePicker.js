import React, { useState } from "react";
import { TimePicker } from "@material-ui/pickers";

function BasicTimePicker(props) {
  // const [time, setTime] = useState()
  const [date, handleDateChange] = useState("0");

  return (
    <div>
      <TimePicker
        autoOk
        openTo="hours"
        value={props.hour}
        onChange={(date) => handleDateChange(date)}
        clearable
        ampm={false}
        format="HH:mm:ss"
      />
    </div>
  );
}

export default BasicTimePicker;
