import { StyleSheet } from 'react-native';
import { primaryBlack, primaryBlue } from '../../../assets/styles/colors.styles';
import { calcHeight, calcWidth } from '../../../assets/dimensions';
import { EnCodeSans } from '../../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(10),
    alignItems: 'center',
    marginTop: calcHeight(10)
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  textRowContainer: {
    flexDirection: 'row',
    marginRight: calcWidth(35),
    alignItems: 'center',
  },
  image: {
    height: calcHeight(42),
    width: calcHeight(42),
    borderRadius: calcHeight(21),
    alignItems: "center",
    justifyContent: "center"
  },
  textName: {
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    color: primaryBlack,
  },
  textDate: {
    ...EnCodeSans({
      size: 'little',
      weight: 'medium',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(10),
  },
  textContainer: {
    paddingLeft: calcWidth(17),
    flex: 1
  },
  text: {
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'medium',
    }),
    color: primaryBlack,
    maxWidth: '90%',
  },
  icon: {
    marginTop: calcHeight(20),
    height: calcHeight(11),
    width: calcWidth(11),
    borderRadius: calcHeight(5),
    backgroundColor: primaryBlue,
  },
  feedContainer: {
    height: calcHeight(40),
    width: calcWidth(40),
    borderRadius: calcHeight(4),
  }
});
export default styles;
