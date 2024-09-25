import React, {useEffect} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from '../../../../assets/icons/svg/index';
import MarathonCard from '../../../../components/marathonCard/MarathonCard';
import PlusButton from '../../../../components/plusButton/plusButton';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import EditSheet from '../../../../components/editSheet/EditSheet';
import {getGroups} from '../../../../store/actions/marathon-action';
import {NavigationParamList} from '../..';
import GroupHook from './Group-hook';
import styles from './Group.style';

type Props = NativeStackScreenProps<NavigationParamList, 'Marathons'>;
interface IProps {
  searchText: string;
}

const Group: React.FC<IProps> = ({searchText}) => {
  const navigation = useNavigation<Props['navigation']>();

  const {
    search,
    onEdit,
    onDelete,
    onBookmark,
    isOpenedEditSheet,
    setIsOpenedEditSheet,
    marathonsList,
    createMarathon,
    closeToester,
    navigateMarathonDetail,
    dispatch,
    setSelectedId,
  } = GroupHook({searchText, navigation});
  const editSheet = [
    {
      title: 'Edit',
      onSelect: onEdit,
      Icon: <Icons.Edit />,
    },
    {
      title: 'Delete',
      onSelect: onDelete,
      Icon: <Icons.DeleteIcon fill={primaryBlack} />,
    },
    {
      title: 'Bookmark',
      onSelect: onBookmark,
      Icon: <Icons.BookmarkIcon fill={primaryBlack} />,
    },
  ];
  useEffect(() => {
    dispatch(getGroups());
  }, []);
  return (
    <>
      <ScrollView style={styles.container}>
        {marathonsList.map((item, index) => {
          if (search(item)) {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigateMarathonDetail(item.id)}
                onLongPress={() => {
                  setIsOpenedEditSheet(true);
                  setSelectedId(item.id);
                }}>
                <MarathonCard
                  title={item.name}
                  userCount={item.count}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  startDate={item.calendarRange[0]}
                  endDate={item.calendarRange[1]}
                  time={item.time}
                  listTags={item.listTags}
                />
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
      <View style={styles.plusButton}>
        <PlusButton onPress={createMarathon} />
      </View>
      <EditSheet
        isVisible={isOpenedEditSheet}
        onClose={closeToester}
        list={editSheet}
      />
    </>
  );
};
export default Group;
