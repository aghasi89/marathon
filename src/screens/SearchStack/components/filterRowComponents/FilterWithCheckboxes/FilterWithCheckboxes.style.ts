import {StyleSheet} from 'react-native';
import {primaryBlue} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';
import {calcWidth} from '../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryBlue,
  },
  checkboxesList: {
    flexDirection: 'row',
  },
  checkboxesItem:{
    marginLeft:calcWidth(30)
  }
});

export default styles;
