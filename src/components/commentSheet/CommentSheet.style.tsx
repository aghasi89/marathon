import { Platform, StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { primaryBlue } from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  scrollview: {
    width: '100%',
    height: Platform.OS == 'ios' ? calcHeight(270) : calcHeight(500),
    paddingBottom: Platform.OS == 'android' ? calcHeight(60) : calcHeight(20),
    marginTop: calcWidth(10),
    paddingHorizontal: calcHeight(10),
  },
  containerStyle: {
    paddingBottom: Platform.OS === 'ios' ? calcHeight(15) : calcHeight(50),
    justifyContent: 'space-between'
  },
  headerText: {
    textAlign: 'center',
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
    color: primaryBlue,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: calcHeight(15),
  },
  indicatorContainer: {
    marginTop: calcHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;
