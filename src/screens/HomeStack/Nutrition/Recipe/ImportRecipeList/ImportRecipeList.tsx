import React from 'react';
import {ScrollView, View} from 'react-native';
import RecentInfoCard from '../../../../../components/recentInfoCard/RecentInfoCard';
import {IRecipe} from '../../../../../store/reducers/recipe-reducer';
import styles from './ImportRecipe.style';

const ImportRecipeList: React.FC<any> = props => {
  return (
    <ScrollView style={styles.container}>
      {props.recipeList.map((recipe: IRecipe, index: number) => {
        return (
          <View key={index}>
            <RecentInfoCard
              info={{
                title: recipe.title,
                imageUrl: recipe.imageUrl,
                count: recipe.count,
                amount: recipe.amount,
                time: recipe.time,
                saleType: recipe.saleType,
                type: recipe.type,
              }}
              isDisabled={false}
              isSubmited={props.checkIsSubmited(recipe.id)}
              onPress={() => props.addRecipe(recipe)}
              onPressCheck={() => props.addRecipe(recipe)}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};
export default ImportRecipeList;
