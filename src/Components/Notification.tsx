import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import {IMessage} from '../App.tsx' 

const Notification = ({
    type,
    message,
    setIsVisible,
}: {
    type: string | null;
    message: string | null;
    setIsVisible: (type: IMessage) => void;
}) => {
    useEffect(() => {
        if (type) {
            setTimeout(() => {
                setIsVisible({type:null,message:null});
            }, 2500);
        }
    }, [type, setIsVisible]);
    return (
        <AnimatePresence>
            {type && (
                <motion.div
                    className={`absolute top-2 right-1 ${
                        type == "success" ? "bg-green-400" : type=='warning'?'bg-yellow-400':'bg-red-400'
                    } rounded h-auto w-64 py-2 pl-2 flex items-center justify-center`}
                    initial={{
                        y: -40,
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.6,
                        },
                    }}
                    exit={{
                        y: -40,
                        opacity: 0,
                    }}
                >
                    {message ? message : "No Message Provided"}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notification;
