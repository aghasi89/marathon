
import React, { useMemo } from 'react';
import {View,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MainHeader from '../../../../components/headers/mainHeader/MainHeader';
import PhotoProgressCardsList from '../../../../components/photoProgressCardsList/PhotoProgressCardsList';
import TabPhotoProgress from '../../../../components/tabPhotoProgress/TabPhotoProgress';
import {EmployerNavigationParamList} from '../..';
import hook from './PhotoProgressChart-hook';
import styles from './PhotoProgress.Chart.style';

type Props = NativeStackScreenProps<
  EmployerNavigationParamList,
  'PhotoProgressChart'
>;

const PhotoProgressChart: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
    leftIconPress,
    handleCategorySelect,
    selectedCategory,
    onImagePress,
    onCommentPress,
    createPhotoProgressInfoObject
  } = hook(navigation);

  const params=useMemo(()=>{
    return createPhotoProgressInfoObject()
  },[selectedCategory])

  return (
    <View style={styles.container}>
      <MainHeader
        leftIconPress={leftIconPress}
        leftIcon={true}
        title={'Photo Progress'}
      />  
     <TabPhotoProgress isSelected={selectedCategory} setSelected={handleCategorySelect}/>
     <PhotoProgressCardsList data={params} 
        onImagePress={onImagePress}
        onCommentsPress={onCommentPress}
      />
    </View>
  );
};
export default PhotoProgressChart;
