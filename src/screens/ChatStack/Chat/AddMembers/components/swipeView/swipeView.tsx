import React from 'react';
import {View, Animated, TouchableOpacity, Image, Text} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icons from '../../../../../../assets/icons/svg/index';
import {calcWidth} from '../../../../../../assets/dimensions';
import {primaryWhite} from '../../../../../../assets/styles/colors.styles';
import styles from './swipeView.style';
import {useTranslation} from 'react-i18next';

export interface IData {
  name: string;
  image: string;
  id: any;
}

const SwipeView = ({listData, deleteItem, isAdmin}: any) => {
  const {t} = useTranslation();
  const VisibleItem = (props: any) => {
    const {data} = props;
    return (
      <TouchableOpacity
        disabled={data.item.disable}
        activeOpacity={1}
        style={styles.rowFront}>
        <View style={styles.info}>
          {data.item.user.image ? (
            <Image
              source={{
                uri: data.item.user.image,
              }}
              style={styles.userAvatar}
              resizeMode="contain"
            />
          ) : (
            <Icons.UserIcon {...styles.userAvatar} />
          )}
          <Text style={styles.name}>{data.item.user.name}</Text>
        </View>

        {data.item.role === 'owner' && (
          <Text style={styles.name}>{t(`admin`)}</Text>
        )}
      </TouchableOpacity>
    );
  };
  const renderItem = (data: any) => {
    const rowHeightAnimatedValue = new Animated.Value(20);
    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
      />
    );
  };
  const HiddenItemWithActions = (props: any) => {
    const {
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      onDelete,
      data,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: calcWidth(50),
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View>
        {!leftActionActivated && data.item.role !== 'owner' && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <View style={[styles.backRightBtn]}>
              <TouchableOpacity
                style={{padding: calcWidth(5)}}
                onPress={onDelete}>
                <Icons.DeleteIcon fill={primaryWhite} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    const rowActionAnimatedValue = new Animated.Value(65);
    const rowHeightAnimatedValue = new Animated.Value(65);
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onDelete={() => {
          deleteItem(data.item.user.id);
        }}
      />
    );
  };

  return (
    <View>
      <SwipeListView
        keyExtractor={(item: any) => item.user.id.toString()}
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={calcWidth(-65)}
      />
    </View>
  );
};

export default SwipeView;
