import React from 'react';
import {View, FlatList, ViewStyle, ScrollView} from 'react-native';
import SelectedUserCard from '../selectedUserCard/selectedUserCard';
import styles from './selectedUsers.style';
import {ISelectedUser} from '../../../../chatTypes';
import {downloadMediaFromBunny} from '../../../../../../utils/bunny.net';

type Props = {
  selectedUsers: any[];
  customStyles?: {
    containerStyle?: ViewStyle;
  };
};

const SelectedUsers: React.FC<Props> = props => {
  const {selectedUsers, customStyles} = props;

  return (
    <View style={[styles.container, customStyles?.containerStyle]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          contentContainerStyle={styles.categories}
          numColumns={selectedUsers.length}
          showsVerticalScrollIndicator={false}
          key={selectedUsers.length + "selectedUser"}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          data={selectedUsers}
          renderItem={({item, index}) => {
            return (
              <SelectedUserCard
              lastItem={selectedUsers.length -1 === index ? true:false}
                imageUrl={
                  downloadMediaFromBunny({
                    public_key: item?.whom_user?.image,
                    mediaType: 'image',
                    imageDir: 'profile',
                    userDir: item?.whom_user?.id,
                  })?.url
                }
                name={item?.whom_user?.user?.first_name}
              />
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default SelectedUsers;
