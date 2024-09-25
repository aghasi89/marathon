import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {calcHeight} from '../../../../assets/dimensions';
import Icons from '../../../../assets/icons/svg/index';
import {
  formFieldGrey,
  primaryBlack,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import TextWithIcon from '../../../../components/textWithicon/TextWithIcon';
import UpploadButton from '../../../../components/uploadbutton/UploadButton';
import DropDownComponent from '../../../../components/dropDown/DropDown';
import NumberInput from '../../../../components/numberInput/NumberInput';
import TextInputComponent from '../../../../components/textInput/TextInputComponent';
import HeaderWithImage from '../../../../components/headerWithImage/HeaderWithImage';
import MultiSelectSelectedChips from '../../../../components/multiSelect/MultiSelectSelectedChips';
import EditSheet from '../../../../components/editSheet/EditSheet';
import hook from './CreateProgram-hook';
import styles from './CreateProgram.style';

const CreatePrograme: React.FC<any> = ({navigation}) => {
  const {state, dispatchState, deleteTagItem, isOpen, setIsOpen, week} = hook();
  const leftIconPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MainHeader
        title={'Programs'}
        search={false}
        leftIcon={true}
        leftIconPress={leftIconPress}
        leftComponent={
          <Text
            onPress={() => {
              setIsOpen(true);
            }}
            style={styles.save}>
            Save
          </Text>
        }
      />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {!state.programImageUrl ? (
            <UpploadButton
              goBackImage={image => {
                dispatchState({type: 'SET_PROGRAM_IMAGE_URL', payload: image});
              }}
            />
          ) : (
            <View style={styles.headerWithImageContainer}>
              <HeaderWithImage
                source={{uri: state.programImageUrl}}
                rightIcon={<Icons.Close fill={primaryWhite} />}
                rightIconPress={() => {
                  dispatchState({type: 'SET_PROGRAM_IMAGE_URL', payload: ''});
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.recipeName}>
          <Text style={styles.title}>Program Name</Text>
          <TextInputComponent
            value={state.programName}
            onChangetext={(value: string) => {
              dispatchState({type: 'SET_PROGRAM_NAME', payload: value});
            }}
            close={() => {}}
          />
        </View>

        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Article fill={formFieldGrey} />}
            text={'Duration (days)'}
          />
          <View style={styles.numberInputContainer}>
            <NumberInput
              value={state.duration}
              onChangeValue={(val: string) => {
                dispatchState({type: 'SET_DURATION', payload: val});
              }}
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Article fill={formFieldGrey} />}
            text={'Week Start'}
          />
          <View style={styles.dropDownContainer}>
            <DropDownComponent
              list={week}
              selected={state.weekDay}
              setSelected={value => {
                dispatchState({type: 'SET_WEEKDAY', payload: value});
              }}
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Tag fill={formFieldGrey} />}
            text={'Tags'}
          />
          <TouchableOpacity
            style={styles.plusIcon}
            onPress={() => {
              navigation.navigate('ProgramTags');
            }}>
            <Icons.Plus fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
        {state.selectedTags.length > 0 && (
          <View style={styles.selectedTags}>
            <MultiSelectSelectedChips
              list={state.selectedTags}
              onDelete={(value: any) => {
                deleteTagItem(value);
              }}
            />
          </View>
        )}
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Info fill={formFieldGrey} />}
            text={'Info'}
          />
        </View>
        <View style={styles.typeHere}>
          <Text style={styles.title}>Type description</Text>
          <TextInputComponent
            value={state.typeValue}
            onChangetext={(value: string) => {
              dispatchState({type: 'SET_TYPE_VALUE', payload: value});
            }}
            close={() => {}}
          />
        </View>
      </ScrollView>
      <EditSheet
        isVisible={isOpen}
        height={calcHeight(220)}
        onClose={() => setIsOpen(false)}
        list={[
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
              setIsOpen(false);
            },
            Icon: <Icons.CheckIcon fill={primaryBlack} />,
          },
        ]}
      />
    </View>
  );
};
export default CreatePrograme;
