import React from 'react'
import { IinitialState } from './Marathons/Group/CreateGroupMarathon/CreateGroupMarathon-reducer'
import { IAction } from '../../types/types'

export interface StateContextType {
    state:IinitialState,
    dispatchState?:React.Dispatch<IAction>
}
export const StateContext=React.createContext<StateContextType>({state:{},dispatchState:undefined})