import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import Icons from '../../../assets/icons/svg'
import Header from '../../ProfileStack/components/Header/Header';
import InputComponent from '../../FeedStack/CreateFeed/components/InputComponent/InputComponent';
import SelectedCardsView from '../../FeedStack/CreateFeed/components/SelectedCardsView/SelectedCardsView';
import ExerciseHook from './Exercise-hook';
import styles from './Exercise.style';

const Exercise: React.FC = () => {

  const {
    t,
    createExercice,
    goBack,
    execisesListModalData,
    execisesList,
    onSearchInputValueChange,
    onDotsIconPress,
    moveDetailPage
  } = ExerciseHook()

  return (
    <View style={styles.container}>
      <Header
        goBack={goBack}
        title={t('exercises')}
      />
      <InputComponent
        onChange={onSearchInputValueChange}
        placeholder={t('exercises') ?? ""}
        icon={<Icons.SearchIcon />}
        containerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
        rightIcon={
          <Pressable>
            <Icons.Filter />
          </Pressable>
        }
      />
      {
        execisesList ?
          execisesList.length == 0 ? <Text style={styles.emptyText}>{t('notExercises')}</Text> :
            <SelectedCardsView
              rowElementsCount={2}
              iconsExist={false}
              dataList={execisesListModalData}
              onPress={(id: number) => moveDetailPage(id)}
              cardSize='large'
            />
          : <ActivityIndicator style={{ flex: 1 }} size={'large'} />
      }
      <Pressable style={styles.createButton} onPress={createExercice}>
        <Icons.Plus {...styles.plusIcon} />
      </Pressable>
    </View>
  );
};
export default Exercise;
