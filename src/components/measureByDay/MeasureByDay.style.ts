import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {borderGrey, formFieldGrey} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  bottomPart: {
    paddingVertical: calcHeight(20),
  },
  bottomPartItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelStyle: {
    ...EnCodeSans({size: 'form-field', weight: 'semibold'}),
    color: formFieldGrey,
    paddingVertical: calcHeight(8),
  },
  dayMeasureContainer: {
    borderBottomWidth: calcWidth(1),
    borderColor: borderGrey,
    width: '100%',
    paddingVertical: calcHeight(20),
  },
  dayMeasure: {
    paddingHorizontal: calcWidth(21),
  },
});

export default styles;
