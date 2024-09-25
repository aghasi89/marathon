import React from 'react';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Icons from '../../../../assets/icons/svg/index';
import {
  formFieldGrey,
  primaryBlack,
  primaryBlue,
} from '../../../../assets/styles/colors.styles';
import {calcHeight} from '../../../../assets/dimensions';
import TabBadges from '../../../../components/TabBadges/TabBadges';
import ChipsGroup from '../../../../components/chipsGroup/ChipsGroup';
import UserInfoCard from '../../../../components/userInfoCard/UserInfoCard';
import Search from '../../../../components/search/Search';
import MultiSelectSelectedChips from '../../../../components/multiSelect/MultiSelectSelectedChips';
import EditSheet from '../../../../components/editSheet/EditSheet';
import BottomButtonGroup from '../../../../components/buttonGroup/BottomButtonGroup';
import Toaster from '../../../../components/toester/Toester';
import MarathonDetailHook from './MarathonDetail-hook';
import styles from './MarathonDetail.style';

type Props = {navigation: any};
const Users: React.FC<Props> = ({navigation}) => {
  const {
    indexTab,
    setIndexTab,
    isFocus,
    onFocus,
    onBlur,
    searchText,
    badges,
    navigateFilter,
    chipsGroupItems,
    filterText,
    selectedFilterListMarathon,
    deleteItem,
    marathonsDetail,
    isOpenCreateSheet,
    setIsOpenCreateSheet,
    setElement,
    isOpenInviteSheet,
    setIsOpenInviteSheet,
    inputEmail,
    setInputEmail,
    remote,
    inPerson,
  } = MarathonDetailHook(navigation);

  const renderComponent = () => {
    switch (indexTab) {
      case 0:
        return marathonsDetail.users?.map((user, index) => {
          return (
            <View key={index} style={styles.infoCard}>
              <UserInfoCard
                userData={{
                  first_name: user.firstName,
                  last_name: user.lastName,
                  address: user.address,
                  isConnect: user.isConnect,
                  image_url: user.imageUrl,
                }}
                onConnect={() => {}}
                onSelectChat={() => {}}
              />
            </View>
          );
        });
      case 1:
        return remote?.map((user, index) => {
          return (
            <View key={index} style={styles.infoCard}>
              <UserInfoCard
                userData={{
                  first_name: user.firstName,
                  last_name: user.lastName,
                  address: user.address,
                  isConnect: user.isConnect,
                  image_url: user.imageUrl,
                }}
                onConnect={() => {}}
                onSelectChat={() => {}}
              />
            </View>
          );
        });
      case 2:
        return inPerson?.map((user, index) => {
          return (
            <View key={index} style={styles.infoCard}>
              <UserInfoCard
                userData={{
                  first_name: user.firstName,
                  last_name: user.lastName,
                  isConnect: user.isConnect,
                  image_url: user.imageUrl,
                }}
                onConnect={() => {}}
              />
            </View>
          );
        });
      default:
    }
  };
  const editSheet = [
    {
      title: 'In Person User',
      onSelect: () => {
        setIsOpenCreateSheet(false);
      },
    },
    {
      title: 'User Group',
      onSelect: () => {
        setIsOpenCreateSheet(false);
      },
    },
    {
      title: 'Invite',
      onSelect: () => {
        setIsOpenCreateSheet(false);
        setIsOpenInviteSheet(true);
      },
    },
  ];

  return (
    <View style={styles.container}>
      {!isFocus ? (
        <BottomSheetScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.badgesContainer}>
          <View>
            <TabBadges data={badges} index={indexTab} setIndex={setIndexTab} />
          </View>
          <View style={styles.icons}>
            <TouchableOpacity style={styles.iconStyle} onPress={onFocus}>
              <Icons.SearchIcon fill={primaryBlack} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconStyle} onPress={navigateFilter}>
              <Icons.Filter fill={primaryBlack} />
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
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
      {!isFocus && (
        <View style={styles.chipsGroup}>
          <ChipsGroup
            elements={chipsGroupItems}
            type="bottomSheet"
            onPress={element => setElement(element)}
          />
        </View>
      )}
      {renderComponent()}
      <EditSheet
        isVisible={isOpenCreateSheet}
        onClose={() => setIsOpenCreateSheet(false)}
        list={editSheet}
        isInvite
      />
      <Toaster
        height={calcHeight(210)}
        isVisible={isOpenInviteSheet}
        onClose={() => setIsOpenInviteSheet(false)}
        Screen={
          <View>
            <View style={styles.bottomTexts}>
              <Text style={styles.dayCount}>Invite User</Text>
              <TextInput
                placeholder="Type Email Here"
                value={inputEmail}
                style={styles.textInput}
                onChangeText={value => {
                  setInputEmail(value);
                }}
                keyboardType="email-address"
              />
            </View>
            <BottomButtonGroup
              firstTitle="Cencel"
              secondTitle="Send"
              onFirstButtonPress={() => setIsOpenInviteSheet(false)}
              onSecondButtonPress={() => {}}
              firstTitleColor={primaryBlack}
              secondTitleColor={inputEmail ? primaryBlue : formFieldGrey}
            />
          </View>
        }
      />
    </View>
  );
};
export default Users;
