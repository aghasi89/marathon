import React, {useMemo, useRef} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Icons from '../../../../../assets/icons/svg/index';
import {
  primaryBlack,
  primaryBlue,
} from '../../../../../assets/styles/colors.styles';
import {calcHeight} from '../../../../../assets/dimensions';
import MainHeader from '../../../../../components/headers/mainHeader/MainHeader';
import TabNavigationHeader from '../../../../../components/headers/tabNavigationHeader/TabNavigationHeader';
import MultiSelectSelectedChips from '../../../../../components/multiSelect/MultiSelectSelectedChips';
import BottomBar from '../../../../../components/bottomBar/BottomBar';
import UserInfoCard from '../../../../../components/userInfoCard/UserInfoCard';
import EditSheet from '../../../../../components/editSheet/EditSheet';
import ModalComponent from '../../../../../components/modal/ModalComponent';
import {NavigationParamList} from '../../..';
import styles from './index.style';
import indexHook from './index-hook';
import Clients from './InviteClients/Clients';
import Leads from './InviteLeads/Leads';
import Groups from './InviteGroups/Groups';
import GroupUsers from './InviteGroups/GroupUsers';

type Props = NativeStackScreenProps<NavigationParamList, 'Invite'>;

const Invite: React.FC<Props> = ({navigation}) => {
  const {
    isFocus,
    searchText,
    index,
    setIndex,
    filterText,
    deleteItem,
    onFocus,
    onBlur,
    navigateFilter,
    leftIconPress,
    marathonsDetail,
    checkIsSubmitedClient,
    addClient,
    state,
    sheetIndex,
    snapPoints,
    handleSheetChanges,
    checkIsSubmitedLead,
    addLead,
    groupList,
    checkIsSubmitedGroup,
    addGroup,
    addGroupMembers,
    checkIsSubmitedGroupMember,
    addGroupMember,
    isOpenedEditSheet,
    setIsOpenedEditSheet,
    isGroup,
    setIsGroup,
    selectedGroup,
    setGroup,
    isVisibleModal,
    selectedFilterListMarathon,
    clients,
    leads,
    onInvite,
  } = indexHook(navigation);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const chiprGroupItems = [
    {
      title: 'Clients',
      icon: <Icons.UserIcon fill={primaryBlack} />,
      selectedIcon: <Icons.User fill={primaryBlue} />,
    },
    {
      title: 'Leads',
      icon: <Icons.UserIcon fill={primaryBlack} />,
      selectedIcon: <Icons.User fill={primaryBlue} />,
    },
    {
      title: 'Groups',
      icon: <Icons.UserIcon fill={primaryBlack} />,
      selectedIcon: <Icons.User fill={primaryBlue} />,
    },
  ];
  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.Edit />,
    },
    {
      title: 'Duplicate',
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
    {
      title: 'Delete',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.DeleteIcon fill={primaryBlack} />,
    },
  ];
  const renderComponent = () => {
    switch (index) {
      case 0:
        return (
          <Clients
            clientList={clients}
            addClient={client => addClient(client)}
            checkIsSubmited={(id: number) => checkIsSubmitedClient(id)}
          />
        );
      case 1:
        return (
          <Leads
            leadList={leads}
            addLead={lead => addLead(lead)}
            checkIsSubmited={(id: number) => checkIsSubmitedLead(id)}
          />
        );
      case 2:
        return (
          <>
            {isGroup ? (
              <Groups
                groupList={groupList}
                addGroup={group => {
                  addGroup(group);
                  addGroupMembers(group);
                }}
                checkIsSubmited={(id: number) => checkIsSubmitedGroup(id)}
                onPressCard={(id: number) => setGroup(id)}
              />
            ) : (
              selectedGroup && (
                <GroupUsers
                  groupUsers={selectedGroup.users}
                  checkIsSubmited={id => checkIsSubmitedGroupMember(id)}
                  addGroupMember={user => addGroupMember(user)}
                />
              )
            )}
          </>
        );
      default:
    }
  };
  const BottomBarItem = ({item, onClose}) => {
    return (
      <View style={styles.item}>
        <UserInfoCard
          userData={{
            first_name: item.firstName,
            last_name: item.lastName,
            address: item.address,
            isConnect: item.isConnect,
            image_url: item.imageUrl,
          }}
          onConnect={() => {}}
          isLeads
          isClose
          onClose={onClose}
        />
      </View>
    );
  };
  const renderBottomBarComponent = () => {
    switch (index) {
      case 0:
        return (
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {state.submitedClients.map((element, index) => {
              return (
                <BottomBarItem
                  key={index}
                  item={element}
                  onClose={() => {
                    checkIsSubmitedClient(element.id);
                    addClient(element);
                  }}
                />
              );
            })}
          </BottomSheetScrollView>
        );
      case 1:
        return (
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {state.submitedLeads.map((element, index) => {
              return (
                <BottomBarItem
                  key={index}
                  item={element}
                  onClose={() => {
                    checkIsSubmitedLead(element.id);
                    addLead(element);
                  }}
                />
              );
            })}
          </BottomSheetScrollView>
        );
      case 2:
        return (
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {state.submitedGroupMembers.map((element, index) => {
              return (
                <BottomBarItem
                  key={index}
                  item={element}
                  onClose={() => {
                    checkIsSubmitedGroupMember(element.id),
                      addGroupMember(element);
                  }}
                />
              );
            })}
          </BottomSheetScrollView>
        );
      default:
    }
  };

  let count =
    state.submitedClients.length +
    state.submitedLeads.length +
    state.submitedGroupMembers.length;

  return (
    <View style={styles.container}>
      {isGroup ? (
        <MainHeader
          title={'Invite to Marathon'}
          search={true}
          open={isFocus}
          onFocus={onFocus}
          onBlur={onBlur}
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
      ) : (
        <MainHeader
          leftIconPress={() => setIsGroup(!isGroup)}
          leftIcon={true}
          title={selectedGroup?.name}
          leftComponentStyle={styles.leftComponentStyle}
          leftComponent={
            <Icons.EllipsisIcon
              fill={primaryBlack}
              style={styles.elipsIcon}
              onPress={() => setIsOpenedEditSheet(true)}
            />
          }
          isGroup
          users={selectedGroup?.users}
          count={selectedGroup?.users?.length}
        />
      )}
      {isGroup && (
        <View style={styles.tabNavigator}>
          <TabNavigationHeader
            data={chiprGroupItems}
            index={index}
            setIndex={setIndex}
            isInvite
          />
        </View>
      )}
      {selectedFilterListMarathon.length > 0 && (
        <View style={styles.dataItem}>
          <MultiSelectSelectedChips
            list={selectedFilterListMarathon}
            onDelete={deleteItem}
          />
        </View>
      )}
      {renderComponent()}
      <BottomSheet
        ref={bottomSheetRef}
        index={sheetIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.listContainer}>
          <BottomBar
            count={count}
            onImport={onInvite}
            onPressMenu={() => {
              handleSheetChanges(1);
            }}
            buttonType={'menu'}
            isInvite
          />
          {renderBottomBarComponent()}
        </View>
      </BottomSheet>
      <EditSheet
        isVisible={isOpenedEditSheet}
        height={calcHeight(400)}
        onClose={() => setIsOpenedEditSheet(false)}
        list={editSheet}
      />
      <ModalComponent
        isVisible={isVisibleModal}
        onClose={leftIconPress}
        content={
          <View style={styles.modalContent}>
            <Text style={styles.textTop}>
              You have invited {count} users to
              <Text style={styles.textTop1}>
                {' '}
                {marathonsDetail.time} days challenge training with Ilona"
                marathon.
              </Text>
            </Text>
            <Text style={styles.text}>
              You will receive a notification once user accepts the invitation
            </Text>
          </View>
        }
      />
    </View>
  );
};
export default Invite;
