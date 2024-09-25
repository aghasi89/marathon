import React from 'react';
import { View, ViewStyle, TextStyle, TextInput } from 'react-native'
import defaultStyle from "./textArea.style";

type Props = {
  value?: string,
  onChange: (text: string) => void,
  placeholder?: string,
  placeholderTextColor?: string
  numberOfLines?:number
  customStyles?: {
    container?: ViewStyle | ViewStyle[],
    input?: TextStyle | TextStyle[],
  },
  disabled?:boolean
}

const TextArea: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  placeholderTextColor,
  customStyles,
  numberOfLines,
  disabled
}) => {

  return (
    <View style={[defaultStyle.container, customStyles?.container]} pointerEvents={disabled?'none':undefined}>
      <TextInput
        style={[defaultStyle.inputStyle, customStyles?.input]}
        value={value}
        placeholder={placeholder}
        onChangeText={text => onChange(text)}
        placeholderTextColor={placeholderTextColor}
        multiline={true}
        numberOfLines={numberOfLines}
      />
    </View>
  )
}

export default TextArea