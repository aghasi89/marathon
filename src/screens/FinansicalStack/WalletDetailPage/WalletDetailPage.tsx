import React from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import WalletDetailPageHook from './WalletDetailPage-hook';
import styles from './WalletDetailPage.style';
import Header from '../../ProfileStack/components/Header/Header';
import Icons from '../../../assets/icons/svg/index';
import {lightPeriwinkle} from '../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../assets/dimensions';

const WalletDetailPage: React.FC = () => {
  const {t, loading, wallet, goBack, navigateEditPage} = WalletDetailPageHook();

  if (!wallet) return <ActivityIndicator style={{flex: 1}} size={'large'} />;

  return (
    <View style={styles.container}>
      <Header
        goBack={goBack}
        title={t('wallet')}
        RightComponent={
          <Pressable onPress={() => navigateEditPage()}>
            <Icons.Edit fill={lightPeriwinkle} />
          </Pressable>
        }
      />
      <View style={styles.bodyContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.lable}>{t('method')}</Text>
          <Text style={styles.value}>{wallet.withdraw_method.name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.lable}>{t('currency')}</Text>
          <Text style={styles.value}>{wallet.currency_type?.code}</Text>
        </View>
        {wallet.values.map((item, index) => {
          return (
            <View style={styles.rowContainer} key={"walletValues" + index}>
              <Text style={styles.lable}>
                {item.key === "phone_number" ? t('phoneNumber') : item.key === "idram_id" ? t('idramId') : t('name')}
                </Text>
              <Text style={styles.value}>
                {item.value ? item.value : ''}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
export default WalletDetailPage;
