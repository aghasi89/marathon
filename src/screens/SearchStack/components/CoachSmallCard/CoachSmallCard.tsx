import React from 'react';
import {View, Image, ViewStyle, Text, Pressable} from 'react-native';
import Icons from '../../../../assets/icons/svg';
import {IUser} from '../../../../types/types';
import styles from './CoachSmallCard.style';
type Props = {
  user: IUser;
  containerStyle: ViewStyle | ViewStyle[];
  onCardPress?: () => void;
};
const CoachSmallCard: React.VFC<Props> = ({
  user,
  onCardPress,
  containerStyle,
}) => {
  const maxChars = 15;
  let name = `${user.user.first_name ?? ''} ${user?.user.last_name ?? ''}`;
  if (name.length > maxChars) {
    name = name.substring(maxChars, -1) + '...';
  }
  return (
    <Pressable onPress={onCardPress} style={[styles.container, containerStyle]}>
      <View style={styles.imageContainer}>
        {user.image ? (
          <Image style={styles.smallCard} source={{uri: user?.image}} />
        ) : (
          <View style={styles.smallCard}>
            <Icons.AltProfileImage {...styles.altImage} />
          </View>
        )}
        <View style={styles.absoluteContainer}>
          {user?.language?.map((el, i) =>
            el.language?.flag && i < 3 ? (
              <View key={`${el.id + i}`} style={styles.iconContainer}>
                <Image style={styles.flag} source={{uri: el.language?.flag}} />
              </View>
            ) : null,
          )}
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.name}>{name}</Text>
          <Icons.Verified />
        </View>
        <View style={styles.rowContainerSpace}>
          <View style={styles.rowContainer}>
            <Icons.LocationIcon />
            <Text style={styles.text}>{user.location}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Icons.Star />
            <Text style={styles.text}> {user.rating ?? 0}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          {user?.speciality?.map((el, index) =>
            index < 3 ? (
              <Text
                key={el.speciality.name + index}
                style={styles.specialityText}>
                {el.speciality.name}
              </Text>
            ) : null,
          )}
        </View>
      </View>
    </Pressable>
  );
};
export default CoachSmallCard;
