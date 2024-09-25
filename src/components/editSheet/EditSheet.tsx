/* eslint-disable prettier/prettier */
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {red} from '../../assets/styles/colors.styles';
import Toaster from '../toester/Toester';
import {PrimeryButton} from '../buttons';
import styles from './EditSheet.styles';

type ButtonList = {
  title: string;
  onSelect: () => void;
  Icon?: ReactNode;
  isDelete?: boolean;
};
type Props = {
  isVisible: boolean;
  onClose: () => void;
  list: ButtonList[];
  height?: number;
  isInvite?: boolean;
  isEmployer?: boolean;
};

const EditSheet: React.FC<Props> = ({
  isVisible,
  onClose,
  list,
  height,
  isInvite,
  isEmployer,
}) => {
  return (
    <Toaster
      height={height ?? calcHeight(300)}
      isVisible={isVisible}
      onClose={onClose}
      Screen={
        <View
          style={isEmployer ? styles.listContainerRight : styles.listContainer}>
          {list?.map((element, index) => {
            return (
              <PrimeryButton
                key={index}
                title={element.title}
                type="outline"
                onPress={element.onSelect}
                style={
                  isEmployer
                    ? styles.textRight
                    : !isInvite
                    ? styles.textLeft
                    : styles.button
                }
                Icon={element.Icon}
                textStyle={{color: element.isDelete ? red : '', marginLeft: calcWidth(10)}}
              />
            );
          })}
        </View>
      }
    />
  );
};
export default EditSheet;
