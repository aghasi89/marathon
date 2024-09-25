import React from 'react';
import {View, TextInput, ViewStyle, ColorValue, Pressable} from 'react-native';
import {inputBorder} from '../../../../../../assets/styles/colors.styles';
import Icons from '../../../../../../assets/icons/svg';
import styles from './CommentInput.style';

type Props = {
  customStyle?: {
    containerStyle?: ViewStyle;
    inputStyle: ViewStyle;
  };
  disable?: boolean;
  onChange: (text: string) => void;
  value?: string;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  onSendIconPress:()=>void
};

const CommentInput: React.VFC<Props> = ({
  customStyle,
  disable,
  onChange,
  value,
  placeholder,
  placeholderTextColor,
  onSendIconPress
}) => {
  return (
    <View style={customStyle?.containerStyle}>
      <View
        style={[styles.inputContainer, customStyle?.inputStyle]}
        pointerEvents={disable ? 'none' : undefined}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChange}
          value={value}
        />
        <Pressable onPress={onSendIconPress}>
         {!value? <Icons.SendComment
            {...styles.sendIconStyle}
            fill={inputBorder}
          />
          :<Icons.SendCommentFill
            {...styles.sendIconStyle}
          />}
        </Pressable>
      </View>
    </View>
  );
};
export default CommentInput;
