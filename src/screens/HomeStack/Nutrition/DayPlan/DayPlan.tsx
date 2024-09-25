import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import Icons from '../../../../assets/icons/svg/index';
import EditSheet from '../../../../components/editSheet/EditSheet';
import RecentInfoCard from '../../../../components/recentInfoCard/RecentInfoCard';
import PlusButton from '../../../../components/plusButton/plusButton';
import {dayPlanListSelector} from '../../../../store/selectors/dayPlan-selector';
import styles from './DayPlan.style';

const DayPlan: React.FC<any> = ({navigation}) => {
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState(false);
  const dayPlanList = useSelector(dayPlanListSelector);
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
    <>
      <ScrollView style={styles.container}>
        {dayPlanList.map((elem, index) => {
          return (
            <View key={index}>
              <RecentInfoCard
                info={{
                  title: elem.title,
                  imageUrl: elem.imageUrl,
                  amount: elem.amount,
                  saleType: elem.saleType,
                  type: elem.type,
                }}
                onLongPress={() => {
                  setIsOpenedEditSheet(true);
                }}
                onPress={() => {
                  navigation.navigate('DayPlanDetail');
                }}
                isDisabled={true}
              />
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          right: calcWidth(17),
          bottom: calcHeight(26),
        }}>
        <PlusButton
          onPress={() => {
            navigation.navigate('CreateDayPlan');
          }}
        />
      </View>
      <EditSheet
        isVisible={isOpenedEditSheet}
        onClose={() => setIsOpenedEditSheet(false)}
        list={editSheet}
      />
    </>
  );
};
export default DayPlan;
