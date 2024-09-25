import { StyleSheet } from 'react-native';
import { primaryBlack, workoutBlue } from '../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: calcWidth(8),
    paddingVertical: calcHeight(8),
    backgroundColor: workoutBlue,
    flex: 1,
  },
  title: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold'
    }),
    color: primaryBlack,
    marginVertical: calcHeight(8)
  },
  traningInfoContainer: {
    marginHorizontal: calcWidth(16),
    marginBottom: calcHeight(15),
    marginTop: calcHeight(10),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    ...EnCodeSans({
      size: 'little',
      weight: 'regular',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(3),
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: calcHeight(5)
  }
});
export default styles;
