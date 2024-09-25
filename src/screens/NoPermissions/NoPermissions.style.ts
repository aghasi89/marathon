import { StyleSheet } from 'react-native';
import { primaryBlack, primaryWhite } from '../../assets/styles/colors.styles';
import { calcHeight, calcWidth, } from '../../assets/dimensions';
import { EnCodeSans } from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  lable: {
    color: primaryBlack,
    ...EnCodeSans({
      size: 'body',
      weight: 'semibold',
    }),
    marginVertical: calcHeight(20),
    paddingHorizontal: calcWidth(20),
    textAlign: "center"
  },
  content: {
    alignItems: "center",
  }

});
export default styles;
