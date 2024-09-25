import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {selectedFeedSelector} from '../../../../../store/selectors/feed-selector';
import {primaryWhite} from '../../../../../assets/styles/colors.styles';
import {PrimeryButton} from '../../../../../components/buttons';
import styles from './StepperButtons.style';

type Props = {
  onPress: (action: 'next' | 'previous') => void;
  disableNext?: boolean;
  disablePrevious?: boolean;
  disablePost?: boolean;
  postButtonShow: boolean;
  onPostButtonPress: () => void;
  stepperButtonsShow: boolean;
  isLoading?: boolean;
};

const StepperButtons: React.VFC<Props> = ({
  onPress,
  disableNext,
  disablePrevious,
  postButtonShow,
  onPostButtonPress,
  stepperButtonsShow = true,
  isLoading = false,
  disablePost
}) => {
  const {t} = useTranslation();
  const selectedFeed = useSelector(selectedFeedSelector);

  return (
    <View style={styles.container} pointerEvents={isLoading?'none':undefined}>
      {stepperButtonsShow && (
        <PrimeryButton
          type="outline"
          title={t('previous') ?? ''}
          onPress={() => onPress('previous')}
          textStyle={
            !disablePrevious
              ? styles.previousButtonText
              : styles.previousButtonTextDisabled
          }
          disable={disablePrevious||isLoading}
          style={
            !disablePrevious
              ? styles.previousButton
              : styles.previousButtonDisabled
          }
        />
      )}
      {postButtonShow ? (
        <PrimeryButton
          type="default"
          title={
            selectedFeed
              ? t('save') ?? ''
              : !isLoading
              ? t('post') ?? ''
              : undefined
          }
          onPress={onPostButtonPress}
          textStyle={styles.nextButtonText}
          disable={disablePost}
          style={styles.previousButton}
          Icon={
            isLoading && (
              <ActivityIndicator size={'small'} color={primaryWhite} />
            )
          }
        />
      ) : (
        stepperButtonsShow && (
          <PrimeryButton
            type="default"
            title={t('next') ?? ''}
            onPress={() => onPress('next')}
            textStyle={styles.nextButtonText}
            disable={disableNext}
            style={styles.previousButton}
          />
        )
      )}
    </View>
  );
};
export default StepperButtons;
