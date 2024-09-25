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
    marginBottom: calcHeight(16),
  },
  modalContent: {
    alignItems: 'center',
  },
  button: {
    height: calcHeight(55),
    width: '45%',
  },
  addStep: {
    height: calcHeight(60),
  },
  imageContainer: {
    marginTop: calcHeight(18),
  },
  recipeName: {
    marginVertical: calcHeight(20),
  },
  mealContainer: {
    marginTop: calcHeight(31),
  },
  mealItem: {
    marginBottom: calcHeight(16),
  },

  caloriesContainer: {
    marginTop: calcHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  caloriesItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  multiSelect: {
    width: '60%',
    marginTop: calcHeight(23),
  },
  cookIcon: {
    marginBottom: calcHeight(37),
  },
  steps: {
    marginBottom: calcHeight(17),
  },
  plusIcon: {
    marginRight: calcWidth(10),
  },
  selectedCategories: {
    width: '100%',
    marginTop: calcHeight(30),
  },
  selectedTAgs: {
    width: '100%',
    marginTop: calcHeight(30),
  },
  typeHere: {
    marginVertical: calcHeight(20),
  },
});
export default styles;
