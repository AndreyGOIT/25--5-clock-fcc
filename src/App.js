import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState(sessionLength * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isBeepPlaying, setIsBeepPlaying] = useState(false);
  const beepRef = useRef(null);

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
      setSessionLength((prev) => {
        const newLength = prev - 1;
        setTimer(newLength * 60);
        return newLength;
      });
    }
  };
  //timer control
  const handleStartStop = () => {
    setIsTimerRunning(!isTimerRunning);
  };
  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimer(25 * 60);
    setIsTimerRunning(false);
  };
  //timer is running
  useEffect(() => {
    let intervalId;
    if (isTimerRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning, timer]);
  //timer logic
  useEffect(() => {
    if (timer === 0) {
      setIsBeepPlaying(true);
      if (beepRef.current) {
        beepRef.current.play();
      }
      setTimeout(() => {
        setIsBeepPlaying(false);
      }, 1000);

      if (timerLabel === "Session") {
        setTimerLabel("Break");
        setTimer(breakLength * 60);
      } else {
        setTimerLabel("Session");
        setTimer(sessionLength * 60);
      }
    }
  }, [timer, timerLabel, breakLength, sessionLength]);
  //format time
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
            <button onClick={handleBreakUp}>🔼</button>
            <span id="break-length">{breakLength}</span>
            <button onClick={handleBreakDown}>🔽</button>
          </div>
        </div>
        <div id="session-label" className="col-sm-6 bg-light">
          <span>Session Length</span>
          <div className="d-flex">
            <button onClick={handleSessionUp}>🔼</button>
            <span id="session-length">{sessionLength}</span>
            <button onClick={handleSessionDown}>🔽</button>
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
            ref={beepRef}
            src="https://cdn.freesound.org/previews/196/196235_97763-lq.mp3"
          />
        )}
      </div>
    </div>
  );
}

export default App;
