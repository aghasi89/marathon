import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../../assets/dimensions';
import {
  formFieldGrey,
  primaryBlack,
  primaryWhite,
} from '../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  contentContainer: {
    paddingHorizontal: calcWidth(20),
    paddingBottom: calcHeight(15),
  },
  headerWithImageContainer: {
    height: calcHeight(350),
    width: '100%',
  },
  title: {
    ...EnCodeSans({
      weight: 'regular',
      size: 'body',
    }),
    color: formFieldGrey,
    marginLeft: calcWidth(10),
    marginBottom: calcHeight(5),
  },
  numberInputContainer: {
    width: calcWidth(85),
  },
  dropDownContainer: {
    width: calcWidth(200),
  },
  dropContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: calcHeight(27),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: calcHeight(17),
  },
  save: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'form-field',
    }),
    color: formFieldGrey,
    marginRight: calcWidth(15),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: calcHeight(50),
    alignItems: 'center',
  },
  text: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'body',
    }),
    color: primaryBlack,
    textAlign: 'center',
    marginBottom: calcHeight(8),
  },
  modalContent: {
    alignItems: 'center',
  },
  button: {
    height: calcHeight(55),
  },
  progressStyle: {
    height: calcHeight(52),
    width: calcHeight(52),
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: primaryBlack,
    marginTop: calcHeight(15),
    marginLeft: calcHeight(17),
  },
  imageContainer: {
    marginTop: calcHeight(18),
  },
  mealName: {
    marginVertical: calcHeight(50),
  },
  textWithIcon: {
    marginBottom: calcHeight(30),
  },
  calories: {
    marginTop: calcHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  caloriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  caloriesItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressItem: {
    marginHorizontal: calcWidth(6),
  },
  plusIcon: {
    marginRight: calcWidth(10),
  },
  selectedTags: {
    width: '100%',
    marginTop: calcHeight(30),
  },
  typeHere: {
    marginVertical: calcHeight(20),
  },
  mealContainer: {
    marginTop: calcHeight(31),
  },
  mealItem: {
    marginBottom: calcHeight(16),
  },
});
export default styles;
