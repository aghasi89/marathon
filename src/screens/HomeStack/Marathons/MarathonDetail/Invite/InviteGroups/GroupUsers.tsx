import React from 'react';
import {View, ScrollView} from 'react-native';
import UserInfoCard from '../../../../../../components/userInfoCard/UserInfoCard';
import styles from './Groups.style';

const GroupUsers: React.FC<any> = props => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {props.groupUsers?.map((user, i) => {
          return (
            <View key={i} style={styles.item}>
              <UserInfoCard
                userData={{
                  first_name: user.firstName,
                  last_name: user.lastName,
                  address: user.address,
                  isConnect: user.isConnect,
                  image_url: user.imageUrl,
                }}
                onConnect={() => {}}
                onInvite={() => {
                  props.checkIsSubmited(user.id);
                  props.addGroupMember(user);
                }}
                selected={props.checkIsSubmited(user.id)}
                isLeads
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default GroupUsers;
