import { useState, useEffect, useMemo, useContext } from "react";
import { motion } from "framer-motion";

import { getParagraph } from "./services/getparagraph";
import { generateRandomColors } from "./services/generateRandomColors";

import WritingArea from "./Components/WritingArea";
import Timer from "./Components/Timer";
import Notification from "./Components/Notification";
import Result from "./Components/Result";
import Loading from "./Components/Loading";

import './App.css'
import { currInputContext } from "./Context/currInputContext";

export interface IMessage {
    type: string | null;
    message: string | null;
}

const titleVariant = {
    'animate':{
        transition:{
            staggerChild:0.3,
        }
    }
}

const title = "TEST YOUR SPEED WITH ACCURACY";

const App = () => {


    const {setContextTimer} = useContext(currInputContext) || {setContextTimer:() => {}}

    const colors = useMemo(() => generateRandomColors(title.length), []);

    const [message, setMessage] = useState<IMessage>({
        type: null,
        message: null,
    });

    const [start, setStart] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(Infinity);
    const [para, setPara] = useState<string[]>([]);

    useEffect(() => {
        async function fetch() {
            try {
                const result = await getParagraph(50);
                setPara(result.split(""));
            } catch (error) {
                console.error(error);
            }
        }
        fetch();
        console.log("useeffect");
    }, []);

    useEffect(() => {
        if (timer == 0) {
            setMessage({
                type: "success",
                message: "Time's up",
            });
            setStart("done");
        } else if (start == "done") {
            setMessage({
                type: "success",
                message: "Completed",
            });
        }
    }, [timer, start]);

    const clickHandler = function () {


        
        setLoading(true)
        if (!timer || timer < 0 || timer == Infinity) {
            setMessage({
                type: "error",
                message: "Timer must be valid and greater than zero",
            });
            return;
        }
        setTimeout(() => {
            setLoading(false)
            setContextTimer(timer)
            setStart("start");
        }, 3100);
    };


    const timerClickHandler = function(time:number){
        setTimer(time)
    }



    return (


            <div className="flex justify-center items-center flex-col ">
            

            <motion.div
                variants={titleVariant} animate='animate'
                className="overflow-hidden text-3xl font-semibold text-center absolute top-10  left-[50%] -translate-x-1/2"
            >
                {title.split("").map((letter, idx) => (
                    <motion.div
                        className="inline-block whitespace-pre " 
                        key={idx}
                        initial={{
                            opacity: 0,
                            scale:0,
                            y: idx % 2 ? 40 : -40,
                            color: colors[idx],
                        }}
                        animate={{
                            opacity: 1,
                            scale:1,
                            y: 0,
                            color: colors
                                .slice(idx, colors.length)
                                .concat(colors.slice(0, idx)).reverse(),
                            transition: {
                                y: { duration: 0.4 }, // Y animation runs only once
                                color: {
                                    duration: 3,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatType: "loop",
                                },
                            },
                        }}
                    >
                        {letter}
                    </motion.div>
                ))}
            </motion.div>

            {!start && !loading && (
                <>
                    <div className="flex gap-10 justify-center items-center mb-5">
                        <div id="selection1" onClick={() => timerClickHandler(30)} className="  rounded-lg   overflow-hidden relative h-16 w-24">

                            <div id="selection1-inner" className={` hover:scale-95 rounded-lg overflow-hidden flex justify-center items-center text-3xl cursor-pointer text-yellow-700 bg-[#1f1805] transition-all absolute inset-[0px] ${timer==30?'scale-95':''}` } >
                                30s
                            </div>
                        </div>
                        <div id="selection2" onClick={() => timerClickHandler(60)} className="  rounded-lg   overflow-hidden relative h-16 w-24">
                            <div id="selection2-inner" className={` hover:scale-95 rounded-lg overflow-hidden flex  justify-center items-center text-3xl cursor-pointer text-yellow-700 bg-[#1f1805] transition-all absolute inset-[0px] ${timer==60?'scale-95':''}` } >
                                60s
                            </div>

                        </div>

                    </div>

                    {/* <input
                        type="number"
                        title="Enter time in seconds"
                        className=" rounded p-2 mb-2 outline-none  text-center"
                        value={timer}
                        onChange={(e) =>
                            setTimer(() => {
                                if (parseInt(e.target.value) == 0) {
                                    return Infinity;
                                }
                                return parseInt(e.target.value);
                            })
                        }
                    /> */}
                    <motion.button
                        onClick={clickHandler}
                        className="rounded bg-yellow-800 bg-ye text-white px-5 py-2 "
                        whileHover={{
                            scale: 1.06,
                            backgroundColor: "#ca8a04",
                        }}
                        whileTap={{
                            scale: 1,
                            backgroundColor: "#ca8a04",
                            color: "black",
                        }}
                    >
                        
                        Start
                    </motion.button>
                </>
            )}
            <div className="flex justify-start items-center flex-col h-full">
                {start == "start" && (
                    <>
                        <Timer setTimer={setTimer} timeInSeconds={timer} />
                        <WritingArea isEditable={true} para={para} setStart={setStart} />
                    </>
                )}
            </div>

            <div className="flex justify-start items-center flex-col h-full gap-9">
                {start == "done" && (
                    <>
                        <Result para = {para} />
                        <WritingArea isEditable={false} para={para} setStart={setStart} />
                    </>
                )}
            </div>

            {
                loading && <Loading />
            }

            <Notification
                type={message.type}
                setIsVisible={setMessage}
                message={message.message}
            />
            </div>

    );
};

export default App;
