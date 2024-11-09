import React from "react";

interface LetterProps {
    letter: string;
    done: boolean;
    wrong: boolean;
}

const Letter: React.FC<LetterProps> = ({ letter, done, wrong }) => {
    return done ? (
        <span className={`${wrong && 'text-red-600 underline '}  whitespace-pre-wrap `}>{letter}</span>
    ) : (
        <span className={`opacity-40 whitespace-pre-wrap `}>{letter}</span>
    );
};

export default Letter;
