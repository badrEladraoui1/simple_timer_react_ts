import { useEffect, useRef, useState } from "react";
import Button from "./components/Button";

const TIME = 300; // in seconds

export default function App() {
  const [timer, setTimer] = useState<number>(TIME);
  const intervalId = useRef<number | null>(null);
  console.log("intervalId.current : ", intervalId.current);

  console.log("timer : ", timer);

  const startTimer = () => {
    if (intervalId.current === null) {
      intervalId.current = window.setInterval(
        () =>
          setTimer((prevState) => {
            if (prevState <= 1) {
              window.clearInterval(intervalId.current as number);
              intervalId.current = null;
              return 0;
            } else {
              return prevState - 1;
            }
          }),
        1000
      );
    }
  };

  const stopTimer = () => {
    if (intervalId.current !== null) {
      window.clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(TIME);
  };

  useEffect(() => {
    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-5">
      <p className="text-3xl font-bold">{formatTime(timer)}</p>
      <div className="flex gap-5 justify-center items-center">
        <Button onClick={startTimer}>Start</Button>
        <Button onClick={stopTimer}>Stop</Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
    </main>
  );
}
