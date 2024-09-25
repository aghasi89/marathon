import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import Icons from '../../assets/icons/svg';
import {PrimeryButton} from '../buttons';
import styles from './BottomBar.styles';

type Props = {
  count: number;
  onImport: () => void;
  onPressMenu: () => void;
  buttonType: 'menu' | 'close';
  isAddToDay?: boolean;
  dayIndex?: number;
  isInvite?: boolean;
  onPressCalendar?: () => void;
};
const BottomBar: React.FC<Props> = ({
  count,
  onImport,
  onPressMenu,
  buttonType,
  isAddToDay,
  dayIndex,
  isInvite,
  onPressCalendar,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.circles}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <PrimeryButton
        title={
          isAddToDay ? `Add to Day ${dayIndex}` : isInvite ? 'Invite' : 'Import'
        }
        disable={count === 0}
        type={count > 0 ? 'default' : 'outline'}
        onPress={onImport}
        style={isAddToDay ? styles.addButton : styles.importButton}
      />
      {isAddToDay && (
        <TouchableOpacity style={styles.circles} onPress={onPressCalendar}>
          <Icons.Message />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.circles} onPress={onPressMenu}>
        {buttonType === 'close' ? (
          <Icons.PlusX />
        ) : (
          <Icons.GridSwitcherMenu
            height={calcHeight(15)}
            width={calcWidth(20)}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
export default BottomBar;
