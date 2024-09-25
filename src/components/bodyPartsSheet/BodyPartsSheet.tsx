import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import ActionSheet, { ActionSheetRef, SheetProps, useScrollHandlers } from 'react-native-actions-sheet';
import { IExercise } from '../../types/types';
import SelectMuscles from '../../screens/ExercisesStack/CreateExercise/Steps/ThirdStep/components/selectMuscles/SelectMuscles';
import { BodyParts } from '../../datas/bodyParts';
import { bodyPartsListSelector } from '../../store/selectors/feed-selector';
import styles from './BodyPartsSheet.style';

type Props = {
  selectedes: IExercise[],
  onSave: (value?: IExercise[]) => void;
};

const BodyPartsSheet = ({ sheetId, payload }: SheetProps<Props>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);
  const bodyPartsList = useSelector(bodyPartsListSelector);
  const [selectedBodyParts, setSelectedBodyParts] = useState(payload?.selectedes)

  const getDifference = (array1: any[], array2?: IExercise[]) => {
    if (array1.length > 0 && array2 && array2.length > 0) {
      return array1.filter(object1 => {
        return array2.some(object2 => {
          return object1.id === object2.id;
        });
      });
    } else {
      return []
    }
  }

  const selectAllBodyParts = useCallback(() => {
    if (selectedBodyParts && selectedBodyParts.length == 15) {
      setSelectedBodyParts([])
    } else {
      setSelectedBodyParts(bodyPartsList)
    }
  }, [selectedBodyParts, bodyPartsList])

  const handleChooseBodyParts = useCallback((data: IExercise) => {
    var newArr = selectedBodyParts ? [...selectedBodyParts] : []
    const index = newArr.findIndex(el => el.id === data?.id);
    if (index >= 0) {
      newArr.splice(index, 1);
    } else {
      newArr.push(data)
    }
    setSelectedBodyParts(newArr)
  }, [selectedBodyParts])

  return (
    <ActionSheet
      safeAreaInsets={{ bottom: 0, top: 0, left: 0, right: 0 }}
      id={sheetId}
      ref={actionSheetRef}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      containerStyle={styles.containerStyle}
      onClose={() => {
        payload?.onSave(selectedBodyParts)
      }}
      defaultOverlayOpacity={0.3}>
      <ScrollView {...scrollHandlers} nestedScrollEnabled style={styles.scrollview}>
        <View>
          <SelectMuscles
            showTitle={true}
            listHeight={true}
            selectedMuscles={selectedBodyParts ? selectedBodyParts : []}
            dataList={getDifference(BodyParts, selectedBodyParts)}
            onSelect={(data: IExercise) => {
              handleChooseBodyParts(data)
            }}
            selectAll={selectAllBodyParts}
            data={bodyPartsList} />
        </View>
      </ScrollView>
    </ActionSheet>
  );
};
export default BodyPartsSheet;
