import React, { useMemo } from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PhotoProgressCardsList from '../../../../../../../components/photoProgressCardsList/PhotoProgressCardsList';
import TabPhotoProgress from '../../../../../../../components/tabPhotoProgress/TabPhotoProgress';
import {EmployerNavigationParamList} from '../../../../..';
import hook from './ShareingPhotoProgress-hook';
import styles from './ShareingPhotoProgress.style';

type Props = NativeStackScreenProps<
  EmployerNavigationParamList,
  'PhotoProgressChart'
>;

const ShareingPhotoProgress: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
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
     <TabPhotoProgress isSelected={selectedCategory} setSelected={handleCategorySelect}/>
     <PhotoProgressCardsList data={params} 
        onImagePress={onImagePress}
        onCommentsPress={onCommentPress}
      />
    </View>
  );
};
export default ShareingPhotoProgress;
