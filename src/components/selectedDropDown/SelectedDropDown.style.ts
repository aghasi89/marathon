import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { lightSteelBlue, primaryBlack, primaryBlue } from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    ...EnCodeSans({
      size: 'form-field',
      weight: 'semibold',
    }),
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: calcHeight(40),
    paddingHorizontal: calcWidth(16),
    paddingVertical: calcHeight(10),
    borderColor: primaryBlue,
    borderWidth: 2,
    borderRadius: calcWidth(28)
  },
  value: {
    marginLeft: calcWidth(16),
    ...EnCodeSans({
      size: 'subtitle',
      weight: 'medium',
    }),
    color: primaryBlack
  },
  flag: {
    width: calcWidth(25),
    height: calcWidth(25),
    borderRadius: calcWidth(25)
  },
  leftPart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  altImage: {
    height: calcHeight(20),
    width: calcWidth(20),
    fill: lightSteelBlue,
    marginTop: calcHeight(3)
  }
});
export default styles;
