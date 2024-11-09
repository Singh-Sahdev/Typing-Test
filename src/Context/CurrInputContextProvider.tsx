import  { useState } from 'react'
import { CurrInputInterface } from '../Components/WritingArea'
import { currInputContext } from './currInputContext';


export const CurrInputContextProvider = ({children}:{children:React.ReactNode}) => {

    const [currInput, setCurrInput] = useState<CurrInputInterface[]>([]);
    const [contextTimer, setContextTimer] = useState<number>(0);



    const insertCurrInput = function(para:string[],isWrong:boolean){
        setCurrInput((prev:CurrInputInterface[]) => [...prev,{
            letter:para[currInput.length],
            isWrong
        }]);
    }

    

    const deleteCurrInput = function(){
        setCurrInput((prev) => prev.slice(0, -1));
    }


  return (
    <currInputContext.Provider value={{currInput,insertCurrInput,deleteCurrInput,contextTimer, setContextTimer}}>
        {children}
    </currInputContext.Provider>
  )
}

export default CurrInputContextProvider