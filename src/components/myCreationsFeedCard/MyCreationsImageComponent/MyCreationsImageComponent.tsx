import * as React from 'react';
import {Image, View} from 'react-native';
import Icons from '../../../assets/icons/svg';
import styles from './MyCreationsImageComponent.style';
type Props = {
  url?: string;
  playIconShow?: boolean;
  topIcon?: React.ReactNode;
  bottomIcon?: React.ReactNode;
};
const MyCreationsImageComponent: React.VFC<Props> = ({
  url,
  playIconShow,
  topIcon,
  bottomIcon,
}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.smallCard} source={{uri: url}} />
      <View style={styles.absoluteContainer}>
        <View style={styles.rowContainer}>
          {topIcon && <View style={styles.iconContainer}>{topIcon}</View>}
        </View>
        <View>
          <View style={styles.middleContainer}>
            {playIconShow && (
              <View style={styles.playIconContainer}>
                <Icons.Play {...styles.iconStyle} />
              </View>
            )}
          </View>
        </View>
        <View style={styles.rowContainer}>{bottomIcon}</View>
      </View>
    </View>
  );
};
export default MyCreationsImageComponent;
