import React from 'react';
import {View, ScrollView} from 'react-native';
import GroupInfoCard from '../../../../../../components/groupInfoCard/GroupInfoCard';
import styles from './Groups.style';

const Groups: React.FC<any> = props => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {props.groupList.map((group, i) => {
          return (
            <View key={i} style={styles.item}>
              <GroupInfoCard
                groupData={{
                  group_name: group.name,
                  users: group.users,
                  listTags: group.listTags,
                }}
                onSelect={() => props.addGroup(group)}
                selected={props.checkIsSubmited(group.id)}
                onPressCard={() => props.onPressCard(group.id)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Groups;
