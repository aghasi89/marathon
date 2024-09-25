import * as React from 'react';
import {ActivityIndicator, FlatList, View, Text, Pressable} from 'react-native';
import moment from 'moment';
import SelectButton from '../../FeedStack/Feed/AboutFeed/components/SelectButton/SelectButton';
import DatePickerComponent from '../../FeedStack/CreateFeed/components/DatePicker/DatePicker';
import HeaderComponent from '../../FeedStack/CreateFeed/components/Header/Header';
import {primaryBlue} from '../../../assets/styles/colors.styles';
import {IStoreFacetsData} from '../../../types/feedFilterTypes';
import SelectButtonsWithLabel from '../components/SelectButtonsWithLabel/SelectButtonsWithLabel';
import CheckboxWithLabel from '../components/CheckboxWithLabel/CheckboxWithLabel';
import hook from './FiltersScreen.hook';
import styles from './FiltersScreen.style';

const FiltersScreen: React.FC = () => {
  const {
    t,
    backIconePressHandle,
    handleSelectCategory,
    datePickerCancelHandle,
    datePickerConfirmHandle,
    datePickerButtonPressHandle,
    packageFilterSelectHandle,
    genderSelectHandle,
    filtersListData,
    selectedBuckets,
    isPickerOpen,
    localData,
    selectedFilter,
    genderLocalDate,
    selectedGender
  } = hook();

  const RenderList: React.JSX.Element = React.useMemo(() => {
    let newList: IStoreFacetsData[] = [];
    filtersListData.forEach(item => {
      if (
        item.key === 'date' ||
        item.key == 'upcoming' ||
        item.key === 'finished' ||
        item.key === 'gender'
      ) {
        newList = [item, ...newList];
      } else {
        newList = [...newList, item];
      }
    });
    let RenderItem: (
      index: number,
      item: IStoreFacetsData,
    ) => React.JSX.Element = (
      index: number,
      item: IStoreFacetsData,
    ): React.JSX.Element => {
      switch (item.key) {
        case 'date':
          return (
            <View style={styles.rowContainer}>
              <Text style={styles.title}>{t(item.name ?? '')}</Text>
              <DatePickerComponent
                isOpen={isPickerOpen}
                date={
                  selectedBuckets?.[item.key]?.[0]
                    ? new Date(selectedBuckets?.[item.key]?.[0].key || '')
                    : new Date()
                }
                onCancel={datePickerCancelHandle}
                onConfirm={date => datePickerConfirmHandle(date)}
                onPress={datePickerButtonPressHandle}
                mode={'date'}
                value={
                  selectedBuckets?.[item.key]?.[0]
                    ? moment(selectedBuckets?.[item.key]?.[0].key).format(
                        'DD MMMM YYYY',
                      )
                    : undefined
                }
                containerStyle={styles.datePickerContainer}
              />
            </View>
          );
        case 'upcoming':
          return (
            <View style={styles.packageTypeContainer}>
              {localData.map((el, index) => (
                <CheckboxWithLabel
                  key={el + index}
                  label={el}
                  onPress={packageFilterSelectHandle}
                  isSelected={selectedFilter === el}
                />
              ))}
            </View>
          );
        case 'gender':
          return (
            <SelectButtonsWithLabel
              containerStyle={styles.genderButtonsContainer}
              title={t(item.key) || ''}
              buttons={genderLocalDate}
              onSelect={genderSelectHandle}
              selected={selectedGender}
            />
          );
        case 'finished':
          return <></>;
        default:
          return (
            <SelectButton
              key={index}
              containerStyle={styles.listItemContainer}
              title={t(item.name ?? '') ?? ''}
              onPress={() => handleSelectCategory(item.key)}
              subTitle={
                item.key && selectedBuckets?.[item.key]?.length
                  ? `${selectedBuckets?.[item.key]?.[0].title}`
                  : undefined
              }
              moreItemsCount={
                item.key &&
                selectedBuckets?.[item.key] &&
                (selectedBuckets?.[item.key] || [])?.length > 1
                  ? (selectedBuckets?.[item.key] || []).length - 1
                  : undefined
              }
            />
          );
      }
    };
    return (
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={newList}
        keyExtractor={(item, index) => (item.key || '') + index}
        renderItem={({item, index}) => <>{RenderItem(index, item)}</>}
      />
    );
  }, [selectedBuckets, filtersListData, isPickerOpen, selectedFilter,selectedGender]);

  return (
    <View style={styles.container}>
      <HeaderComponent
        title={t('filter') ?? ''}
        leftIconPressHandler={backIconePressHandle}
      />
      {filtersListData.length ? (
        RenderList
      ) : (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'large'} color={primaryBlue} />
        </View>
      )}
    </View>
  );
};
export default FiltersScreen;
