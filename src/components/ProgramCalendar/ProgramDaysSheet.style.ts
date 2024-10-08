import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  borderGrey,
  formFieldGrey,
  green,
  primaryBlue,
  primaryWhite,
} from '../../assets/styles/colors.styles';
import {borderStyle} from '../../assets/styles/global.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({size: 25, type: 'default'}),
    width: '100%',
    backgroundColor: primaryWhite,
  },
  listContainer: {
    justifyContent: 'space-between',
  },
  circles: {
    height: calcHeight(42),
    width: calcHeight(42),
    borderRadius: calcHeight(50),
    borderWidth: calcHeight(1),
    borderStyle: 'solid',
    borderColor: borderGrey,
    justifyContent: 'center',
    alignItems: 'center',
    margin: calcHeight(6),
  },
  circleDashed: {
    height: calcHeight(42),
    width: calcHeight(42),
    borderRadius: calcHeight(50),
    borderWidth: calcHeight(1),
    borderStyle: 'dashed',
    borderColor: borderGrey,
    justifyContent: 'center',
    alignItems: 'center',
    margin: calcHeight(6),
  },
  countText: {
    ...EnCodeSans({size: 'legal', weight: 'regular'}),
    color: formFieldGrey,
  },
  weekContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: calcHeight(10),
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toDoListItem: {
    height: calcHeight(7),
    width: calcHeight(7),
    borderRadius: calcHeight(50),
    borderWidth: calcWidth(2),
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: calcWidth(6),
    marginBottom: calcHeight(6),
    flexDirection: 'row',
    opacity: 1,
    backgroundColor: formFieldGrey,
    borderColor: formFieldGrey,
  },
  toDoListItemNutrition: {
    height: calcHeight(7),
    width: calcHeight(7),
    borderRadius: calcHeight(50),
    borderWidth: calcWidth(2),
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: calcWidth(6),
    marginBottom: calcHeight(6),
    flexDirection: 'row',
    opacity: 1,
    backgroundColor: green,
    borderColor: green,
  },
  toDoListItemWorkouts: {
    height: calcHeight(7),
    width: calcHeight(7),
    borderRadius: calcHeight(50),
    borderWidth: calcWidth(2),
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: calcWidth(6),
    marginBottom: calcHeight(6),
    flexDirection: 'row',
    opacity: 1,
    backgroundColor: primaryBlue,
    borderColor: primaryBlue,
  },
  toDoListContainer: {
    flexDirection: 'row',
    width: calcWidth(42),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
