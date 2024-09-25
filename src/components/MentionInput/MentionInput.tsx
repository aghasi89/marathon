import React, {RefObject } from 'react';
import { TextInput, View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import Icons from '../../assets/icons/svg/index';
import { primaryGrey } from '../../assets/styles/colors.styles';
import style from './MentionInput.style';

type Props = {
  onChange?: (text: string) => void;
  value?: string;
  placeholder?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  sendCommentHandler?: () => void;
  mentionedUsers?: any;
  showMentions?: boolean;
  handleSelectUser?: (user: any) => void;
  forwardRef: React.MutableRefObject<TextInput | null>
};
const MentionTextInput: React.VFC<Props> = (props: Props) => {
  const {
    onChange,
    value,
    placeholder,
    containerStyle,
    sendCommentHandler,
    showMentions,
    mentionedUsers,
    handleSelectUser,
    forwardRef
  } = props;

  return (
    <View style={[style.container, containerStyle]}>
      <TextInput
        style={style.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        multiline
        ref={forwardRef}
      />
      {showMentions && (
        <View style={style.mentioned}>
          {mentionedUsers &&
            mentionedUsers?.map((user: any) => (
              <TouchableOpacity
                key={user.whom_user.user.id}
                onPress={() => handleSelectUser && handleSelectUser(user)}>
                <Text>{user.who_user.user.first_name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      )}
      <TouchableOpacity onPress={sendCommentHandler}>
        <Icons.SendComment fill={primaryGrey} />
      </TouchableOpacity>
    </View>
  );
};

export default MentionTextInput;