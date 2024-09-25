import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  formFieldGrey,
  primaryBlack,
  backgroundBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryWhite,
    padding: calcHeight(4),
    alignItems: 'center',
  },
  dateStyles: {
    alignItems: 'center',
    marginVertical: calcHeight(5),
  },
  dayText: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'medium',
    }),
    color: primaryBlack,
  },
  monthText: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'medium',
    }),
    color: formFieldGrey,
  },
  addButton: {
    height: calcHeight(60),
    width: calcWidth(68),
    backgroundColor: backgroundBlue,
    borderBottomRightRadius: calcHeight(20),
    borderBottomStartRadius: calcHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  types: {
    borderRadius: calcHeight(55),
    borderColor: backgroundBlue,
    borderWidth: calcHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: calcHeight(5),
    padding: calcHeight(20),
    height: calcHeight(70),
    width: calcHeight(70),
  },
  touch: {},
  icon: {
    backgroundColor: primaryWhite,
    position: 'absolute',
    right: 0,
    zIndex: 1,
    padding: calcHeight(2),
    borderRadius: calcHeight(22),
  },
});
export default styles;
