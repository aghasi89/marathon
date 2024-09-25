import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  primaryBlack,
  primaryWhite,
  inputBorder,
  borderGrey,
  primaryBlue,
  backgroudLightGrey,
} from '../../assets/styles/colors.styles';
import {EnCodeSans} from '../../assets/styles/fonts.styles';
import {borderStyle} from '../../assets/styles/global.styles';

const styles = StyleSheet.create({
  container: {
    ...borderStyle({size: 30, type: 'default'}),
    backgroundColor: primaryWhite,
    width: '100%',
  },
  touchText: {
    ...EnCodeSans({size: 'subtitle', weight: 'medium'}),
    color: primaryBlue,
  },
  connectedTouch: {
    height: calcHeight(60),
    borderBottomLeftRadius: calcHeight(30),
    borderBottomRightRadius: calcHeight(30),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopColor: borderGrey,
    borderTopWidth: calcHeight(1.5),
  },
  disConnectedTouch: {
    backgroundColor: backgroudLightGrey,
    height: calcHeight(58),
    borderBottomLeftRadius: calcHeight(30),
    borderBottomRightRadius: calcHeight(30),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: calcHeight(4),
  },
  messageTouch: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: calcHeight(60),
    width: calcHeight(60),
    borderRadius: calcHeight(60),
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: calcWidth(14),
    paddingVertical: calcHeight(10),
  },
  nameContainer: {
    justifyContent: 'center',
  },
  nameText: {
    ...EnCodeSans({size: 'form-field', weight: 'medium'}),
    color: primaryBlack,
    width: calcWidth(225),
    textAlign: 'left',
  },
  locationText: {
    ...EnCodeSans({size: 'legal', weight: 'regular'}),
    color: inputBorder,
    marginTop: calcHeight(6),
  },
  disSelectText: {
    ...EnCodeSans({size: 'subtitle', weight: 'medium'}),
    color: primaryBlack,
  },
  inPerson: {
    ...EnCodeSans({size: 'subtitle', weight: 'medium'}),
    color: inputBorder,
  },
  selectedButton: {
    height: calcHeight(30),
    width: calcHeight(30),
    borderRadius: calcHeight(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedStyle: {
    backgroundColor: primaryBlue,
  },
  disSelectedTouch: {
    borderColor: borderGrey,
    borderWidth: 1,
  },
  touch: {
    height: calcHeight(50),
    width: calcHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
