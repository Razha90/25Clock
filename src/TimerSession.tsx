import { useState, useEffect } from 'react';

interface TimerProps {
  timer: number;
  play: boolean;
  title: string;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  reset: boolean;
  music: string;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  finished: boolean;
}

function TimerSession({
  timer,
  play,
  title,
  setPlay,
  reset,
  music,
  setFinished,
  finished,
}: TimerProps) {
  const [minute, setMinute] = useState(timer);
  const [seconds, setSeconds] = useState(0);
  const [timesup, setTimesup] = useState(false);
  const [onMusic, setMusic] = useState(false);

  useEffect(() => {
    if (seconds === 0) {
      setMinute(timer);
      setSeconds(0);
      setTimesup(false);
    }
  }, [timer]);

  useEffect(() => {
    setMinute(timer);
    setSeconds(0);
    setTimesup(false);
  }, []);

  useEffect(() => {
    setMinute(timer);
    setSeconds(0);
    setTimesup(false);
  }, [reset]);

  useEffect(() => {
    if (finished) {
      setMinute(timer);
      setSeconds(0);
      setTimesup(false);
    }
  }, [finished])

  useEffect(() => {
    let intervalId = 0;

    if (seconds === 0 && minute === 0 && play) {
      setPlay(false);
      setMusic(true);
    }

    if (play && (minute > 0 || seconds > 0)) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minute === 0) {
              clearInterval(intervalId);
              return 0;
            } else {
              setMinute((prevMinute) => prevMinute - 1);
              return 59;
            }
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [play, seconds, minute]);

  useEffect(() => {
    if (onMusic) {
      const musicP = new Audio(music);
      musicP.play();
      setMusic(false);
      setTimesup(true);
      setTimeout(() => {
        setFinished(true);
        setTimesup(false);
      }, 3000);
    }
  }, [onMusic, setMusic, setFinished, music]);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <h1>{capitalizeFirstLetter(title)}</h1>
      <div className={timesup ? 'timesup' : ''}>
        {minute}:{seconds < 10 ? '0' : ''}
        {seconds}
      </div>
    </>
  );
}

export default TimerSession;
