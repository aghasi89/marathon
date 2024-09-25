import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  backgroudLightGreen,
  formFieldGrey,
  primaryBlack,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  contentContainer: {
    paddingBottom: calcHeight(260),
  },
  leftComponentStyle: {
    marginLeft: -calcWidth(5),
  },
  iconStyle: {
    paddingHorizontal: calcWidth(15),
  },
  caloriesContainer: {
    width: '100%',
    height: calcHeight(80),
    marginTop: calcHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroudLightGreen,
    paddingHorizontal: calcWidth(20),
  },
  calories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  caloryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caloryCount: {
    marginHorizontal: calcWidth(6),
  },
  progressStyle: {
    height: calcHeight(37),
    width: calcWidth(37),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'body',
    }),
    color: primaryBlack,
    textAlign: 'center',
  },
  totalContainer: {
    height: calcHeight(60),
    backgroundColor: backgroudLightGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(20),
  },
  totalText: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'headline',
    }),
    color: primaryBlack,
  },
  totalKcal: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'form-field',
    }),
  },
  totalKcalContainer: {
    flexDirection: 'row',
    width: calcWidth(100),
    justifyContent: 'space-between',
  },
  mealContainer: {
    marginTop: calcHeight(31),
    marginHorizontal: calcWidth(10),
  },
  mealItem: {
    marginBottom: calcHeight(16),
  },
  kcalSizeStyle: {
    color: formFieldGrey,
  },
});

export default styles;
