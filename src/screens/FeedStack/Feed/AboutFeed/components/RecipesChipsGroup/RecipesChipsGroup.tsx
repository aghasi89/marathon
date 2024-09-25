import React from 'react';
import {ScrollView, View, Text, Pressable, ViewStyle} from 'react-native';
import Icons from '../../../../../../assets/icons/svg';
import {ISelectedFeedRecipeChipsData} from '../../../../../../types/types';
import styles from './RecipesChipsGroup.style';

type Props = {
  data: ISelectedFeedRecipeChipsData;
  containerStyle?: ViewStyle;
  onChipPress: (type?: string) => void;
  itemContainerStyle?: ViewStyle | ViewStyle[];
};

const RecipesChipsGroup: React.VFC<Props> = ({
  data,
  containerStyle,
  onChipPress,
  itemContainerStyle,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={containerStyle}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}>
        {data.cookingTime && (
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <Icons.Clock {...styles.iconStyle} />
            </View>
            <Text style={styles.text}>{data.cookingTime}</Text>
          </View>
        )}
        {!!data.apportionment && (
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <Icons.Person {...styles.iconStyle} />
            </View>
            <Text style={styles.text}>{data.apportionment}</Text>
          </View>
        )}
        {data.elements?.map((element, index) => {
          return (
            element?.title&&element?.title?.length >1? (
              <Pressable
                onPress={() => onChipPress(element.type)}
                key={index}
                style={[styles.itemContainer, itemContainerStyle]}>
                {element.icon && (
                  <View style={styles.iconContainer}>{element.icon}</View>
                )}
                <Text style={styles.text}>{element.title}</Text>
              </Pressable>
            ):null
          );
        })}
      </ScrollView>
    </View>
  );
};
export default RecipesChipsGroup;
