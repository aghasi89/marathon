import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import Icons from '../../../assets/icons/svg/index';
import {primaryBlack, primaryBlue} from '../../../assets/styles/colors.styles';
import ProgressStepper from '../../../components/ProgressStepper/ProgressStepper';
import {IWithdrawMethod} from '../../../types/types';
import SelectCurrencyStep from '../CreateWalletScreen/components/SelectCurrencyStep/SelectCurrencyStep';
import PaymentMethodsStep from '../CreateWalletScreen/components/PaymentMethodsStep/PaymentMethodsStep';
import AccountInformationScreen, {
  IValue,
} from '../CreateWalletScreen/components/AccountInformationStep/AccountInformationStep';
import EditWalletScrennHook from './EditWalletScrenn-hook';
import styles from './EditWalletScrenn.style';

const EditWalletScreen: React.FC = () => {
  const {
    t,
    handleBack,
    staticData,
    selectedStepIndex,
    loader,
    withdrawMethods,
    handleSelectWithdraw,
    selectedWithdrawMethod,
    moveThirdStep,
    handleBackStep,
    hanldeSave,
    stripeData,
    handleConnectToStripe,
    handleDeleteStripe,
    loading,
    initState
  } = EditWalletScrennHook();

  const renderFinansicals = () => {
    switch (selectedStepIndex) {
      case 2:
        return (
          <PaymentMethodsStep
            selectedItem={selectedWithdrawMethod}
            disabled={!selectedWithdrawMethod}
            handleSave={moveThirdStep}
            onSelect={(id: IWithdrawMethod) => handleSelectWithdraw(id)}
            showBackButton={false}
            data={withdrawMethods ? withdrawMethods : []}
          />
        );
      case 3:
        return (
          <AccountInformationScreen
            connectToStripeButtonPress={handleConnectToStripe}
            selectedWithdrawMetod={
              selectedWithdrawMethod &&
              selectedWithdrawMethod?.dynamic_fields[0]?.key
            }
            stripeLoginUrl={stripeData?.info}
            handleSave={(values: IValue[]) => hanldeSave(values)}
            habldeBack={handleBackStep}
            deleteStripeIconPress={handleDeleteStripe}
            data={
              selectedWithdrawMethod
                ? selectedWithdrawMethod?.dynamic_fields
                : []
            }
            initValues={initState}
          />
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('editWallet')}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
          <Icons.Close fill={primaryBlack} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={primaryBlue}
          style={{flex: 1}}
        />
      ) : (
        <>
          <ProgressStepper
            steps={staticData.wallet.steps}
            containerStyle={styles.progressStepsContainer}
            selectedStepIndex={selectedStepIndex}
          />
          {loader ? (
            <ActivityIndicator size={'large'} style={{flex: 1}} />
          ) : (
            renderFinansicals()
          )}
        </>
      )}
    </View>
  );
};
export default EditWalletScreen;
