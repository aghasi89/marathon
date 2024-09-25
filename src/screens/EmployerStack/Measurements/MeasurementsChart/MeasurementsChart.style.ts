import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  primaryBlack,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  leftComponentStyle: {
    paddingRight: calcWidth(25),
  },
  goalConatiner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: calcWidth(20),
  },
  inVisibleGoal: {
    height: calcHeight(33),
  },
  title: {
    ...EnCodeSans({size: 'form-field', weight: 'semibold'}),
    color: primaryBlack,
  },
  tabContainer: {
    marginTop: calcHeight(10),
  },
});

export default styles;
