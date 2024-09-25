import {StyleSheet} from 'react-native';
import {calcHeight, calcWidth} from '../../assets/dimensions';
import {
  primaryBlack,
  primaryWhite,
  borderGrey,
  formFieldGrey,
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
    color: formFieldGrey,
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

  messageTouch: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: calcHeight(22),
    width: calcHeight(22),
    borderRadius: calcHeight(60),
  },
  imageContainer: {
    width: calcWidth(45),
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  countText: {
    ...EnCodeSans({size: 'legal', weight: 'medium'}),
    color: formFieldGrey,
    width: calcWidth(225),
    textAlign: 'left',
  },
  greyTitleText: {
    ...EnCodeSans({
      size: 'body',
      weight: 'medium',
    }),
    color: formFieldGrey,
  },
  marginTag: {
    marginHorizontal: calcWidth(11),
  },
});
export default styles;
