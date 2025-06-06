import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState(sessionLength * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleBreakUp = () => {
    setBreakLength(breakLength + 1);
  };
  const handleBreakDown = () => {
    setBreakLength(breakLength - 1);
  };
  const handleSessionUp = () => {
    setSessionLength(sessionLength + 1);
  };
  const handleSessionDown = () => {
    setSessionLength(sessionLength - 1);
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>25-5 Clock</h1>{" "}
      <div className="row">
        <div id="break-label" className="col-sm-6 bg-primary">
          <span>Break Length</span>
          <div className="d-flex">
            <button onClick={handleBreakUp}>up</button>
            <span id="break-length">{breakLength}</span>
            <button onClick={handleBreakDown}>down</button>
          </div>
        </div>
        <div id="session-label" className="col-sm-6 bg-light">
          <span>Session Length</span>
          <div className="d-flex">
            <button onClick={handleSessionUp}>up</button>
            <span id="session-length">{sessionLength}</span>
            <button onClick={handleSessionDown}>down</button>
          </div>
        </div>
        <div className="container ">
          <div className="d-flex flex-column mb-3">
            <div
              id="timer-label"
              className="col-sm-12 bg-light 
              d-flex
              justify-content-center align-items-center"
            >
              Session
            </div>
            <div
              id="time-left"
              className="col-sm-12 bg-light d-flex justify-content-center align-items-center"
            >
              {}00:00
            </div>
          </div>
        </div>
        <button id="start_stop" className="col-sm-6 bg-primary">
          start/stop
        </button>
        <button id="reset" className="col-sm-6 bg-light">
          reset
        </button>
      </div>
    </div>
  );
}

export default App;
