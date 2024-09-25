import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import filterTabBarHook from './filterTabBar-hook';
import {styles} from './filterTabBar.style';

interface Props {
  activeFilter: string;
  setActiveFilter: (filter: any) => void;
  filters: string[];
}

const FilterTabBar: React.FC<Props> = props => {
  const {t} = useTranslation();
  const {activeFilter, setActiveFilter, filters} = props;
  const {scrollViewRef, scrollToButton} = filterTabBarHook();
  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          contentContainerStyle={styles.categories}
          numColumns={filters.length}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          data={filters}
          renderItem={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.tab,
                    activeFilter === item && styles.activeTab,
                  ]}
                  onPress={() => {setActiveFilter(item), scrollToButton(index)}}>
                  <Text style={styles.tabText}>{t(item) ?? ''}</Text>
                </TouchableOpacity>
                {index !== filters.length - 1 && (
                  <View style={styles.stroke}></View>
                )}
              </>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default FilterTabBar;
