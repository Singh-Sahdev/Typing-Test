import React, { useEffect, useRef } from "react";

interface TimerProps {
    timeInSeconds: number;
    setTimer:(timer:number) => void
}

const Timer: React.FC<TimerProps> = ({ timeInSeconds,setTimer }) => {
    const timeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeLeft = timeInSeconds;

        const intervalId = setInterval(() => {
            if (timeLeft <= 0) {
                setTimer(0)
                clearInterval(intervalId); // Stop the timer when it reaches zero
            } else {
                timeLeft -= 1;
                if (timeRef.current) {
                    timeRef.current.innerText = String(timeLeft);
                }
            }
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [timeInSeconds,setTimer]);

    return (
        <div className="text-white text-xl my-24 ">
            Time Remaining: <span ref={timeRef} className="text-3xl font-bold"> {timeInSeconds}</span>s
        </div>
    );
};

export default Timer;
