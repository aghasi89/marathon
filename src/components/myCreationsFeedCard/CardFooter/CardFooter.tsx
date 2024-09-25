import * as React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icons from '../../../assets/icons/svg/index';
import styles from './CardFooter.style';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

type Props = {
  title?: string;
  leftIcon?: React.ReactNode;
  leftContainerText?: string;
  rightIcon?: React.ReactNode;
  rightContainerText?: string;
  showStartDate?: boolean;
  startDate?: string;
  showStartTime?: boolean;
  startTime?: string
};
const CardFooter: React.VFC<Props> = ({
  title,
  leftContainerText,
  leftIcon,
  rightIcon,
  rightContainerText,
  showStartDate,
  startDate,
  showStartTime,
  startTime
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <View style={styles.rowContainer}>
        {leftContainerText && (
          <View style={styles.rowItemContainer}>
            {leftIcon}
            <Text style={styles.infoText}>{leftContainerText}</Text>
          </View>
        )}
        {rightContainerText && (
          <View style={styles.rowItemContainer}>
            {rightIcon}
            <Text style={styles.infoText}>{rightContainerText}</Text>
          </View>
        )}
      </View>
      {
        showStartDate && <View style={styles.dateContainer}>
          <Icons.CalendarPackage />
          <Text style={styles.infoText}>{startDate}</Text>
        </View>
      }
      {
        showStartTime && <View style={styles.dateContainer}>
          <Icons.Clock width={calcWidth(16)} height={calcHeight(16)} fill={'#BEC8DD'} />
          <Text style={styles.infoText}>{startTime}</Text>
        </View>
      }
    </View>
  );
};

export default CardFooter;
