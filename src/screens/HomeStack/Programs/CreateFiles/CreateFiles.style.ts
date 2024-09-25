import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../../assets/dimensions';
import {
  formFieldGrey,
  lightGray,
  primaryWhite,
} from '../../../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
    height: '100%',
  },
  iconStyle: {
    paddingHorizontal: calcWidth(15),
  },
  dayContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: calcWidth(10),
  },
  outlineButtonStyle: {
    width: '90%',
    height: calcHeight(55),
    borderStyle: 'dashed',
    borderWidth: calcWidth(2),
    marginVertical: calcHeight(23),
    borderColor: lightGray,
  },
  outlineButtonText: {
    color: formFieldGrey,
  },

  itemsContainer: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: calcHeight(60),
  },
  mealContainer: {
    marginTop: calcHeight(31),
  },
  mealItem: {
    marginBottom: calcHeight(16),
  },
  button: {
    alignItems: 'center',
  },
});
export default styles;
