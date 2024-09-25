import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ICurrency } from '../../../../../types/types';
import Icons from '../../../../../assets/icons/svg/index';
import { calcHeight } from '../../../../../assets/dimensions';
import { green } from '../../../../../assets/styles/colors.styles';
import styles from './WalletCard.style';

interface IProps {
  // item: IWallet;
  index: number;
  gotToWithdrawls: (currency: ICurrency) => void;
  gotToTransactions: (currency: ICurrency) => void;
  navigateDetailPage: () => void;
  currencyType: ICurrency,
  currency: string,
  name: string,
  code: string,
  walletSum: number,
  requestedWithdrawSum: number,
  payedSum: number
}
const WalletCard: React.FC<IProps> = props => {
  const { index, gotToWithdrawls, gotToTransactions, navigateDetailPage, currencyType, currency, name, code, walletSum, requestedWithdrawSum, payedSum } =
    props;
  const { t } = useTranslation();

  return (
    <Pressable
      onPress={navigateDetailPage}
      style={[styles.container, { marginTop: index == 0 ? calcHeight(16) : 0 }]}>
      <View style={styles.curency}>
        <Text style={styles.curencyText}>{name}</Text>
        <Text style={styles.curencyText}>{code}</Text>
      </View>
      <View style={styles.balanceContainer}>
        <View style={styles.sumContainer}>
          <Text style={styles.balance}>{t('totalBalance')}</Text>
          <Text style={styles.curencyType}>
            {walletSum} {currency}
          </Text>
        </View>
        <View style={styles.sumContainer}>
          <Text style={[styles.balance, { color: green }]}>{t('requestedSum')}</Text>
          <Text style={styles.curencyType}>
            {requestedWithdrawSum} {currency}
          </Text>
        </View>
        <View style={styles.sumContainer}>
          <Text style={styles.balance}>{t('paid')}</Text>
          <Text style={styles.curencyType}>
            {payedSum} {currency}
          </Text>
        </View>
        <View style={styles.balanceContainer}>
          <TouchableOpacity
            // style={styles.left}
            style={{padding: calcHeight(5)}}
            onPress={() => gotToWithdrawls(currencyType)}>
            <Icons.PaymentIcon />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => gotToTransactions(item.currency_type)}>
            <Icons.RefreshPrice />
          </TouchableOpacity> */}
        </View>
      </View>
    </Pressable>
  );
};
export default WalletCard;
