import React from 'react';
import {View, Text, TouchableOpacity, ViewStyle, Image} from 'react-native';
import styles from './MainHeader.styles';
import Icons from '../../../assets/icons/svg';
import Search from '../../search/Search';
import {calcWidth} from '../../../assets/dimensions';
import {primaryBlack} from '../../../assets/styles/colors.styles';
import {IUser} from '../../../types/types';

type Props = {
  title?: string;
  leftComponent?: any;
  search?: boolean;
  open?: boolean;
  inputValue?: string | undefined;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  leftComponentStyle?: ViewStyle;
  leftIcon?: boolean;
  leftIconPress?: () => void;
  users?: IUser[];
  isGroup?: boolean;
  count?: number;
};
const MainHeader: React.FC<Props> = ({
  title,
  leftComponent,
  onFocus,
  open,
  inputValue,
  onChangeText,
  onBlur,
  search,
  leftComponentStyle,
  leftIcon,
  leftIconPress,
  users,
  isGroup,
  count,
}) => {
  return (
    <View style={styles.container}>
      {leftIcon ? (
        <TouchableOpacity style={styles.arrowButton} onPress={leftIconPress}>
          <Icons.ArrowIcon fill={primaryBlack} />
        </TouchableOpacity>
      ) : (
        <View style={{width: calcWidth(20)}} />
      )}
      {!open ? (
        <View style={styles.meddleComponent}>
          {isGroup ? (
            <View style={styles.middle}>
              <View style={styles.imageContainer}>
                {users?.map((image, index) => {
                  if (index < 4) {
                    return (
                      <Image
                        key={index}
                        style={styles.image}
                        source={{uri: image.imageUrl}}
                      />
                    );
                  }
                })}
              </View>
              <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.titleCount}>{count} Users</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.titleText}>{title}</Text>
          )}
          {search ? (
            <TouchableOpacity style={styles.arrowButton} onPress={onFocus}>
              <Icons.SearchIcon />
            </TouchableOpacity>
          ) : (
            <View style={styles.arrowButton} />
          )}
        </View>
      ) : (
        <View style={styles.meddleComponent}>
          <Search
            open={open}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={onChangeText}
            inputValue={inputValue}
          />
        </View>
      )}
      <View style={[styles.leftComponent, leftComponentStyle]}>
        {leftComponent}
      </View>
    </View>
  );
};

export default MainHeader;
