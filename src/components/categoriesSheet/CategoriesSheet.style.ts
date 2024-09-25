import { Platform, StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/dimensions';
import { EnCodeSans } from '../../assets/styles/fonts.styles';
import { lightSteelBlue, primaryBlack, primaryBlue } from '../../assets/styles/colors.styles';

const styles = StyleSheet.create({
  scrollview: {
    width: '100%',
    height: Platform.OS == 'ios' ? calcHeight(270) : calcHeight(500),
    paddingBottom: Platform.OS == 'android' ? calcHeight(60) : calcHeight(20),
    paddingHorizontal: calcWidth(16),
  },
  containerStyle: {
    paddingBottom: Platform.OS == 'android' ? calcHeight(40) : calcHeight(20)
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: calcHeight(1)
  },
  titleText: {
    ...EnCodeSans({
      size: 'form-field',
      weight: 'semibold'
    }),
    color: primaryBlue
  },
  categoriesContainer: {
    paddingLeft: calcWidth(10),
  },
  contentItemContainer: {
    marginBottom: calcHeight(12)
  },
  categoryRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: calcHeight(4)
  },
  arrowIcon: {
    height: calcHeight(16),
    width: calcWidth(12),
    fill: lightSteelBlue
  },
  arrowIconSelected: {
    height: calcHeight(16),
    width: calcWidth(12),
    fill: primaryBlue
  },
  categoryName: {
    ...EnCodeSans({
      size: 'body',
      weight: 'regular',
    }),
    color: primaryBlack
  },
  checkIcon: {
    height: calcHeight(10),
    width: calcWidth(13),
    fill: primaryBlue
  }
});

export default styles;
