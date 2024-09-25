import React from 'react';
import { View } from 'react-native';
import SectionTitle from '../../../../FeedStack/CreateFeed/components/SectionTitle/SectionTitle';
import SliderComponent from '../../../../../components/sliderComponent/SliderComponent';
import hook from './SecondStepScreen.hook';
import styles from './SecondStepScreen.style';
import LevelSelectComponent from '../../../../FeedStack/CreateFeed/components/LevelSelectComponent/LevelSelectComponent';
import { formatTimeDuration } from '../../../../../utils/formatTimeDuration';

const SecondStepScreen: React.FC = () => {

  const {
    t,
    state,
    handleChangeDuration,
    levelSelectHandle
  } = hook();

  return (
    <View>
      <SectionTitle
        containerStyle={styles.sectionTitles}
        title={t('duration')}
      />
      <View style={styles.padding}>
        <SliderComponent
          sliderValue={state.duration}
          lable={t('exersiceDuration')}
          value={state.duration?.toString() ?? '0'}
          isInvalid={!!state?.errorMessages?.duration?.length}
          minCount={0}
          maxCount={120}
          progressCount={0}
          onValueChange={handleChangeDuration} />
      </View>
      <SectionTitle
        containerStyle={[styles.sectionTitles, styles.secondSection]}
        title={t('level')}
      />
      <View style={styles.padding}>
        <LevelSelectComponent
          onSelect={levelSelectHandle}
          selected={state.level}
        />
      </View>
    </View>
  );
};
export default SecondStepScreen;
