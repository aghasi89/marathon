import React, {useState} from 'react';
import {FlatList,Text, TextInput, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {IDinamicFieldKeys, IDinamicFields, IWalletValues} from '../../../../../types/types';
import {PrimeryButton} from '../../../../../components/buttons';
import StripeAccountCard from '../StripeAccountCard/StripeAccountCard';
import styles from './AccountInformationStep.style';

export interface IValue {
  key: string;
  value: string;
}

interface IProps {
  data: IDinamicFields[];
  habldeBack: () => void;
  handleSave: (values: IValue[]) => void;
  connectToStripeButtonPress?: () => void;
  selectedWithdrawMetod?: IDinamicFieldKeys;
  stripeLoginUrl?: string;
  deleteStripeIconPress?: () => void;
  initValues?: IWalletValues[];
}

const AccountInformationScreen: React.FC<IProps> = props => {
  const {
    data,
    handleSave,
    habldeBack,
    selectedWithdrawMetod,
    connectToStripeButtonPress,
    deleteStripeIconPress,
    stripeLoginUrl,
    initValues
  } = props;
  const {t} = useTranslation();
  const [values, setValues] = useState(
    data.map((el, index) => {
      return {key: el.key, value: initValues?.[index]?.value ? initValues?.[index].value : ""};
    }),
  );
  const [bankName, currency, cardNumber, accNumber] = stripeLoginUrl
    ? stripeLoginUrl?.split(',')
    : [];
  return (
    <View style={styles.container}>
      {selectedWithdrawMetod !== 'stripe' ? (
        <FlatList
          renderItem={({item, index}) => {
            return (
              <View>
                <Text style={styles.lable}>{item.title}</Text>
                <TextInput
                  onChangeText={text => {
                    var newArr = [...values];
                    values[index].value = text;
                    setValues(newArr);
                  }}
                  value={values[index].value}
                  style={styles.input}
                />
              </View>
            );
          }}
          data={data}
        />
      ) : !stripeLoginUrl ? (
        <View style={styles.rowContainer}>
          <PrimeryButton
            onPress={() =>
              connectToStripeButtonPress && connectToStripeButtonPress()
            }
            type="default"
            title={t('connectToStripe') ?? ''}
          />
        </View>
      ) : (
        <StripeAccountCard 
        bankName={bankName}
        accountNumber={accNumber}
        currency={currency.toLocaleUpperCase()}
        cardNumber={cardNumber}
        onDelete={deleteStripeIconPress}
        />
      )}
      <View style={styles.button}>
        <PrimeryButton
          title={t('back') ?? ''}
          type="outline"
          onPress={habldeBack}
          style={styles.backButton}
        />
        <PrimeryButton
          title={t('save') ?? ''}
          disable={
            values.filter(el => {
              if (el.value) {
                return el;
              }
            }).length == values.length
              ? false
              : selectedWithdrawMetod === 'stripe' && stripeLoginUrl
              ? false
              : true
          }
          type="default"
          onPress={() => handleSave(values)}
          style={styles.applyButton}
        />
      </View>
    </View>
  );
};
export default AccountInformationScreen;
