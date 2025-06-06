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
  const handleStartStop = () => {
    setIsTimerRunning(!isTimerRunning);
  };
  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimer(25 * 60);
    setIsTimerRunning(false);
  };
  useEffect(() => {
    const handleTimer = () => {
      setTimer(timer - 1);
    };
    let intervalId;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        handleTimer();
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning, timer]);

  function formatTime(timer) {
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;

    // Добавим ведущий ноль, если число < 10
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

    return `${formattedMins}:${formattedSecs}`;
  }

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>25-5 Clock</h1>
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
              {formatTime(timer)}
            </div>
          </div>
        </div>
        <button
          id="start_stop"
          className="col-sm-6 bg-primary"
          onClick={handleStartStop}
        >
          start/stop
        </button>
        <button id="reset" className="col-sm-6 bg-light" onClick={handleReset}>
          reset
        </button>
      </div>
    </div>
  );
}

export default App;
