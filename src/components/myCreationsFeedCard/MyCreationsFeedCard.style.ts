import { StyleSheet } from 'react-native';
import {
  lightPeriwinkles,
  primaryBlack,
} from '../../assets/styles/colors.styles';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { calcHeight, calcWidth } from '../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    minHeight: calcHeight(220),
    borderRadius: calcHeight(20),
    overflow: 'hidden',
    shadowColor: primaryBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  traningInfoContainer: {
    marginHorizontal: calcWidth(16),
    marginBottom: calcHeight(15),
    marginTop: calcHeight(10),
  },
  buttonsGroupContainer: {
    marginHorizontal: calcWidth(16),
    marginBottom: calcHeight(15),
  },
  infoText: {
    ...EnCodeSans({
      size: 'little',
      weight: 'regular',
    }),
    color: primaryBlack,
    marginLeft: calcWidth(3),
  },
  icon: {
    width: calcWidth(16),
    height: calcHeight(16),
    fill: lightPeriwinkles,
  },
});

export default styles;
