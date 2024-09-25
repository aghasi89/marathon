import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg/index';
import {calcHeight} from '../../../../assets/dimensions';
import OutLineButton from '../../../../components/buttons/outline/OutLineButton';
import EditSheet from '../../../../components/editSheet/EditSheet';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import ProgramDays from '../../../../components/programDays/ProgramDays';
import TextInputComponent from '../../../../components/textInput/TextInputComponent';
import {INote} from '../../../../types/types';
import CreateNotesHook from './CreateNotes-hook';
import styles from './CreateNotes.style';

type Props = {navigation: any};
const CreateNotes: React.FC<Props> = ({navigation}) => {
  const {
    state,
    dispatchState,
    days,
    dayIndex,
    isOpenEditSheet,
    onSelect,
    openEditSheet,
    leftIconPress,
    deleteNote,
    addNote,
  } = CreateNotesHook(navigation);

  const editSheet = [
    {
      title: 'Edit',
      onSelect: onSelect,
      Icon: <Icons.Edit />,
    },
    {
      title: 'Duplicate',
      onSelect: onSelect,
      Icon: <Icons.DuplicateIcon fill={primaryBlack} />,
    },
    {
      title: 'Bookmark',
      onSelect: onSelect,
      Icon: <Icons.BookmarkIcon fill={primaryBlack} />,
    },
    {
      title: 'Delete',
      onSelect: onSelect,
      Icon: <Icons.DeleteIcon fill={primaryBlack} />,
    },
  ];

  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Notes'}
        leftComponent={
          <Icons.EllipsisIcon
            fill={primaryBlack}
            style={styles.iconStyle}
            onPress={openEditSheet}
          />
        }
      />
      <ScrollView contentContainerStyle={styles.itemsContainer}>
        <ProgramDays days={days} dayIndex={dayIndex} />
        <View style={styles.dayContainer}>
          {state.notes.length !== 0 && (
            <View style={styles.mealContainer}>
              {state.notes?.map((note: INote, index: number) => {
                return (
                  <View key={index} style={styles.mealItem}>
                    <View style={styles.itemContainer}>
                      <View style={styles.info}>
                        <Text style={styles.fileNameText}>{note.text}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {}}
                        style={styles.closeButton}>
                        <Icons.Close
                          fill={primaryBlack}
                          width={14}
                          height={14}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          <View style={styles.textInputContainer}>
            <TextInputComponent
              value={state.inputNote}
              onChangetext={(value: string) => {
                dispatchState({type: 'SET_INPUT_NOTE', payload: value});
              }}
              close={() => {}}
            />
          </View>
        </View>
        <OutLineButton
          title="Add note"
          onPress={addNote}
          style={styles.outlineButtonStyle}
          textStyle={styles.outlineButtonText}
        />
        <EditSheet
          isVisible={isOpenEditSheet}
          height={calcHeight(400)}
          onClose={openEditSheet}
          list={editSheet}
        />
      </ScrollView>
    </View>
  );
};
export default CreateNotes;
