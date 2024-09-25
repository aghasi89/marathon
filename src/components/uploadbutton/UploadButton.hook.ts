import { useCallback, useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Album,
  AssetType,
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import { CroppedData } from 'react-native-instagram-like-image-cropper';
import hasLibraryPermissions from '../../utils/hesPermissions/hasLibraryPermissions';
import getCameraPermission from '../../utils/hesPermissions/hasCameraPermissions';
import {
  setError,
  setLoadingAction,
} from '../../store/actions/administrative-action';
import { IError, IMediaSize, IUploadImage } from '../../types/types';
import { errorSelector } from '../../store/selectors/administrative-selector';
import { SheetManager } from 'react-native-actions-sheet';
import { DefaultTFuncReturn } from 'i18next';

export type UploadButtonProps = {
  goBackImage?: (value: IUploadImage[] | Promise<IUploadImage[]>, imageSelectedSize: IImageSize) => void;
  children?: React.ReactNode;
  fileButtonAvailability?: boolean;
  uploadMediaType?: AssetType | undefined;
  maxDuration?: number;
  rowElementsCount?: number;
  imageSizeType?: Array<IMediaSize | undefined>;
  showCropperSizeConfig?: boolean;
  maxMediaCount?: number;
  multiSelect?: boolean;
};
type IImageSize = '1:1' | '16:9' | '4:5';
enum CameraTypes {
  All = 'any',
  Videos = 'video',
  Photos = 'photo',
}
export default ({
  goBackImage,
  fileButtonAvailability = false,
  uploadMediaType = 'All',
  maxDuration,
  rowElementsCount = 4,
  imageSizeType = ['1:1', '16:9', '4:5'],
  showCropperSizeConfig = true,
  maxMediaCount = Infinity,
  multiSelect,
}: UploadButtonProps) => {
  const { t } = useTranslation();
  const pageSize = 100;
  const error = useSelector(errorSelector);
  const [photos, setPhotos] = useState<Array<PhotoIdentifier | string>>([
    'Camera',
  ]);
  const [albums, setAlbums] = useState<Album[]>([{count: 0, title: t("recents")}]);
  const [albumTitle, setAlbumTitle] = useState<string | DefaultTFuncReturn>(t("recents"));
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextCursor, setNextCursor] = useState<string>();
  const [isVideoPaused, setIsVideoPaused] = useState<boolean>(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);
  const [imageSelectedSize, setImageSelectedSize] = useState<IMediaSize>(
    (imageSizeType[0] || '1:1'),
  );
  const [selectedMedia, setSelectedMedia] = useState<
    PhotoIdentifier[] | undefined
  >();
  const [croppedUrl, setCroppedUrl] = useState<string | undefined>();
  const [isVisibleSwiper, setisVisibleSwiper] = useState<boolean>(false);
  const [loadingNextPage, setLoadingNextPage] = useState<boolean>();
  const dim = Dimensions.get('window');
  const dispatch = useDispatch();
  const cropperContainerSize = {
    height: dim.height * 0.5,
    width: dim.width,
  };
  const galleryImageSize =
    (dim.width - (rowElementsCount + 1) * 3) / rowElementsCount;
  const cropperImageSize = {
    '1:1': cropperContainerSize,
    '16:9': {
      ...cropperContainerSize,
      height: cropperContainerSize.height * 0.8,
    },
    '4:5': {
      ...cropperContainerSize,
      width: cropperContainerSize.height / 1.777778,
    },
  };

  useEffect(() => {
    if (!isVisibleSwiper) setPhotos(['Camera']);
  }, [isVisibleSwiper]);
  const imageSelectHandle = async (item: PhotoIdentifier | undefined) => {
    if (item) {
      if (Platform.OS === 'ios') {
        const path = await CameraRoll.iosGetImageDataById(item.node.image.uri);
        item.node.image.filepath = path.node.image.filepath ?? '';
      }
      if (
        maxDuration &&
        item?.node.type.startsWith('video') &&
        item?.node.image.playableDuration > maxDuration / 1000
      ) {
        const data: IError = {
          title: 'Something went wrong ...',
          text: t('videoErrorText'),
          buttonTitle: 'OK',
        };
        dispatch(setError(data));
        setSaveButtonDisabled(true);
        handleSetSelectedMedia(item);
      } else {
        setSaveButtonDisabled(false);
        handleSetSelectedMedia(item);
      }
      setIsVideoPaused(false);
      setCroppedUrl(undefined);
    }
  };

  const handleSetSelectedMedia = useCallback(
    (item: PhotoIdentifier | undefined) => {
      if (item) {
        setSelectedMedia(curr => {
          if (multiSelect) {
            if (item?.node.type.startsWith('video')) {
              return MultiselectVideoAddHandle(item, curr);
            }
            return MultiselectItemAddHandle(item, curr);
          } else {
            if (item?.node.type.startsWith('video')) {
              const size = calcVideoSize(item);
              setImageSelectedSize(size);
            }
            return [item];
          }
        });
      }
    },
    [maxMediaCount, selectedMedia, imageSelectedSize, imageSizeType],
  );
  const MultiselectItemAddHandle = (
    newItem: PhotoIdentifier,
    currentArray?: PhotoIdentifier[],
  ) => {
    let newSelectedList: PhotoIdentifier[] = [...(currentArray || [])];
    const index = newSelectedList.findIndex(
      el => el.node.image.uri === newItem?.node.image.uri,
    );
    if (index > -1) {
      newSelectedList.splice(index, 1);
    } else {
      if (newSelectedList.length < maxMediaCount) {
        newSelectedList.push(newItem || {});
      } else {
        const data = {
          title: t('maximumMediaCountReached'),
          text: `${t('youCanSelectMax')} ${maxMediaCount} ${t('mediaFiles')}`,
          buttonTitle: t('ok'),
        };
        dispatch(setError(data));
      }
    }
    return newSelectedList;
  };
  const MultiselectVideoAddHandle = (
    newItem: PhotoIdentifier,
    currentArray?: PhotoIdentifier[],
  ) => {
    const size = calcVideoSize(newItem);
    if (imageSizeType.includes(size)) {
      if (!(currentArray || [])?.length) {
        setImageSelectedSize(size);
        return MultiselectItemAddHandle(newItem, currentArray);
      } else if ((currentArray || [])?.length >= 1) {
        if (imageSelectedSize === size) {
          return MultiselectItemAddHandle(newItem, currentArray);
        } else {
          const data = {
            title: t('incorrectSize'),
            text: t('youCannotSelectDifferentSizeVideo'),
            buttonTitle: t('ok'),
          };
          dispatch(setError(data));
          return currentArray;
        }
      }
    } else {
      const data = {
        title: t('incorrectSize'),
        text: t('youCannotSelectVideoOfThatSizeInThisTypePublication'),
        buttonTitle: t('ok'),
      };
      dispatch(setError(data));
      return currentArray;
    }
  };
  const handleUploadButtonPress = async () => {
    hasLibraryPermissions(async hasPermission => {
      if (!hasPermission) {
        return;
      }
      await CameraRoll.getPhotos({
        first: pageSize,
        include: ['fileSize', 'playableDuration', 'imageSize'],
        assetType: uploadMediaType,
      }).then(r => {
        setPhotos(prev => [...prev, ...r.edges]);
        setNextCursor(r.page_info.end_cursor),
          setHasNextPage(r.page_info.has_next_page);
      });
      if(Platform.OS === "android") {
        await CameraRoll.getPhotos({
          first: 15000,
          include: ['fileSize', 'playableDuration', 'imageSize'],
          assetType: uploadMediaType,
        }).then(r => {
         const modified = [{ ...albums[0], count: r.edges.length }, ...albums.slice(1)];
         setAlbums(modified);
        });
        await CameraRoll.getAlbums({assetType: uploadMediaType}).then(r => {
          setAlbums(prev => [...prev, ...r]);
        });
      }
      setisVisibleSwiper(true);
    });
  };

  const handleOpenAlbums = useCallback(() => {
    SheetManager.show('albumsSheet', {
      payload: {
        data: albums,
        handleAlbumPress: handleAlbumPress
      },
    });
  },[albums]);

  const handleAlbumPress = async (albumTitle: string) => {
    setAlbumTitle(albumTitle);
    hasLibraryPermissions(async hasPermission => {
      if (!hasPermission) {
        return;
      }
      if(albumTitle !== t("recents")) {
        await CameraRoll.getPhotos({
          first: pageSize,
          include: ['fileSize', 'playableDuration', 'imageSize'],
          assetType: uploadMediaType,
          groupName: albumTitle,
        }).then(r => {
          setPhotos(['string', ...r.edges]);
          setNextCursor(r.page_info.end_cursor),
            setHasNextPage(r.page_info.has_next_page);
          SheetManager.hide('albumsSheet');
        });
      } else {
        await CameraRoll.getPhotos({
          first: pageSize,
          include: ['fileSize', 'playableDuration', 'imageSize'],
          assetType: uploadMediaType,
        }).then(r => {
          setPhotos(['string', ...r.edges]);
          setNextCursor(r.page_info.end_cursor),
            setHasNextPage(r.page_info.has_next_page);
            SheetManager.hide('albumsSheet');
        });
      }
    });
  };

  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
      results.forEach((item, index) => {
        if (item.name !== null && item.type !== null) {
          goBackImage &&
            goBackImage(
              [
                {
                  height: 0,
                  mime: item.type,
                  path: item.uri,
                  size: item.size ? item.size : 0,
                  width: 0,
                  modificationDate: `File ${index + 1}.pdf`,
                },
              ],
              imageSelectedSize,
            );
        }
      });
      setisVisibleSwiper(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from multiple doc picker');
      } else {
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const imageSizeSelectHandle = (size: '1:1' | '16:9' | '4:5') => {
    const data = {
      title: t('impossibleToResize'),
      buttonTitle: t('ok'),
      text: t('youCannotResizeMediaFile'),
    };
    if ((selectedMedia || [])?.length <= 1) setImageSelectedSize(size);
    else dispatch(setError(data));
  };
  const onScrollEndDrag = async ({
    distanceFromEnd,
  }: {
    distanceFromEnd: number;
  }) => {
    try {
      nextCursor && setLoadingNextPage(true);
      if (
        (Platform.OS === 'android' &&
          distanceFromEnd < 100 &&
          hasNextPage &&
          nextCursor &&
          photos &&
          photos?.length - 1 === parseInt(nextCursor)) ||
        (Platform.OS === 'ios' &&
          distanceFromEnd < 100 &&
          hasNextPage &&
          photos)
      ) {
        const { edges, page_info } = await CameraRoll.getPhotos({
          first: pageSize,
          include: ['fileSize', 'playableDuration', 'imageSize'],
          assetType: uploadMediaType,
          after: nextCursor,
        });
        setPhotos(prev => [...(prev ?? []), ...edges]);
        setHasNextPage(page_info.has_next_page);
        setNextCursor(page_info.end_cursor);
      }
    } catch (error) {
      console.log(error, '---------------------------------!!');
    } finally {
      setLoadingNextPage(false);
    }
  };
  const handleCroppeImage = useCallback((data: CroppedData) => {
    if (selectedMedia?.length) {
      if (Platform.OS === 'ios') selectedMedia[selectedMedia?.length - 1].node.image.filepath = data.croppedUri
      else selectedMedia[selectedMedia?.length - 1].node.image.uri = data.croppedUri
    }
  }, [selectedMedia]);
  const formatDuration = (time?: number) => {
    if (time) {
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60);
      return `${min > 0 ? (min < 10 ? `0${min}` : `${min}`) : '00'}:${sec > 0 ? (sec < 10 ? `0${sec}` : `${sec}`) : '00'
        }`;
    }
  };
  const handlePlayPauseVideo = () => {
    setIsVideoPaused(prev => !prev);
  };
  const backIconPressHandle = () => {
    setAlbums([{count: 0, title: t("recents")}]);
    setAlbumTitle(t("recents"));
    setSelectedMedia(undefined);
    setisVisibleSwiper(false);
  };
  const handleSave = async () => {
    if (selectedMedia) {
      const mediaArray = selectedMedia.map(el => {
        const { image, type } = el.node;
        return {
          height: image.height,
          mime: type,
          path: Platform.OS === 'ios' ? image.filepath || '' : image.uri,
          size: image.fileSize ?? 0,
          width: image.width,
          modificationDate: new Date().toDateString(),
        };
      });
      // const compressedVideos:any = []
      // for (let i = 0; i < mediaArray.length; i++) {
      //   const element = mediaArray[i];
      //   const file = await videoCompressor(element);
      //   compressedVideos.push(file)
      // }      
      // if(compressedVideos.length>0) {        
        goBackImage && goBackImage(mediaArray, imageSelectedSize);
        dispatch(setLoadingAction(true));
        setisVisibleSwiper(false);
      //  }
        //        goBackImage && goBackImage(mediaArray, imageSelectedSize);
        // dispatch(setLoadingAction(true));
        // setisVisibleSwiper(false);
    }
  };
  // const handleSave = async () => {
  //   if (selectedMedia) {
  //     const mediaArray = selectedMedia.map(el => {
  //       const { image, type } = el.node;
  //       return {
  //         height: image.height,
  //         mime: type,
  //         path: Platform.OS === 'ios' ? image.filepath || '' : image.uri,
  //         size: image.fileSize ?? 0,
  //         width: image.width,
  //         modificationDate: new Date().toDateString(),
  //       };
  //     });
  //     const compressedVideos:any = []
  //     for (let i = 0; i < mediaArray.length; i++) {
  //       const element = mediaArray[i];
  //       const file =   await videoCompressor(element);
  //       compressedVideos.push(file)
  //     }      
  //     if(compressedVideos.length>0) {        
  //       goBackImage && goBackImage(compressedVideos, imageSelectedSize);
  //       dispatch(setLoadingAction(true));
  //       setisVisibleSwiper(false);
  //      }
  //       //        goBackImage && goBackImage(mediaArray, imageSelectedSize);
  //       // dispatch(setLoadingAction(true));
  //       // setisVisibleSwiper(false);
  //   }
  // };
  const handleOpenCamera = () => {
    getCameraPermission(async hesPermissions => {
      if (!hesPermissions) {
        return;
      }
      await ImagePicker.openCamera({
        multiple: false,
        mediaType: CameraTypes[uploadMediaType],
      }).then(async res => {
        await CameraRoll.save(res.path, { type: 'auto' });
        await CameraRoll.getPhotos({
          first: 1,
          include: ['fileSize', 'playableDuration', 'imageSize'],
        }).then(r => {
          setPhotos(prev => [r.edges[0], ...(prev ?? [])]);
          imageSelectHandle(r.edges[0]);
        });
      });
    });
  };
  const calcVideoSize = useCallback((item: PhotoIdentifier): IImageSize => {
    const calcSize = item?.node.image.height / item?.node.image.width;
    if (calcSize > 1) {
      return '4:5';
    } else if (calcSize === 1) {
      return '1:1';
    } else {
      return '16:9';
    }
  }, []);
  const errorMessageCloseHandle = useCallback(() => {
    dispatch(setError(undefined));
  }, []);
  return {
    handleOpenAlbums,
    photos,
    albumTitle,
    imageSelectedSize,
    cropperContainerSize,
    selectedMedia,
    cropperImageSize,
    fileButtonAvailability,
    isVisibleSwiper,
    galleryImageSize,
    isVideoPaused,
    saveButtonDisabled,
    imageSizeType,
    t,
    imageSizeSelectHandle,
    handleCroppeImage,
    handleUploadButtonPress,
    selectMultipleFile,
    backIconPressHandle,
    handleOpenCamera,
    handleSave,
    handlePlayPauseVideo,
    formatDuration,
    onScrollEndDrag,
    imageSelectHandle,
    loadingNextPage,
    showCropperSizeConfig,
    uploadMediaType,
    error,
    errorMessageCloseHandle,
    multiSelect,
  };
};