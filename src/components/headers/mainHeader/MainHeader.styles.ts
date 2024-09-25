import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../../assets/dimensions';
import {
  formFieldGrey,
  primaryBlack,
  primaryWhite,
} from '../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../assets/styles/fonts.styles';
const styles = StyleSheet.create({
  container: {
    height: calcHeight(60),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingRight: calcWidth(15),
  },
  titleText: {
    ...EnCodeSans({size: 'headline', weight: 'semibold'}),
    color: primaryBlack,
    textAlign: 'left',
  },
  title: {
    ...EnCodeSans({size: 'body', weight: 'semibold'}),
    color: primaryBlack,
    textAlign: 'left',
  },
  titleCount: {
    ...EnCodeSans({size: 'little', weight: 'semibold'}),
    color: primaryBlack,
    textAlign: 'left',
  },
  arrowButton: {
    width: '15%',
    height: calcWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    backgroundColor: 'blue',
    position: 'absolute',
    right: 0,
    width: calcWidth(306),
    bottom: 0,
  },
  leftComponent: {
    width: '15%',
    height: calcHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  meddleComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75%',
  },
  middle: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: calcWidth(45),
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: calcWidth(16),
  },
  image: {
    height: calcHeight(22),
    width: calcHeight(22),
    borderRadius: calcHeight(60),
  },
});
export default styles;
