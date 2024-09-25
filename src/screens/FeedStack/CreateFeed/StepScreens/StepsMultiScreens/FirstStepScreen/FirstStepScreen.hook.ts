import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {GestureResponderEvent} from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {SheetManager} from 'react-native-actions-sheet';
import {loadingSelector} from '../../../../../../store/selectors/administrative-selector';
import {categoriesListSelector} from '../../../../../../store/selectors/feed-selector';
import {
  languagesSelector,
  profileSelector,
} from '../../../../../../store/selectors/profile-selector';
import {
  setCategoriesListAction,
  setLanguageAction,
  setContextAction,
  setErrorMessageAction,
  setMediaAction,
  setTitleAction,
  setSelectedCategoriesAction,
  setDescriptionAction,
  uploadMediaForFeedCreatingAction,
  setDurationAction,
  setVideoUploadingProgressAction,
  setVideoCompressingProgressAction,
} from '../../../../../../store/actions/createFeed-action';
import {
  IFeedCategoryItem,
  IFeedMediaItem,
  ILanguageItem,
  IMediaSize,
  IUploadImage,
} from '../../../../../../types/types';
import {downloadMediaFromBunny} from '../../../../../../utils/bunny.net';
import useEditerKeyboard from '../../../../../../context/useEditerKeyboard';
import {getData} from '../../../../../../utils/local_storage';
import {createFeedStateSelector} from '../../../../../../store/selectors/create-feed-selector';
import Clipboard from '@react-native-clipboard/clipboard';
import videoCompressor from '../../../../../../utils/feedVideoCompressor';

