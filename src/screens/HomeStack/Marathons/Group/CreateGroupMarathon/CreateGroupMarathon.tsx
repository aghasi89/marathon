import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {calcHeight} from '../../../../../assets/dimensions';
import Icons from '../../../../../assets/icons/svg/index';
import {primaryBlack} from '../../../../../assets/styles/colors.styles';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import Stepper from '../../../../../components/stepper/Stepper';
import EditSheet from '../../../../../components/editSheet/EditSheet';
import {
  createGroup,
  changeGroup,
} from '../../../../../store/actions/marathon-action';
import {NavigationParamList} from '../../..';
import GroupMarathonStepperScreen1 from './GroupMarathonStepperScreens/GroupMarathonStepperScreen1/GroupMarathonStepperScreen1';
import GroupMarathonStepperScreen2 from './GroupMarathonStepperScreens/GroupMarathonStepperScreen2/GroupMarathonStepperScreen2';
import GroupMarathonStepperScreen3 from './GroupMarathonStepperScreens/GroupMarathonStepperScreen3/GroupMarathonStepperScreen3';
import GroupMarathonStepperScreen4 from './GroupMarathonStepperScreens/GroupMarathonStepperScreen4/GroupMarathonStepperScreen4';
import hook from './CreateGroupMarathon-hook';
import styles from './CreateGroupMarathon.style';
import {
  ICancellationPeriodList,
  ILanguageList,
} from '../../../../../types/types';

type Props = NativeStackScreenProps<NavigationParamList, 'CreateGroupMarathon'>;

const CreateGroupMarathon: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
    leftIconPress,
    active,
    stepperIsActive,
    isOpen,
    setIsOpen,
    state,
    dispatch,
    marathonDetail,
    dispatchState,
  } = hook(navigation);
  const stepsArr = [
    <GroupMarathonStepperScreen1 />,
    <GroupMarathonStepperScreen2 />,
    <GroupMarathonStepperScreen3 />,
    <GroupMarathonStepperScreen4 />,
  ];

  const editSheet = [
    {
      title: 'Discard changes',
      onSelect: () => {
        setIsOpen(false);
      },
      Icon: <Icons.Close fill={primaryBlack} />,
    },
    {
      title: 'Save changes',
      onSelect: () => {
        state.isNew
          ? dispatch(
              createGroup({
                name: state?.marathonName ?? '',
                count: state?.availablePlices ?? '',
                price: state?.price ?? '',
                imageUrl: state?.marathonImageUrl ?? '',
                calendarRange: state?.calendarRange ?? [],
                time: state?.duration ?? '',
                listTags: state?.selectedTags ?? [],
                categories: state?.selectedCategories ?? [],
                language: state?.selectedLanguages ?? ([] as ILanguageList[]),
                selectedGalleryImages: state?.selectedGalleryImages ?? [],
                marathonInfo: state?.marathonInfo ?? '',
                isNutritionsActive: state?.isNutritionSelected ?? false,
                isTrainingsActive: state?.isTraningSelected ?? false,
                isGroupChatActive: state?.isGroupChatSelected ?? false,
                isMeasurmentsActive: state?.isMeasurementsSelected ?? false,
                cancellationPeriod:
                  state?.selectedCancellationPeriod ??
                  ({} as ICancellationPeriodList),
                marathonVisibility: state?.marathonVisibility ?? false,
                inputList: state?.inputList ?? [],
              }),
            )
          : dispatch(
              changeGroup({
                group: {
                  name: state?.marathonName ?? '',
                  count: state?.availablePlices ?? '',
                  price: state?.price ?? '',
                  imageUrl: state?.marathonImageUrl ?? '',
                  calendarRange: state?.calendarRange ?? [],
                  time: state?.duration ?? '',
                  listTags: state?.selectedTags ?? [],
                  categories: state?.selectedCategories ?? [],
                  language: state?.selectedLanguages ?? ([] as ILanguageList[]),
                  selectedGalleryImages: state?.selectedGalleryImages ?? [],
                  marathonInfo: state?.marathonInfo ?? '',
                  isNutritionsActive: state?.isNutritionSelected ?? false,
                  isTrainingsActive: state?.isTraningSelected ?? false,
                  isGroupChatActive: state?.isGroupChatSelected ?? false,
                  isMeasurmentsActive: state?.isMeasurementsSelected ?? false,
                  cancellationPeriod:
                    state?.selectedCancellationPeriod ??
                    ({} as ICancellationPeriodList),
                  marathonVisibility: state?.marathonVisibility ?? false,
                  inputList: state?.inputList ?? [],
                },
                id: marathonDetail.id,
              }),
            );
        setIsOpen(false);
        dispatchState &&
          dispatchState({type: 'RESET_DATA', payload: undefined});
        navigation.navigate('Marathons');
      },
      Icon: <Icons.CheckIcon fill={primaryBlack} />,
    },
  ];
  return (
    <View style={styles.container}>
      <MainHeader
        title={'Group Marathon'}
        search={false}
        leftIcon={true}
        leftIconPress={leftIconPress}
        leftComponent={
          <TouchableOpacity
            onPress={() => setIsOpen(true)}
            disabled={active !== 3}>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        }
      />
      <Stepper content={stepsArr} active={active} setActive={stepperIsActive} />
      <EditSheet
        isVisible={isOpen}
        height={calcHeight(220)}
        onClose={() => setIsOpen(false)}
        list={editSheet}
      />
    </View>
  );
};
export default CreateGroupMarathon;
