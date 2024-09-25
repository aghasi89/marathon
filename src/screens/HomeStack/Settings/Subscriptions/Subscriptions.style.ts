import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  formFieldGrey,
  primaryBlue,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  contentContainer: {
    paddingBottom: calcHeight(100),
  },
  touch: {
    height: calcHeight(60),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: calcWidth(23),
  },
  labelStyle: {
    ...EnCodeSans({size: 'form-field', weight: 'semibold'}),
    color: formFieldGrey,
  },
  activeLabelStyle: {
    ...EnCodeSans({size: 'form-field', weight: 'semibold'}),
    color: primaryBlue,
  },
  headerContainer: {
    borderBottomWidth: calcWidth(1),
    borderBottomColor: 'rgba( 0 , 0 , 0 , 0.05 )',
    borderTopWidth: calcWidth(1),
    borderTopColor: 'rgba( 0 , 0 , 0 , 0.05 )',
    height: calcHeight(60),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginVertical: calcHeight(14),
  },
});
export default styles;
