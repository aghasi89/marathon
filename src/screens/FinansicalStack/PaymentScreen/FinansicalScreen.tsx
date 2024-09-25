import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ButtonsTabBar from '../../../components/buttonsTabBar/ButtonsTabBar';
import { primaryBlue, primaryWhite } from '../../../assets/styles/colors.styles';
import WithdrawCard from './components/WithdrawCard/WithdrawCard';
import WalletCard from './components/WalletCard/WalletCard';
import TransactionCard from './components/TransactionCard/TransactionCard';
import { PrimeryButton } from '../../../components/buttons';
import Icons from '../../../assets/icons/svg/index';
import { calcHeight } from '../../../assets/dimensions';
import ActionSheet from '../../FeedStack/Feed/AboutFeed/components/ActionSheet/ActionSheet';
import Toaster from '../../../components/toester/Toester';
import { ICurrency } from '../../../types/types';
import Header from '../../ProfileStack/components/Header/Header';
import CustomDate from './components/CustomDate/CustomDate';
import CustomCurrency from './components/CustomCurrency/CustomCurrency';
import PaymentHook from './FinansicalScreen-hook';
import styles from './FinansicalScreen.style';

const PaymentScreen: React.FC = () => {
  const {
    t,
    data,
    selectedTab,
    tabSelectHandle,
    myTransactions,
    myWithdraws,
    loading,
    currencyActionSheetVisibility,
    dateActionSheetVisibility,
    currencyActionSheetData,
    dateActionSheetData,
    dateActionSheetCloseHandle,
    currencyActionSheetCloseHandle,
    selectedCurrency,
    openCurrenciesList,
    openDatesList,
    isVisible,
    setIsVisible,
    handleApply,
    toDate,
    fromDate,
    isFromPickerOpen,
    fromDatePickerCancelHandle,
    fromDatePickerConfirmHandle,
    toDatePickerCancelHandle,
    toDatePickerConfirmHandle,
    openFromPicker,
    isToPickerOpen,
    openToPicker,
    handelCreateWallet,
    handleGotToWithdrawls,
    handleGotToTransactions,
    goBack,
    navigateDetailPage,
    stripePayouts,
    stripeTransfers,
    renderWallets,
  } = PaymentHook();
  const financeCard = useCallback(
    (item: any, index: number) => {
      switch (selectedTab.name) {
        case 'user-wallet/':
          return (
            <WalletCard
              navigateDetailPage={() => navigateDetailPage(item.id)}
              gotToWithdrawls={(currency: ICurrency) =>
                handleGotToWithdrawls(currency, item.withdraw_method.name, item.id)
              }
              gotToTransactions={(currency: ICurrency) =>
                handleGotToTransactions(currency)
              }
              index={index}
              currencyType={item.currency_type}
              currency={item?.currency_type?.sign}
              name={item.withdraw_method.name}
              code={item?.currency_type?.code}
              walletSum={item?.wallet_sum}
              requestedWithdrawSum={item?.requested_withdraw_sum}
              payedSum={item?.payed_sum}
            />
          );
        case 'withdraw/':
          return (
            <>
              <WithdrawCard
                index={index}
                amount={(selectedTab.params.currency == 3 || selectedTab.params.currency == 2) ? item.amount / 100 : item.amount}
                currency={(selectedTab.params.currency == 3 || selectedTab.params.currency == 2) ? item.currency : item.user_wallet_details.currency_type.sign}
                status={item.status}
                date={(selectedTab.params.currency == 3 || selectedTab.params.currency == 2) ? item.arrival_date : item.created_at}
              />
            </>
          );
        case 'transactions/':
          return <TransactionCard
            index={index}
            status={item.status}
            user={item.user}
            fee={item?.fee ?? ""}
            amount={item.money}
            date={item.date}
            currency={item.user_wallet_details.currency_type?.sign}
          />;
        default:
          return null
      }
    },
    [selectedTab, renderWallets],
  );

  return (
    <View style={styles.container}>
      <Header goBack={goBack} title={t('finansical')} />
      <ButtonsTabBar
        data={data}
        selectedIndex={selectedTab.index}
        setSelectedIndex={tabSelectHandle}
        selectedButtonStyle={{ bgColor: primaryWhite, textColor: primaryBlue }}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={primaryBlue} />
        </View>
      ) : (
        <View style={{ flex: 1, marginBottom: 30 }}>
          {selectedTab.index !== 0 && (
            <View style={styles.rowContainer}>
              <CustomCurrency
                onPress={openCurrenciesList}
                title={selectedCurrency ? selectedCurrency.code : t('currency')}
              />
              <CustomDate
                onPress={openDatesList}
                title={
                  fromDate && toDate
                    ? `${fromDate}-${toDate}`
                    : t('setDateTime')
                }
              />
            </View>
          )}
          {
            <FlatList
              ListFooterComponent={() =>
                selectedTab.index == 0 && renderWallets?.length !== 4 ? (
                  <PrimeryButton
                    title={t('addPeymentMethod') ?? ''}
                    type="default"
                    onPress={handelCreateWallet}
                    style={styles.button}
                    textStyle={styles.textStyle}
                    Icon={<Icons.Add />}
                  />
                ) : null
              }
              //@ts-ignore
              data={
                selectedTab.index == 0
                  ? renderWallets
                  : selectedTab.index == 1 ? (selectedTab.params.currency == 3 || selectedTab.params.currency == 2) ? stripePayouts :
                    myWithdraws
                    : myTransactions
              }
              contentContainerStyle={styles.contentStyle}
              keyExtractor={(item, index) =>
                item.id?.toString() + index.toString()
              }
              renderItem={({ item, index }) => {
                return financeCard(item, index);
              }}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    {t('finansicalEmptyText')} {data[selectedTab.index].title.toLowerCase()}
                  </Text>
                </View>
              )}
            />
          }
        </View>
      )}
      <ActionSheet
        data={currencyActionSheetData}
        height={calcHeight(500)}
        onClose={currencyActionSheetCloseHandle}
        visibility={currencyActionSheetVisibility}
      />
      <ActionSheet
        data={dateActionSheetData}
        height={calcHeight(350)}
        onClose={dateActionSheetCloseHandle}
        visibility={dateActionSheetVisibility}
      />
      <Toaster
        height={calcHeight(200)}
        isVisible={isVisible}
        onClose={() => {
          setIsVisible(false);
        }}
        Screen={
          <View>
            <View style={{ flexDirection: 'row' }}>
              <CustomDate
                onPress={openFromPicker}
                title={fromDate ? fromDate : t('fromDate')}
              />
              <View style={styles.emptyView} />
              <CustomDate
                onPress={openToPicker}
                title={toDate ? toDate : t('toDate')}
              />
            </View>
            <PrimeryButton
              title={t('apply') ?? ''}
              type="default"
              onPress={handleApply}
              style={styles.applyButton}
              disable={!fromDate || !toDate || fromDate > toDate}
            />
          </View>
        }
      />
      <DatePicker
        modal
        open={isFromPickerOpen}
        date={new Date()}
        onConfirm={date => fromDatePickerConfirmHandle(date)}
        onCancel={fromDatePickerCancelHandle}
        is24hourSource={'device'}
        androidVariant="iosClone"
        confirmText={t('confirm') ?? ''}
        cancelText={t('cancel') ?? ''}
        title={t('selectDate')}
        mode={'date'}
      />
      <DatePicker
        modal
        open={isToPickerOpen}
        date={new Date()}
        onConfirm={date => toDatePickerConfirmHandle(date)}
        onCancel={toDatePickerCancelHandle}
        is24hourSource={'device'}
        androidVariant="iosClone"
        confirmText={t('confirm') ?? ''}
        cancelText={t('cancel') ?? ''}
        title={t('selectDate')}
        mode={'date'}
      />

      {/* {selectedTab.name === 'withdraw/' && (
        <TouchableOpacity
          style={styles.createButton}
          onPress={openWidrawalModal}>
          <Icons.Plus {...styles.plusIcon} />
        </TouchableOpacity>
      )} */}
    </View>
  );
};
export default PaymentScreen;
