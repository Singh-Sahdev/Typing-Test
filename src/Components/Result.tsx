import { useContext, useEffect, useState } from "react";
import { currInputContext } from "../Context/currInputContext";

interface resultI{
    wrongs:number
    speed:number
}

const Result = ({para}:{para:string[]}) => {

    const {currInput, contextTimer } = useContext(currInputContext) || { currInput: [], insertCurrInput: () => {}, deleteCurrInput: () => {} } // context for managing the input data via key press

    const [result,setResults] = useState<resultI|null>(null)

    useEffect(()=>{
        let totalWords=0, totalMistakes = 0


        for (let i = 0; i < currInput.length; i++) {
            console.log(currInput[i])
            const element = currInput[i], tempElement = para[i];
            totalWords = element.letter == ' ' && tempElement==' '?totalWords+1:totalWords
            totalMistakes = element.isWrong?totalMistakes+1:totalMistakes
            
            
        }

        // if(currInput && currInput.length && currInput[currInput.length-1]?.letter!=' '){
        //     totalWords+=1
        // }


        let speed = 0

        if(contextTimer){
            
            speed = totalWords*60/contextTimer
        }

        setResults({
            wrongs:totalMistakes,
            speed : speed
        })
    },[contextTimer, currInput, para])

    return <div className="text-white text-xl">
        Speed: {result?.speed} wpm<br/>
        Mistakes: {result?.wrongs}
    </div>;
};

export default Result;
