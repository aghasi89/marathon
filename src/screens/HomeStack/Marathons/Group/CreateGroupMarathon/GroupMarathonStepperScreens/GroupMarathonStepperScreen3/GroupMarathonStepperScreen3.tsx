import React from 'react';
import {View, TouchableOpacity, ScrollView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from '../../../../../../../assets/icons/svg/index';
import SwitchComponenet from '../../../../../../../components/switch/SwitchComponenet';
import TextWithIcon from '../../../../../../../components/textWithicon/TextWithIcon';
import DropDownComponent from '../../../../../../../components/dropDown/DropDown';
import NumberInput from '../../../../../../../components/numberInput/NumberInput';
import CalendarComponent from '../../../../../../../components/calendar/Calendar';
import {formFieldGrey} from '../../../../../../../assets/styles/colors.styles';
import {NavigationParamList} from '../../../../..';
import styles from './GroupMarathonStepperScreen3.style';
import hook from './GroupMarathonStepperScreen3-hook';

type Props = NativeStackScreenProps<NavigationParamList, 'CreateGroupMarathon'>;

const GroupMarathonStepperScreen3: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
    onPriceValueChange,
    onAvailablePlacesChange,
    onCncellationPeriodSelect,
    onChangeVisibility,
    onDateRangeSelect,
    calendarVisibility,
    onCalendarApplay,
    onCalendarCancle,
    state,
    cancellationPeriodList,
  } = hook(navigation);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Programs fill={formFieldGrey} />}
            text={'Date'}
          />
          {state.calendarRange?.length === 0 ? (
            <TouchableOpacity
              style={styles.plusIcon}
              onPress={onDateRangeSelect}>
              <Icons.Plus fill={formFieldGrey} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onDateRangeSelect}>
              <Text>
                {`
              ${state.calendarRange ? state.calendarRange[2] : ''} - ${
                  state.calendarRange ? state.calendarRange[3] : ''
                }
              `}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <CalendarComponent
          isVisible={calendarVisibility}
          onApplay={onCalendarApplay}
          onCancle={onCalendarCancle}
        />
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Payments fill={formFieldGrey} />}
            text={'Price'}
          />
          <View style={styles.numberInputContainer}>
            <NumberInput
              value={state.price ?? ''}
              onChangeValue={onPriceValueChange}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Account fill={formFieldGrey} />}
            text={'Available Places'}
          />
          <View style={styles.numberInputContainer}>
            <NumberInput
              value={state.availablePlices ?? ''}
              onChangeValue={onAvailablePlacesChange}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.DuplicateIcon fill={formFieldGrey} />}
            text={'Cancellation period'}
          />
          <View style={styles.dropDownContainer}>
            <DropDownComponent
              list={cancellationPeriodList ?? []}
              selected={state.selectedCancellationPeriod?.value ?? ''}
              setSelected={onCncellationPeriodSelect}
              placeholder="Select"
              style={styles.cancellationPeriodDropDown}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Eye fill={formFieldGrey} />}
            text={'Visibility'}
          />
          <SwitchComponenet
            checked={state.marathonVisibility ?? false}
            setChecked={onChangeVisibility}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default GroupMarathonStepperScreen3;
