import { StyleSheet } from 'react-native';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from '../../../../../../../assets/styles/colors.styles';
import { EnCodeSans } from '../../../../../../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    shadowColor: primaryBlack,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
    backgroundColor: primaryWhite,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: calcWidth(24),
    borderRadius: calcHeight(15),
    minWidth: calcWidth(200),
    justifyContent: 'center'
  },
  buttonIcon: {
    height: calcHeight(16),
    width: calcWidth(16),
    marginRight: calcWidth(7),
    fill: primaryBlue,
  },
  buttonText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlue,
    marginVertical: calcHeight(8)
  },
  image: {
    resizeMode: 'cover',
    backgroundColor: primaryBlack
  },
});

export default styles;
