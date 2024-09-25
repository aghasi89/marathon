import React from 'react'

export interface AnswersContextType {
    state:any,
    dispatchState:React.Dispatch<any>
}
export const AnswersContext=React.createContext<AnswersContextType>({state:{},dispatchState:()=>{}})