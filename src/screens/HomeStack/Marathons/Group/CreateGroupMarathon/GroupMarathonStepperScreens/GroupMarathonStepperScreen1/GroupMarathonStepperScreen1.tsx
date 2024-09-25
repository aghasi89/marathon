import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from '../../../../../../../assets/icons/svg/index';
import {
  formFieldGrey,
  primaryWhite,
} from '../../../../../../../assets/styles/colors.styles';
import MultiSelectSelectedImages from '../../../../../../../components/multiSelectImages/MultiSelectSelectedImages';
import MultiSelectSelectedChips from '../../../../../../../components/multiSelect/MultiSelectSelectedChips';
import HeaderWithImage from '../../../../../../../components/headerWithImage/HeaderWithImage';
import TextInputComponent from '../../../../../../../components/textInput/TextInputComponent';
import UpploadButton from '../../../../../../../components/uploadbutton/UploadButton';
import TextWithIcon from '../../../../../../../components/textWithicon/TextWithIcon';
import {NavigationParamList} from '../../../../..';
import hook from './GroupMarathonStepperScreen1-hook';
import styles from './GroupMarathonStepperScreen1.style';

type Props = NativeStackScreenProps<NavigationParamList, 'CreateGroupMarathon'>;

const GroupMarathonStepperScreen1: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const {
    deleteCategoryItem,
    uploadImage,
    cancleImage,
    onChangeText,
    selectLanguage,
    selectCategories,
    addImageToGallery,
    onInfoTextChange,
    deleteLanguageItem,
    deleteGalleryItem,
    state,
    selectTags,
    deleteTagItem,
  } = hook(navigation);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {!state.marathonImageUrl ? (
            <UpploadButton goBackImage={uploadImage} />
          ) : (
            <View style={styles.headerWithImageContainer}>
              <HeaderWithImage
                source={{uri: state.marathonImageUrl}}
                rightIcon={<Icons.Close fill={primaryWhite} />}
                rightIconPress={cancleImage}
              />
            </View>
          )}
        </View>
        <View style={styles.recipeName}>
          <Text style={styles.title}>Name</Text>
          <TextInputComponent
            value={state.marathonName ?? ''}
            onChangetext={onChangeText}
            close={() => {}}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Circle fill={formFieldGrey} />}
            text={'Language'}
          />
          <TouchableOpacity style={styles.plusIcon} onPress={selectLanguage}>
            <Icons.Plus fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
        {state.selectedLanguages && state.selectedLanguages.length > 0 && (
          <View style={styles.selectedTags}>
            <MultiSelectSelectedChips
              list={state.selectedLanguages ?? []}
              onDelete={deleteLanguageItem}
            />
          </View>
        )}
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Tag fill={formFieldGrey} />}
            text={'Categories'}
          />
          <TouchableOpacity style={styles.plusIcon} onPress={selectCategories}>
            <Icons.Plus fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
        {state.selectedCategories && state.selectedCategories.length > 0 && (
          <View style={styles.selectedTags}>
            <MultiSelectSelectedChips
              list={state.selectedCategories}
              onDelete={deleteCategoryItem}
            />
          </View>
        )}
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Tag fill={formFieldGrey} />}
            text={'Tags'}
          />
          <TouchableOpacity style={styles.plusIcon} onPress={selectTags}>
            <Icons.Plus fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
        {state?.selectedTags && state?.selectedTags?.length > 0 && (
          <View style={styles.selectedTags}>
            <MultiSelectSelectedChips
              list={state?.selectedTags}
              onDelete={(value: any) => {
                deleteTagItem(value);
              }}
            />
          </View>
        )}
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Image fill={formFieldGrey} />}
            text={'Gallery'}
          />
          <TouchableOpacity style={styles.plusIcon} onPress={addImageToGallery}>
            <Icons.Plus fill={formFieldGrey} />
          </TouchableOpacity>
        </View>
        {state.selectedGalleryImages && state.selectedGalleryImages.length > 0 && (
          <View style={styles.selectedTags}>
            <MultiSelectSelectedImages
              list={state.selectedGalleryImages}
              onDelete={deleteGalleryItem}
              onPlay={() => {}}
            />
          </View>
        )}
        <View style={styles.rowContainer}>
          <TextWithIcon
            icon={<Icons.Info fill={formFieldGrey} />}
            text={'Info'}
          />
        </View>
        <View style={styles.typeHere}>
          <Text style={styles.title}>Type Here</Text>
          <TextInputComponent
            value={state.marathonInfo ?? ''}
            onChangetext={onInfoTextChange}
            close={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default GroupMarathonStepperScreen1;
