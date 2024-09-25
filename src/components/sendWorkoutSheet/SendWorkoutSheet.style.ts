import { Platform, StyleSheet } from 'react-native';
import { calcHeight, calcWidth, } from '../../assets/dimensions';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { primaryBlue, primaryWhite } from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  scrollview: {
    width: '100%',
    height: Platform.OS == 'ios' ? calcHeight(270) : calcHeight(500),
    paddingBottom: Platform.OS == 'android' ? calcHeight(60) : calcHeight(20),
  },
  workoutHeader: {
    alignSelf: 'center',
    ...EnCodeSans({ size: 'form-field', weight: 'bold' }),
    color: primaryBlue,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  containerStyle: {
    paddingBottom: calcHeight(50),
  },
  createButton: {
    width: calcWidth(60),
    height: calcWidth(60),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: calcWidth(16),
    bottom: calcHeight(80),
    borderWidth: calcHeight(2.5),
    borderColor: primaryBlue,
    borderRadius: calcHeight(60),
    backgroundColor: primaryWhite
  },
  plusIcon: {
    height: calcHeight(20),
    width: calcHeight(20),
    fill: primaryBlue
  },
});

export default styles;
