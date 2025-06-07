import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState(sessionLength * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isBeepPlaying, setIsBeepPlaying] = useState(false);

  //break length
  const handleBreakUp = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };
  const handleBreakDown = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };
  //session length
  const handleSessionUp = () => {
    if (sessionLength < 60) {
      setSessionLength((prev) => {
        const newLength = prev + 1;
        setTimer(newLength * 60);
        return newLength;
      });
    }
  };
  const handleSessionDown = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimer(sessionLength * 60);
    }
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
    if (timer === 0) {
      setIsBeepPlaying(true);
      setTimerLabel(timerLabel === "Session" ? "Break" : "Session");
      setTimeout(() => {
        setIsBeepPlaying(false);
      }, 1000);
      if (timerLabel === "Session") {
        setTimer(breakLength * 60);
      } else {
        setTimer(sessionLength * 60);
      }
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning, timer, timerLabel, breakLength, sessionLength]);

  function formatTime(timer) {
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;

    // add leading zeros if needed
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
              {timerLabel}
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
        {isBeepPlaying && (
          <audio
            id="beep"
            src="https://cdn.freesound.org/previews/196/196235_97763-lq.mp3"
          />
        )}
      </div>
    </div>
  );
}

export default App;
