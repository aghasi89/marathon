import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {ITag, IUser} from '../../types/types';
import Check from '../check/Check';
import styles from './GroupInfoCard.styles';

interface IGroupType {
  group_name: string;
  users?: IUser[];
  listTags: Array<ITag>;
}
type Props = {
  groupData: IGroupType;
  onSelect: () => void;
  selected?: boolean;
  onPressCard?: () => void;
};
const GroupInfoCard: React.FC<Props> = ({
  groupData,
  onSelect,
  selected,
  onPressCard,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressCard}>
      <View style={styles.infoContainer}>
        <View style={styles.imageContainer}>
          {groupData?.users?.map((user, index) => {
            if (index < 4) {
              return (
                <Image
                  key={index}
                  style={styles.image}
                  source={{uri: user?.imageUrl}}
                />
              );
            }
          })}
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{groupData.group_name}</Text>
          <Text style={styles.countText}>{groupData.users?.length} Users</Text>
        </View>
        <View style={styles.messageTouch}>
          <Check isSubmited={selected} onPress={onSelect} />
        </View>
      </View>
      <View style={styles.connectedTouch}>
        {groupData.listTags.map((tag, index) => {
          return index < 5 ? (
            <Text key={index} style={[styles.greyTitleText, styles.marginTag]}>
              {tag.title}
            </Text>
          ) : index === 5 ? (
            <Text key={index} style={[styles.greyTitleText, styles.marginTag]}>
              ...
            </Text>
          ) : null;
        })}
      </View>
    </TouchableOpacity>
  );
};
export default GroupInfoCard;
