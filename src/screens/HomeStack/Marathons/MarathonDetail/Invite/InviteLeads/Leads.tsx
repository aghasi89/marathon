import React from 'react';
import {View, ScrollView} from 'react-native';
import UserInfoCard from '../../../../../../components/userInfoCard/UserInfoCard';
import styles from './Leads.style';

const Leads: React.FC<any> = props => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {props.leadList.map((user, i) => {
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
                  props.addLead(user);
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

export default Leads;
