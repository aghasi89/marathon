import * as React from 'react';
import {Text, View, FlatList, KeyboardAvoidingView} from 'react-native';
import CustomSwitchWithInput from '../../../CreateFeed/components/CustomSwitchWithInput/CustomSwitchWithInput';
import SectionTitle from '../../../CreateFeed/components/SectionTitle/SectionTitle';
import hook from './MeasurmentQuestions.hook';
import styles from './MeasurmentQuestions.style';

const MeasurmentQuestions: React.FC = () => {
  const {t, inputValueChangeHandle, state, listRef} = hook();
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{flexGrow: 1}}>
        <FlatList
          ref={listRef}
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={{paddingBottom: 70}}
          data={state.measurments}
          ListHeaderComponent={() => (
            <SectionTitle
              containerStyle={styles.sectionTitles}
              title={t('measurments')}
            />
          )}
          keyExtractor={(item, index) =>item.text+ index.toString()}
          renderItem={({item, index}) => (
            <CustomSwitchWithInput
              containerStyle={styles.itemContainer}
              titleStyle={styles.text}
              switchShow={false}
              inputType="number-pad"
              inputValue={item?.measurement_answer?.answer ?? ''}
              onChangeValue={text => inputValueChangeHandle(text, item)}
              title={item.name_en ?? ''}
              inputRightIcon={
                <Text style={styles.text}>
                  {item.unit_of_measurement?.name_en}
                </Text>
              }
            />
          )}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
export default MeasurmentQuestions;
