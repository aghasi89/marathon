import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment'
import { useTranslation } from 'react-i18next';
import { calcHeight } from '../../../../../assets/dimensions';
import { backgroudLightRed, mediumSeaGreen, rajah } from '../../../../../assets/styles/colors.styles';
import styles from './WithdrawCard.style';

interface IProps {
  index: number,
  amount: number,
  currency: string,
  status: string,
  date: number | string
}
const WithdrawCard: React.FC<IProps> = (props) => {

  const { index, amount, currency, status, date } = props
  const { t } = useTranslation()

  const renderStatus = (status: string) => {
    switch (status) {
      case 'requested':
        return {
          color: rajah,
          title: t('requested')
        }
      case 'paid':
        return {
          color: mediumSeaGreen,
          title: t('paid')
        }
      case 'rejected':
        return {
          color: backgroudLightRed,
          title: t('rejected')
        }
      default:
        return
    }
  }
  var customDate
  if (typeof date == 'number') {
    var milliseconds = date * 1000;
    customDate = new Date(milliseconds);
  } else {
    customDate = date
  }
  return (
    <View style={[styles.container, { marginTop: index == 0 ? calcHeight(16) : 0 }]}>
      <Text style={styles.currency}>{amount} {currency}</Text>
      <View style={styles.row}>
        <Text style={[styles.status, { color: renderStatus(status)?.color }]}>{renderStatus(status)?.title}</Text>
        <Text style={styles.date}>{moment(customDate).format('D, MMM YYYY')}</Text>
      </View>
    </View>
  );
};
export default WithdrawCard;
