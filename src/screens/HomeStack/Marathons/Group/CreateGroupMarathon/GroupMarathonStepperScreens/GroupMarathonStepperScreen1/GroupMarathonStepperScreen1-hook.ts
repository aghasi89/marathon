import {useCallback, useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {marathonsDetailSelector} from '../../../../../../../store/selectors/marathons-selector';
import {
  ICategory,
  IGaleryImages,
  ILanguageList,
  ITag,
} from '../../../../../../../types/types';
import {StateContext, StateContextType} from '../../../../../contexts';

export default navigation => {
  const {state, dispatchState} = useContext<StateContextType>(StateContext);
  const [isVisibleTag, setIsVisibleTag] = useState<boolean>(false);
  const marathonDetail = useSelector(marathonsDetailSelector);

  const route = useRoute<any>();
  const isNew = route.params?.isNew;

  const categories = route.params?.categoryList
    ? route.params?.categoryList
    : isNew === false
    ? marathonDetail.categories
    : [];
  const languages = route.params?.languageList
    ? route.params?.languageList
    : isNew === false
    ? marathonDetail.language
    : [];
  const tags = route.params?.tagList
    ? route.params?.tagList
    : isNew === false
    ? marathonDetail.listTags
    : [];

  useEffect(() => {
    if (isNew === false && marathonDetail) {
      dispatchState && dispatchState({type: 'SET_ISNEW', payload: false});
      onChangeText(marathonDetail?.name);
      onInfoTextChange(marathonDetail?.marathonInfo);
      dispatchState &&
        dispatchState({
          type: 'SET_MARATHON_IMAGE_URL',
          payload: marathonDetail?.imageUrl,
        });
      dispatchState &&
        dispatchState({
          type: 'SET_GALLERY_IMAGES',
          payload: marathonDetail.selectedGalleryImages,
        });
    } else if (isNew === true) {
      dispatchState && dispatchState({type: 'SET_ISNEW', payload: true});
    }
  }, [isNew, marathonDetail]);

  useEffect(() => {
    categories.length > 0 && setCategories(categories);
  }, [categories]);
  useEffect(() => {
    languages.length > 0 && setLanguage(languages);
  }, [languages]);
  useEffect(() => {
    tags.length > 0 && setTags(tags);
  }, [tags]);

  const setLanguage = (value: ILanguageList) => {
    dispatchState &&
      dispatchState({type: 'SET_MARATHON_LANGUAGE', payload: value});
  };
  const setCategories = (value: ICategory) => {
    dispatchState &&
      dispatchState({type: 'SET_SELECTED_CATEGORIES', payload: value});
  };
  const setTags = (value: ITag) => {
    dispatchState && dispatchState({type: 'SET_SELECTED_TAGS', payload: value});
  };

  const deleteCategoryItem = useCallback(
    (value: ICategory) => {
      let list = state.selectedCategories ? [...state.selectedCategories] : [];
      list.splice(
        list.findIndex(item => item.id == value.id),
        1,
      );
      dispatchState &&
        dispatchState({type: 'SET_SELECTED_CATEGORIES', payload: list});
    },
    [state.selectedCategories],
  );
  const deleteTagItem = useCallback(
    (value: ITag) => {
      let list = state.selectedTags ? [...state.selectedTags] : [];
      list.splice(
        list.findIndex(item => item.id == value.id),
        1,
      );
      dispatchState &&
        dispatchState({type: 'SET_SELECTED_TAGS', payload: list});
    },
    [state.selectedTags],
  );
  const deleteLanguageItem = useCallback(
    (value: ILanguageList) => {
      let list = state.selectedLanguages ? [...state.selectedLanguages] : [];
      list.splice(
        list.findIndex(item => item.id === value.id),
        1,
      );
      dispatchState &&
        dispatchState({type: 'SET_MARATHON_LANGUAGE', payload: list});
    },
    [state.selectedLanguages],
  );
  const deleteGalleryItem = useCallback(
    (value: IGaleryImages) => {
      let list = state.selectedGalleryImages
        ? [...state.selectedGalleryImages]
        : [];
      list.splice(
        list.findIndex(item => item.id === value.id),
        1,
      );
      dispatchState &&
        dispatchState({type: 'SET_GALLERY_IMAGES', payload: list});
    },
    [state.selectedGalleryImages],
  );
  const uploadImage = useCallback((image: string) => {
    dispatchState &&
      dispatchState({type: 'SET_MARATHON_IMAGE_URL', payload: image});
  }, []);
  const cancleImage = useCallback(() => {
    dispatchState &&
      dispatchState({type: 'SET_MARATHON_IMAGE_URL', payload: ''});
  }, []);
  const onChangeText = useCallback((value: string) => {
    dispatchState && dispatchState({type: 'SET_MARATHON_NAME', payload: value});
  }, []);
  const selectLanguage = useCallback(() => {
    navigation.navigate('SelectLanguage');
  }, [navigation]);
  const selectCategories = useCallback(() => {
    navigation.navigate('MarathonCategories');
  }, [navigation, state]);
  const selectTags = useCallback(() => {
    navigation.navigate('MarathonTags');
  }, []);
  const addImageToGallery = useCallback(() => {
    const selectedImages = state?.selectedGalleryImages;
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      let imagesList: Array<IGaleryImages> = [];
      images.map((item, index) => {
        let singleImage = {
          id: index + (selectedImages ? selectedImages.length : 0),
          image: item.path,
          format: item.mime,
        };
        imagesList.push(singleImage);
      });
      dispatchState &&
        dispatchState({
          type: 'SET_GALLERY_IMAGES',
          payload: state.selectedGalleryImages
            ? [...state.selectedGalleryImages, ...imagesList]
            : [...imagesList],
        });
    });
  }, [state.selectedGalleryImages]);
  const onInfoTextChange = useCallback((value: string) => {
    dispatchState && dispatchState({type: 'SET_MARATHON_INFO', payload: value});
  }, []);

  return {
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
    isVisibleTag,
    setIsVisibleTag,
    selectTags,
    deleteTagItem,
  };
};
