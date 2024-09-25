import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import TabBadges from '../../../../../../components/TabBadges/TabBadges';
import UserInfoCard from '../../../../../../components/userInfoCard/UserInfoCard';
import styles from './Clients.style';

const Clients: React.FC<any> = props => {
  const [indexTab, setIndexTab] = useState<number>(0);

  const badges = [
    {
      title: 'All 3',
    },
    {
      title: 'In Person',
    },
    {
      title: 'Remote',
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        <TabBadges data={badges} index={indexTab} setIndex={setIndexTab} />
        {props.clientList.map((user, i) => {
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
                  props.addClient(user);
                }}
                selected={props.checkIsSubmited(user.id)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Clients;
