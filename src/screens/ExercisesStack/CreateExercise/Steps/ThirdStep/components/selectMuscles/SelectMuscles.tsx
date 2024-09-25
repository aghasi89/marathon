import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { IExercise } from '../../../../../../../types/types';
import { PrimeryButton } from '../../../../../../../components/buttons';
import Icons from '../../../../../../../assets/icons/svg';
import { primaryGrey } from '../../../../../../../assets/styles/colors.styles';
import { calcHeight } from '../../../../../../../assets/dimensions';
import translationByCode from '../../../../../../../utils/translationByCode';
import { IData } from '../../ThirdStepScreen.hook';
import styles from './SelectMuscles.style';

interface IProps {
  data: IExercise[];
  onSelect?: (data: IExercise) => void;
  dataList: IData[];
  selectedMuscles: IExercise[];
  showTitle?: boolean;
  showSelectedMuscles?: boolean;
  isRightIcon?: boolean;
  disabled?: boolean;
  selectAll?: () => void;
  listHeight?: boolean;
}
const SelectMuscles: React.FC<IProps> = props => {
  const {
    data,
    onSelect,
    dataList,
    selectedMuscles,
    showTitle,
    showSelectedMuscles,
    isRightIcon,
    disabled,
    selectAll,
    listHeight,
  } = props;
  const { t } = useTranslation();

  return (
    <View
      style={styles.container}
      pointerEvents={disabled ? 'none' : undefined}>
      {showTitle && <Text style={styles.title}>{t('bodyParts')}</Text>}
      <View style={styles.center}>
        <Image
          style={[styles.image, { opacity: 0.5 }]}
          source={require('../../../../../../../assets/images/front11.png')}
        />
        {dataList.map((el: any, index: number) => {
          return (
            <Image style={[styles.image]} source={el.image} />
          );
        })}
      </View>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={[styles.musclesListContainer, listHeight && { height: calcHeight(300) }]}>
        <View style={styles.rowContainer}>
          {showSelectedMuscles
            ? data.map((el, index) => {
              return (
                <PrimeryButton
                  key={index + 66}
                  title={translationByCode(el)}
                  type="outline"
                  onPress={() => onSelect && onSelect(el)}
                  style={styles.outLineButton}
                  textStyle={styles.outLineButtonText}
                  rightIcon={isRightIcon && <Icons.Close fill={primaryGrey} />}
                />
              );
            })
            : <View style={styles.rowContainer}>
              <PrimeryButton
                title={t('fullBody') ?? ""}
                type={selectedMuscles.length == data.length ? "default" : 'outline'}
                onPress={() => selectAll && selectAll()}
                style={selectedMuscles.length == data.length ? styles.defaultButton : styles.outLineButton}
                textStyle={selectedMuscles.length != data.length ? styles.outLineButtonText : {}}
              />
              {data.map((el, index) => {
                if (selectedMuscles.includes(el)) {
                  return (
                    <PrimeryButton
                      key={index + 66}
                      title={translationByCode(el)}
                      type="default"
                      onPress={() => onSelect && onSelect(el)}
                      style={styles.defaultButton}
                    />
                  );
                } else {
                  return (
                    <PrimeryButton
                      title={translationByCode(el)}
                      type="outline"
                      onPress={() => onSelect && onSelect(el)}
                      style={styles.outLineButton}
                      textStyle={styles.outLineButtonText}
                    />
                  );
                }
              })
              }
            </View>
          }
        </View>
      </ScrollView>
    </View>
  );
};
export default SelectMuscles;
