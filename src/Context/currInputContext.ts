import {createContext} from 'react'
import { CurrInputInterface } from '../Components/WritingArea'


interface currInputContextI{
    currInput:CurrInputInterface[]
    insertCurrInput: (para:string[],isWrong:boolean) => void
    deleteCurrInput: () => void
    setContextTimer: (timer:number) => void
    contextTimer:number
}

export const currInputContext = createContext<currInputContextI|null>(null)