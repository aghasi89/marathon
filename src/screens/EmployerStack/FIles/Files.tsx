import React from 'react';
import {ScrollView, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {primaryBlack} from '../../../assets/styles/colors.styles';
import Icons from '../../../assets/icons/svg/index';
import MainHeader from '../../../components/headers/mainHeader/MainHeader';
import ProgramDays from '../../../components/programDays/ProgramDays';
import FileInfoCard from '../../../components/fileInfoCard/FileInfoCard';
import {IFile} from '../../../types/types';
import {EmployerNavigationParamList} from '..';
import CreateFilesHook from './Files-hook';
import styles from './Files.style';

type Props = NativeStackScreenProps<EmployerNavigationParamList, 'Files'>;
const Files: React.FC<Props> = ({navigation}) => {
  const {leftIconPress, days, dayIndex, files} = CreateFilesHook(navigation);

  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Files'}
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
        <View style={styles.dayContainer}>
          <View style={styles.mealContainer}>
            {files?.map((file: IFile, index: number) => {
              return (
                <View key={index} style={styles.mealItem}>
                  <FileInfoCard
                    fileName={file.fileName}
                    fileType={file.fileType}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Files;
