import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {primaryBlack} from '../../../assets/styles/colors.styles';
import Icons from '../../../assets/icons/svg/index';
import MainHeader from '../../../components/headers/mainHeader/MainHeader';
import ProgramDays from '../../../components/programDays/ProgramDays';
import {INote} from '../../../types/types';
import CreateNotesHook from './Notes-hook';
import styles from './Notes.style';

type Props = {navigation: any};
const CreateNotes: React.FC<Props> = ({navigation}) => {
  const {days, dayIndex, leftIconPress, notes} = CreateNotesHook(navigation);

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
            onPress={() => {}}
          />
        }
      />
      <ScrollView contentContainerStyle={styles.itemsContainer}>
        <ProgramDays days={days} dayIndex={dayIndex} />
        <View style={styles.mealContainer}>
          {notes?.map((note: INote, index: number) => {
            return (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.fileNameText}>{note.text}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
export default CreateNotes;
