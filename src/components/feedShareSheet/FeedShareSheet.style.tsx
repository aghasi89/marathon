import {Platform, StyleSheet} from 'react-native';
import {calcHeight} from '../../assets/dimensions';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {primaryBlue} from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  scrollview: {
    width: '100%',
    height: Platform.OS == 'ios' ? calcHeight(270) : calcHeight(500),
    paddingBottom: Platform.OS == 'android' ? calcHeight(60) : calcHeight(20),
  },
  containerStyle: {
    paddingBottom: calcHeight(50),
  },
  headerText: {
    textAlign: 'center',
    ...EnCodeSans({
      size: 'form-field',
      weight: 'bold',
    }),
    color: primaryBlue,
    marginVertical: calcHeight(10),
  },
  followsContainer: {
    marginTop: calcHeight(10),
  },
  emptyText: {
    textAlign: 'center',
  },
  emptyContainer: {
    marginTop: calcHeight(50),
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: calcHeight(15),
  },
});

export default styles;
