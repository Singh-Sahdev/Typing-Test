import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const Loading = () => {
    const [progress, setProgress] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        // Animate the bar to fill over 3 seconds with backInOut easing
        controls.start({
            width: "100%",
            transition: {
                duration: 3,
                ease: "linear",
            },
        });

        // Set an interval to update progress percentage every 30 ms
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 30);

        return () => clearInterval(interval);
    }, [controls]);

    const parentVariant = {
        show: {
            transition: {
                staggerChildren: 0.1, // main property for staggering the children and giving the duration gap of the number specified
            },
        },
    };

    const childVariant = {
        show: {
            y: [0, 15, 0],
            transition: {
                duration: 0.5,
                repeat: Infinity,
                repeatType: "loop" as const,
            },
        },
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <motion.div
                variants={parentVariant}
                animate="show"
                className="flex"
            >
                <motion.div
                    variants={childVariant}
                    className=" rounded-full bg-yellow-300 h-4 aspect-square m-2"
                ></motion.div>
                <motion.div
                    variants={childVariant}
                    className=" rounded-full bg-yellow-300 h-4 aspect-square m-2"
                ></motion.div>
                <motion.div
                    variants={childVariant}
                    className=" rounded-full bg-yellow-300 h-4 aspect-square m-2"
                ></motion.div>
                <motion.div
                    variants={childVariant}
                    className=" rounded-full bg-yellow-300 h-4 aspect-square m-2"
                ></motion.div>
                <motion.div
                    variants={childVariant}
                    className=" rounded-full bg-yellow-300 h-4 aspect-square m-2"
                ></motion.div>
            </motion.div>

            <div className="flex flex-col items-center">
                <motion.div className="h-1 rounded-full w-96 bg-black mt-10 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={controls}
                        className="h-1 rounded-full bg-yellow-400"
                    />
                </motion.div>
                <span className="mt-2 text-lg font-semibold text-yellow-700">{progress}%</span>
            </div>
        </div>
    );
};

export default Loading;
