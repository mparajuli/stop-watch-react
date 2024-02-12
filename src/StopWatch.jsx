import { useEffect, useRef, useState } from "react";

function StopWatch() {
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(0);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    if (isTimeRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 1);

      return () => {
        clearInterval(intervalIdRef.current);
      };
    }
  }, [isTimeRunning]);

  const handleStart = () => {
    setIsTimeRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const handleStop = () => {
    setIsTimeRunning(false);
  };

  const handleReset = () => {
    setElapsedTime(0);
    setIsTimeRunning(false);
  };

  const formatTime = () => {
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}.${milliseconds}`;
  };
  return (
    <div className="stop-watch-container">
      <div className="stop-watch-display">{formatTime()}</div>
      <div className="stop-watch-buttons">
        <button className="start-button" onClick={handleStart}>
          Start
        </button>
        <button className="stop-button" onClick={handleStop}>
          Stop
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default StopWatch;
