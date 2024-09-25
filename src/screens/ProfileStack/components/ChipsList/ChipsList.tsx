import * as React from 'react';
import { Pressable, ScrollView, Text, View, ViewStyle } from 'react-native';
import ChipItem from './ChipItem/ChipItem';
import styles from './ChipsList.style';
import { useTranslation } from 'react-i18next';

interface IProps {
  sectionTitle?: string;
  itemsList?: any[];
  icon?: React.ReactNode;
  onPress?: (el: any) => void;
  color?: string;
  itemContainerStyle?: ViewStyle | ViewStyle[];
  isHorizontal?: boolean,
  showSeeAll?: boolean,
  onPressSeeAll?: () => void,
  isEmpty?: boolean
}
const ChipsList: React.FC<IProps> = ({
  sectionTitle,
  color,
  itemContainerStyle,
  icon,
  onPress,
  itemsList,
  isHorizontal,
  showSeeAll,
  onPressSeeAll,
  isEmpty=false
}) => {
  const { t } = useTranslation()
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        {
          showSeeAll && <Pressable onPress={onPressSeeAll}>
            <Text style={styles.seeAllText}>{isEmpty ? t('addCertificate') : t('seeAll')}</Text>
          </Pressable>
        }
      </View>
      {
        isHorizontal ?
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={isHorizontal} style={styles.sectionList}>
            {itemsList?.map((el, index) => {
              return (
                <ChipItem
                  color={color}
                  icon={icon}
                  onPress={() => onPress && onPress(el)}
                  key={index}
                  containerStyle={itemContainerStyle}
                  description={el.certificate ? el.certificate.description : el.speciality.name}
                />
              );
            })}
          </ScrollView> :
          <View style={styles.sectionList}>
            {itemsList?.map((el, index) => {
              return (
                <ChipItem
                  color={color}
                  icon={icon}
                  onPress={() => onPress && onPress(el)}
                  key={index}
                  containerStyle={itemContainerStyle}
                  description={el.certificate ? el.certificate.title : el.speciality.name}
                />
              );
            })}
          </View>
      }
    </View>
  );
};

export default ChipsList;