export default () => {
  const {t} = useTranslation();
  const state = useSelector(createFeedStateSelector);
  const dispatch = useDispatch();
  const uploading = useSelector(loadingSelector);
  const languages = useSelector(languagesSelector);
  const categoriesList = useSelector(categoriesListSelector);
  const user = useSelector(profileSelector);
  const appState = useRef(AppState.currentState);
  const [youtubeButtonDisabled, setYoutubeButtonDisabled] = useState(true);
  const [youtubeButtonValidateText, setYoutubeButtonValidateText] =
    useState('');
  const [youtubeLink, setYotubeLink] = useState<string>('');
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [languageModalVisibility, setLanguageModalVisibility] =
    useState<boolean>(false);
  const [_, setActiveTarget] = useState<number | undefined>();
  const {close} = useEditerKeyboard();
  const scrollRef = useRef<any>();
  useEffect(() => {
    getData('selectedLanguage').then(language => {
      if (language && !state.language) {
        dispatch(setLanguageAction(language.id));
      }
    });
  }, [state.language]);

  useEffect(() => {
    // state.selectedCategories?.length === 0 &&
    categoriesList && 
      dispatch(setCategoriesListAction([...categoriesList]));
  }, [categoriesList]);

  const coverMediaUploadHandle = useCallback(
    async (mediaList: IUploadImage[], size: IMediaSize) => {
      const compressedVideos: IUploadImage[] = [];
      for (let i = 0; i < mediaList.length; i++) {
        const element = mediaList[i];
        const file = await videoCompressor(element);
          compressedVideos.push(file as IUploadImage);
      }
      if (compressedVideos.length > 0) {
        dispatch(
          uploadMediaForFeedCreatingAction({
            mediaList:compressedVideos,
            size,
            mediaFor: 'media',
            feedId: state?.feed_id || 0,
            isEditing: state.isEditing,
            feedType: state.feedType,
          }),
        );
      }
    },
    [state, user],
  );
  const cacheReader = useCallback(async () => {
    const text = await Clipboard.getString();
    if (text) {
      if (
        text.match(
          /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/,
        ) && !text.includes("shorts")
      ) {
        setYoutubeButtonDisabled(false);
        setYoutubeButtonValidateText('Your link is valid, you can past here');
        setYotubeLink(text);
        // dispatch(setMediaAction([{ type:'videoLink',url: text, size: '16:9' }]))
      } else if (text.includes("shorts")) {
        setYoutubeButtonDisabled(true);
        setYoutubeButtonValidateText(`You can't paste a short(video) link`);
      } else {
        setYoutubeButtonDisabled(true);
        setYoutubeButtonValidateText('It is not youtube link');
      }
    } else {
      setYoutubeButtonDisabled(true);
      setYoutubeButtonValidateText('You dont have copied link yet');
    }
  }, [appStateVisible]);

  useEffect(() => {
    cacheReader();
  }, [appStateVisible]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const coverInputSubmitEditingHandle = useCallback(() => {
    let urlArr: string[] = [];
    let newUrl: string = '';
    if (youtubeLink) {
      const isLinkFromMobaileDevice =
        youtubeLink.split('youtu.be').length > 1 ? true : false;
      if (isLinkFromMobaileDevice) {
        urlArr = youtubeLink.split('/');
        newUrl = urlArr[urlArr.length - 1].split('?')[0];
      } else {
        urlArr = youtubeLink.split('?v=');
        newUrl = urlArr[urlArr.length - 1];
      }
      dispatch(setErrorMessageAction({...state.errorMessages, coverMedia: ''}));
      dispatch(
        setMediaAction([
          {
            type: 'videoLink',
            localLink: youtubeLink,
            url: newUrl,
            size: '16:9',
          },
        ]),
      );
    }
  }, [youtubeLink, state]);
  const coverCloseIconPressHandle = useCallback(
    (index: number) => {
      const newCoverList = [...(state.media || [])];
      newCoverList.splice(index, 1);
      dispatch(setMediaAction(newCoverList));
      dispatch(setVideoUploadingProgressAction(undefined));
      dispatch(setVideoCompressingProgressAction(undefined));
    },
    [state],
  );
  const inputValueChangeHandle = useCallback(
    (text: string) => {
      dispatch(setTitleAction(text));
      if (text.trim().length > 0)
        dispatch(setErrorMessageAction({...state.errorMessages, title: ''}));
    },
    [state],
  );
  const contextCardImageUploadHandle = useCallback(
    (mediaList: IUploadImage[], contextIndex: number, size: IMediaSize) => {
      dispatch(
        uploadMediaForFeedCreatingAction({
          mediaList,
          size,
          mediaFor: 'context',
          feedId: state?.feed_id || 0,
          isEditing: state.isEditing,
          feedType: state.feedType,
          contextIndex,
        }),
      );
    },
    [state],
  );
  const contextCardTextInputValueChangeHandle = useCallback(
    (text: string, index: number) => {
      const newContext = state.context ? [...state.context] : [];
      newContext.splice(index, 1, {type: 'text', value: text, size: '1:1'});
      dispatch(setContextAction(newContext));
    },
    [state],
  );
  const contextCArdVideoUploadHandle = useCallback(
    (mediaList: IUploadImage[], contextIndex: number, size?: IMediaSize) => {
      size &&
        dispatch(
          uploadMediaForFeedCreatingAction({
            mediaList,
            size,
            mediaFor: 'context',
            feedId: state?.feed_id || 0,
            isEditing: state.isEditing,
            feedType: state.feedType,
            contextIndex,
          }),
        );
    },

    [state],
  );
  const contextCardVideoLinkChangeHandle = useCallback(
    (link: string, index: number) => {
      const newContext = state.context ? [...state.context] : [];
      state.context &&
        newContext.splice(index, 1, {
          type: 'videoLink',
          localLink: link,
          size: '16:9',
        });
      dispatch(setContextAction(newContext));
    },
    [state],
  );
  const contextCardVideoSubmitHandle = useCallback(
    (index: number) => {
      let newContext = [...(state.context || [])];
      let urlArr: string[] = [];
      let newUrl: string = '';
      if (youtubeLink) {
        const isLinkFromMobaileDevice =
          youtubeLink.split('youtu.be').length > 1 ? true : false;
        if (isLinkFromMobaileDevice) {
          urlArr = youtubeLink.split('/');
          newUrl = urlArr[urlArr.length - 1].split('?')[0];
        } else {
          urlArr = youtubeLink.split('?v=');
          newUrl = urlArr[urlArr.length - 1];
        }
        newContext.splice(index, 1, {
          type: 'videoLink',
          localLink: youtubeLink,
          value: newUrl,
          size: '16:9',
        });
        dispatch(
          setErrorMessageAction({...state.errorMessages, coverMedia: ''}),
        );
        dispatch(setContextAction(newContext));
      }
    },
    [state, youtubeLink],
  );
  const contextCardDeleteHandle = useCallback(
    (index: number) => {
      const newList = state.context ? [...state.context] : [];
      newList.splice(index, 1);
      dispatch(setContextAction([...newList]));
    },
    [state],
  );
  const createContextCardHandle = useCallback(
    (type: 'text' | 'video' | 'image') => {
      state.context &&
        dispatch(
          setContextAction([
            ...state.context,
            {type, value: undefined, size: '16:9'},
          ]),
        );
    },
    [state],
  );
  const categorySelectButtonPressHandle = useCallback(() => {    
    SheetManager.show('categoriesSheet', {
      payload: {
        dataList: state.categoriesList,
        selected: state.selectedCategories,
        feedType: state.feedType,
        onSave: (selectedCategories: IFeedCategoryItem[]) => {
          // console.log(selectedCategories[0].category, "LLLLLLLLLLL");
          
          dispatch(setSelectedCategoriesAction(selectedCategories));
        },
      },
    });
  }, [state]);
  // console.log(state?.selectedCategories, "SSSSSSSS");
  
  const languageSelectButtonPressHandle = useCallback(() => {
    setLanguageModalVisibility(true);
  }, []);
  const languageModalCloseHandle = useCallback(() => {
    setLanguageModalVisibility(false);
  }, []);
  const languageSelectHandle = useCallback(
    (language: ILanguageItem) => {
      dispatch(setLanguageAction(language.id));
      dispatch(setErrorMessageAction({...state.errorMessages, language: ''}));
      setLanguageModalVisibility(false);
    },
    [state],
  );
  const descriptionValueChangeHandle = useCallback(
    (text: string) => {
      dispatch(setDescriptionAction(text));
    },
    [state],
  );
  const durationValueHandle = useCallback((duration: number) => {
    dispatch(setDurationAction(duration));
  }, []);
  const data = useMemo(() => {
    const newList: IFeedMediaItem[] = (state?.media || [])?.map(item => {
      const coverMedia = downloadMediaFromBunny({
        public_key: item.url,
        mediaType: item.type,
        aspectRatio: item.size,
        userDir: user?.id,
        imageDir: 'feed',
      });
      return {
        url:
          item?.type !== 'videoLink'
            ? !item?.inProgress
              ? coverMedia?.url
              : ''
            : item?.url,
        thumbnail: !item?.inProgress ? coverMedia?.thumbnailURL : item.url,
        animationURL: !item?.inProgress ? coverMedia?.previewAnimationURL : '',
        size: item.size,
        type: item.type,
        uploadingProgress: item.uploadingProgress,
        inProgress: item.inProgress,
      };
    });
    (newList || [])?.length &&
      newList?.push({
        url: '',
        thumbnail: '',
        type: 'text',
        size: newList[0].size,
        inProgress: true,
      });
    return newList;
  }, [state.media?.length, state.media, user]);

  const contextMediaData = useMemo(() => {
    const contextMediaList = state?.context?.map(media => {
      const contextMedia = downloadMediaFromBunny({
        public_key: media.value,
        mediaType: media.type,
        aspectRatio: media.size,
        userDir: user?.id,
        imageDir: 'feed',
      });
      return {
        contextMediaUrl:
          media.type === 'video'
            ? !media?.inProgress && !!contextMedia?.url?.length
              ? contextMedia?.url
              : ''
            : media.type === 'image'
            ? contextMedia?.url
            : media.value,
        contextMediaTumbnail: !media?.inProgress
          ? contextMedia?.thumbnailURL
          : '',
        contextMediaPreviewAnimationURL: !media?.inProgress
          ? contextMedia?.previewAnimationURL
          : '',
      };
    });
    return contextMediaList;
  }, [state.context]);
  const handleSetResponder = ({nativeEvent}: GestureResponderEvent) => {
    setActiveTarget(prev => {
      if (prev === nativeEvent.target) {
        return prev;
      } else {
        close();
        return nativeEvent.target;
      }
    });
  };

  const inputFocusHandle = useCallback(
    (index: number) => {
      if (scrollRef && scrollRef.current) {
        setTimeout(() => {
          scrollRef.current?.scrollTo({
            y: index,
            animated: true,
          });
        }, 100);
      }
    },
    [scrollRef.current],
  );

  return {
    t,
    durationValueHandle,
    coverMediaUploadHandle,
    coverInputSubmitEditingHandle,
    inputValueChangeHandle,
    contextCardImageUploadHandle,
    contextCardTextInputValueChangeHandle,
    contextCardVideoLinkChangeHandle,
    contextCardVideoSubmitHandle,
    contextCardDeleteHandle,
    createContextCardHandle,
    categorySelectButtonPressHandle,
    languageSelectButtonPressHandle,
    contextCArdVideoUploadHandle,
    languageModalCloseHandle,
    languageSelectHandle,
    descriptionValueChangeHandle,
    coverCloseIconPressHandle,
    handleSetResponder,
    languageModalVisibility,
    state,
    languages,
    categoriesList,
    uploading,
    data,
    contextMediaData,
    youtubeButtonDisabled,
    youtubeButtonValidateText,
    inputFocusHandle,
    scrollRef,
  };
};
