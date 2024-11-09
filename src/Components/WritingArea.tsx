import React, { useEffect, useContext } from "react";
import Letter from "./Letter";
import '../Static/WritingArea.css'
import { currInputContext } from "../Context/currInputContext";



export interface CurrInputInterface{
    isWrong:boolean
    letter:string
    
}

const WritingArea:React.FC<{para:string[],setStart:(start:string|null)=>void}> = ({para,setStart}) => {

    
    const {currInput, insertCurrInput, deleteCurrInput } = useContext(currInputContext) || { currInput: [], insertCurrInput: () => {}, deleteCurrInput: () => {} } // context for managing the input data via key press

    

    // used for accepting the key press for typing
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key;
            
            // only accepting a-z A-Z space and neglecting the combined key events except with the shift key
            if (/^[a-zA-Z ]$/.test(key) && !event.ctrlKey && !event.altKey && !event.metaKey ) { 
                
                const isWrong = key != para[currInput.length]
                    
                insertCurrInput(para,isWrong)

                
                    
            }
            // removing the last letter from the currInput array of letters and its properties(see its interface)
            else if(key.toLowerCase()=='backspace'){
                deleteCurrInput()

            }
            else if(key.toLowerCase() =='enter'){
                if(currInput.length == para.length){
                    setStart('done')
                }
            }
        };

        // Add event listener when component mounts
        window.addEventListener("keydown", handleKeyDown);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [para, currInput, setStart, insertCurrInput, deleteCurrInput]);




    return <div className=" leading-10 w-3/4 border rounded-md p-2 text-3xl bg-yellow-300 text-yellow-900">
        {
            currInput.map((currLetter,idx) => (
                <Letter key={idx} letter={currLetter.letter} done={true} wrong={currLetter.isWrong} />
            ))
        }
        <div id='cursor'></div>
        {
            para.slice(currInput.length).map((currLetter,idx) => (
                <Letter key={idx} letter={currLetter} done={false} wrong={false} />
            ))
        }
    </div>;
};

export default WritingArea;
