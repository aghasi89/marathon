import React from 'react'

export interface EditorKeyboardProvider {
    isClose: number,
    close: () => void,
    reset: () => void
}
export const EditorKeyboardProvider = React.createContext<EditorKeyboardProvider>({ isClose: 0, close: () => { }, reset: () => { } })