import * as React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Icons from '../../../assets/icons/svg/index';
import {primaryBlack} from '../../../assets/styles/colors.styles';
import MainHeader from '../../../components/headers/mainHeader/MainHeader';
import TabBadges from '../../../components/TabBadges/TabBadges';
import MultiSelectSelectedChips from '../../../components/multiSelect/MultiSelectSelectedChips';
import RecentInfoCard from '../../../components/recentInfoCard/RecentInfoCard';
import PlusButton from '../../../components/plusButton/plusButton';
import EditSheet from '../../../components/editSheet/EditSheet';
import indexHook from './index-hook';
import styles from './index.style';

const Programs: React.FC<any> = ({navigation}) => {
  const {
    isFocus,
    setIsfocus,
    searchText,
    indexTab,
    setIndexTab,
    filterText,
    navigateFilter,
    deleteItem,
    selectedFilterListPrograme,
    badges,
    isOpenedEditSheet,
    setIsOpenedEditSheet,
    programsList,
    search,
  } = indexHook(navigation);
  const leftIconPress = () => {
    navigation.goBack();
  };
  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.Edit />,
    },
    {
      title: 'Diplicate',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.DuplicateIcon fill={primaryBlack} />,
    },
    {
      title: 'Bookmark',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.BookmarkIcon fill={primaryBlack} />,
    },
  ];

  return (
    <View style={styles.container}>
      <MainHeader
        title={'Programs'}
        search={true}
        open={isFocus}
        onFocus={() => setIsfocus(true)}
        onBlur={() => setIsfocus(false)}
        onChangeText={filterText}
        inputValue={searchText}
        leftComponent={
          <TouchableOpacity onPress={navigateFilter}>
            <Icons.Filter fill={primaryBlack} />
          </TouchableOpacity>
        }
        leftIcon={true}
        leftIconPress={leftIconPress}
      />
      {selectedFilterListPrograme.length > 0 ? (
        <View style={styles.filterList}>
          <MultiSelectSelectedChips
            list={selectedFilterListPrograme}
            onDelete={deleteItem}
          />
        </View>
      ) : (
        <TabBadges data={badges} index={indexTab} setIndex={setIndexTab} />
      )}
      <ScrollView style={styles.programsListConteiner}>
        {programsList.map((item, index) => {
          if (search(item)) {
            return (
              <View key={index}>
                <RecentInfoCard
                  onPress={() => {
                    navigation.navigate('ProgramDetail');
                  }}
                  info={{
                    title: item.title,
                    imageUrl: item.imageUrl,
                    count: item.count,
                    time: item.time,
                    type: item.type,
                  }}
                  isDisabled={true}
                  onLongPress={() => setIsOpenedEditSheet(true)}
                />
              </View>
            );
          }
        })}
      </ScrollView>
      <View style={styles.plusButton}>
        <PlusButton
          onPress={() => {
            navigation.navigate('CreateProgram');
          }}
        />
      </View>
      <EditSheet
        isVisible={isOpenedEditSheet}
        onClose={() => setIsOpenedEditSheet(false)}
        list={editSheet}
      />
    </View>
  );
};
export default Programs;
