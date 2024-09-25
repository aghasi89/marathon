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
  imageContainer: {
    marginTop: calcHeight(18),
  },
  headerWithImageContainer: {
    height: calcHeight(300),
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
  dayPlanName: {
    marginTop: calcHeight(50),
    marginBottom: calcHeight(30),
  },
  dayPlanNameInput: {
    marginBottom: calcHeight(10),
  },
  icon: {
    marginRight: calcWidth(10),
  },
  caloriesContainer: {
    marginTop: calcHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
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
  selectedTags: {
    width: '100%',
    marginTop: calcHeight(30),
  },
  typeHere: {
    marginVertical: calcHeight(20),
  },
  progressStyle: {
    height: calcHeight(52),
    width: calcWidth(52),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealContainer: {
    marginTop: calcHeight(31),
  },
  mealItem: {
    marginBottom: calcHeight(16),
  },
});
export default styles;
