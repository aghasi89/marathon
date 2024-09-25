import React from 'react';
import {ScrollView,ViewStyle} from 'react-native';
import UserActivityInfoCard from '../userActivityInfoCard/UserActivityInfoCard'
import styles from './UserActivityInfoCardList.style';

export type ActivityInfoCardData={
  date:string,
  value:string,
}
type Props = {
    data:ActivityInfoCardData[],
    cardContainerStyle?:ViewStyle,
};

const UserActivityInfoCardList: React.FC<Props> = ({
    data,
    cardContainerStyle
}) => {
  return (
    <ScrollView style={styles.container}>
      {data?.map((dataItem,index)=>{
       return ( 
       <UserActivityInfoCard key={index}
        containerStyle={cardContainerStyle}
        date={dataItem.date}
        value={dataItem.value}
        />
        )})}
    </ScrollView>
  );
};

export default UserActivityInfoCardList;
