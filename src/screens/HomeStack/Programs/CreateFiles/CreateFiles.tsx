import React from 'react';
import {ScrollView, View} from 'react-native';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import {calcHeight} from '../../../../assets/dimensions';
import Icons from '../../../../assets/icons/svg/index';
import OutLineButton from '../../../../components/buttons/outline/OutLineButton';
import EditSheet from '../../../../components/editSheet/EditSheet';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import ProgramDays from '../../../../components/programDays/ProgramDays';
import FileInfoCard from '../../../../components/fileInfoCard/FileInfoCard';
import {IFile} from '../../../../types/types';
import CreateFilesHook from './CreateFiles-hook';
import styles from './CreateFiles.style';

type Props = {navigation: any};
const CreateFiles: React.FC<Props> = ({navigation}) => {
  const {
    state,
    days,
    deleteFile,
    importFiles,
    dayIndex,
    isOpenEditSheet,
    onSelect,
    openEditSheet,
    leftIconPress,
  } = CreateFilesHook(navigation);

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
        title={'Files'}
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
          {state.files.length !== 0 && (
            <View style={styles.mealContainer}>
              {state.files?.map((file: IFile, index: number) => {
                return (
                  <View key={index} style={styles.mealItem}>
                    <FileInfoCard
                      fileName={file.fileName}
                      fileType={file.fileType}
                      onClose={() => deleteFile(index)}
                    />
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <View style={styles.button}>
          <OutLineButton
            title="Add File"
            onPress={importFiles}
            style={styles.outlineButtonStyle}
            textStyle={styles.outlineButtonText}
          />
        </View>
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
export default CreateFiles;
