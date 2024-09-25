import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Icons from '../../../assets/icons/svg/index'
import { primaryBlack, primaryBlue } from '../../../assets/styles/colors.styles';
import ProgressStepper from '../../../components/ProgressStepper/ProgressStepper';
import { IWithdrawMethod } from '../../../types/types';
import SelectCurrencyStep from './components/SelectCurrencyStep/SelectCurrencyStep';
import PaymentMethodsStep from './components/PaymentMethodsStep/PaymentMethodsStep';
import AccountInformationScreen, { IValue } from './components/AccountInformationStep/AccountInformationStep';
import CreatWalletHook from './CreateWalletScreen-hook';
import styles from './CreateWalletScreen.style';

const CreatWalletScreen: React.FC = () => {

  const {
    t,
    handleBack,
    staticData,
    selectedStepIndex,
    loader,
    currencyTypes,
    handleSelectCurrency,
    moveSecondStep,
    selectedCurencyType,
    withdrawMethods,
    handleSelectWithdraw,
    selectedWithdrawMethod,
    moveThirdStep,
    handleBackStep,
    hanldeSave,
    finances,
    getDifference,
    stripeData,
    handleConnectToStripe,
    handleDeleteStripe,
    loading,
    selectedRegion,
    regionsList,
    changeRegion
  } = CreatWalletHook()

  const renderFinansicals = () => {
    switch (selectedStepIndex) {
      case 1:
        return <SelectCurrencyStep
          selectedItemId={selectedCurencyType}
          disabled={!selectedCurencyType}
          handleSave={() => moveSecondStep(selectedCurencyType, selectedRegion)}
          onSelect={(id: number) => handleSelectCurrency(id)}
          data={currencyTypes ? getDifference(currencyTypes, finances) : []} />;
      case 2:
        return <PaymentMethodsStep
          selectedItem={selectedWithdrawMethod}
          disabled={!selectedWithdrawMethod}
          handleSave={moveThirdStep}
          onSelect={(id: IWithdrawMethod) => handleSelectWithdraw(id)}
          habldeBack={handleBackStep}
          selectedRegion={selectedRegion}
          regionsList={regionsList ?? []}
          changeRegion={changeRegion}
          data={withdrawMethods ? withdrawMethods : []} />;
      case 3:
        return <AccountInformationScreen
          connectToStripeButtonPress={handleConnectToStripe}
          selectedWithdrawMetod={selectedWithdrawMethod && selectedWithdrawMethod?.dynamic_fields[0]?.key}
          stripeLoginUrl={stripeData?.info}
          handleSave={(values: IValue[]) => hanldeSave(values)}
          habldeBack={handleBackStep}
          deleteStripeIconPress={handleDeleteStripe}
          data={selectedWithdrawMethod ? selectedWithdrawMethod?.dynamic_fields : []} />;
      default:
        return null;
    }
  }
  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('createWallet')}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
          <Icons.Close fill={primaryBlack} />
        </TouchableOpacity>
      </View>
      {loading ? <ActivityIndicator size={'large'} color={primaryBlue} style={{ flex: 1 }} /> : (<>
        <ProgressStepper
          steps={staticData.wallet.steps}
          containerStyle={styles.progressStepsContainer}
          selectedStepIndex={selectedStepIndex}
        />
        {
          loader ? <ActivityIndicator size={'large'} style={{ flex: 1 }} /> : renderFinansicals()
        }
      </>)}
    </View>
  );
};
export default CreatWalletScreen;
