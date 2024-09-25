import {useState} from 'react';
import {EditorKeyboardProvider} from '../context/EditerKeyboardContext';

export default ({children}: any) => {
  const [keyboard, setKeyboard] = useState(0);
  return (
    <EditorKeyboardProvider.Provider
      value={{
        isClose: keyboard,
        close: () => {
          setKeyboard(prev => prev + 1);
        },
        reset: () => {},
      }}>
      {children}
    </EditorKeyboardProvider.Provider>
  );
};
