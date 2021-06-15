import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';

const parseTime = (time) =>{
  let sec = time % 60
  let min = (time - sec ) % 60
  let hours = (time - min - sec ) % 60

  let parsedMin = (min <10 ? '0' : '') +min;
  let parsedSec = (sec < 10 ? '0' : '') + sec;
  let parsedHours = (hours < 10 ? '0' : '') + hours
  return   `${parsedHours} : ${parsedMin} : ${parsedSec} `;
}

const useTimer =()=>{
  let [time, setTime] = useState(0);
  let [timerId, settimerId] = useState(null);
  const [timerOn, setTimerOn] = useState(false);
  const [timeList, setTimeList] = useState([])
  const [isMute, setIsMute] = useState(false)

  const handleClickStart = () => {
    setTimerOn(true);
  }

  const handleClickContinue = () => {
    const id = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000)
    settimerId(id)
  }

  const handleClickReset = () => {
    settimerId(null);
    setTimerOn(false);
    setTimeList([]);
    setTime(0);
    localStorage.timeList = JSON.stringify([ ...timeList,time])
  }

  const handleClickStop = () => {
    clearInterval(timerId)
    settimerId(null)
    setTimeList([...timeList, time]);
  }

  const handleMute = () => {
    setIsMute(!isMute)
  }


  useEffect(() => {
    console.log(time)

    if (timerOn) {
      const id = setInterval(() => {
        setTime((time) =>time + 1);

      }, 1000)
      settimerId(id)
    }
  }, [timerOn])
 
  return {
    handleClickStart,
    handleClickContinue,
    handleClickReset,
    handleClickStop,
    handleMute,
    isMute,
    time,
    timerId,
    timerOn,
    timeList
  }
}

function App() {
  
  const {
    handleClickStart,
    handleClickContinue,
    handleClickReset,
    handleClickStop,
    handleMute,
    isMute,
    time,
    timerId,
    timerOn,
    timeList
  } = useTimer();
 
  return (
    <>
      <div className="main">
      <button className="mute" onClick={handleMute}>{isMute ? 'вкл' : 'выкл' }</button>
        <h1>{parseTime(time)}</h1>
        <div className="timer">
          {timerId !== null && <audio  src="Beep_Short.mp3" muted={isMute} autoPlay />}

          {timerOn ?
            <button className="continue" disabled={timerId !== null} onClick={handleClickContinue}>Continue</button> :
            <button className="start" onClick={handleClickStart} >Start</button>
          }


          <button className="stop" disabled={timerId === null} onClick={handleClickStop}>Stop</button>
          <button className="reset" onClick={handleClickReset}>Reset</button>

        </div>
          {timeList.map(time => <p>{parseTime(time)}</p>)}
          
       

      </div>
    </>
  );
}

export default App;

