import React from 'react';
import {View, TextInput, ViewStyle} from 'react-native';
import styles from './Search.styles';
import Icons from '../../assets/icons/svg/index';
import {inputBorder} from '../../assets/styles/colors.styles';
import SelectedUsers from '../../screens/ChatStack/Chat/AddMembers/components/selectedUsers/selectedUsers';

type Props = {
  open?: boolean;
  inputValue: string | undefined;
  onChangeText: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder: string;
  selectedUsers?: any;
  customStyles?: {
    containerStyle?: ViewStyle | ViewStyle[];
  };
};
const Search: React.FC<Props> = (props: Props) => {
  const {
    inputValue,
    open,
    onChangeText,
    onBlur,
    placeholder,
    selectedUsers,
    customStyles,
  } = props;
  return (
    <View style={[styles.container, customStyles?.containerStyle]}>
      {!selectedUsers && (
        <View>
          <Icons.SearchIcon fill={inputBorder} />
        </View>
      )}
      <View style={styles.inputContainer}>
        {selectedUsers && <SelectedUsers selectedUsers={selectedUsers} />}
        <TextInput
          placeholderTextColor={inputBorder}
          placeholder={placeholder}
          value={inputValue}
          style={styles.textInput}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
      </View>
    </View>
  );
};

export default Search;
