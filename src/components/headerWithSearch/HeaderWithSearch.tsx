import * as React from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import {lightPeriwinkles, primaryGrey} from '../../assets/styles/colors.styles';
import Icons from '../../assets/icons/svg';
import styles from './HeaderWithSearch.style';

type Props = {
  leftIconPressHandler: () => void;
  containerStyle?: ViewStyle;
  backIconeShow?: boolean;
  placeholder?: string;
  inputAutoFocus?: boolean;
  inputValueChange?: (text: string) => void;
  inputValue?: string;
  filterIconShow?: boolean;
  onFilterPress?: () => void;
  onFocuse?:()=>void
  inputRef:React.LegacyRef<TextInput>|null
};

const HeaderWithSearch: React.VFC<Props> = ({
  containerStyle,
  leftIconPressHandler,
  inputValueChange,
  onFilterPress,
  onFocuse,
  backIconeShow = true,
  placeholder,
  inputAutoFocus,
  inputValue,
  filterIconShow,
  inputRef
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {backIconeShow && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={leftIconPressHandler}>
          <Icons.ArrowIcon fill={primaryGrey} />
        </TouchableOpacity>
      )}
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Icons.SearchIcon {...styles.iconsStyle} />
          <TextInput
            value={inputValue}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={lightPeriwinkles}
            autoFocus={inputAutoFocus}
            onChangeText={inputValueChange}
            numberOfLines={1}
            onFocus={onFocuse}
            ref={inputRef}
          />
          {filterIconShow ? (
            <Pressable
              style={styles.filterTouchContainer}
              onPress={onFilterPress}>
              <Icons.Filter {...styles.iconsStyle} />
            </Pressable>
          ) : (
            <View style={styles.emptyView}></View>
          )}
        </View>
      </View>
    </View>
  );
};

export default HeaderWithSearch;
