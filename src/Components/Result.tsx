import { useContext, useEffect, useState } from "react";
import { currInputContext } from "../Context/currInputContext";

interface resultI{
    wrongs:number
    speed:number
}

const Result = () => {

    const {currInput, contextTimer } = useContext(currInputContext) || { currInput: [], insertCurrInput: () => {}, deleteCurrInput: () => {} } // context for managing the input data via key press

    const [result,setResults] = useState<resultI|null>(null)

    useEffect(()=>{
        let totalWords=0, totalMistakes = 0
        
        currInput.forEach(element => {
            totalWords = element.letter == ' '?totalWords+1:totalWords
            totalMistakes = element.isWrong?totalMistakes+1:totalMistakes
        })

        if(currInput && currInput[currInput.length-1].letter!=' '){
            totalWords+=1
        }


        let speed = 0

        if(contextTimer){
            
            speed = totalWords*60/contextTimer
        }

        setResults({
            wrongs:totalMistakes,
            speed : speed
        })
    },[contextTimer, currInput])

    return <div className="text-white">
        Speed: {result?.speed} Wpm<br/>
        Mistakes: {result?.wrongs}
    </div>;
};

export default Result;
