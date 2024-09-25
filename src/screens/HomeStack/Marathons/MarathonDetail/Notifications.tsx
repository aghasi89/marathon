import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icons from '../../../../assets/icons/svg/index';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import TabBadges from '../../../../components/TabBadges/TabBadges';
import Search from '../../../../components/search/Search';
import NotificationCard from '../../../../components/notificationCard/NotificationCard';
import MultiSelectSelectedChips from '../../../../components/multiSelect/MultiSelectSelectedChips';
import styles from './MarathonDetail.style';
import MarathonDetailHook from './MarathonDetail-hook';

type Props = {navigation: any};
const Notifications: React.FC<Props> = ({navigation}) => {
  const {
    badgesNotification,
    indexTab,
    setIndexTab,
    isFocus,
    onFocus,
    onBlur,
    searchText,
    navigateFilter,
    filterText,
    selectedFilterListMarathon,
    deleteItem,
    notificationList,
  } = MarathonDetailHook(navigation);
  return (
    <View style={styles.container}>
      {!isFocus ? (
        <View style={styles.badgesNotification}>
          <View>
            <TabBadges
              data={badgesNotification}
              index={indexTab}
              setIndex={setIndexTab}
            />
          </View>
          <View style={styles.icons}>
            <TouchableOpacity style={styles.iconStyle} onPress={onFocus}>
              <Icons.SearchIcon fill={primaryBlack} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconStyle} onPress={navigateFilter}>
              <Icons.Filter fill={primaryBlack} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.searchBar}>
          <TouchableOpacity style={styles.arrowButton} onPress={onBlur}>
            <Icons.ArrowIcon fill={primaryBlack} />
          </TouchableOpacity>
          <Search
            open={isFocus}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={filterText}
            inputValue={searchText}
          />
          <TouchableOpacity style={styles.arrowButton} onPress={navigateFilter}>
            <Icons.Filter fill={primaryBlack} />
          </TouchableOpacity>
        </View>
      )}
      {selectedFilterListMarathon.length > 0 && (
        <View style={styles.filterList}>
          <MultiSelectSelectedChips
            list={selectedFilterListMarathon}
            onDelete={deleteItem}
          />
        </View>
      )}
      {/* {marathonsDetail.notifications?.map((user, index) => { */}
      {notificationList?.map((user, index) => {
        return (
          <View key={index} style={styles.infoCard}>
            <NotificationCard
              name={user.name}
              title={user.title}
              imageUrl={user.imageUrl}
              date={user.date}
              onPress={() => {}}
              unRead={user.unRead}
            />
          </View>
        );
      })}
    </View>
  );
};
export default Notifications;
