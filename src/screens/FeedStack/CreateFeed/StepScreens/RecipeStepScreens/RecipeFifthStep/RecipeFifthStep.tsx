import * as React from 'react';
import {View, Text, Modal, Pressable, ScrollView} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import FeedCardFooter from '../../../../../../components/feedCard/footer/FeedCardFooter';
import {primaryWhite} from '../../../../../../assets/styles/colors.styles';
import Icons from '../../../../../../assets/icons/svg';
import RecipesChipsGroup from '../../../../Feed/AboutFeed/components/RecipesChipsGroup/RecipesChipsGroup';
import ProgressComponent from '../../../../Feed/AboutFeed/components/Progress/ProgressComponent';
import IngredientsComponent from '../../../../Feed/AboutFeed/components/Ingredients/IngredientsComponent';
import PreparationComponent from '../../../../Feed/AboutFeed/components/Preparation/PreparationComponent';
import MediaComponent from '../../../../Feed/AboutFeed/components/MediaComponent/MediaComponent';
import hook from './RecipeFifthStep.hook';
import styles from './RecipeFifthStep.style';

const RecipeFifthStep: React.FC = () => {
  const {
    t,
    imagePressHandler,
    imageViewModalCloseHandle,
    imageViewModalVisibility,
    images,
    data,
    state,
  } = hook();
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        overScrollMode="never">
        <MediaComponent
          {...data.mediaData}
          type={data.type}
          onImagePress={imageUrl => imagePressHandler(imageUrl)}
        />
        <FeedCardFooter
          commentIconPress={() => {}}
          energyIconPress={() => {}}
          shareIconPress={() => {}}
          bookmarkIconPress={() => {}}
          commentsCount={data.commentsCount}
          isBookmarked={data.isBookmarked}
          isLiked={data.isLiked}
          likesCount={data.likesCount}
          containerStyle={styles.likesBarContainer}
        />
        {data.title && (
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{data.title}</Text>
          </View>
        )}
        {data.progressData && <ProgressComponent data={data.progressData} />}
        {data.recipeChipsData && (
          <RecipesChipsGroup
            data={data.recipeChipsData}
            containerStyle={styles.chipsContainer}
            onChipPress={() => {}}
          />
        )}
        {data.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{data.description}</Text>
          </View>
        )}
        {data.ingredientsData && (
          <IngredientsComponent
            containerStyle={styles.ingredientsContainer}
            ingredients={data.ingredientsData}
          />
        )}
        {data.preparationSteps && (
          <PreparationComponent
            containerStyle={styles.preparationContainer}
            steps={data.preparationSteps}
          />
        )}
        <View></View>
      </ScrollView>
      <Modal
        visible={imageViewModalVisibility}
        transparent={true}
        onRequestClose={imageViewModalCloseHandle}>
        <ImageViewer
          imageUrls={images}
          renderIndicator={() => <></>}
          enableSwipeDown={true}
          enablePreload={true}
          onCancel={imageViewModalCloseHandle}
          renderHeader={() => {
            return (
              <Pressable
                style={styles.closeIconContainer}
                onPress={imageViewModalCloseHandle}>
                <Icons.Close fill={primaryWhite} {...styles.closeIcon} />
              </Pressable>
            );
          }}
        />
      </Modal>
    </View>
  );
};

export default RecipeFifthStep;
