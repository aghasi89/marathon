import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { calcHeight } from '../../../../../assets/dimensions';
import { IUser } from '../../../../../types/types';
import {
  backgroudLightRed,
  mediumSeaGreen,
  rajah,
} from '../../../../../assets/styles/colors.styles';
import styles from './TransactionCard.style';

interface IProps {
  index: number;
  user?: IUser;
  status?: string;
  fee?: number;
  currency: string;
  amount: number;
  date: number | string
}
const TransactionCard: React.FC<IProps> = props => {
  const { index, user, status, currency, fee, amount, date } = props;
  const { t } = useTranslation();

  const renderStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: rajah,
          title: t('requested'),
        };
      case 'succeed':
        return {
          color: mediumSeaGreen,
          title: t('paid'),
        };
      case 'rejected':
        return {
          color: backgroudLightRed,
          title: t('rejected'),
        };
      default:
        return;
    }
  };

  var customDate
  if (typeof date == 'number') {
    var milliseconds = date * 1000;
    customDate = new Date(milliseconds);
  } else {
    customDate = date
  }

  return (
    <View
      style={[styles.container, !user && styles.stripeStyle, { marginTop: index == 0 ? calcHeight(16) : 0 }]}>
      <View style={styles.row}>
        {
          user && <Text style={styles.user}>
            {user.user?.first_name + ' ' + user.user?.last_name}
          </Text>
        }
        <Text style={styles.date}>
          {moment(customDate).format('D, MMM YYYY HH:mm')}
        </Text>
      </View>
      <View style={[styles.row, styles.padding]}>
        {
          status && <Text style={[styles.status, { color: renderStatus(status)?.color }]}>
            {renderStatus(status)?.title}
          </Text>
        }
        {
          (fee || fee === 0) && <View style={styles.centered}>
            <Text style={styles.moneyTitle}>{t('fee')}</Text>
            <Text style={styles.money}>
              {fee} {currency}
            </Text>
          </View>
        }
        <View style={styles.centered}>
          <Text style={styles.moneyTitle}>{t('sum')}</Text>
          <Text style={styles.money}>
            {amount} {currency}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default TransactionCard;
