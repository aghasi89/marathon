import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { lighBlack, primaryWhite } from '../../assets/styles/colors.styles';
import { borderStyle } from '../../assets/styles/global.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';

const styles = StyleSheet.create({
  modalConent: {
    ...borderStyle({
      size: 30,
      type: 'default',
    }),
    backgroundColor: primaryWhite,
    paddingVertical: calcHeight(30),
    paddingHorizontal: calcWidth(25),
  },
  buttonStyle: {
    paddingVertical: calcHeight(12),
  },
  secondButtonStyle: {
    paddingVertical: calcHeight(12),
    marginTop: calcHeight(20)
  },
  title: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
    color: lighBlack,
    textAlign: 'center',
  },
  text: {
    ...EnCodeSans({
      size: 'legal',
      weight: 'medium',
    }),
    color: lighBlack,
    textAlign: 'center',
    marginVertical: calcHeight(30)
  }
});
export default styles;
