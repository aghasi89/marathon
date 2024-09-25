import React from 'react';
import {Pressable, View, Text, ScrollView} from 'react-native';
import moment from 'moment';
import Icons from '../../../../../../assets/icons/svg';
import CustomSwitchWithInput from '../../../components/CustomSwitchWithInput/CustomSwitchWithInput';
import MultiSelectModal from '../../../components/MultiSelectModal/MultiSelectModal';
import InputComponent from '../../../components/InputComponent/InputComponent';
import DatePickerComponent from '../../../components/DatePicker/DatePicker';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import hook from './SecondStepScreen.hook';
import styles from './SecondStepScreen.style';

const SecondStepScreen: React.FC = () => {
  const {
    t,
    state,
    isPickerOpen,
    datePickerCancelHandle,
    datePickerConfirmHandle,
    datePickerButtonPressHandle,
    durationChangeHandle,
    usersCountSwitchOptions,
    userCountChangeHandle,
    userCountSwitchHandle,
    priceSwitchOptions,
    priceChangeHandle,
    pricetSwitchHandle,
    isPriceInputDisabled,
    carrancyButtonPressHandle,
    currencyModalVisibiliti,
    currencyModalCloseHandle,
    currencySelectHandle,
    currencyList,
  } = hook();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        overScrollMode="never">
        <SectionTitle
          title={t('dateAndTime')}
          containerStyle={styles.sectionTitles}
        />
        <View style={styles.dateAndTimeContainer}>
          <DatePickerComponent
            minimumDate={new Date()}
            isInvalid={!!state.errorMessages?.datetime?.length}
            isOpen={isPickerOpen}
            date={state?.start_day ? new Date(state?.start_day) : undefined}
            onCancel={datePickerCancelHandle}
            onConfirm={datePickerConfirmHandle}
            onPress={datePickerButtonPressHandle}
            mode={state.feedType === 'package' ? 'date' : 'datetime'}
            value={
              state.start_day
                ? moment(state.start_day).format(
                    state.feedType === 'package'
                      ? 'DD MMMM YYYY'
                      : 'DD MMMM YYYY HH:mm',
                  )
                : undefined
            }
            containerStyle={styles.datePickerContainer}
          />
          <InputComponent
            onChange={durationChangeHandle}
            isInvalid={!!state.errorMessages?.duration?.length}
            placeholder={
              state.feedType === 'package'
                ? t('setDurationInDays') ?? ''
                : t('durationInMinutes') ?? ''
            }
            icon={<Icons.Hourglass {...styles.hourglassIcon} />}
            inputStyle={styles.durationInput}
            containerStyle={styles.durationInputContainer}
            inputType="number-pad"
            value={state?.duration?state?.duration?.toString():undefined}
          />
        </View>
        <SectionTitle
          title={t('userCountAndPrice')}
          containerStyle={styles.sectionTitles}
        />
        {state.feedType === 'package' && (
          <CustomSwitchWithInput
            isInvalid={!!state.errorMessages?.user_count?.length}
            errorMessage={state.errorMessages?.user_count ?? undefined}
            initial={state.is_individual ? 0 : 1}
            containerStyle={styles.customSwitchContainer}
            switchOptions={usersCountSwitchOptions}
            onChangeValue={userCountChangeHandle}
            onSwitchPress={userCountSwitchHandle}
            icon={<Icons.Person {...styles.personIcon} />}
            title={t('availablePlaces') ?? ''}
            inputValue={state.user_count ? `${state.user_count}` : undefined}
            inputType="number-pad"
          />
        )}
        <CustomSwitchWithInput
          isInvalid={!!state.errorMessages?.currency?.length}
          initial={state.feedPaymentType === 'paid' ? 0 : 1}
          errorMessage={
            state.errorMessages?.price
              ? state.errorMessages?.price
              : state.errorMessages?.currency ?? undefined
          }
          switchOptions={priceSwitchOptions}
          onChangeValue={priceChangeHandle}
          onSwitchPress={pricetSwitchHandle}
          icon={<Icons.Price {...styles.personIcon} />}
          title={t('price') ?? ''}
          inputValue={!Number.isNaN(state.price) ? `${state.price}` : undefined}
          inputType="number-pad"
          disabled={isPriceInputDisabled}
          inputRightIcon={
            <Pressable
              style={styles.currencySelect}
              onPress={carrancyButtonPressHandle}>
              <Text style={styles.currencyText}>
                {state.selectedCurrency?.name
                  ? state.selectedCurrency?.name
                  : state.selectedCurrency?.code}
              </Text>
              <Icons.ArrowDowm {...styles.currncyArrow} />
            </Pressable>
          }
        />
        <MultiSelectModal
          isVisible={currencyModalVisibiliti}
          onClose={currencyModalCloseHandle}
          onSelect={currencySelectHandle}
          dataList={currencyList}
          selectedList={
            state.selectedCurrency?.id ? [state.selectedCurrency?.id] : []
          }
        />
      </ScrollView>
    </View>
  );
};
export default SecondStepScreen;
