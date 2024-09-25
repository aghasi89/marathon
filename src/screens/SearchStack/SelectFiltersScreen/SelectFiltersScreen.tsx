import React from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import hook from './SelectFiltersScreen.hook';
import styles from './SelectFiltersScreen.style';
import HeaderComponent from '../../FeedStack/CreateFeed/components/Header/Header';
import { FilterFieldNames } from '../../../types/feedFilterTypes';
import {
  lightPeriwinkles,
  primaryBlack,
} from '../../../assets/styles/colors.styles';

const SelectFiltersScreen: React.FC = () => {
  const { t, handleSelect, backIconePressHandle, type, facets } = hook();

  return (
    <View style={styles.container}>
      <HeaderComponent
        title={t(FilterFieldNames[type]) ?? ''}
        leftIconPressHandler={backIconePressHandle}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={facets?.buckets}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelect(item.key)}
              style={styles.itemContainer}>
              <Text
                style={[
                  styles.text,
                  { color: item.isSelected ? primaryBlack : lightPeriwinkles },
                ]}>
                {type === "region" ? item.title === 'AM' ? t('armenia') :
                  item.title === "FR" ? t('france') : t("uae") :
                  item.title}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};
export default SelectFiltersScreen;
