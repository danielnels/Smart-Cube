import React from "react";
import ValveItem from "./ValvesPage/ValveItem/ValveItem";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "./valves.css";

function Valves(props) {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className="App-wraper"></div>
      <div className="valves-main-wraper">
        <header className="page-header">valves</header>
        <div className="valves-wraper">
          <br />
          <br />

          <div className="valves-list-wraper">
            <h3>Valves List</h3>
          </div>
          <div className="valves-items-wraper">
            <ValveItem number={1} />
            <ValveItem number={2} />
            <ValveItem number={3} />
            <ValveItem number={4} />
            <ValveItem number={5} />
            <ValveItem number={6} />
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default Valves;
