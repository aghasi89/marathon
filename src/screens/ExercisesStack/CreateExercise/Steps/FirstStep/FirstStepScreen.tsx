import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import CoverComponent from '../../../../FeedStack/CreateFeed/components/CoverComponent/CoverComponent';
import SectionTitle from '../../../../FeedStack/CreateFeed/components/SectionTitle/SectionTitle';
import InputComponent from '../../../../FeedStack/CreateFeed/components/InputComponent/InputComponent';
import AddContentItemCard from '../../../../FeedStack/CreateFeed/components/AddContentItemCard/AddContentItemCard';
import { primaryBlue } from '../../../../../assets/styles/colors.styles';
import hook from './FirstStepScreen.hook';
import styles from './FirstStepScreen.style';

const FirstStepScreen: React.FC = () => {
  const {
    t,
    coverMediaUploadHandle,
    inputValueChangeHandle,
    coverCloseIconPressHandle,
    descriptionValueChangeHandle,
    state,
    uploading,
    changeDuration,
    data,
  } = hook();

  return (
    <View style={styles.container}>
      {uploading && (
        <Modal transparent>
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size={'large'} color={primaryBlue} />
          </View>
        </Modal>
      )}
      <CoverComponent
        getVideoDuration={changeDuration}
        multiSelect={false}
        media={data}
        hideYotoubeLinkInput={true}
        uploadMediaType="Videos"
        isInvalid={!!state?.errorMessages?.coverMedia?.length}
        onCloseIconPress={coverCloseIconPressHandle}
        goBackImage={coverMediaUploadHandle}
        onInputValueChange={() => {}}
        onSubmitEditing={() => {}}
        maxDuration={121725}
        containerStyle={styles.coverContainer}
      />
      <SectionTitle containerStyle={styles.sectionTitles} title={t('title')} />
      <InputComponent
        isInvalid={!!state.errorMessages?.title?.length}
        onChange={inputValueChangeHandle}
        value={state.title ?? ''}
        placeholder={t('typeTitleHere') ?? ''}
      />
      <AddContentItemCard
        inputValue={state.description}
        type="text"
        closeIconExist={false}
        title={t('information') ?? ''}
        containerStyle={styles.contextCardContainer}
        onChangeInputValue={descriptionValueChangeHandle}
      />
    </View>
  );
};
export default FirstStepScreen;
