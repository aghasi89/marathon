import { useContext } from "react"
import { EditorKeyboardProvider } from "./EditerKeyboardContext";

export default () => {
    const { isClose, close, reset } = useContext(EditorKeyboardProvider);

    return { isClose, close, reset }
}