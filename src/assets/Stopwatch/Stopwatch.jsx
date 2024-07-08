import React, { useState, useEffect, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (running) {
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [running]);

    const formatTime = (time) => {
        const milliseconds = ("0" + (time % 1000)).slice(-3);
        const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
        const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
        return `${minutes}:${seconds}.${milliseconds}`;
    };

    const handleStartStop = () => {
        setRunning(!running);
    };

    const handleReset = () => {
        setTime(0);
    };

    return (
        <div className="stopwatch-container">
            <div className="stopwatch">
                <div className="time">{formatTime(time)}</div>
                <button onClick={handleStartStop}>
                    {running ? 'Pause' : 'Start'}
                </button>
                <button onClick={handleReset} disabled={running}>Reset</button>
            </div>
        </div>
    );
};

export default Stopwatch;
