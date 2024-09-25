import React, {useMemo} from 'react';
import {
  Pressable,
  View,
  Modal,
  Image,
  Text,
  ActivityIndicator,
  FlatList,
  Platform,
} from 'react-native';
import Player from 'react-native-video';
import InstagramLikeImageCropper from 'react-native-instagram-like-image-cropper';
import Icons from '../../assets/icons/svg/index';
import {
  lightPeriwinkles,
  primaryBlack,
  primaryBlue,
  primaryGrey,
} from '../../assets/styles/colors.styles';
import ErrorMessageModal from '../errorMessageModal/ErrorMessageModal';
import MediaListItem from './components/MediaListItem/MediaListItem';
import hook, {UploadButtonProps} from './UploadButton.hook';
import styles from './UploadButton.style';
import Toaster from '../toester/Toester';

const UpploadButton: React.FC<UploadButtonProps> = props => {
  const {
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
    showCropperSizeConfig,
    uploadMediaType,
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
    error,
    errorMessageCloseHandle,
    multiSelect,
  } = hook(props);
  const ImageSizeConfigs = {
    '1:1': {
      icon: (
        <View
          style={
            imageSelectedSize != '1:1'
              ? styles.sizeConfigIconBorder
              : styles.sizeConfigIconBorderSelected
          }>
          <View
            style={[
              styles.square,
              imageSelectedSize != '1:1'
                ? styles.sizeConfigIcon
                : styles.sizeConfigIconSelected,
            ]}></View>
        </View>
      ),
      onPress: () => {
        imageSizeSelectHandle('1:1');
      },
    },
    '16:9': {
      icon: (
        <View
          style={
            imageSelectedSize != '16:9'
              ? styles.sizeConfigIconBorder
              : styles.sizeConfigIconBorderSelected
          }>
          <View
            style={[
              styles.horizontalRectangle,
              imageSelectedSize != '16:9'
                ? styles.sizeConfigIcon
                : styles.sizeConfigIconSelected,
            ]}></View>
        </View>
      ),
      onPress: () => {
        imageSizeSelectHandle('16:9');
      },
    },
    '4:5': {
      icon: (
        <View
          style={
            imageSelectedSize != '4:5'
              ? styles.sizeConfigIconBorder
              : styles.sizeConfigIconBorderSelected
          }>
          <View
            style={[
              styles.verticalRectangle,
              imageSelectedSize != '4:5'
                ? styles.sizeConfigIcon
                : styles.sizeConfigIconSelected,
            ]}></View>
        </View>
      ),
      onPress: () => {
        imageSizeSelectHandle('4:5');
      },
    },
  };

  const Cropper = useMemo(() => {
    return selectedMedia ? (
      <InstagramLikeImageCropper
        onCropped={handleCroppeImage}
        height={cropperImageSize[imageSelectedSize].height}
        width={cropperImageSize[imageSelectedSize].width}
        image={{
          height:
            (selectedMedia[selectedMedia.length - 1] || undefined)?.node.image
              .height ?? 0,
          width:
            (selectedMedia[selectedMedia.length - 1] || undefined)?.node.image
              .width ?? 0,
          uri:
            (selectedMedia[selectedMedia.length - 1] || undefined)?.node.image
              .uri ?? '',
        }}
      />
    ) : null;
  }, [imageSelectedSize, selectedMedia]);
  return (
    <>
      <Pressable
        onPress={
          !fileButtonAvailability ? handleUploadButtonPress : selectMultipleFile
        }>
        {props.children ? props.children : <Icons.Edit fill={primaryBlack} />}
      </Pressable>
      <Modal visible={isVisibleSwiper} style={{zIndex: 5}}>
        <View style={styles.headerContainer}>
          <Pressable
            onPress={backIconPressHandle}
            style={styles.backIconTouchContainer}>
            <Icons.ArrowIcon fill={primaryGrey} />
          </Pressable>
          <Text style={styles.headerTitle}>{t('chooseMedia')}</Text>
          <Pressable
            disabled={saveButtonDisabled}
            onPress={handleSave}
            style={styles.saveButtonTouch}>
            <Text
              style={[
                styles.saveButtonText,
                {color: !saveButtonDisabled ? primaryBlue : lightPeriwinkles},
              ]}>
              {t('select')}
            </Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.cropperContainer,
            {
              height: cropperContainerSize.height,
              width: cropperContainerSize.width,
            },
          ]}>
          {selectedMedia?.length ? (
            !selectedMedia[selectedMedia.length - 1]?.node.type.startsWith(
              'video',
            ) ? (
              Cropper
            ) : (
              <Pressable onPress={handlePlayPauseVideo}>
                <Player
                  paused={isVideoPaused}
                  style={{
                    height: cropperImageSize[imageSelectedSize].height,
                    width: cropperImageSize[imageSelectedSize].width,
                  }}
                  resizeMode="cover"
                  posterResizeMode="cover"
                  poster={
                    selectedMedia[selectedMedia.length - 1]?.node.image.uri
                  }
                  source={{
                    uri:
                      Platform.OS === 'ios'
                        ? selectedMedia[selectedMedia.length - 1]?.node.image
                            .filepath ?? ''
                        : selectedMedia[selectedMedia.length - 1]?.node.image
                            .uri,
                  }}
                />
                {isVideoPaused && (
                  <View
                    style={[
                      styles.videoTouchContainer,
                      {
                        height: cropperImageSize[imageSelectedSize].height,
                        width: cropperImageSize[imageSelectedSize].width,
                      },
                    ]}>
                    <View style={styles.playIconContainer}>
                      <Icons.Play {...styles.playIcon} />
                    </View>
                  </View>
                )}
              </Pressable>
            )
          ) : (
            <Image
              style={{
                height: cropperContainerSize.height,
                width: cropperContainerSize.width,
              }}
              source={{
                uri: 'https://thenounproject.com/api/private/icons/4818782/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0',
              }}
            />
          )}
        </View>
        {showCropperSizeConfig ? (
          <View style={styles.imageConfigsContainer}>
            {(!selectedMedia?.length ||
              !!!selectedMedia[selectedMedia.length - 1]?.node.type.startsWith(
                'video',
              )) &&
            uploadMediaType !== 'Videos' ? (
              imageSizeType?.map((item, index) => {
                return item ? (
                  <Pressable
                    key={imageSizeType + 'index'}
                    style={styles.imageSizeSelectTouch}
                    onPress={ImageSizeConfigs[item].onPress}>
                    {ImageSizeConfigs[item].icon}
                  </Pressable>
                ) : null;
              })
            ) : (
              <View style={styles.imageConfigsEmptyView} />
            )}
          </View>
        ) : (
          <View style={styles.emptyViewForDefaultCropper} />
        )}
        {Platform.OS === 'android' && (
          <Pressable
            style={styles.openAlbumsContainer}
            onPress={handleOpenAlbums}>
            <Text style={styles.openAlbumsText}>{albumTitle}</Text>
            <Icons.ArrowDowm />
          </Pressable>
        )}
        <FlatList
          numColumns={4}
          columnWrapperStyle={styles.listContainer}
          keyExtractor={(item, index) =>
            typeof item === 'string'
              ? item
              : item.node.image.uri + index.toString()
          }
          onEndReached={onScrollEndDrag}
          data={photos ?? []}
          renderItem={({item, index}) => {
            return (
              <MediaListItem
                item={item}
                galleryImageSize={galleryImageSize}
                formatDuration={formatDuration}
                handleOpenCamera={handleOpenCamera}
                imageSelectHandle={imageSelectHandle}
                numberOfMember={
                  multiSelect && selectedMedia?.length
                    ? selectedMedia?.findIndex(
                        el =>
                          typeof item !== 'string' &&
                          el.node.image.uri === item.node.image.uri,
                      ) + 1
                    : undefined
                }
              />
            );
          }}
        />
        {loadingNextPage ? (
          <ActivityIndicator size={'large'} color={primaryBlue} />
        ) : null}
        <ErrorMessageModal
          isVisible={!!error}
          title={error?.title ?? ''}
          text={error?.text ?? ''}
          buttonTitle={error?.buttonTitle ?? ''}
          onClose={errorMessageCloseHandle}
        />
      </Modal>
    </>
  );
};
export default UpploadButton;