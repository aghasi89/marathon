import React, {LegacyRef, ReactNode} from 'react';
import {View, Text, TouchableOpacity, ViewStyle, FlatList} from 'react-native';
import {primaryWhite} from '../../assets/styles/colors.styles';
import styles from './ButtonsTabBar.style';

type SelectedButtonStyle = {
  bgColor: string;
  textColor: string;
};
type Props = {
  selectedIndex?: number | undefined;
  setSelectedIndex: (index?: number) => void;
  data: Array<{
    title: string;
    icon?: ReactNode;
    isHide?: boolean;
  }>;
  selectedButtonStyle: SelectedButtonStyle;
  containerStyle?: ViewStyle;
  contentContainer?: ViewStyle;
  borderWidth?: number;
  flatlistRef?: LegacyRef<FlatList>;
};

const ButtonsTabBar: React.FC<Props> = ({
  selectedIndex,
  setSelectedIndex,
  data,
  selectedButtonStyle,
  containerStyle,
  contentContainer,
  borderWidth,
  flatlistRef,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        ref={flatlistRef}
        style={styles.scrollContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({item, index}) => {
          return !item.isHide ? (
            <TouchableOpacity
              key={index}
              onPress={() =>
                setSelectedIndex(index !== selectedIndex ? index : undefined)
              }>
              <View
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      index === selectedIndex
                        ? selectedButtonStyle.bgColor
                        : primaryWhite,
                    borderWidth: borderWidth ? borderWidth : 0,
                  },
                ]}>
                <View style={[styles.contentContainer, contentContainer]}>
                  {item.icon ? (
                    <View style={styles.iconContainer}>{item.icon}</View>
                  ) : null}
                  <Text
                    style={[
                      styles.buttonText,
                      selectedIndex === index
                        ? {color: selectedButtonStyle.textColor}
                        : styles.buttonTextColor,
                    ]}>
                    {item.title}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : null;
        }}
      />
    </View>
  );
};
export default ButtonsTabBar;
