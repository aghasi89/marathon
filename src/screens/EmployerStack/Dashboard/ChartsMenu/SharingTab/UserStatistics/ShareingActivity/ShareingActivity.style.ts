import {StyleSheet} from 'react-native';
import {
  backgroudWhiteShadeGray,
  borderGrey,
  primaryBlack,
  primaryBlue,
  primaryGrey,
  primaryWhite,
} from '../../../../../../../assets/styles/colors.styles';
import {EnCodeSans} from '../../../../../../../assets/styles/fonts.styles';
import {calcHeight, calcWidth} from '../../../../../../../assets/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryWhite,
  },
  leftCompomemtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: calcWidth(10),
  },
  contentContainer: {
    backgroundColor: backgroudWhiteShadeGray,
    shadowColor: primaryGrey,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 5,
  },
  titleContainer: {
    width: calcWidth(400),
    height: calcHeight(65),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: calcWidth(26),
    paddingRight: calcWidth(19),
  },
  titleText: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'headline',
    }),
    color: primaryBlack,
  },
  categoriesButtonsContainer: {
    flexDirection: 'row',
    marginHorizontal: calcWidth(6),
    marginBottom: calcHeight(8),
    marginTop: calcHeight(25),
  },
  button: {
    width: calcWidth(107),
    height: calcHeight(45),
    marginHorizontal: calcWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: calcWidth(1),
    borderColor: borderGrey,
    borderRadius: calcWidth(20),
  },
  buttonBackground: {
    backgroundColor: primaryBlue,
    color: primaryWhite,
  },
  buttonText: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'body',
    }),
    color: primaryBlack,
  },
  buttonText1: {
    ...EnCodeSans({
      weight: 'semibold',
      size: 'body',
    }),
    color: primaryWhite,
  },
  infoItemContainer: {
    borderBottomColor: borderGrey,
    borderBottomWidth: calcHeight(2),
  },
});

export default styles;
