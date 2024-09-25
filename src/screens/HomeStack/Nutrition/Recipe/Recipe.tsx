import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {primaryBlack} from '../../../../assets/styles/colors.styles';
import Icons from '../../../../assets/icons/svg/index';
import EditSheet from '../../../../components/editSheet/EditSheet';
import RecentInfoCard from '../../../../components/recentInfoCard/RecentInfoCard';
import PlusButton from '../../../../components/plusButton/plusButton';
import {recipeListSelector} from '../../../../store/selectors/recipe-selector';
import styles from './Recipe.style';

const Recipe: React.FC<any> = ({navigation}) => {
  const [isOpenedEditSheet, setIsOpenedEditSheet] = useState(false);
  const recipeList = useSelector(recipeListSelector);
  const editSheet = [
    {
      title: 'Edit',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.Edit />,
    },
    {
      title: 'Diplicate',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.DuplicateIcon fill={primaryBlack} />,
    },
    {
      title: 'Bookmark',
      onSelect: () => {
        setIsOpenedEditSheet(false);
      },
      Icon: <Icons.BookmarkIcon fill={primaryBlack} />,
    },
  ];
  return (
    <>
      <ScrollView style={styles.container}>
        {recipeList.map((elem, index) => {
          return (
            <View key={index}>
              <RecentInfoCard
                onPress={() => {
                  navigation.navigate('RecipeDetail');
                }}
                info={{
                  title: elem.title,
                  imageUrl: elem.imageUrl,
                  count: elem.count,
                  amount: elem.amount,
                  time: elem.time,
                  saleType: elem.saleType,
                  type: elem.type,
                }}
                onLongPress={() => {
                  setIsOpenedEditSheet(true);
                }}
                isDisabled={true}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.plusButton}>
        <PlusButton
          onPress={() => {
            navigation.navigate('CreateRecipe', {isNew: true});
          }}
        />
      </View>
      <EditSheet
        isVisible={isOpenedEditSheet}
        onClose={() => setIsOpenedEditSheet(false)}
        list={editSheet}
      />
    </>
  );
};
export default Recipe;
