import { useEffect, useState } from 'react';
import './App.css';
import VoteButton from './VoteButton';
import Timer from './Timer';
import TimerSession from './TimerSession';

function App() {
  const [play, setPlay] = useState(false);
  const [breaks, setBreaks] = useState(5);
  const [session, setSession] = useState(25);
  const [role, setRole] = useState("session");
  const [isReset, setReset] = useState(false);
  const [isFinished, setFinished] = useState(false);

  function Reset() {
    setBreaks(5)
    setSession(25)
    setPlay(false)
    setRole("session")
    setReset(!isReset)
  }

  useEffect(() => {
    if (isFinished && role === "session") {
      setRole("break")
      setPlay(true)
      setFinished(false)
    }

    if (isFinished && role === "break") {
      setRole("session")
      setPlay(true)
      setFinished(false)
    }

  }, [isFinished])

  return (
    <div className='wrapper'>
      <div className='title'>
      <h1>25 + 5 Clock</h1>
      <p>Use yout time for work and take rest.</p>
      </div>
      <div className='votes'>
        <VoteButton text="Break Length" breaked={breaks} setBreaked={setBreaks} />
        <VoteButton text="Session Length" breaked={session} setBreaked={setSession} />
      </div>
      <div className='timer'>
          {
            role === "session" ?  <Timer timer={session} play={play} setPlay={setPlay} title={role} reset={isReset} setFinished={setFinished} music='/alarm.mp3' finished={isFinished}/> : 
            <TimerSession timer={breaks} play={play} setPlay={setPlay} title={role} reset={isReset} setFinished={setFinished} music='/iphone.mp3' finished={isFinished}/>
          }
      </div>
      <div className='controls'>
        <button className={play ? "pause" : ""} onClick={() => setPlay(!play)}>{play ? "Pause" : "Play"}</button>
        <button onClick={() => Reset()}>Reset</button>
      </div>
    </div>
  )
}

export default App
