import React from 'react';
import {ActivityIndicator, Modal, ScrollView, View} from 'react-native';
import {primaryBlue} from '../../../../../../assets/styles/colors.styles';
import Icons from '../../../../../../assets/icons/svg';
import SelectInputComponent from '../../../components/SelectInputComponent/SelectInputComponent';
import CreateAddCardButtons from '../../../components/CreateAddCardButtons/CreateAddCardButtons';
import LanguageSelectModal from '../../../components/LanguageSelectModal/LanguageSelectModal';
import AddContentItemCard from '../../../components/AddContentItemCard/AddContentItemCard';
import InputComponent from '../../../components/InputComponent/InputComponent';
import CoverComponent from '../../../components/CoverComponent/CoverComponent';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import hook from './FirstStepScreen.hook';
import styles from './FirstStepScreen.style';

const FirstStepScreen: React.FC = () => {
  const {
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
    languageModalVisibility,
    state,
    languages,
    uploading,
    data,
    contextMediaData,
    handleSetResponder,
    youtubeButtonDisabled,
    youtubeButtonValidateText,
    inputFocusHandle,
    scrollRef,
  } = hook();
  return (
    <View
      style={styles.container}
      //@ts-ignore
      onStartShouldSetResponder={handleSetResponder}>
      {/* {uploading && (
        <Modal transparent>
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size={'large'} color={primaryBlue} />
          </View>
        </Modal>
      )} */}
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        overScrollMode="never">
        <CoverComponent
          getVideoDuration={(duration: number) => durationValueHandle(duration)}
          youtubeButtonDisabled={youtubeButtonDisabled}
          youtubeButtonValidateText={youtubeButtonValidateText}
          uploadButtonText={
            state.workoutType === 'singleVideo'
              ? t('browseVideo') ?? ''
              : undefined
          }
          isInvalid={!!state?.errorMessages?.coverMedia?.length}
          uploadMediaType={
            state?.feedType === 'workout' && state.workoutType === 'singleVideo'
              ? 'Videos'
              : 'All'
          }
          media={data}
          imageSizeType={
            state?.feedType !== 'basic'
              ? !state.media?.length
                ? ['1:1', '16:9']
                : [state.media[0].size]
              : undefined
          }
          onCloseIconPress={coverCloseIconPressHandle}
          goBackImage={coverMediaUploadHandle}
          onSubmitEditing={coverInputSubmitEditingHandle}
          containerStyle={styles.coverContainer}
          multiSelect={state.workoutType !== 'singleVideo'}
          maxMediaCount={5}
          // uploadingProgress={state.uploadingProgress}
          // compressingProgress={state.compressingProgress}
        />
        {state.feedType !== 'basic' && (
          <>
            <SectionTitle
              containerStyle={styles.sectionTitles}
              title={t('title')}
            />
            <InputComponent
              isInvalid={!!state.errorMessages?.title?.length}
              onChange={inputValueChangeHandle}
              value={state.title ?? ''}
              placeholder={t('typeTitleHere') ?? ''}
            />
          </>
        )}
        {state.feedType !== 'package' &&
          state.feedType !== 'workout' &&
          state.feedType !== 'article' && (
            <>
              <SectionTitle
                containerStyle={styles.sectionTitles}
                title={t('description')}
              />
              <InputComponent
                onChange={descriptionValueChangeHandle}
                value={state.text ?? ''}
                placeholder={t('typeInformationHere') ?? ''}
                containerStyle={styles.descriptionInput}
                multiline={true}
                textAlignVertical="top"
                onFocus={e => {
                  inputFocusHandle(e.nativeEvent.target);
                }}
              />
            </>
          )}
        {state.feedType !== 'basic' && (
          <>
            {state.feedType !== 'live' &&
              state.feedType !== 'recipe' &&
              state.feedType !== 'workout' && (
                <View
                  style={state.feedType === 'article' && styles.contentCards}>
                  {state?.context?.map((item, index) => (
                    <AddContentItemCard
                      size={item.size}
                      inUploadingProcess={item.inProgress}
                      onVideoUpload={(media, size) =>
                        contextCArdVideoUploadHandle(media, index, size)
                      }
                      goBackImage={(image, size) =>
                        contextCardImageUploadHandle(image, index, size)
                      }
                      onChangeInputValue={text =>
                        contextCardTextInputValueChangeHandle(text, index)
                      }
                      onChangeVideoLink={link =>
                        contextCardVideoLinkChangeHandle(link, index)
                      }
                      onVideoLinkSubmit={() =>
                        contextCardVideoSubmitHandle(index)
                      }
                      onCloseIconPress={() => contextCardDeleteHandle(index)}
                      type={item.type}
                      imageUrl={
                        contextMediaData &&
                        contextMediaData[index].contextMediaUrl
                      }
                      videoId={
                        item.type === 'video'
                          ? contextMediaData &&
                            contextMediaData[index].contextMediaUrl
                          : item.value
                      }
                      youtubeButtonDisabled={youtubeButtonDisabled}
                      youtubeButtonValidateText={youtubeButtonValidateText}
                      inputValue={item.value} //?
                      videoLink={item.localLink} //?
                      key={index + (item?.type || '')?.toString()}
                      containerStyle={styles.contextCardContainer}
                      videoTumbnail={
                        contextMediaData &&
                        contextMediaData[index].contextMediaTumbnail
                      }
                      progress={item.uploadingProgress}
                    />
                  ))}
                  <CreateAddCardButtons
                    onPress={createContextCardHandle}
                    containerStyle={styles.createContextCatrdButtonsContainer}
                  />
                </View>
              )}
            {state.feedType === 'workout' && (
              <AddContentItemCard
                type="text"
                closeIconExist={false}
                title={t('information') ?? ''}
                inputValue={state.text}
                containerStyle={styles.contextCardContainer}
                onChangeInputValue={descriptionValueChangeHandle}
              />
            )}
            <SectionTitle
              containerStyle={styles.sectionTitles}
              title={t('categoryAndLanguage')}
            />
            <SelectInputComponent
              buttonIcon={<Icons.Plus {...styles.selectInputIconStyle} />}
              isInvalid={!!state.errorMessages?.category?.length}
              onButtonPress={categorySelectButtonPressHandle}
              disabled
              placeholder={t('categories') ?? ''}
              value={
                state.feedType !== 'recipe'
                  ? 
                  state?.selectedCategories && state?.selectedCategories.length && 
                    'feed_type' in state?.selectedCategories?.[0]
                    ? state?.selectedCategories?.[0]?.name
                    : 
                    state?.selectedCategories &&
                      state?.selectedCategories[0]?.category &&
                      state?.selectedCategories[0]?.category[0]?.name
                  : state?.selectedCategories
                      ?.map(
                        el => `${el?.category ? el?.category[0]?.name : ''}`,
                      )
                      .join(', ')
              } //?
              conatienStyle={styles.selectInputContainer}
            />
            <SelectInputComponent
              buttonIcon={<Icons.Plus {...styles.selectInputIconStyle} />}
              onButtonPress={languageSelectButtonPressHandle}
              isInvalid={!!state.errorMessages?.language?.length}
              disabled
              placeholder={t('languages') ?? ''}
              value={languages?.find(el => el.id === state.language)?.name}
              conatienStyle={styles.selectInputContainer}
            />
            <LanguageSelectModal
              isVisible={languageModalVisibility}
              onClose={languageModalCloseHandle}
              onSelect={languageSelectHandle}
              languageList={languages ?? []}
              selected={state.language}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};
export default FirstStepScreen;
