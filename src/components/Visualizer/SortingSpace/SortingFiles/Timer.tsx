import { useEffect, useState } from "react";
import { useControls } from "../../../../supportFiles/store";

export function Timer({ isAlgoExecutionOver }:any) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliSeconds, setMilliSeconds] = useState(0);

  const progress = useControls((state:any) => state.progress);

  function resetTimer() {
    setMilliSeconds(0);
    setSeconds(0);
    setMinutes(0);
  }

  useEffect(() => {
    if (isAlgoExecutionOver) return;
    if (progress === "start")
      var intervalId = setInterval(() => setMilliSeconds((ml) => ml + 1), 100);
    else if (progress === "reset") resetTimer();
    return () => clearInterval(intervalId);
  }, [progress, isAlgoExecutionOver]);

  useEffect(() => {
    if (milliSeconds === 10) {
      setSeconds((seconds) => seconds + 1);
      setMilliSeconds(0);
    }
  }, [milliSeconds]);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((minutes) => minutes + 1);
      setSeconds(0);
    }
  }, [seconds]);
  return(
    <div>
      {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliSeconds} s`}
    </div>);
}
