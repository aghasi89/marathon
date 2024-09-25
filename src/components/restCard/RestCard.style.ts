import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  formFieldGrey,
  primaryBlack,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({
      size: 25,
      type: 'default',
    }),
    backgroundColor: primaryWhite,
    width: '100%',
  },
  rowContainer: {
    paddingHorizontal: calcWidth(20),
    paddingVertical: calcHeight(14),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  topRowContainer: {
    flexDirection: 'row',
    paddingLeft: calcWidth(23),
    paddingRight: calcWidth(13),
    paddingVertical: calcHeight(13),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: calcWidth(0.8),
    borderBottomColor: 'rgba( 0 , 0 , 0 , 0.05 )',
  },
  textTitle: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  textTime: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    color: formFieldGrey,
  },

  close: {
    paddingLeft: calcWidth(27),
  },
});
export default styles;
